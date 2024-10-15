import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExam,
  deleteExam,
  getAllExam,
  updateExam,
} from "../../services/admin/exam.service";
import { AddExam, Exam } from "../../interface/admin";
import Menu from "../../components/admin/Menu";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

export default function AdminExam() {
  const [examDelete, setExamDelete] = useState<Exam | null>(null);
  const examState = useSelector((state: any) => state.exams.exam);
  const { idLesson } = useParams();
  const [image, setImage] = useState<string>("");
  const dispatch = useDispatch();

  const handleClick = (id: number, exam: Exam) => {
    navigate(`/adminQues/${exam.nameLesson}/${id}`);
  };

  useEffect(() => {
    if (idLesson) {
      dispatch(getAllExam(parseInt(idLesson)));
    }
  }, [dispatch]);

  const navigate = useNavigate();
  const { subject } = useParams();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = (exam: Exam) => {
    setExamEdit(exam);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  // Hàm thêm đề thi
  const [inputValue, setInputValue] = useState<AddExam>({
    nameLesson: "",
    describe: "",
    image: "",
  });

  const [error, setError] = useState({
    nameLesson: "",
    describe: "",
  });

  // Hàm xóa đề thi
  const handleDelete = async (id: number) => {
    await dispatch(deleteExam(id));
    setExamDelete(null);
    await dispatch(getAllExam());
  };

  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.nameLesson) {
      error.nameLesson = "Tên đề thi không được để trống";
      valid = false;
    } else {
      error.nameLesson = "";
    }

    if (!inputValue.describe) {
      error.describe = "Vui lòng nhập mô tả";
      valid = false;
    } else {
      error.describe = "";
    }

    setError({ ...error });

    if (valid) {
      const newExam = {
        idLesson: idLesson,
        nameLesson: inputValue.nameLesson,
        describe: inputValue.describe,
        image: inputValue.image,
        dateAdd: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        examTurn: 0,
      };
      await dispatch(addExam(newExam));
      setShow(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleUploadChange = (e: any) => {
    let image: any = e.target.files[0];
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(image);
        setInputValue({
          ...inputValue,
          image: url,
        });
      });
    });
  };

  // Hàm cập nhật đề thi
  const [examEdit, setExamEdit] = useState<Exam | null>(null);
  const handleEdit = async () => {
    let valid = true;
    if (!examEdit?.nameLesson) {
      error.nameLesson = "Tên đề thi không được để trống";
      valid = false;
    } else {
      error.nameLesson = "";
    }

    if (!examEdit?.describe) {
      error.describe = "Vui lòng nhập mô tả";
      valid = false;
    } else {
      error.describe = "";
    }
    setError({ ...error });

    if (valid && examEdit) {
      const updatedExam = {
        id: examEdit.id,
        idLesson: idLesson,
        nameLesson: examEdit.nameLesson,
        describe: examEdit.describe,
        dateAdd: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        examTurn: 0,
        level: examEdit.level,
      };
      await dispatch(updateExam(updatedExam));
      setShowEdit(false);
    }
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (examEdit) {
      setExamEdit({
        ...examEdit,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <>
      <Menu />

      <div className="main-content">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Thi online</span>
              <h2>Quản lí đề thi</h2>
            </div>
            <div className="addSubject">
              <Button variant="primary" onClick={handleShow}>
                + Thêm đề thi
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm đề thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Tên đề thi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên đề thi"
                        name="nameLesson"
                        value={inputValue.nameLesson}
                        onChange={handleChange}
                      />
                      {error.nameLesson && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameLesson}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={inputValue.describe}
                        onChange={handleChange}
                      />
                      {error.describe && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.describe}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Hình ảnh</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handleUploadChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleAdd}>
                    Thêm đề thi
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Modal sửa đề thi */}
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Sửa đề thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Sửa đề thi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên đề thi"
                        name="nameLesson"
                        value={examEdit?.nameLesson || ""}
                        onChange={handleExamChange}
                      />
                      {error.nameLesson && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameLesson}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={examEdit?.describe || ""}
                        onChange={handleExamChange}
                      />
                      {error.describe && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.describe}
                        </span>
                      )}
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    Cập nhật
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="user-info">
            <div className="sort">
              <Form.Select aria-label="Default select example">
                <option>Sắp xếp theo</option>
                <option value="1">Ngày tạo</option>
                <option value="2">Từ A-Z</option>
                <option value="3">Từ Z-A</option>
                <option value="4">Độ khó</option>
                <option value="5">Lượt thi nhiều nhất</option>
                <option value="6">Lượt thi ít nhất</option>
              </Form.Select>
            </div>
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input type="text" placeholder="Tìm kiếm ở đây" />
            </div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/005/791/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="table-wrapper">
          <h3 className="main-title">Bảng đề thi của {subject}</h3> <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên chương</th>
                  <th>Ngày tạo</th>
                  <th>Lượt thi</th>
                  <th>Mô tả</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {examState.map((exam: Exam, index: number) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <a href="" onClick={() => handleClick(exam.id, exam)}>
                        {exam.nameLesson}
                      </a>
                    </td>
                    <td>{exam.dateAdd}</td>
                    <td>{exam.examTurn}</td>
                    <td>{exam.describe}</td>
                    <td className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(exam)}
                      >
                        Sửa
                      </Button>
                      <button
                        className="btn btn-danger"
                        onClick={() => setExamDelete(exam)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {examDelete && (
              <div className="overlay">
                <div className="modal-custom">
                  <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i
                      className="fas fa-xmark"
                      onClick={() => setExamDelete(null)}
                    />
                  </div>
                  <div className="modal-body-custom">
                    <p>Bạn chắc chắn muốn xóa {examDelete?.nameLesson}?</p>
                  </div>
                  <div className="modal-footer-footer">
                    <button
                      className="btn btn-light"
                      onClick={() => setExamDelete(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(examDelete.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}
            <br />
            <div className="statistical">
              <div className="total-records">
                <p>Hiển thị 10/20 bản ghi</p>
              </div>
              <div className="pagination">
                <Form.Select aria-label="Default select example">
                  <option value="1">Hiển thị 10 bản ghi trên trang</option>
                  <option value="2">Hiển thị 20 bản ghi trên trang</option>
                  <option value="3">Hiển thị 50 bản ghi trên trang</option>
                  <option value="4">Hiển thị 100 bản ghi trên trang</option>
                </Form.Select>
                <div className="button">
                  <button>Pre</button>
                  <button>1</button>
                  <button>2</button>
                  <button>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
