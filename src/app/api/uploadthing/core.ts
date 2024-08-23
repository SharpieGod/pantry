import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ cardId: z.string() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      const session = await getServerAuthSession();

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id, cardId: input.cardId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("Card id: ", metadata.cardId);
      await api.card.bindImage({
        id: metadata.cardId,
        imageURL: file.url,
        userId: metadata.userId,
      });

      await api.card.sendGPT({
        imageURL: file.url,
      });

      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, imageId: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
