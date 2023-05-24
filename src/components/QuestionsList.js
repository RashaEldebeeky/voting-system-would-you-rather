import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function QuestionsList(props) {
  const { questionsList, questions, users } = props;
  return questionsList.map((id) => (
    <Card key={id}>
      <Card.Header>{users[questions[id].author].name} Asks: </Card.Header>
      <Card.Img variant="top" src={users[questions[id].author].avatarUrl} />
      <Card.Body>
        <Card.Title>Would You Rather ...</Card.Title>
        <Card.Text>{questions[id].optionOne.text}</Card.Text>

        <Link to={`/question/${id}`}>
          <Button type="button">View Question</Button>
        </Link>
      </Card.Body>
    </Card>
  ));
}
