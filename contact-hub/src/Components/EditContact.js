import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

class EditContact extends React.Component {
  constructor(props) {
    super(props);

    // Ensure the correct way to access the contact being edited
    const { id, name, email } = props.location?.state?.contact || {
      id: "",
      name: "",
      email: "",
    };

    this.state = {
      id,
      name,
      email,
    };
  }

  update = (event) => {
    event.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory!");
      return;
    }

    this.props.updateContactHandler(this.state); // ✅ Correct function name
    this.setState({ name: "", email: "" }); // Clear fields

    // Redirect to home page after update
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="ui main">
        <h1>Hidden Man</h1>
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </div>

          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

// Use hooks to handle routing in class-based components
const withRouter = (Component) => {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Component {...props} location={location} navigate={navigate} />;
  };
};

export default withRouter(EditContact);
