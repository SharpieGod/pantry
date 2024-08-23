"use client";
import React from "react";
import DarkoButton from "./Custom/DarkoButton";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewPostButton = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate: newPost, isPending } = api.post.newPost.useMutation({
    onMutate: () => {
      toast.info("Creating new post");
    },

    onSuccess: async (data) => {
      router.push(`/post/edit/${data.id}`);
      await utils.post.listByUser.invalidate();
    },
  });
  return (
    <DarkoButton
      onClick={() => newPost({ title: "" })}
      disabled={isPending}
      variant="ghost"
    >
      Make Posting
    </DarkoButton>
  );
};

export default NewPostButton;
