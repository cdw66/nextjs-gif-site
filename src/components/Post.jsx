import React from "react";

const Post = ({ postData }) => {
  console.log("postData", postData.source_url);
  return (
    <div className="inline-block w-full mb-4 border-b-green-400 border-b-4 bg-neutral rounded-md">
      <img
        className="w-full h-full object-cover mb-2 rounded-md"
        src={postData.source_url}
        alt="Shoes"
      />
      <h2>{postData.num_likes}</h2>
    </div>
  );
};

export default Post;
