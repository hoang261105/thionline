import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllExam, searchExam } from "../../services/admin/exam.service";
import { Exam } from "../../interface/admin";
import Footer from "../../components/Footer";

export default function Exams() {
  const { subject } = useParams();
  const { idLesson } = useParams();
  const examState = useSelector((state: any) => state.exams.exam);
  console.log(examState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (idLesson) {
      dispatch(getAllExam(parseInt(idLesson)));
    }
  }, [dispatch]);

  const handleClick = (id: number, exam: Exam) => {
    navigate(`/examDetail/${exam.nameLesson}/${id}`);
  };

  // Hàm tìm kiếm đề thi
  const [search, setSearch] = useState<string>("");
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    await dispatch(searchExam(e.target.value));
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
      <div
        className="search"
        style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}
      >
        <input
          type="search"
          name="search"
          value={search}
          style={{
            width: 300,
            height: 40,
            border: "0.5px solid black",
            borderRadius: 5,
            fontSize: 20,
          }}
          placeholder="Tìm kiếm đề thi"
          onChange={handleSearch}
        />
      </div>
      <main className="main">
        <section className="subject-category">
          {/* render môn toán  */}
          <div className="Informartion-exam">
            <h1 className="title-category" style={{ fontSize: 30 }}>
              Các đề thi của {subject}
            </h1>
            <div className="subject-list" id="mathList">
              {examState.map((exam: Exam) => (
                <a href="" onClick={() => handleClick(exam.id, exam)}>
                  <div className="card subject-item" style={{ width: "18rem" }}>
                    <img src={exam.image} className="card-img-top" alt="..." />
                    <h3 style={{ textAlign: "center", color: "red" }}>
                      {exam.nameLesson}
                    </h3>
                    <p style={{ textAlign: "center", color: "green" }}>
                      {exam.describe}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
