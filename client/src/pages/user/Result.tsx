import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllQues } from "../../services/admin/question.service";
import { useNavigate, useParams } from "react-router-dom";
import { Question } from "../../interface/admin";

export default function Result() {
  const answer = JSON.parse(localStorage.getItem("answers") || "[]");
  const completedTime = JSON.parse(localStorage.getItem("elapsedTime") || "[]")
  const { idExam } = useParams();
  const quesState = useSelector((state: any) => state.questions.ques);
  const { exam } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (idExam) {
      dispatch(getAllQues(parseInt(idExam)));
    }
  }, [dispatch, idExam]);

  useEffect(() => {
    if (quesState.length > 0) {
      const correctAns = quesState.map((ques: Question) => ques.answer);
      setCorrectAnswers(correctAns);

      // Calculate score
      let correctCount = 0;
      correctAns.forEach((ans: any, index: number) => {
        if (ans === answer[index]) {
          correctCount++;
        }
      });
      setScore(correctCount);
    }
  }, [quesState, answer]);
  localStorage.setItem("score", JSON.stringify(score*10/quesState.length))

  const handlePrevExam = () => {
    navigate(`/questionPage/${exam}/${idExam}`)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <Header />
      <section className="section">
        <div className="left-container">
          <div className="result">
            <div className="mark" id="mark">
              <h2>ĐIỂM CỦA BẠN</h2>
              <b>
                {score}/{quesState.length}
              </b>
              <br />
              <p>Thời gian hoàn thành: {formatTime(completedTime)}</p>
            </div>
            <div className="info" id="infoExam">
              <h1>{exam}</h1>
              <div className="quantity">
                <div className="exam-turn">
                  <i className="fa-regular fa-calendar-check"></i>
                  <span>2930 lượt thi</span>
                </div>
                <div className="questions">
                  <i className="fa-regular fa-circle-question"></i>
                  <span>{quesState.length} câu hỏi</span>
                </div>
                <div className="time">
                  <i className="fa-regular fa-clock"></i>
                  <span>20 phút</span>
                </div>
              </div>

              <div className="button">
                <a href="" onClick={handlePrevExam}>
                  <button>
                    Thi lại <i className="fa-solid fa-rotate-left"></i>
                  </button>
                </a>
                <a href="./Subjects.html">
                  <button>
                    Bài tiếp theo <i className="fa-solid fa-forward"></i>
                  </button>
                </a>
              </div>
            </div>
            <div className="right-container">
              {quesState.map((ques: any, index: number) => (
                <div
                  key={index}
                  className={`number ${
                    answer[index] === correctAnswers[index]
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          <br />
          <hr />
          <br />
        </div>
      </section>
      <div className="num-questions">
        {quesState.map((ques: any, index: number) => (
          <div key={index} className="question" id="questionAnswer">
            <b id="numberquestion">
              <h2>Câu {index + 1}:</h2>
            </b>
            <p id="questionName">
              <b>{ques.nameQues}</b>
            </p>
            <form className="radio" id="answerForm">
              {ques.options.map((option: string, optIndex: number) => (
                <div
                  key={optIndex}
                  className={`answer1 ${
                    option === correctAnswers[index]
                      ? "correct-answer"
                      : option === answer[index]
                      ? "incorrect-answer"
                      : ""
                  }`}
                >
                  <input
                    name={`answer-${index}`}
                    type="radio"
                    disabled
                    checked={answer[index] === option}
                  />
                  <p id={`answer-${index}-${optIndex}`}>{option}</p>
                </div>
              ))}
            </form>
            <div className="reason">
              <p>GIẢI THÍCH</p>
              <p id="answer5">Chọn {ques.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
