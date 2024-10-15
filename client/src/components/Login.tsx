import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Account } from "../interface/user";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../services/admin/user.service";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function Login() {
  const users = useSelector((state: any) => state.users.user);
  console.log(users);
  const dispatch = useDispatch();
  const [login, setLogin] = useState<Account>({
    id: 0,
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(login);

    let valid = true;

    if (!login.email) {
      setError((prevError) => ({
        ...prevError,
        email: "Email không được để trống",
      }));
      valid = false;
    } else if (!validateEmail(login.email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Email không hợp lệ",
      }));
      valid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        email: "",
      }));
    }

    if (!login.password) {
      setError((prevError) => ({
        ...prevError,
        password: "Mật khẩu không được để trống",
      }));
      valid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        password: "",
      }));
    }

    if (valid && users.length > 0) {
      const findUser = users.find(
        (item: any) =>
          item.email === login.email && item.password === login.password
      );
      console.log(findUser);

      if (findUser) {
        localStorage.setItem("account", JSON.stringify(findUser));
        alert("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/home");
        }, 300);
      } else {
        setError((prevError) => ({
          ...prevError,
          password: "Tài khoản hoặc mật khẩu không đúng",
        }));
      }
    }

    const findUserBlock = users.find((user: any) => user.status === 1);
    console.log(findUserBlock);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <section className="vh-150 w-full" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://dotnetguru.org/wp-content/uploads/2022/10/top-10-phan-mem-thi-online-hieu-qua-chat-luong.jpg"
                    alt="login form"
                    className="img-fluid h-full"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img
                          src="https://cdn2.f-cdn.com/contestentries/1258406/24810152/5aad7e30e7440_thumb900.jpg"
                          alt=""
                          className="w-40 h-40"
                        />
                        <span className="h1 fw-bold mb-0">Thi online</span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Đăng nhập tài khoản
                      </h5>
                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={login.email}
                          id="form2Example17"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                        />
                        {error.email && (
                          <span style={{ color: "red", fontSize: 14 }}>
                            {error.email}
                          </span>
                        )}
                      </div>

                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          name="password"
                          value={login.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        {error.password && (
                          <span style={{ color: "red", fontSize: 14 }}>
                            {error.password}
                          </span>
                        )}
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                      </div>
                      <a className="small text-muted" href="#!">
                        Quên mật khẩu?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Bạn chưa có tài khoản?{" "}
                        <NavLink to={"/signup"} style={{ color: "red" }}>
                          Đăng ký tại đây
                        </NavLink>
                      </p>

                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
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
