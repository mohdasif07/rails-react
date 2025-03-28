// Header.js
import React from 'react';
import '../Header.css'; // You can add some styling here

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <h1>Rails+React</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/to_do_list">To Do List</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
