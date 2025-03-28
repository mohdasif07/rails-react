import React, { useEffect, useState } from 'react';

function PostList() {
  // Define state to store the posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });

  // Fetch posts from the backend API when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/posts/')
      .then((response) => response.json())  // Convert response to JSON
      .then((data) => setPosts(data))  // Update the state with the posts
      .catch((error) => console.error('Error fetching posts:', error));  // Handle any errors
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  // Function to handle creating a new post
  const createPost = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // POST request to create a new post
    fetch('http://localhost:3000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),  // Send the new post data
    })
      .then((response) => response.json())
      .then((data) => {
        // After successfully creating the post, fetch the updated list of posts
        setPosts((prevPosts) => [data, ...prevPosts]);  // Add the new post to the state
        setNewPost({ title: '', body: '' });  // Clear the form after submission
      })
      .catch((error) => console.error('Error creating post:', error));  // Handle any errors
  };

  // Function to handle deleting a post
  const deletePost = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',  // HTTP method for deleting
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted post from the list in state
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } else {
          console.error('Error deleting post');
        }
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  return (
    <div>
      <h1>Post List</h1>
      
      {/* Form to create a new post */}
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Post title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />

        <br />
        <textarea
          placeholder="Post body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          required
        />
        <br />
        <button type="submit">Create Post</button>
      </form>
      
      {/* Display list of posts */}
      <ul>
        {posts.length === 0 ? (
          <li>No posts available.</li>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <button onClick={() => deletePost(post.id)}>X</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PostList;
