"use client";
import { FoodCategory, Post } from "@prisma/client";
import { useEffect, useState, type FC } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { SelectElementOption } from "./Custom/SelectElement";
import { FoodCategoryReadable } from "~/types";
import SelectElement from "./Custom/SelectElement";
import { UploadButton } from "~/utils/uploadthing";
import { OurFileRouter } from "~/app/api/uploadthing/core";
import DarkoButton from "./Custom/DarkoButton";
import Image from "next/image";

interface EditPostProps {
  defaultPost: Post;
}

const EditPost: FC<EditPostProps> = ({ defaultPost }) => {
  const utils = api.useUtils();

  const selectOptions: SelectElementOption[] = Object.entries(
    FoodCategoryReadable,
  ).map(([key, value]) => ({
    label: value.toString(),
    value: key,
  }));

  const convertCategory = (category: FoodCategory | null) => {
    return selectOptions.find((option) => option.value === category);
  };

  const [post, setPost] = useState(defaultPost);
  const [selectedOption, setSelectedOption] =
    useState<SelectElementOption | null>(
      convertCategory(defaultPost.category) ?? null,
    );

  useEffect(() => {
    if (selectedOption)
      setPost((prev) => ({
        ...prev,
        category: selectedOption.value as FoodCategory,
      }));

    if (JSON.stringify(post) !== JSON.stringify(defaultPost)) {
      if (!post.category) return;

      updatePost({
        title: post.title,
        id: post.id,
        category: post.category,
      });
    }
  }, [selectedOption]);

  const { data: postData, isLoading } = api.post.getPost.useQuery({
    id: defaultPost.id,
  });

  useEffect(() => {
    if (postData) {
      setPost(postData);
    }
  }, [postData]);

  const { mutate: updatePost, isPending: updatePending } =
    api.post.updatePost.useMutation({
      onMutate: (input) => {
        const originalPost = { ...post };

        if (post) {
          utils.post.getPost.setData(
            { id: input.id },
            { ...post, title: input.title, category: input.category },
          );
        }

        return originalPost;
      },

      onError: (err, variables, context) => {
        toast.error(err.message);

        if (context) {
          utils.post.getPost.setData({ id: context.id ?? "" }, context as Post);
        }
      },
    });
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <FaSpinner className="size-20 animate-spin" width={64} height={64} />
        </div>
      ) : (
        <div className="mx-auto flex w-3/5 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-text-50 opacity-80">
              {updatePending ? (
                <span>Saving...</span>
              ) : (
                <>
                  <span>Saved</span>
                  <FaCheck />
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="col-span-2 rounded-lg border p-4 py-3"
                value={post.title}
                onChange={(e) => {
                  setPost((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
              <SelectElement
                placeholder="Select a category"
                options={selectOptions}
                selected={selectedOption ?? null}
                setSelected={(newSelected) => {
                  if (newSelected) setSelectedOption(newSelected);
                }}
              ></SelectElement>
            </div>
          </div>

          <DarkoButton
            onClick={() => {
              updatePost({
                title: post.title,
                id: post.id,
                category: post.category!,
              });
            }}
            className="w-40"
            variant="secondary"
          >
            Save
          </DarkoButton>
          <UploadButton
            input={{ postId: post.id }}
            endpoint="imageUploader"
            onUploadBegin={() => {
              setPost((prev) => ({ ...prev, imageUrl: null }));
            }}
            onUploadAborted={() => {
              setPost((prev) => ({
                ...prev,
                imageUrl:
                  postData?.imageUrl === undefined ? null : postData?.imageUrl,
              }));
            }}
            onUploadError={(error: Error) => {
              setPost((prev) => ({
                ...prev,
                imageUrl:
                  postData?.imageUrl === undefined ? null : postData?.imageUrl,
              }));
            }}
            onClientUploadComplete={(res) => {
              setPost((prev) => ({
                ...prev,
                imageUrl: res[0]?.url ?? "",
              }));
            }}
          />
          <Image src={post.imageUrl ?? ""} alt="" width={500} height={300} />
        </div>
      )}
    </>
  );
};

export default EditPost;
