import { Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import AdminHome from "./pages/admin/AdminHome";
import AdminUser from "./pages/admin/AdminUser";
import AdminCourse from "./pages/admin/AdminCourse";
import "./scss/admin.scss";
import "./css/home.css";
import "./css/exam.css";
import "./css/profile.css";
import "./css/questionPage.css";
import "./css/result.css";
import "./css/history.css"
import AdminSubject from "./pages/admin/AdminSubject";
import AdminExam from "./pages/admin/AdminExam";
import AdminQues from "./pages/admin/AdminQues";
import Home from "./pages/user/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Subjects from "./pages/user/Subject";
import Exams from "./pages/user/Exam";
import ExamDetail from "./pages/user/ExamDetail";
import Profile from "./pages/user/Profile";
import QuestionPage from "./pages/user/QuestionPage";
import Result from "./pages/user/Result";
import EditProfile from "./pages/user/EditProfile";
import History from "./pages/user/History";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminUser" element={<AdminUser />} />
        <Route path="/adminCourse" element={<AdminCourse />} />
        <Route path="/adminSubject/:course/:id" element={<AdminSubject />} />
        <Route path="/adminExam/:subject/:idLesson" element={<AdminExam />} />
        <Route path="/adminQues/:chapter/:idExam" element={<AdminQues />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subject/:course/:id" element={<Subjects />} />
        <Route path="/exam/:subject/:idLesson" element={<Exams />} />
        <Route path="/examDetail/:subject/:id" element={<ExamDetail />} />
        <Route path="/questionPage/:exam/:idExam" element={<QuestionPage />} />
        <Route path="/result/:exam/:idExam" element={<Result/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/> 
        <Route path="/history" element={<History/>}/>
      </Routes>
    </>
  );
}
