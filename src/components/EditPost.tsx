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
import { LuEye, LuEyeOff, LuSave } from "react-icons/lu";

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
      onMutate: (input) => {
        if (!post) return;
        utils.post.getPost.setData(
          { id: post?.id ?? "" },
          {
            ...post,
            postState: input.publish ? "PUBLIC" : "PRIVATE",
            user: {
              name: "",
              image: "",
              email: "",
            },
          },
        );
      },
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
            {
              ...post,
              title: input.title,
              category: input.category,
              user: {
                email: "",
                name: "",
                image: "",
              },
            },
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
          utils.post.getPost.setData(
            { id: context.id ?? "" },
            context as Post & {
              user: { name: string; image: string; email: string };
            },
          );
        }
      },
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !fetchedPost) return <div>Error loading post.</div>;
  if (!fetchedPost && !isLoading) router.push("/account");

  return (
    <div className="mx-auto flex w-3/5 flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-text-50 opacity-80">
            {updatePending ? <span>Saving...</span> : <span>Saved</span>}
            <FaCheck className={cn({ hidden: updatePending })} />
          </div>
          <div className="flex items-center gap-1 text-text-50 opacity-80">
            {post?.postState === "PUBLIC" ? (
              <span>Public</span>
            ) : (
              <span>Private</span>
            )}
          </div>
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

      {/* Image and Upload Section */}
      <div className="flex flex-col gap-4 items-center">
        {post?.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt="Uploaded Image"
            width={350}
            height={350}
            className="w-[400px] h-[400px] rounded-lg object-cover"
          />
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.webp"
              alt="Placeholder Image"
              width={350}
              height={350}
              className="w-[400px] h-[400px] rounded-lg object-cover"
            />
            <p>No image uploaded</p>
          </div>
        )}
        <UploadButton
          className="[&>label]:bg-primary-300 [&>label]:text-text-950"
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
      </div>

      {/* Save and Publish Buttons */}
      <div className="flex w-full gap-4 mt-4">
        <div className="w-1/2">
          <DarkoButton
            disabled={updatePending}
            onClick={() => {
              if (post && JSON.stringify(post) !== JSON.stringify(fetchedPost))
                updatePost({
                  title: post.title,
                  id: post.id,
                  category: post.category!,
                });
              else toast.info("Already up to date");
            }}
            className="w-full h-10"
            variant="secondary"
          >
            <div className="flex items-center justify-center gap-1">
              {updatePending ? (
                <VscLoading className="animate-spin" />
              ) : (
                <>
                  <span>Save</span>
                  <LuSave size={16} />
                </>
              )}
            </div>
          </DarkoButton>
        </div>

        {post && (
          <div className="w-1/2">
            <DarkoButton
              className="w-full h-10"
              disabled={publishedPending}
              variant="primary"
              onClick={() => {
                if (!post.category && post.postState === "PRIVATE") {
                  toast.error("Please select a category to publish");
                  return;
                }

                if (!post.title.trim() && post.postState === "PRIVATE") {
                  toast.error("Title cannot be blank");
                  return;
                }

                if (!post.imageUrl && post.postState === "PRIVATE") {
                  toast.error("Please upload an image, cannot be blank");
                  return;
                }

                if (JSON.stringify(post) !== JSON.stringify(fetchedPost))
                  updatePost({
                    title: post.title,
                    id: post.id,
                    category: post.category!,
                  });

                changePublished({
                  id: post.id,
                  publish: post.postState === "PRIVATE",
                });
              }}
            >
              <div className="flex items-center justify-center gap-2">
                {publishedPending ? (
                  <VscLoading className="animate-spin" />
                ) : post.postState === "PRIVATE" ? (
                  <>
                    <span>Publish</span>
                    <LuEye />
                  </>
                ) : (
                  <>
                    <span>Private</span>
                    <LuEyeOff />
                  </>
                )}
              </div>
            </DarkoButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
