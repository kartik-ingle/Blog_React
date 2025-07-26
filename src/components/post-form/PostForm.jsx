import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

export default function PostForm({ post, showImage = true }) {
  const [status, setStatus] = useState("active");
  const [fileName, setFileName] = useState("No file chosen");
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  React.useEffect(() => {
    if (post?.status) {
      setValue("status", post.status);
    }
  }, [post?.status, setValue]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setValue("status", status)
    const finalData = getValues();

    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...finalData,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        finalData.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...finalData,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    // const slug = value.toLowerCase().replace(/ /g, '-')
    // setValue('slug', slug)
    // return slug

    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8 p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg max-w-2xl mx-auto">
      <div>
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter post title..."
          {...register("title")}
          className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Slug (URL)</label>
        <input
          type="text"
          placeholder="unique-post-url"
          {...register("slug")}
          className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Content</label>
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
          <RTE name="content" control={control} />
        </div>
      </div>

      <div>
        <label className="block text-lg font-mediu mb-1">
          Featured Image
        </label>
        <input
          type="file"
          {...register("image")}
          className="block w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
        />
        {post && post.featuredImage && showImage !== false && (
          <div className="mt-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt="Preview"
              className="rounded-xl max-h-64 object-contain border border-gray-300 dark:border-gray-700"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="text-base font-medium text-gray-800 dark:text-gray-200">Post Status:</span>
        <button
          type="button"
          onClick={() => {
            setStatus("active");
            setValue("status", "active");
          }}
          className={`px-4 py-2 rounded-xl border transition-all ${
            status === "active"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("inactive");
            setValue("status", "inactive");
          }}
          className={`px-4 py-2 rounded-xl border transition-all ${
            status === "inactive"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          }`}
        >
          Inactive
        </button>
      </div>

      <input type="hidden" {...register("status")} />

      <Button
        type="submit"
        // className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200"
      >
        {post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}
