import { z } from "zod";
import { FoodCategory, Post, PostState } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  searchPosts: publicProcedure
    .input(
      z.object({
        query: z.string(),
        filter: z.nativeEnum(FoodCategory).nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.filter) {
        return await ctx.db.$queryRaw<Post[]>`
          SELECT p.*,
                MAX(similarity(p.title, ${input.query})) as relevance
          FROM "Post" p
          WHERE p.category = ${input.filter}::"FoodCategory"
          GROUP BY p.id
          ORDER BY relevance DESC;
        `;
      }

      return await ctx.db.$queryRaw<Post[]>`
          SELECT p.*,
                MAX(similarity(p.title, ${input.query})) as relevance
          FROM "Post" p
          GROUP BY p.id
          ORDER BY relevance DESC;
        `;
    }),

  newPost: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });
    }),

  getPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({ where: { id: input.id } });

      if (!post) return null;

      if (post.postState === PostState.PUBLIC) return post;

      if (ctx.session && post.userId === ctx.session.user.id) return post;

      return null;
    }),

  updatePost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.nativeEnum(FoodCategory).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: {
          title: input.title,
          category: input.category,
        },
      });
    }),

  bindImage: publicProcedure
    .input(
      z.object({ id: z.string(), imageUrl: z.string(), userId: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({ where: { id: input.userId } });

      if (!user) return null;

      const post = await ctx.db.post.findFirst({ where: { id: input.id } });

      if (!post) return null;

      if (post.userId !== user.id) return null;

      return await ctx.db.post.update({
        where: { id: post.id },
        data: {
          imageUrl: input.imageUrl,
        },
      });
    }),

  listByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (ctx.session && input.userId === ctx.session.user.id) {
        return await ctx.db.post.findMany({
          where: {
            userId: input.userId,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      }

      return await ctx.db.post.findMany({
        where: {
          userId: input.userId,
          postState: PostState.PUBLIC,
        },
        orderBy: {
          publishedAt: "asc",
        },
      });
    }),

  getPreviews: publicProcedure.query(async ({ ctx }) => {
    const options = Object.values(FoodCategory);

    const ret = await Promise.all(
      options.map(async (e) => {
        const posts = await ctx.db.post.findMany({
          where: {
            postState: PostState.PUBLIC,
            category: e,
          },
          orderBy: {
            publishedAt: "asc",
          },
          include: {
            user: true,
          },
          take: 2,
        });
        return { [e]: posts };
      }),
    );

    const result = ret.reduce(
      (acc, item) => {
        return {
          ...acc,
          ...item,
        };
      },
      {} as Record<FoodCategory, (typeof ret)[0][string]>,
    );

    return result;
  }),

  changePublishedStatus: protectedProcedure
    .input(z.object({ id: z.string(), publish: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          postState: input.publish ? PostState.PUBLIC : PostState.PRIVATE,
          publishedAt: input.publish ? new Date().toISOString() : null,
        },
      });
    }),
});
