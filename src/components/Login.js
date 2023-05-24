import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setAuthedUser } from "../actions/authedUser";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    authedUser: "",
    toHome: false,
  };
  selectUser(authedUser) {
    this.setState({
      authedUser,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const authedUser = this.state.authedUser;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(authedUser));
    this.setState(() => ({
      toHome: true,
    }));
  };
  render() {
    let { users } = this.props;
    const { authedUser, toHome } = this.state;
    let userIds = Object.keys(users);
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3>Welcome to Would you Rather App!</h3>
        <Card key="login">
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Card.Text>
                <select
                  onChange={(event) => this.selectUser(event.target.value)}
                  value={authedUser}
                >
                  <option value="" disabled>
                    Select User...
                  </option>
                  {userIds.map((id) => (
                    <option value={id}>{users[id].name}</option>
                  ))}
                </select>
              </Card.Text>
              <Button type="submit" disabled={authedUser === ""}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
