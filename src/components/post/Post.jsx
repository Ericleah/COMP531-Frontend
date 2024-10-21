import React, { useState } from "react";
import "./post.scss";

const Post = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.postImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post.postImages.length) % post.postImages.length);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.userImage}
          alt={post.userName}
          className="post-user-image"
        />
        <div className="post-user-info">
          <h5 className="post-user-name">{post.userName}</h5>
          <p className="post-date">{post.date}</p>
        </div>
      </div>
      <div className="post-body">
        <h6 className="post-title">{post.title}</h6>
        <p className="post-desc">{post.body}</p>
        {post.postImages.length > 0 && (
          <div className="post-images">
            {post.postImages.length > 1 && (
              <button onClick={handlePrevImage} className="image-nav-button prev-button">❮</button>
            )}
            <img
              src={post.postImages[currentImageIndex]}
              alt="Post"
              className="post-image"
              draggable="true"
            />
            {post.postImages.length > 1 && (
              <button onClick={handleNextImage} className="image-nav-button next-button">❯</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;