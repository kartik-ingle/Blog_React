import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import {FilePlus2} from 'lucide-react';
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Query } from 'appwrite';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await service.getPosts([
          Query.equal("userId", userData.$id),
          Query.equal("status", "active"),
        ]);
        setPosts(response.documents);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    }
    if (userData?.$id) {
      fetchUserPosts();
    }
  }, [userData])

  // useEffect(() => {}, []);
  // appwriteService.getPosts().then((posts) => {
  //   if (posts) {
  //     setPosts(posts.documents);
  //   }
  // }, []);

  return (
    <div className="w-full py-10 min-h-[60vh] bg-white dark:bg-gray-900 transition-colors duration-300">
      <Container>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 text-gray-600 dark:text-gray-300">
            <FilePlus2 className="w-12 h-12" />
            <h2 className="text-2xl font-semibold">No posts found</h2>
            <p className="text-lg">
              You haven't added any posts yet.{" "}
              <Link
                to="/add-post"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                Click here to add your first post.
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
