import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import "assets/scss/theme.scss";
import AddProgram from "../pages/Program/AddProgram";
import AddSurvey from "../pages/AddSurvey";
import ManageApplication from "../pages/ManageApplication";
import ManageApplicationDetail from "../pages/ManageApplicationDetail";
import ManageSurvey from "../pages/ManageSurvey";
import ManageSurveyDetail from "../pages/ManageSurveyDetail";
import ManageStudent from "../pages/ManageStudent";
import ManageUser from "../pages/ManageUser";
import ManageInstructor from "../pages/ManageInstructor";
import ManageProgram from "../pages/Admin/ManageProgram";
import AdminProgramDetail from "../pages/AdminProgramDetail";
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
import AdminMain from "../pages/Admin/ManageProgram";
import AddTemplate from "../pages/AddTemplate";
import LoginIng from "components/login/LoginIng";

import Application from "../pages/Application";
import Survey from "../pages/Survey";
import ProgramDetail from "../pages/ProgramDetail";
import MyPageLayout from "../pages/Mypage/MyPageLayout";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";

// 관리자 페이지의 Router 모음
// 페이지가 많으므로 공통/고유 페이지 구분, 각주로 표기할 것

function Admin() {
    return (
        <Routes>
            {/* 전 라우터 공통 :  */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "/"} element={<Main />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "main"} element={<Main />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "login-ing"} element={<LoginIng />} />

            {/* 로그인 상태 */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id"} element={<ProgramDetail />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/application"} element={<Application />} />

            {/* Admin 고유 */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/addprogram"} element={<AddProgram />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/addtemplate"} element={<AddTemplate />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/addsurvey"} element={<AddSurvey />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin"} element={<AdminMain />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/application"} element={<ManageApplication />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/application/detail/:id"} element={<ManageApplicationDetail />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/survey"} element={<ManageSurvey />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/survey/detail/:id"} element={<ManageSurveyDetail />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/student"} element={<ManageStudent />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/instructor"} element={<ManageInstructor />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/user"} element={<ManageUser />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program"} element={<ManageProgram />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id"} element={<AdminProgramDetail />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/survey"} element={<Survey />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<MyPageLayout />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"} element={<Terms />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "personal-information"} element={<PersonalInfo />} />
        </Routes>
    );
}

export default Admin;
