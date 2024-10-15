import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQues,
  deleteQues,
  getAllQues,
  updateQues, // Import the update action
} from "../../services/admin/question.service";
import { AddQues, Question } from "../../interface/admin";
import Menu from "../../components/admin/Menu";
import { format } from "date-fns";

export default function AdminQues() {
  const [quesDelete, setQuesDelete] = useState<Question | null>(null);
  const quesState = useSelector((state: any) => state.questions.ques);
  console.log(1111, quesState);

  const { chapter } = useParams();
  const { idExam } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (idExam) {
      dispatch(getAllQues(parseInt(idExam)));
    }
  }, [dispatch, idExam]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => {
    setShowEdit(false);
    resetData();
  };
  const handleShowEdit = (ques: Question) => {
    setQuesEdit(ques);
    setQuestion({
      nameQues: ques.nameQues,
      options: ques.options,
      answer: ques.answer,
    });
    setShowEdit(true);
  };

  // Initial state for adding and editing questions
  const [question, setQuestion] = useState<AddQues>({
    nameQues: "",
    options: ["", "", "", ""],
    answer: "",
  });
  const [error, setError] = useState({
    nameQues: "",
  });

  const resetData = () => {
    setQuestion({
      nameQues: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  const handleAdd = async () => {
    let valid = true;
    if (!question.nameQues) {
      error.nameQues = "Tên câu hỏi không được để trống";
      valid = false;
    } else {
      error.nameQues = "";
    }

    setError({ ...error });

    if (valid) {
      const newQues = {
        ...question,
        idExam: idExam,
        created_at: format(new Date(), "yyyy/MM/dd"),
      };
      await dispatch(addQues(newQues));
      setShow(false);
      resetData();
    }
  };

  const handleRadioChange = (value: string) => {
    setQuestion({ ...question, answer: value });
  };

  const handleInputChange = (index: number, value: string) => {
    const newOption = [...question.options];
    newOption[index] = value;
    setQuestion({ ...question, options: newOption });
  };

  // Handle delete question
  const handleDelete = async (id: number) => {
    await dispatch(deleteQues(id));
    setQuesDelete(null);
    if (idExam) {
      await dispatch(getAllQues(parseInt(idExam)));
    }
  };

  // Handle edit question
  const [quesEdit, setQuesEdit] = useState<Question | null>(null);
  const handleEdit = async () => {
    let valid = true;
    if (!question.nameQues) {
      error.nameQues = "Tên câu hỏi không được để trống";
      valid = false;
    } else {
      error.nameQues = "";
    }

    setError({ ...error });

    if (valid && quesEdit) {
      const updatedQues = {
        ...quesEdit,
        nameQues: question.nameQues,
        options: question.options,
        answer: question.answer,
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      };
      await dispatch(updateQues(updatedQues));
      setShowEdit(false);
      resetData();
      if (idExam) {
        await dispatch(getAllQues(parseInt(idExam)));
      }
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
              <h2>Quản lí câu hỏi</h2>
            </div>
            <div className="addSubject">
              <Button variant="primary" onClick={handleShow}>
                + Thêm câu hỏi
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập tên câu hỏi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên câu hỏi"
                        name="nameQues"
                        value={question.nameQues}
                        onChange={(e) =>
                          setQuestion({ ...question, nameQues: e.target.value })
                        }
                      />
                      {error.nameQues && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameQues}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Label>Đáp án</Form.Label>
                    {question.options.map((option, index) => (
                      <Form.Group
                        className="mb-3 flex gap-2"
                        key={index}
                        controlId={`formOption${index + 1}`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={question.answer === option}
                          onChange={(e) => handleRadioChange(e.target.value)}
                        />
                        <Form.Control
                          type="text"
                          placeholder={`Nhập đáp án ${index + 1}`}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                        />
                      </Form.Group>
                    ))}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleAdd}>
                    Thêm câu hỏi
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Form sửa câu hỏi */}
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Sửa câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Câu hỏi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên câu hỏi"
                        name="nameQues"
                        value={question.nameQues}
                        onChange={(e) =>
                          setQuestion({ ...question, nameQues: e.target.value })
                        }
                      />
                      {error.nameQues && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameQues}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Label>Đáp án</Form.Label>
                    {question.options.map((option, index) => (
                      <Form.Group
                        className="mb-3 flex gap-2"
                        key={index}
                        controlId={`formOption${index + 1}`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={question.answer === option}
                          onChange={(e) => handleRadioChange(e.target.value)}
                        />
                        <Form.Control
                          type="text"
                          placeholder={`Nhập đáp án ${index + 1}`}
                          value={option} // Add value to display current option
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                        />
                      </Form.Group>
                    ))}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    Lưu thay đổi
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="user-info">
            <div className="sort">
              <Form.Select aria-label="Default select example">
                <option>Sắp xếp theo</option>
                <option value="1">Từ A-Z</option>
                <option value="2">Từ Z-A</option>
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
          <h3 className="main-title">Bảng câu hỏi của {chapter}</h3> <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="w-16">STT</th>
                  <th>Tên câu hỏi</th>
                  <th className="w-52">Ngày thêm</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {quesState.map((question: Question, index: number) => (
                  <tr key={question.id}>
                    <td>{index + 1}</td>
                    <td>{question.nameQues}</td>
                    <td>{question.created_at}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(question)}
                      >
                        Sửa
                      </Button>
                      <button
                        className="btn btn-danger"
                        onClick={() => setQuesDelete(question)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {quesDelete && (
              <div className="overlay">
                <div className="modal-custom">
                  <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i
                      className="fas fa-xmark"
                      onClick={() => setQuesDelete(null)}
                    />
                  </div>
                  <div className="modal-body-custom">
                    <p>
                      Bạn chắc chắn muốn xóa câu hỏi {quesDelete?.nameQues}?
                    </p>
                  </div>
                  <div className="modal-footer-footer">
                    <button
                      className="btn btn-light"
                      onClick={() => setQuesDelete(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(quesDelete.id)}
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
