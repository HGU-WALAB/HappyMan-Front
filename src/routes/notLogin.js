import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Main from "../pages/Main/Main";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";
import Application from "../pages/Application";
import ProgramDetail from "../pages/ProgramDetail";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";
import Approve from "pages/Login/UserApprove";
import LoginIng from "components/login/LoginIng";
import MyPageLayout from "pages/Mypage/MyPageLayout";
import ManageProgram from "pages/Admin/ManageProgram";
import AdminProgramDetail from "pages/AdminProgramDetail";
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";

function Admin() {
    return (
        <>
            <Routes>
                <Route path={process.env.REACT_APP_DEFAULT_URL} element={<Main />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "main"} element={<Main />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "sign-in"} element={<SignIn />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "approve"} element={<Approve />} />
                {/* 임시로 로그인 프로세스 파일 추가 */}
                <Route path={process.env.REACT_APP_DEFAULT_URL + "login-ing"} element={<LoginIng />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "mypage"} element={<MyPageLayout />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "admin/program"} element={<ManageProgram />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "admin/program/detail/:id"} element={<AdminProgramDetail />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
                {/* <Route path={process.env.REACT_APP_DEFAULT_URL + "admin/*"} element={<Navigate replace to="/swap/" />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "mypage"} element={<Navigate replace to="/swap/" />} /> */}
                <Route path={process.env.REACT_APP_DEFAULT_URL + "program/:id/application"} element={<Application />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "program/:id"} element={<ProgramDetail />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "terms-and-conditions"} element={<Terms />} />
                <Route path={process.env.REACT_APP_DEFAULT_URL + "personal-information"} element={<PersonalInfo />} />
            </Routes>
        </>
    );
}

export default Admin;
