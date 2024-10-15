import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllQues } from "../../services/admin/question.service";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { addHistory } from "../../services/user/history.service";
import { format } from "date-fns";

export default function QuestionPage() {
  const { idExam } = useParams();
  const { exam } = useParams();
  const account = JSON.parse(localStorage.getItem("account") || "[]");
  const completedTime = JSON.parse(localStorage.getItem("elapsedTime") || "[]")
  const idCourse = JSON.parse(localStorage.getItem("idCourse") || "[]");
  const idSubject = JSON.parse(localStorage.getItem("idSubject") || "[]");
  const score = JSON.parse(localStorage.getItem("score") || "[]");
  const dispatch = useDispatch();
  const quesState = useSelector((state: any) => state.questions.ques);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [answers, setAnswers] = useState<Array<string | null>>(
    Array(quesState.length).fill(null)
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (idExam) {
      dispatch(getAllQues(parseInt(idExam)));
      const startTime = new Date().getTime();
      localStorage.setItem("startTime", JSON.stringify(startTime));
    }
  }, [dispatch, idExam]);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTimeUp = () => {
    Swal.fire({
      title: "Hết giờ làm bài!",
      text: "Bạn sẽ được chuyển sang trang kết quả.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      navigate(`/result/${exam}/${idExam}`);
    });
  };

  const handlePreQues = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNextQues = () => {
    if (questionIndex < quesState.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async () => {
    const startTime = JSON.parse(localStorage.getItem("startTime") || "0");
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    localStorage.setItem("elapsedTime", JSON.stringify(elapsedTime));
    console.log(1200 - timeLeft);

    Swal.fire({
      title: "Nộp bài thành công!",
      text: "Bạn sẽ được chuyển sang trang kết quả.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate(`/result/${exam}/${idExam}`);
    });

    const newResult = {
      idUser: account.id,
      idExam: Number(idExam),
      idCourse: idCourse,
      idSubject: idSubject,
      score: score,
      timeCompleted: formatTime(completedTime),
      date: format(new Date(), "dd/MM/yyyy")
    };
    await dispatch(addHistory(newResult))
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="header-exam">
        <div className="logo-header">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
            alt=""
          />
          <p>OnlineTest</p>
        </div>
        <div className="header-menu">
          <button
            className="material-symbols-outlined"
            style={{
              fontSize: 40,
              backgroundColor: "#FCBA2C",
              border: "#FCBA2C",
            }}
            id="exit"
          >
            exit_to_app
          </button>
        </div>
      </div>
      <section className="main-menu">
        {/* left */}
        <div className="menu-left">
          <div className="avt" id="infoAcc">
            <img src={account.image} alt="" />
            <p>{account.name}</p>
          </div>
          <div className="time">
            <span
              style={{ fontSize: 60 }}
              className="material-symbols-outlined"
            >
              timer
            </span>
            <div id="countdown">{formatTime(timeLeft)}</div>
          </div>
        </div>
        {/* left */}
        {/* mid */}
        <div className="menu-mid">
          {quesState.length > 0 && (
            <>
              <div className="question">
                <h1 id="numberquestion" style={{ marginLeft: "-500px" }}>
                  Câu {questionIndex + 1}
                </h1>
                <span id="questionName">
                  {quesState[questionIndex].nameQues}
                </span>
              </div>
              <form className="answer">
                {quesState[questionIndex].options.map(
                  (option: string, optIndex: number) => (
                    <div key={optIndex} className="answer1">
                      <input
                        name={`answer-${questionIndex}`}
                        type="radio"
                        id={`answer-${questionIndex}-${optIndex}`}
                        checked={answers[questionIndex] === option}
                        onChange={() => handleAnswerChange(option)}
                      />
                      <p>{option}</p>
                    </div>
                  )
                )}
              </form>
            </>
          )}
          <div className="button-menu">
            <button className="pev" id="pev" onClick={handlePreQues}>
              <h4>Câu trước</h4>
            </button>
            <button className="next" id="next" onClick={handleNextQues}>
              <h4>Câu sau</h4>
            </button>
          </div>
        </div>
        {/* mid */}
        {/* right */}
        <div className="menu-right">
          {quesState.map((item: any, index: number) => {
            const buttonClass = answers[index] !== null ? "answered" : "";
            return (
              <button
                key={index}
                className={`c question-button ${buttonClass}`}
                onClick={() => setQuestionIndex(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="submit-menu" onClick={handleShowModal}>
            <a
              href="#"
              style={{ fontSize: 18, textDecoration: "none", color: "black" }}
              onClick={handleShowModal}
            >
              Nộp bài
            </a>
          </button>
        </div>
        {/* right */}
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận nộp bài</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn nộp bài không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Nộp bài
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
