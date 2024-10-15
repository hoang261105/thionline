import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect } from "react";
import { getAllCourse } from "../../services/admin/course.service";
import { Course } from "../../interface/admin";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const courseState = useSelector((state: any) => state.courses.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(courseState);
  useEffect(() => {
    dispatch(getAllCourse());
  }, []);

  const handleClick = (id: number, course: Course) => {
    navigate(`/subject/${course.nameCourse}/${id}`);
    localStorage.setItem("idCourse", JSON.stringify(id))
  };
  return (
    <div>
      {/* header */}
      <Header />
      <br />
      <br />
      <br />
      {/* header */}
      {/* baner */}
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
      {/* baner */}
      {/* body */}
      <section className="subject-category">
        {/* render môn toán  */}
        <div className="Informartion-exam">
          <h1 className="title-category" style={{ fontSize: 30 }}>
            Các khóa luyện thi
          </h1>
          <div className="subject-list" id="mathList">
            {courseState.map((course: Course) => (
              <a href="" onClick={() => handleClick(course.id, course)}>
                <div className="card subject-item" style={{ width: "18rem" }}>
                  <img src={course.image} className="card-img-top" alt="..." />
                  <h3 style={{ textAlign: "center", color: "red" }}>
                    {course.nameCourse}
                  </h3>
                  <p style={{ textAlign: "center", color: "green" }}>
                    {course.describe}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* body */}
      {/* banner*/}
      <section className="attend-banner">
        <h1
          className="attend-title"
          style={{
            textAlign: "center",
            backgroundColor: "gold",
            width: "max-content",
            margin: "auto",
            fontWeight: 700,
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          Học tập cùng giáo viên giỏi!
        </h1>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div
            className="carousel-indicators"
            style={{ display: "flex", gap: 30 }}
          >
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
              style={{ height: 20, width: 20, borderRadius: "50%" }}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
              style={{ height: 20, width: 20, borderRadius: "50%" }}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
              style={{ height: 20, width: 20, borderRadius: "50%" }}
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://i.ytimg.com/vi/Vw6sX_a-xyM/maxresdefault.jpg"
                className="w-100"
                alt="..."
                style={{ height: 600 }}
              />
              <div
                className="carousel-caption d-none d-md-block"
                style={{ color: "white" }}
              >
                <h1
                  style={{
                    padding: 10,
                    backgroundColor: "gold",
                    borderRadius: 10,
                    width: "max-content",
                  }}
                >
                  Cô Vũ Thị Mai Phương
                </h1>
                <h3
                  style={{
                    padding: 10,
                    backgroundColor: "gold",
                    borderRadius: 10,
                    width: "80%",
                    position: "relative",
                    left: 100,
                  }}
                >
                  Nâng cao trình độ ngữ pháp cùng từ vựng!
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://mshoagiaotiep.com/uploads/images/resize/900x900/2020/08/lotrinhkhtructuyen.png"
                className="w-100"
                alt="..."
                style={{ height: 600 }}
              />
              <div
                className="carousel-caption d-none d-md-block"
                style={{ color: "white" }}
              >
                <h1
                  style={{
                    padding: 10,
                    backgroundColor: "gold",
                    borderRadius: 10,
                    width: "max-content",
                  }}
                >
                  Cô Nguyễn Minh Hoa
                </h1>
                <h3
                  style={{
                    padding: 10,
                    backgroundColor: "gold",
                    borderRadius: 10,
                    width: "80%",
                    position: "relative",
                    left: 100,
                  }}
                >
                  Kỹ năng giao tiếp linh hoạt!
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ytimg.com/vi/3uUa9-LKfcA/maxresdefault.jpg"
                className="w-100"
                alt="..."
                style={{ height: 600 }}
              />
              <div
                className="carousel-caption d-none d-md-block"
                style={{ color: "white" }}
              >
                <h1
                  style={{
                    padding: 10,
                    backgroundColor: "gold",
                    borderRadius: 10,
                    width: "max-content",
                  }}
                >
                  Thầy Lưu Huy Thưởng
                </h1>
                <h3
                  style={{
                    padding: 10,
                    backgroundColor: "gold",
                    borderRadius: 10,
                    width: "80%",
                    position: "relative",
                    left: 200,
                  }}
                >
                  Đạt giải thưởng Giáo viên Quốc Tế và Tin Học Nâng Cao
                </h3>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
        {/* banner*/}
      </section>

      <Footer />
    </div>
  );
}
