import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import Home from "./Home";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.authedUser === null ? (
              <Route path="/" component={Login} />
            ) : (
              <div>
                <Nav />
                <Route path="/" exact component={Home} />
                <Route path="/question/:id" component={Question} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderBoard" component={LeaderBoard} />
                <Route path="/login" component={Login} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    loading:
      Object.keys(questions).length === 0 || Object.keys(users).length === 0,
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
