import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    const confirmLogOut = confirm("Bạn có chắc chắn đăng xuất không?");
    if (confirmLogOut) {
      navigate("/logout");
    }
  };
  return (
    <div className="sidebar">
      <div className="logo-container">
        <h2>ADMIN</h2> <br />
        <ul className="menu">
          <li className="active">
            <NavLink to={"/adminHome"}>
              <i className="fas fa-tachometer-alt"></i>
              <span>Trang chủ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/adminUser"}>
              <i className="fas fa-user"></i>
              <span>Quản lí tài khoản</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/adminCourse"}>
              <i className="fa-solid fa-book"></i>
              <span>Quản lí khóa học</span>
            </NavLink>
          </li>
          <li>
            <a href="">
              <i className="fas fa-chart-bar"></i>
              <span>Phân tích</span>
            </a>
          </li>

          <li>
            <a href="">
              <i className="fas fa-question-circle"></i>
              <span>Câu hỏi</span>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fas fa-cog"></i>
              <span>Cài đặt</span>
            </a>
          </li>
          <li className="logout">
            <a onClick={handleLogOut} href="">
              <i className="fas fa-sign-out-alt"></i>
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
