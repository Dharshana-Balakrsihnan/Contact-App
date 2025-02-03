import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //useNavigate,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail"; // Make sure this is imported
// import DeleteConfirmation from "./DeleteConfirmation";
import api from "../api/contact";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveContacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  // const addContactHandler = (contact) => {
  //   setContacts([...contacts, { id: uuidv4(), ...contact }]);
  // };

  //add new contact
  const addContactHandler = async (contact) => {
    console.log(contacts);
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", request); // ✅ Corrected API call
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  //update contact
  const updateContactHandler = async (contact) => {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact); // ✅ Ensure correct API endpoint

      const { id } = response.data; // ✅ Only extract `id`, since `name` and `email` are not needed

      setContacts(
        contacts.map(
          (c) => (c.id === id ? { ...response.data } : c) // ✅ Update only the matching contact
        )
      );
    } catch (error) {
      console.error(
        "Error updating contact:",
        error.response?.status,
        error.message
      );
    }
  };

  const removeContactHandler = async (id) => {
    try {
      // Make sure the backend route is correct, i.e., `/contacts/:id`
      await api.delete(`/contacts/${id}`); // Ensure this matches the backend route
      const newContactList = contacts.filter((contact) => contact.id !== id);
      setContacts(newContactList);
    } catch (error) {
      console.error(
        "Error deleting contact:",
        error.response?.status,
        error.message
      );
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []); // Empty dependency array, so it runs once when the component mounts

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler} // ✅ Pass the correct function name
              />
            }
          />
          {/* <Route
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            } */}
          <Route
            path="/edit/:id"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
          <Route path="/contact/:id" Component={ContactDetail} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
