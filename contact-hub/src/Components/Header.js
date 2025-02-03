import React from "react";

const Header = () => {
  return (
    <div
      className="ui fixed menu"
      style={{
        backgroundColor: "#f9f9f9",
        padding: "10px 0",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div className="ui container center">
        <h2>Contact Manager</h2>
      </div>
    </div>
  );
};

export default Header;
