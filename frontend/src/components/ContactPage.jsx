import React, { useState, useEffect } from 'react';

function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/contacts/')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const createContact = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts((prevContacts) => {
          const updatedContacts = Array.isArray(prevContacts) ? prevContacts : [];
          return [data, ...updatedContacts];
        });
        setNewContact({ name: '', description: '', email: '', phone: '' });
      })
      .catch((error) => console.error('Error creating Contact:', error));
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={createContact}>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={newContact.description}
          onChange={(e) => setNewContact({ ...newContact, description: e.target.value })}
          required
        />
        <br />
        <button type="submit">Contact Us</button>
      </form>

      <div>
        <h3>Contact Entries:</h3>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <p><strong>{contact.name}</strong> ({contact.phone})</p>
              <p>{contact.email}</p>
              <p>{contact.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactPage;
