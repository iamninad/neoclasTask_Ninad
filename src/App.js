import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useState } from "react";
import "./App.css";
import { questionIds } from "./data";

function App() {
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionIds[questionId]}`
    )
      .then((res) => res.json())
      .then((json) => {
        setQuestion(json[0].Question);
      });
  }, [questionId]);

  const loadPrevious = () => {
    if (questionId > 0) {
      setQuestionId((prevState) => prevState - 1);
    }
  };

  const loadNext = () => {
    if (questionId < questionIds.length - 1) {
      setQuestionId((prevState) => prevState + 1);
    }
  };

  return (
    <div className="App">
      {question !== "" ? (
        <div>
          <header className="question_header">Question {questionId + 1}</header>
          <div className="question_wrapper">
            <p>
              <MathJaxContext>
                <MathJax>{question}</MathJax>
              </MathJaxContext>
            </p>
          </div>
          <div className="control-btns">
            <button className="prev_btn" onClick={() => loadPrevious()}>
              Previous
            </button>
            <button className="next_btn" onClick={() => loadNext()}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
