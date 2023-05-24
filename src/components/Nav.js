import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleLogout() {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  }
  render() {
    return (
      <nav className="nav-bar">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
        </ul>
        <ul class="user-nav">
          <li> {this.props.user}</li>
          <li>
            <button onClick={() => this.handleLogout()}>Logout</button>
          </li>
        </ul>
      </nav>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser].name;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Nav);
