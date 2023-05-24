import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    }).then((question) => dispatch(addQuestion(question)));
  };
}

export function receiveQuestions(questions, users) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
    users,
  };
}

function answerQuestion({ qid, authedUser, answer, users }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
    users,
  };
}

export function handleQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info));

    return saveQuestionAnswer(info).catch((e) => {
      dispatch(answerQuestion(info));
      alert("The was an error answering the question. Try again.");
    });
  };
}
