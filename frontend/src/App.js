import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import Footer from './components/Footer';
import Header from './components/Header';
import PostList from './components/PostList';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';  // Ensure you have an AboutPage component
import ToDoList from './components/ToDoList';
function CreatePost() {
  return (
    <Router> {/* Wrap your app with Router */}
      <div>
        <Header />
        <hr />
        <Routes> {/* Define routes */}
          <Route path="/" element={<PostList />} /> {/* Home page */}
          <Route path="/about" element={<AboutPage />} /> {/* About page */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/to_do_list" element={<ToDoList />} /> {/* Contact page */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default CreatePost;
