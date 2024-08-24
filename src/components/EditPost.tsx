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
import {
  LuArchive,
  LuArchiveRestore,
  LuEye,
  LuEyeOff,
  LuSave,
  LuTrash,
  LuX,
} from "react-icons/lu";

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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const convertCategory = (category: FoodCategory | null) => {
    return selectOptions.find((option) => option.value === category);
  };

  const {
    data: fetchedPost,
    isLoading,
    isError,
  } = api.post.getPost.useQuery({ id: postId });

  const [post, setPost] = useState<Post | null>(null);
  const [uploadPending, setUploadPending] = useState(false);
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

      onSuccess: async (res) => {
        setPost(res);
        await utils.post.listByUser.invalidate();
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

  const { mutate: deletePost, isPending: deletePending } =
    api.post.deletePost.useMutation({
      onSuccess: (res) => {
        toast.success("Post deleted");
        router.push("/account");
      },
    });

  const { mutate: changeArchived, isPending: archivedPending } =
    api.post.changeArchiveStatus.useMutation({
      onMutate: (input) => {
        if (!post) return;
        utils.post.getPost.setData(
          { id: post.id ?? "" },
          {
            ...post,
            user: {
              name: "",
              image: "",
              email: "",
            },
            postState: input.archive ? "ARCHIVE" : "PRIVATE",
          },
        );
      },

      onSuccess: async (res) => {
        if (res.postState === "ARCHIVE") toast.success("Post archived");
        else toast.success("Post restored");
        await utils.post.listByUser.invalidate();
      },
    });

  if (isLoading)
    return <div className="w-full p-4 text-center text-lg">Loading...</div>;
  if (isError || !fetchedPost) router.push("/account");
  if (!fetchedPost && !isLoading) router.push("/account");

  return (
    <div className="relative h-full">
      <div className="mx-auto flex h-full w-3/5 flex-col gap-8 pt-4">
        <div className="absolute left-4 top-4 flex gap-4">
          {post && post.postState !== "PRIVATE" && (
            <DarkoButton
              disabled={archivedPending || publishedPending}
              variant="secondary"
              className="flex h-10 w-32 items-center justify-center gap-2"
              onClick={() => {
                if (post.postState === "PRIVATE") {
                  toast.error("Cannot archive private posts");
                  return;
                }

                changeArchived({
                  id: post.id,
                  archive: post.postState === "PUBLIC",
                });
              }}
            >
              {archivedPending || publishedPending ? (
                <>
                  <VscLoading className="animate-spin" />
                </>
              ) : post.postState === "ARCHIVE" ? (
                <>
                  <span>Restore</span>
                  <LuArchiveRestore />
                </>
              ) : (
                <>
                  <span>Archive</span>
                  <LuArchive />
                </>
              )}
            </DarkoButton>
          )}
          {post && post.postState === "ARCHIVE" && (
            <DarkoButton
              disabled={archivedPending || publishedPending}
              onClick={() => {
                if (post.postState !== "ARCHIVE") {
                  toast.error("Cannot delete unarchived post");
                  return;
                }

                setDeleteModalOpen(true);
              }}
              variant="danger"
              className="flex h-10 w-32 items-center justify-center gap-2"
            >
              <span>Delete</span>
              <LuTrash />
            </DarkoButton>
          )}
        </div>
        <div
          className={`absolute inset-0 z-50 ${deleteModalOpen ? "flex" : "hidden"} h-full w-full items-center justify-center`}
        >
          <div className="flex w-[30rem] flex-col gap-16 rounded-lg border border-background-800/80 bg-background-950 p-4">
            <div className="flex">
              <div className="flex flex-1 flex-col gap-2">
                <h1 className="text-xl font-semibold">
                  Are you sure you want to delete this post?
                </h1>
                <span className="opacity-80">This action cannot be undone</span>
              </div>
              <DarkoButton
                className="p-0"
                onClick={() => {
                  setDeleteModalOpen(false);
                }}
              >
                <LuX />
              </DarkoButton>
            </div>
            <div className="flex gap-2">
              <DarkoButton
                className=""
                onClick={() => {
                  if (post?.postState !== "ARCHIVE") {
                    toast.error("Cannot delete unarchived post");
                    return;
                  }

                  deletePost({ id: post.id });
                }}
              >
                Delete Post
              </DarkoButton>
              <DarkoButton
                variant="primary"
                onClick={() => {
                  setDeleteModalOpen(false);
                }}
              >
                Cancel
              </DarkoButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            {post?.postState !== "ARCHIVE" && (
              <div className="flex items-center gap-1 text-text-50 opacity-80">
                {updatePending ? <span>Saving...</span> : <span>Saved</span>}
                <FaCheck className={cn({ hidden: updatePending })} />
              </div>
            )}
            <div className="flex items-center gap-1 text-text-50 opacity-80">
              {post?.postState === "PUBLIC" ? (
                <span>Public</span>
              ) : post?.postState === "ARCHIVE" ? (
                <span>Archived</span>
              ) : (
                <span>Private</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              disabled={post?.postState === "ARCHIVE"}
              type="text"
              placeholder="Title"
              className="col-span-2 rounded-lg border border-secondary-800 bg-secondary-950 p-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
              value={post?.title ?? ""}
              onChange={(e) => {
                setPost((prev) =>
                  prev ? { ...prev, title: e.target.value } : null,
                );
              }}
            />
            <SelectElement
              placeholder="Select a category"
              disabled={post?.postState === "ARCHIVE"}
              options={selectOptions}
              selected={selectedOption ?? null}
              setSelected={(newSelected) => {
                if (post?.postState === "ARCHIVE") return;
                if (newSelected) setSelectedOption(newSelected);
              }}
            />
          </div>
        </div>

        {/* Image and Upload Section */}
        <div className="flex flex-col items-center gap-4">
          {post?.imageUrl && !uploadPending ? (
            <Image
              src={post.imageUrl}
              alt="Uploaded Image"
              width={1000}
              height={1000}
              className={`max-h-[800px] w-[800px] rounded-lg object-cover ${post.postState === "ARCHIVE" && "opacity-50"}`}
            />
          ) : (
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.webp"
                alt="Placeholder Image"
                width={1000}
                height={1000}
                className="max-h-[800px] w-[800px] rounded-lg object-cover"
              />
              <p>No image uploaded</p>
            </div>
          )}
          <UploadButton
            disabled={post?.postState === "ARCHIVE"}
            className={`[&>label]:bg-primary-300 [&>label]:text-text-950 ${post?.postState === "ARCHIVE" && "hidden"} `}
            input={{ postId: post?.id ?? "" }}
            endpoint="imageUploader"
            onUploadBegin={() => {
              setUploadPending(true);
              setPost((prev) => (prev ? { ...prev, imageUrl: null } : null));
            }}
            onUploadAborted={() => {
              setUploadPending(false);
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
              setUploadPending(false);
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
              setUploadPending(false);
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

        {post && (
          <div className="flex w-full gap-4 [&>*]:flex-1">
            <DarkoButton
              disabled={updatePending || post.postState === "ARCHIVE"}
              onClick={() => {
                if (post.postState === "ARCHIVE") {
                  toast.error("Cannot modify archived posts");
                  return;
                }
                if (
                  post &&
                  JSON.stringify(post) !== JSON.stringify(fetchedPost)
                )
                  updatePost({
                    title: post.title,
                    id: post.id,
                    category: post.category!,
                  });
                else toast.info("Already up to date");
              }}
              className="h-12 w-full"
              variant="secondary"
            >
              <div className="flex items-center justify-center gap-2">
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
            <DarkoButton
              className="h-12 w-full"
              disabled={publishedPending || post.postState === "ARCHIVE"}
              variant="primary"
              onClick={() => {
                if (
                  post &&
                  JSON.stringify(post) !== JSON.stringify(fetchedPost)
                )
                  updatePost({
                    title: post.title,
                    id: post.id,
                    category: post.category!,
                  });

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
                {publishedPending || archivedPending ? (
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
