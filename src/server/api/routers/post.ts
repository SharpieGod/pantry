import { z } from "zod";
import { Post } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { FoodCategory } from "~/types";

export const postRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ query: z.string(), filter: z.nativeEnum(FoodCategory) }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.$queryRaw<Post[]>`
        SELECT p.*, 
              MAX(similarity(c.title, ${input.query.trim()})) as relevance
        FROM "Post" p
        GROUP BY p.id
        ORDER BY relevance DESC;
      `;

      return posts;
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

      if (post.published) return post;

      if (ctx.session && post.userId === ctx.session.user.id) return post;

      return null;
    }),

  updatePost: protectedProcedure
    .input(
      z.object({ title: z.string(), category: z.nativeEnum(FoodCategory) }),
    )
    .mutation(async ({ ctx, input }) => {}),
});
