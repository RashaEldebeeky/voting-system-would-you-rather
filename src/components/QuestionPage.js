import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionPage extends Component {
  render() {
    const { id, replies } = this.props;
    return (
      <Link to={`/question/${id}`} className="question">
        <div className="question-info">
          <div>
            <div>{author} asks: </div>
            <img src={avatar} alt={`Avatar of ${author}`} className="avatar" />
            <p>Would you Rather</p>
            <p>{optionOne}</p>
            <p>{optionTwo}</p>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, tweets, users }, props) {
  const { id } = props.match.params;

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        ),
  };
}

export default connect(mapStateToProps)(QuestionPage);
