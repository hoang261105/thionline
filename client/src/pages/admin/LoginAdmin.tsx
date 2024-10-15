import { useState } from "react";
import { Admin } from "../../interface/admin";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<Admin>({
    email: "",
    password: "",
  });

  const account = {
    email: "admin123@gmail.com",
    password: "admin123",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputValue.email === account.email &&
      inputValue.password === account.password
    ) {
      alert("Đăng nhập thành công");
      setTimeout(() => {
        navigate("/adminHome");
      }, 300);
    } else {
      alert("Tên tài khoản hoặc mật khẩu không đúng");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="vh-100 w-full">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4 flex items-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
                alt=""
                className="w-36 h-36"
              />
              <span className="h1 fw-bold mb-0">Thi online</span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: 1 }}
                >
                  Đăng nhập
                </h3>
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example18">
                    Email
                  </label>
                  <input
                    type="email"
                    id="form2Example18"
                    name="email"
                    value={inputValue.email}
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example28">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    value={inputValue.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="pt-1 mb-4">
                  <button
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
                <p className="small mb-5 pb-lg-2">
                  <a className="text-muted" href="#!">
                    Quên mật khẩu?
                  </a>
                </p>
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <a href="#!" className="link-info">
                    Đăng ký tại đây
                  </a>
                </p>
              </form>
            </div>
          </div>

          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://file.unica.vn/storage/fc2ee9cfd8f54fd092257c83fa8d328ec9fbcefa/cong-cu-tao-de-thi-online.jpeg"
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
