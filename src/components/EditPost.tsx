"use client";
import { FoodCategory, Post, PostState } from "@prisma/client";
import { useEffect, useState, type FC } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { SelectElementOption } from "./Custom/SelectElement";
import { FoodCategoryReadable } from "~/types";
import SelectElement from "./Custom/SelectElement";
import { UploadButton } from "~/utils/uploadthing";
import DarkoButton from "./Custom/DarkoButton";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";

interface EditPostProps {
  postId: string;
}

const EditPost: FC<EditPostProps> = ({ postId }) => {
  const utils = api.useUtils();
  const router = useRouter();

  const selectOptions: SelectElementOption[] = Object.entries(
    FoodCategoryReadable,
  ).map(([key, value]) => ({
    label: value.toString(),
    value: key,
  }));

  const convertCategory = (category: FoodCategory | null) => {
    return selectOptions.find((option) => option.value === category);
  };

  const {
    data: fetchedPost,
    isLoading,
    isError,
  } = api.post.getPost.useQuery({ id: postId });

  const [post, setPost] = useState<Post | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<SelectElementOption | null>(null);

  useEffect(() => {
    if (fetchedPost) {
      setPost(fetchedPost);
      setSelectedOption(convertCategory(fetchedPost.category) ?? null);
    }
  }, [fetchedPost]);

  useEffect(() => {
    if (selectedOption && post) {
      setPost((prev) =>
        prev
          ? {
              ...prev,
              category: selectedOption.value as FoodCategory,
            }
          : null,
      );
    }
  }, [selectedOption]);

  const { mutate: changePublished, isPending: publishedPending } =
    api.post.changePublishedStatus.useMutation({
      onSuccess: (res) => {
        setPost(res);
      },
    });

  const { mutate: updatePost, isPending: updatePending } =
    api.post.updatePost.useMutation({
      onMutate: (input) => {
        if (post) {
          const originalPost = { ...post };
          utils.post.getPost.setData(
            { id: input.id },
            { ...post, title: input.title, category: input.category },
          );
          return originalPost;
        }
        return undefined;
      },

      onSuccess: async () => {
        await utils.post.listByUser.invalidate();
      },

      onError: (err, variables, context) => {
        toast.error(err.message);
        if (context) {
          utils.post.getPost.setData({ id: context.id ?? "" }, context as Post);
        }
      },
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !fetchedPost) return <div>Error loading post.</div>;
  if (!fetchedPost && !isLoading) router.push("/account");

  return (
    <div className="mx-auto flex w-3/5 flex-col gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-text-50 opacity-80">
          {updatePending ? (
            <span>Saving...</span>
          ) : (
            <div className="flex items-center gap-2 opacity-80">
              <span>Saved</span>
            </div>
          )}
          <FaCheck className={cn({ hidden: updatePending })} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="col-span-2 rounded-lg border border-secondary-800 bg-secondary-950 p-4 py-3"
            value={post?.title ?? ""}
            onChange={(e) => {
              setPost((prev) =>
                prev ? { ...prev, title: e.target.value } : null,
              );
            }}
          />
          <SelectElement
            placeholder="Select a category"
            options={selectOptions}
            selected={selectedOption ?? null}
            setSelected={(newSelected) => {
              if (newSelected) setSelectedOption(newSelected);
            }}
          />
        </div>
      </div>

      <DarkoButton
        onClick={() => {
          if (post) {
            updatePost({
              title: post.title,
              id: post.id,
              category: post.category!,
            });
          }
        }}
        className="w-24"
        variant="secondary"
      >
        Save
      </DarkoButton>
      <UploadButton
        input={{ postId: post?.id ?? "" }}
        endpoint="imageUploader"
        onUploadBegin={() => {
          setPost((prev) => (prev ? { ...prev, imageUrl: null } : null));
        }}
        onUploadAborted={() => {
          setPost((prev) =>
            prev
              ? {
                  ...prev,
                  imageUrl: post?.imageUrl ?? null,
                }
              : null,
          );
        }}
        onUploadError={() => {
          setPost((prev) =>
            prev
              ? {
                  ...prev,
                  imageUrl: post?.imageUrl ?? null,
                }
              : null,
          );
        }}
        onClientUploadComplete={(res) => {
          setPost((prev) =>
            prev
              ? {
                  ...prev,
                  imageUrl: res[0]?.url ?? "",
                }
              : null,
          );
        }}
      />
      {post?.imageUrl && (
        <Image src={post.imageUrl} alt="" width={500} height={300} />
      )}
      {post && (
        <div>
          <DarkoButton
            className="flex h-10 w-24 items-center justify-center"
            disabled={publishedPending}
            variant="primary"
            onClick={() =>
              changePublished({
                id: post.id,
                publish: post.postState === "PRIVATE",
              })
            }
          >
            {publishedPending ? (
              <VscLoading className="animate-spin" />
            ) : post.postState === "PRIVATE" ? (
              <span>Publish</span>
            ) : (
              <span>Private</span>
            )}
          </DarkoButton>
        </div>
      )}
    </div>
  );
};

export default EditPost;
