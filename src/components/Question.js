import React, { Component } from "react";
import { connect } from "react-redux";
import { handleQuestionAnswer } from "../actions/questions";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";

class Question extends Component {
  state = {
    answer: "optionOne",
  };
  onAnswerChange = (e) => {
    this.setState({ answer: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, question, users, authedUser } = this.props;

    dispatch(
      handleQuestionAnswer({
        qid: question.id,
        authedUser: authedUser,
        answer: this.state.answer,
        users,
      })
    );
  };

  render() {
    const { question, users, authedUser } = this.props;
    const user = users[authedUser];

    const isAnsweredQuestion = user.answers[question.id] !== undefined;
    if (question === null) {
      return <p>This Question doesn't existd</p>;
    }

    const { author, optionOne, optionTwo } = question;
    const numberOfVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOneVotes = (optionOne.votes.length * 100) / numberOfVotes;
    const optionTwoVotes = (optionTwo.votes.length * 100) / numberOfVotes;
    return (
      <div>
        {isAnsweredQuestion ? (
          <Card key={question.id}>
            <Card.Header>Asked By {users[authedUser].name}</Card.Header>
            <Card.Img variant="top" src={users[authedUser].avatarUrl} />
            <Card.Body>
              <Card.Title>Would You Rather ...</Card.Title>
              <div
                className={`${this.state.answer === "optionOne" ? "vote" : ""}`}
              >
                <Card.Text>
                  {optionOne.text}
                  <ProgressBar
                    now={optionOneVotes}
                    label={`${optionOneVotes}%`}
                  />{" "}
                </Card.Text>
              </div>
              <div
                className={`${this.state.answer === "optionTwo" ? "vote" : ""}`}
              >
                <Card.Text>
                  {optionTwo.text}
                  <ProgressBar
                    now={optionTwoVotes}
                    label={`${optionTwoVotes}%`}
                  />
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card key={question.id}>
            <Card.Header>{users[authedUser].name} Asks: </Card.Header>
            <Card.Img variant="top" src={users[authedUser].avatarUrl} />
            <Card.Body>
              <Card.Title>Would You Rather ...</Card.Title>
              <Form onSubmit={this.handleSubmit}>
                <Card.Text>
                  <input
                    type="radio"
                    name="optionOne"
                    value="optionOne"
                    checked={this.state.answer === "optionOne"}
                    onChange={this.onAnswerChange}
                  />
                  {optionOne.text}
                </Card.Text>
                <Card.Text>
                  <input
                    type="radio"
                    name="optionTwo"
                    value="optionTwo"
                    checked={this.state.answer === "optionTwo"}
                    onChange={this.onAnswerChange}
                  />
                  {optionTwo.text}
                </Card.Text>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  const question = questions[id];
  return {
    users,
    question,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
