import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../services/admin/exam.service";
import { Exam } from "../../interface/admin";
import { getAllQues } from "../../services/admin/question.service";

export default function ExamDetail() {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account") || "null")
  );
  const { id } = useParams(); // Get the exam ID from the URL parameters
  const examDetail = useSelector((state: any) => state.exams.examDetail);
  const quesState = useSelector((state: any) => state.questions.ques);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getExamById(parseInt(id)));
      dispatch(getAllQues(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleClick = (id: number, exam: Exam) => {
    if (account) {
      navigate(`/questionPage/${exam.nameLesson}/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <main className="main-backgroup">
        <div className="main-subject">
          <h1 id="title-exam">Thông tin đề thi</h1>
          {examDetail ? (
            <div className="perform">
              <div className="number-exam">
                <div id="number-exam">
                  Mã đề: {Math.ceil(Math.random() * 10000)}
                </div>
              </div>
              <div className="question-content">
                <div className="Info-detail">
                  <img id="img-detail" src={examDetail.image} alt="" />
                  <div className="Information-test">
                    <h2 id="nameElement">{examDetail.nameLesson}</h2>
                    <div className="information">
                      <div className="access">
                        <i className="fas fa-calendar-days" />
                        <span id="sequenceElement">
                          Lượt thi: {examDetail.examTurn}
                        </span>
                      </div>
                      <div className="access">
                        <i className="fa-solid fa-circle-question" />
                        <span id="numQues">{quesState.length} câu hỏi</span>
                      </div>
                      <div className="access">
                        <i className="fas fa-clock" />
                        <span>20 phút</span>
                      </div>
                    </div>
                    <div className="star">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <a
                      id="indexElement"
                      href=""
                      onClick={() => handleClick(examDetail.id, examDetail)}
                    >
                      <div className="start-exam">
                        <i className="fas fa-user-clock" />
                        <b>Bắt Đầu Làm Bài</b>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
      <section className="coment">
        <div id="comment-1" className="coment1">
          <img id="imgAccount" src="" alt="" />
          <p id="nameAccount" />
        </div>
        <div id="comment-2" className="coment2">
          <textarea
            name=""
            id="input-comment"
            cols={100}
            placeholder="bình luận...."
            defaultValue={""}
          />
          <button id="oldComment">Bình luận</button>
          <button id="updateComment">Cập nhật</button>
        </div>
        <button className="coment3">
          <p>Tất cả bình luận</p>
          <span id="upAndDown" className="material-symbols-outlined"></span>
        </button>
        <div id="displayComment" className="coment4" />
      </section>
      <Footer />
    </div>
  );
}
