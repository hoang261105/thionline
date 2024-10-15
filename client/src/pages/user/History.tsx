import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";

export default function History() {
  const id = JSON.parse(localStorage.getItem("account") || "{}");
  const [history, setHistory] = useState([]);
  console.log(history);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: historyData } = await axios.get(
          `http://localhost:9000/history?idUser=${id.id}`
        );

        const historyWithDetails: any = await Promise.all(
          historyData.map(async (data: any) => {
            const [examResponse, subjectResponse, courseResponse] =
              await Promise.all([
                axios.get(`http://localhost:9000/exam/${data.idExam}`),
                axios.get(`http://localhost:9000/lesson/${data.idSubject}`),
                axios.get(`http://localhost:9000/course/${data.idCourse}`),
              ]);

            return {
              ...data,
              nameCourse: courseResponse.data.nameCourse,
              nameSubject: subjectResponse.data.nameSubject,
              nameExam: examResponse.data.nameLesson,
            };
          })
        );

        setHistory(historyWithDetails);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };


  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section
        style={{
          display: "flex",
          marginTop: 50,
          width: "100%",
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <div className="profile-left">
          <div className="left1">
            <span className="material-symbols-outlined"> manage_accounts </span>
            <NavLink to={"/profile"} style={{ color: "black" }}>
              <p>Thông tin cá nhân</p>
            </NavLink>
          </div>
          <div className="left1">
            <span className="material-symbols-outlined"> history </span>
            <p>Lịch sử làm bài</p>
          </div>
        </div>
        <div
          className="container-content-admin"
          style={{ backgroundColor: "#f5f5f5", width: "70%", borderRadius: 10 }}
        >
          <div className="attendance">
            <div className="attendance-list">
              <h1 className="manage-title">Lịch sử làm bài</h1>
              <table className="tablex">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>STT</th>
                    <th style={{ width: 80 }}>Khóa thi</th>
                    <th style={{ width: 80 }}>Môn thi</th>
                    <th style={{ width: 80 }}>Đề thi</th>
                    <th style={{ width: 80 }}>Điểm</th>
                    <th style={{ width: 80 }}>Thời gian</th>
                    <th style={{ width: 100 }}>Ngày làm</th>
                  </tr>
                </thead>
                <tbody id="historyList">
                  {history.map((item: any, index: number) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nameCourse}</td>
                      <td>{item.nameSubject}</td>
                      <td>{item.nameExam}</td>
                      <td>{item.score}</td>
                      <td>{item.timeCompleted}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* body center content */}
        </div>
      </section>
      <Footer />
    </div>
  );
}
