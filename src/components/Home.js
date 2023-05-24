import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import QuestionsList from "./QuestionsList";

class Home extends Component {
  render() {
    const { questions, users, authedUser } = this.props;
    const user = users[authedUser];
    const questionsKeys = Object.keys(questions);
    let ansQues = Object.keys(user.answers);
    let unansQues = questionsKeys.filter((key) => !ansQues.includes(key));

    return (
      <div>
        <Tabs
          defaultActiveKey="unansQues"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="ansQues" title="Answered Questions">
            <QuestionsList
              questionsList={ansQues}
              questions={questions}
              users={users}
            />
          </Tab>
          <Tab eventKey="unansQues" title="Unanswered Questions">
            <QuestionsList
              questionsList={unansQues}
              questions={questions}
              users={users}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questions,
    users,
    authedUser,
  };
}

export default connect(mapStateToProps)(Home);
