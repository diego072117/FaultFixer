import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePostActions } from "../../hooks/usePostActions";
import { Loader } from "../../shared/Loader";
import "./Module.scss";
import { PostCard } from "../../components/PostCard/PostCard";

export const Home = () => {
  const { posts, status } = useSelector((state) => state.posts.posts);
  const { allPosts } = usePostActions();
  useEffect(() => {
    allPosts();
  }, []);

  if (status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="container-posts">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
