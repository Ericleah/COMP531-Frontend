import React, { useEffect, useContext } from "react";
import "./posts.scss";
import Post from "../post/Post";
import Share from "../share/Share";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducer/authReducer";
import { addPost, setPosts } from "../../actions/postsActions";
import { selectPosts } from "../../reducer/postsReducer";
import { selectFollowedUsers } from "../../reducer/followedUsersReducer";
import { FilterTermContext } from "../../context/FilterTermContext";

const Posts = () => {
  const currentUser = useSelector(selectUser);
  const posts = useSelector(selectPosts) || [];
  const dispatch = useDispatch();
  const currentUserID = currentUser.id;
  const followedUsers = useSelector(selectFollowedUsers);
  const { filterTerm = "" } = useContext(FilterTermContext);

  // Filtering the posts based on the filterTerm
  const filteredPosts = posts.filter((post) => {
    return (
      (post.userName
        ? post.userName.toLowerCase().includes(filterTerm.toLowerCase())
        : false) ||
      (post.body
        ? post.body.toLowerCase().includes(filterTerm.toLowerCase())
        : false)
    );
  });

  useEffect(() => {
    const userImages = [
      "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ];

    const postImages = [
      "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1600", // Beautiful scene
      "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600", // Beautiful scene
      "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=1600", // Food
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1600", // Food
      "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=1600", // Food
      "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1600", // Beautiful scene
      "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=1600", // Beautiful scene
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600", // Food
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1600", // Food
      "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=1600" // Food
    ];

    const fetchDetailsAndPosts = async () => {
      const allPosts = [];
      const userImageMap = {};

      // Fetch user data and posts for each followed user
      for (let i = 0; i < followedUsers.length; i++) {
        const user = followedUsers[i];
        const userImage = userImages[user.id % userImages.length]; // Distribute images

        userImageMap[user.id] = userImage;

        // Fetch posts for the user
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const postsData = await postsResponse.json();

        // Add user image, name, and relative date to each post
        const userPosts = postsData.map((post, index) => {
          const postImagesForPost = index < 4 ? postImages.slice(0, 3) : []; // Add multiple images to first 4 posts
          return {
            ...post,
            userImage,
            userName: user.username,
            date: new Date(Date.now() - (index + 1) * 60000).toLocaleTimeString(), // Relative time
            postImages: postImagesForPost // Add post images
          };
        });

        allPosts.push(...userPosts);
      }

      // Update state with all posts
      dispatch(setPosts(allPosts));
    };

    fetchDetailsAndPosts();
  }, [followedUsers, dispatch]);

  // JSX to display posts
  return (
    <div className="posts-container">
      <Share />
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;