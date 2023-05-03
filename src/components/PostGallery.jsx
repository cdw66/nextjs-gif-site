import React from "react";
import Post from "./Post";

const PostGallery = ({ posts }) => {
  return (
    <div className="columns-6 gap-8 mt-8 mx-8">
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default PostGallery;
