import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
class LeaderBoard extends Component {
  render() {
    let { users, leaderBoard } = this.props;

    return (
      <div>
        {leaderBoard.map((user) => (
          <Card key={user[0]}>
            <Card.Header>{users[user[0]].name}</Card.Header>
            <Card.Img variant="top" src={users[user[0]].avatarUrl} />
            <Card.Body>
              <Card.Text>Score:{user[1]}</Card.Text>
              <Card.Text>
                Answered Questions:
                {Object.keys(users[user[0]].answers).length}
              </Card.Text>
              <Card.Text>
                Created Questions:
                {users[user[0]].questions.length}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  let leaderBoard = [];
  for (let id in users) {
    leaderBoard.push([
      id,
      users[id].questions.length + Object.keys(users[id].answers).length,
    ]);
  }

  leaderBoard.sort(function (a, b) {
    return b[1] - a[1];
  });
  return {
    users,
    leaderBoard,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
