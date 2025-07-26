import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      <Container>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
          {/* Edit/Delete Buttons */}
          {isAuthor && (
            <div className="flex justify-end gap-4 mb-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 cursor-pointer">Edit</Button>
              </Link>
              <Button
                bgColor="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 cursor-pointer" onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4 text-center">
            {post.title}
          </h1>

          {/* Image */}
          <div className="mb-8">
            <div className="w-full max-h-[500px] border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow">
                <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto object-contain"
                />
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-img:rounded-xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline">
            {typeof post.content === "string" ? parse(post.content) : null}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
