import React, { useEffect, useState } from "react";
import { Users } from "../interface/user";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAllUser } from "../services/admin/user.service";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function Signup() {
  const [user, setUser] = useState<Users>({
    id: Math.ceil(Math.random() * 10000),
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: any) => state.users.user);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    console.log(123456);
    console.log(user);

    e.preventDefault();
    let valid = true;
    if (!user.name) {
      error.name = "Tên không được để trống";
      valid = false;
    } else {
      error.name = "";
      valid = true;
    }
    if (!user.email) {
      error.email = "Email không được để trống";
      valid = false;
    } else if (!validateEmail(user.email)) {
      error.email = "Email không hợp lệ";
      valid = false;
    } else if (users.some((existUser: any) => existUser.email === user.email)) {
      error.email = "Email đã tồn tại";
      valid = false;
    } else {
      error.email = "";
      valid = true;
    }
    console.log(users);

    if (!user.password) {
      error.password = "Mật khẩu không được để trống";
      valid = false;
    } else {
      error.password = "";
      valid = true;
    }

    if (!user.confirmPassword) {
      error.confirmPassword = "Xác nhận mật khẩu không được để trống";
      valid = false;
    } else if (user.password !== user.confirmPassword) {
      error.confirmPassword = "Mật khẩu không khớp";
      valid = false;
    } else {
      error.confirmPassword = "";
      valid = true;
    }

    setError({ ...error });

    if (valid) {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        status: 0,
        image:
          "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        address: "",
      };
      dispatch(addUser(newUser));
      navigate("/login");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Đăng ký
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div
                          data-mdb-input-init=""
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Tên tài khoản
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={user.name}
                            id="form3Example1c"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {error.name && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.name}
                        </span>
                      )}
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div
                          data-mdb-input-init=""
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            id="form3Example3c"
                            name="email"
                            value={user.email}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {error.email && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.email}
                        </span>
                      )}
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div
                          data-mdb-input-init=""
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={user.password}
                            id="form3Example4c"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {error.password && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.password}
                        </span>
                      )}
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div
                          data-mdb-input-init=""
                          className="form-outline flex-fill mb-0 "
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Xác nhận mật khẩu
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            id="form3Example4cd"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <span style={{ color: "red", fontSize: 14 }}>
                        {error.confirmPassword}
                      </span>
                      <br /> <br />
                      <div className="form-check d-flex justify-content-center mb-5">
                        <span>
                          Bạn đã có tài khoản ?{" "}
                          <NavLink to={"/login"} style={{ color: "red" }}>
                            Đăng nhập tại đây
                          </NavLink>
                        </span>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-primary btn-lg"
                        >
                          Đăng ký
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
