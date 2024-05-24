import React, { useState, useContext, useEffect } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { UserContext } from "../comp/UserContext";
import '../Hero.css';

const Hero = ({ blogPosts, removeBlog, editBlog }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editablePostId, setEditablePostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const { userName } = useContext(UserContext);

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (sortBy === "newest") {
      filtered = filtered.slice().sort((a, b) => b.id - a.id);
    } else {
      filtered = filtered.slice().sort((a, b) => a.id - b.id);
    }

    setFilteredPosts(filtered.slice(0, 3)); // Limiting to max 3 posts

  }, [blogPosts, selectedCategory, sortBy]);

  // Function to handle editing of a blog post
  const handleEdit = (postId, text) => {
    setEditablePostId(postId);
    setEditedText(text);
  };

  // Function to handle saving edited blog post
  const handleSave = (postId) => {
    editBlog(postId, editedText); // Call the editBlog function from props to save the edited text
    setEditablePostId(null);
  };

  
  const handleKeyPress = (event, postId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(postId); // Call the save function
    }
  };

  return (
    <div className="heroSection">
      <div className="heroContent">
        {/* Blog posts section */}
        <div className="blogContainer">
          <div className="filterSection">
            <button
              className={`filterButton ${sortBy === "newest" ? "active" : ""}`}
              onClick={() => setSortBy("newest")}
            >
              Newest
            </button>
            <button
              className={`filterButton ${sortBy === "oldest" ? "active" : ""}`}
              onClick={() => setSortBy("oldest")}
            >
              Oldest
            </button>
            <h1>Category:</h1>
            {["Gaming", "Food", "News"].map(category => (
              <button
                key={category}
                className={`filterButton ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
            <button
              className={`filterButton ${
                !selectedCategory ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
          </div>
          {/* Render blog posts */}
          {filteredPosts.map((post) => (
            <div className="blogPost" key={post.id}>
              <h2>
                {post.title}
                {post.author === userName && (
                  <>
                    <MdDeleteOutline onClick={() => removeBlog(post.id)} className="removeButton">
                      Remove
                    </MdDeleteOutline>
                    {editablePostId === post.id ? (
                      <MdEdit onClick={() => handleSave(post.id)} />
                    ) : (
                      <MdEdit onClick={() => handleEdit(post.id, post.blogText)} />
                    )}
                  </>
                )}
              </h2>
              <div className="blogContent">
                {editablePostId === post.id ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, post.id)} // Handle key events
                  />
                ) : (
                  <h3>{post.blogText}</h3>
                )}
                <p>Author: {post.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
