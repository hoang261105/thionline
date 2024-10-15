import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubject,
  searchSubject,
} from "../../services/admin/subject.service";
import { useNavigate, useParams } from "react-router-dom";
import { Subject } from "../../interface/admin";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Subjects() {
  const { course } = useParams();
  const { id } = useParams();
  const subjectState = useSelector((state: any) => state.subjects.subject);
  console.log(subjectState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getAllSubject(parseInt(id)));
    }
  }, [dispatch]);

  const handleClick = (id: number, subject: Subject) => {
    navigate(`/exam/${subject.nameSubject}/${id}`);
    localStorage.setItem("idSubject", JSON.stringify(id))
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <div className="baner">
        <div className="baner-left">
          <img
            src="https://eduquiz.vn/_next/image?url=%2Fassets%2Fimages%2Fhomepage%2Fbanner_user_4.png&w=3840&q=100"
            alt=""
          />
        </div>
        <div className="baner-mid-main">
          <div className="baner-mid">
            <h1 className="baner-mid-5">Công cụ ôn thi</h1>
            <div className="baner-mid-1">Trắc Nghiệm hiệu quả</div>
            <div className="baner-mid-2">
              <p>Thông qua các bài thi trắc nghiệm,</p>
              <p>công cụ sẽ giúp bạn học tập, ôn thi hiệu quả hơn, đạt điểm</p>
              <p>cao hơn.</p>
            </div>
            <div className="baner-mid-4">
              <a href="Subjects.html">
                <button className="baner-mid-3">Thi Ngay</button>
              </a>
              <div className="baner-bottom" />
            </div>
          </div>
          <div className="baner-bottom">
            <div className="baner-bottom1">
              <p>10M+</p>
              <p>Lượt truy cập</p>
            </div>
            <div className="baner-bottom1">
              <p>10K+</p>
              <p>Đề thi</p>
            </div>
            <div className="baner-bottom1">
              <p>100M+</p>
              <p>Lượt thi</p>
            </div>
          </div>
        </div>
        <div className="baner-right">
          <img
            src="https://kenh14cdn.com/2017/img-0191-1500372920465.jpg"
            alt=""
          />
        </div>
      </div>
      <main className="main">
        <section className="subject-category">
          {/* render môn toán  */}
          <div className="Informartion-exam">
            <h1 className="title-category" style={{ fontSize: 30 }}>
              Các môn thi của {course}
            </h1>
            <div className="subject-list" id="mathList">
              {subjectState.map((subject: Subject) => (
                <a href="" onClick={() => handleClick(subject.id, subject)}>
                  <div className="card subject-item" style={{ width: "18rem" }}>
                    <img
                      src={subject.image}
                      className="card-img-top"
                      alt="..."
                    />
                    <h3 style={{ textAlign: "center", color: "red" }}>
                      {subject.nameSubject}
                    </h3>
                    <p style={{ textAlign: "center", color: "green" }}>
                      {subject.describe}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <div id="horizontal" />
        {/* <nav className="nav-choice">
        <h1>Độ khó</h1>
        <ul className="ul-choice">
          <li >
            Level 1
          </li>
          <li onclick="renderExamsByLevel(2)" id="li-choice">
            Level 2
          </li>
          <li onclick="renderExamsByLevel(3)" id="li-choice">
            Level 3
          </li>
          <li onclick="renderExamsByLevel(4)" id="li-choice">
            Level 4
          </li>
          <li onclick="renderExamsByLevel(5)" id="li-choice">
            Level 5
          </li>
        </ul>
      </nav> */}
        {/* Render đề */}
        <div id="subjectList" className="list-subject" />
        {/* Render đề */}
        {/* <section className="choose-list" style={{ marginTop: 100 }}>
        <div className="next-Pages">
          <button onclick="previousPage()" type="button" className="btn">
            <ion-icon name="chevron-back-outline" />
            <span>Trang trước</span>
          </button>
          <button onclick="nextPage()" type="button" className="btn">
            <span>Trang sau</span>
            <ion-icon name="chevron-forward-outline" />
          </button>
        </div>
      </section> */}
      </main>
      <Footer />
    </div>
  );
}
