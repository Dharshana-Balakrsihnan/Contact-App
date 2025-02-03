import React from "react";
import { Link } from "react-router-dom";
import user from "../Images/pic.png"; // Ensure the path is correct

const ContactCard = ({ contact, clickHandler }) => {
  const { id, name, email } = contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{ contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{
          color: "red",
          marginTop: "7px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
        onClick={() => clickHandler(id)}
      ></i>
      <Link to={`/edit/${id}`} state={{ contact }}>
        <i
          className="edit alternate outline icon"
          style={{
            color: "blue",
            marginTop: "7px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
