import React from "react";

const Post = ({ post }) => {
  return (
    <div className="single-post">
      <h3>{post.name}</h3>
      <p>{post.body.slice(0,160)}</p>
      <p>
        Author:{'  '}
        <a href={`mailto:${post.email}`}>{post.email}</a>
      </p>
    </div>
  );
};

export default Post;
