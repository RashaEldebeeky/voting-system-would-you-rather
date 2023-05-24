import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    author: null,
    toHome: false,
  };
  handleChangeOptionOne = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      optionOne: text,
    }));
  };
  handleChangeOptionTwo = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      optionTwo: text,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(() => ({
      text: "",
      toHome: id ? false : true,
    }));
  };
  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Add new Question</h3>
        <Card>
          <Card.Header>Would You Rather .... </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Card.Text>
                <textarea
                  placeholder="Option One"
                  value={optionOne}
                  onChange={this.handleChangeOptionOne}
                />
              </Card.Text>
              <Card.Text>
                <textarea
                  placeholder="Option Two"
                  value={optionTwo}
                  onChange={this.handleChangeOptionTwo}
                />
              </Card.Text>
              {/* <button
            className="btn"
            type="submit"
            disabled={optionOne === "" || optionTwo === ""}
          >
            Submit
          </button> */}
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect()(NewQuestion);
