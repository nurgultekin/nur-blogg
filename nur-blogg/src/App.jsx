import { useState, useEffect } from "react";
import Navbar from "./comp/Navbar";
import Hero from "./pages/Hero";
import Explore from "./pages/Explore";
import MakeBlogg from "./pages/MakeBlogg";
import LoginForm from "./comp/LoginForm";
import SignUpForm from "./comp/SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./comp/UserContext";
import { auth } from "./firebase";
import blogData from "./blogData.json";

function App() {
  const [blogPosts, setBlogPosts] = useState(
    JSON.parse(localStorage.getItem("blogPosts")) || blogData
  );
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addComment = (postId, comment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), comment] } : post
      )
    );
  };

  const editBlog = (postId, newText) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, blogText: newText } : post
      )
    );
  };

  const removeBlog = (id) => {
    const updatedBlogs = blogPosts.filter((blog) => blog.id !== id);
    setBlogPosts(updatedBlogs);
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <Router>
      <UserContext.Provider value={{ user }}>
        <Navbar />
        {user ? (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Hero
                  blogPosts={blogPosts}
                  removeBlog={removeBlog}
                  addComment={addComment}
                  editBlog={editBlog} // Pass editBlog function as prop
                />
              }
            />
            <Route
              path="/Explore"
              element={
                <Explore
                  blogPosts={blogPosts}
                  removeBlog={removeBlog}
                  addComment={addComment}
                  editBlog={editBlog} // Pass editBlog function as prop
                />
              }
            />
            <Route
              path="/MakeBlogg"
              element={
                <MakeBlogg
                  onAddBlog={(newBlog) => {
                    setBlogPosts([...blogPosts, { id: blogPosts.length + 1, ...newBlog }]);
                  }}
                />
              }
            />
          </Routes>
        ) : (
          <div>
            <LoginForm toggleSignUp={toggleSignUp} />
            {showSignUp && <SignUpForm />}
          </div>
        )}
      </UserContext.Provider>
    </Router>
    
  );
}

export default App;
