import React, { useState } from "react";
import { EditProfiles } from "../../interface/user";
import { useDispatch } from "react-redux";
import { updateUser } from "../../services/admin/user.service";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const account = JSON.parse(localStorage.getItem("account") || "[]");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState<EditProfiles>({
    name: account.name || "",
    email: account.email || "",
    address: account.address || "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!inputValue.name) {
      error.name = "Tên tài khoản không được để trống";
      valid = false;
    } else {
      error.name = "";
    }

    if (!inputValue.email) {
      error.email = "Email không được để trống";
      valid = false;
    } else {
      error.email = "";
    }

    setError({ ...error });

    if (valid) {
      dispatch(updateUser({ ...account, ...inputValue }))
        .then(() => navigate("/profile"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  return (
    <div>
      <section className="h-100 bg-dark">
        <form id="editProfile" action="#" onSubmit={handleSubmit}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid"
                        alt="Phone image"
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">Sửa thông tin</h3>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="form3Example1n1"
                              >
                                Tên tài khoản
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                value={inputValue.name}
                                name="name"
                                style={{ width: 640 }}
                                placeholder="Nhập tên"
                                onChange={handleChange}
                              />
                              {error.name && (
                                <div
                                  id="errorName"
                                  style={{ color: "red" }}
                                >
                                  <span>{error.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form3Example8">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="Nhập email"
                            name="email"
                            value={inputValue.email}
                            onChange={handleChange}
                          />
                          {error.email && (
                            <div
                              id="errorName"
                              style={{ color: "red" }}
                            >
                              <span>{error.email}</span>
                            </div>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form3Example9">
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="myAddress"
                            name="address"
                            value={inputValue.address}
                            placeholder="Nhập địa chỉ"
                            onChange={handleChange}
                          />
                          <div
                            id="errorAddress"
                            style={{ color: "red", display: "none" }}
                          >
                            <span>Địa chỉ không được để trống</span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end pt-3">
                          <button
                            type="submit"
                            className="btn btn-warning btn-lg ms-2"
                          >
                            Lưu thông tin
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
