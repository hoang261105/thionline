import { Button, Modal } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";

export default function Profile() {
  const account = JSON.parse(localStorage.getItem("account") || "[]");
  const [image, setImage] = useState<string>(account.image);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowImageModal = () => setShowImageModal(true);
  const navigate = useNavigate()

  const handleImageChange = (e: any) => {
    let image: any = e.target.files[0];
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  }
  const handleSaveImage = async () => {
    account.image = image;
    localStorage.setItem("account", JSON.stringify(account));

    // Update db.json
    await axios.put(`http://localhost:9000/user/${account.id}`, { ...account, image });

    handleCloseImageModal();
  }

  const handleSaveChanges = () => {
    navigate("/editProfile")
    handleCloseModal(); // Sau khi lưu xong, đóng modal
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        className="profile"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="profile-left">
          <div className="left1">
            <span className="material-symbols-outlined"> manage_accounts </span>
            <p>Thông tin cá nhân</p>
          </div>

          <div className="left1">
            <span className="material-symbols-outlined"> history </span>
            <a href="/history" style={{ color: "black" }}>
              <p>Lịch sử làm bài</p>
            </a>
          </div>
        </div>

        <div className="profile-right">
          <h1 style={{ textAlign: "center" }}>Thông tin cá nhân</h1>
          <br />
          <div
            className="container-info"
            style={{ display: "flex", gap: 30 }}
            id="profile"
          >
            <div className="change-avt">
              <img src={account.image} className="profile-avt" />
              <div id="change-Avt">
                <button id="changeAvt" onClick={handleShowImageModal}>Thay đổi ảnh</button>
              </div>
            </div>
            <div className="profile-form">
              <div className="form1">
                <h2>Tên tài khoản</h2>
                <h2>{account.name}</h2>
              </div>
              <hr />
              <div className="form1">
                <h3>Email:</h3>
                <h3>{account.email}</h3>
              </div>
              <hr />
              <div className="form1">
                <h3>Địa chỉ:</h3>
                {account.address ? (
                  <h3>{account.address}</h3>
                ) : (
                  <h3>Chưa có</h3>
                )}
              </div>
              <hr />
              <div className="form-button">
                <button className="changePass" onClick={handleShowModal}>
                  <h3>Đổi thông tin</h3>
                </button>
              </div>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận thay đổi thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có chắc chắn muốn thay đổi thông tin?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Có
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showImageModal} onHide={handleCloseImageModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Thay đổi ảnh đại diện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="file" onChange={handleImageChange} name="image"/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseImageModal}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleSaveImage}>
                    Lưu
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
