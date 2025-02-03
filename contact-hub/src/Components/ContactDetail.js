import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import pic from "../Images/pic.png";

const ContactDetail = () => {
  const location = useLocation();
  const contact = location.state?.contact;

  if (!contact) {
    return (
      <div className="main">
        <h1>Contact details not available</h1>
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    );
  }

  const { name, email } = contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={pic} alt="Contact" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
