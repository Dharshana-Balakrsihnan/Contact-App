import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  //this funtion take props to contactlist and we are going to map them
  const inputE1 = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => (
    <ContactCard
      contact={contact}
      clickHandler={deleteContactHandler}
      key={contact.id}
    />
  ));

  const getSearchTerm = () => {
    props.searchKeyword(inputE1.current.value); // ✅ Call the function correctly
  };

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      <h2
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Contact List
        <Link to="/add">
          <button
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Contact
          </button>
        </Link>
      </h2>

      <div className="ui search">
        <div className="ui icon input" style={{ width: "100%" }}>
          <input
            ref={inputE1}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <br></br>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {renderContactList.length > 0 ? (
          renderContactList
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            No Contacts Available
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
