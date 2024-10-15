export default function Footer() {
  return (
    <>
      {/* footer start */}
      <footer className="footer" style={{ marginTop: 30 }}>
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <img
                id="img"
                src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
                alt=""
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
              <h1 style={{ fontWeight: 500 }}>
                OnlineTest - Luyện thi miễn phí.
              </h1>
            </div>
            <p>
              OnlineTest là một hệ thống thi trắc nghiệm trực tuyến linh hoạt và
              tiện ích. Người dùng có thể tạo và tham gia các bài kiểm tra. Hệ
              thống cung cấp các loại câu hỏi đa dạng và tính năng tùy chỉnh,
              cùng với công cụ quản lý. OnlineTest là giải pháp hiệu quả để ôn
              tập và theo dõi quá trình học tập.
            </p>
            <div className="flogo-list">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
          <div className="footer-right">
            <table className="ftable">
              <tbody>
                <tr className="ftable-items">
                  <th style={{ textAlign: "center" }}>Về OnlineTest</th>
                  <th style={{ textAlign: "center" }}>Hỗ trợ</th>
                  <th style={{ textAlign: "center" }}>Thông tin khác</th>
                </tr>
                <tr className="ftable-items">
                  <td className="ftable-item">
                    <i className="fa-solid fa-building" /> Group 3
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-circle-info" /> Điều khoản
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-blog" /> Group 3 blog
                  </td>
                </tr>
                <tr className="ftable-items">
                  <td className="ftable-item">
                    <i className="fa-solid fa-users" /> Tuyển dụng
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-shield-halved" /> Bảo mật
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-circle-question" /> Thông tin đề
                    thi
                  </td>
                </tr>
                <tr className="ftable-items">
                  <td className="ftable-item">
                    <i className="fa-solid fa-shop" /> Group 3 Mall
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-truck-fast" /> Dịch vụ
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-handshake" /> Cam kết
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="end">
          <div className="end-left">
            <span>@ 2024 OnlineTest. Creat with</span>
            <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
            <span>by Group 3</span>
          </div>
          <div className="end-right">
            <span>Trao tri thức - Nhận niềm tin!</span>
          </div>
        </div>
      </footer>
      {/* footer end */}
    </>
  );
}
