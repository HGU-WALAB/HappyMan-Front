// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Main from "../pages/Main/Main";
// import "assets/scss/theme.scss";
// import AddProgram from "../pages/Program/AddProgram";
// import AddSurvey from "../pages/Notnow/AddSurvey";
// import ManageApplication from "../pages/ManageApplication";
// import ManageApplicationDetail from "../pages/ManageApplicationDetail";
// import ManageSurvey from "../pages/ManageSurvey";
// import ManageSurveyDetail from "../pages/ManageSurveyDetail";
// import ManageStudent from "../pages/ManageStudent";
// import ManageUser from "../pages/ManageUser";
// import ManageInstructor from "../pages/ManageInstructor";
// import ManageProgram from "../pages/Admin/ManageProgram";
// import AdminProgramDetail from "../pages/AdminProgramDetail";
// import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
// import AdminMain from "../pages/Admin/ManageProgram";
// import AddTemplate from "../pages/AddTemplate";
// import LoginIng from "components/login/LoginIng";

// import Application from "../pages/Application";
// import Survey from "../pages/Survey";
// import ProgramDetail from "../pages/ProgramDetail";
// import MyPageLayout from "../pages/Mypage/MyPageLayout";
// import Terms from "../pages/terms";
// import PersonalInfo from "../pages/PersonalInfo";

// // 관리자 페이지의 Router 모음
// // 페이지가 많으므로 공통/고유 페이지 구분, 각주로 표기할 것

// function Admin() {
//     return (
//         <Routes>
//             {/* 전 라우터 공통 :  */}
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "/"} element={<Main />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "main"} element={<Main />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "login-ing"} element={<LoginIng />} />

//             {/* 프로그램 전체 조회 */}
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program"} element={<ManageProgram />} />
//             {/* 프로그램 단일 조회 */}
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id"} element={<AdminProgramDetail />} />
//             {/*  */}
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id"} element={<ProgramDetail />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/application"} element={<Application />} />

//             {/* Admin 고유 */}
//             {/* 프로그램 추가 */}
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/addprogram"} element={<AddProgram />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/addtemplate"} element={<AddTemplate />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/addsurvey"} element={<AddSurvey />} />

//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin"} element={<AdminMain />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/application"} element={<ManageApplication />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/application/detail/:id"} element={<ManageApplicationDetail />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/survey"} element={<ManageSurvey />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/survey/detail/:id"} element={<ManageSurveyDetail />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/student"} element={<ManageStudent />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/instructor"} element={<ManageInstructor />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/user"} element={<ManageUser />} />

//             <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/survey"} element={<Survey />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<MyPageLayout />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"} element={<Terms />} />
//             <Route path={process.env.REACT_APP_DEPLOY_URL + "personal-information"} element={<PersonalInfo />} />
//         </Routes>
//     );
// }

// export default Admin;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "../pages/Main/Main";
import "assets/scss/theme.scss";
import AddProgram from "../pages/Program/AddProgram";
import AddSurvey from "../pages/Notnow/AddSurvey";
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

import NotLogin from "./notLogin";
import { isActive } from "functions/isActive";
import Application from "../pages/Application";
import Survey from "../pages/Survey";
import ProgramDetail from "../pages/ProgramDetail";
import MyPageLayout from "../pages/Mypage/MyPageLayout";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";
const today = new Date();
const userData = JSON.parse(window.sessionStorage.getItem("userData"));
const token = userData ? userData.exp : null;
const status = userData ? userData.status : null;

// 토큰 존재 + 유효 + 사용자 ADMIN인지 확인
const isAdmin = token !== null && status === "ADMIN" && token < today.getTime();
function Admin() {
    const [checkActive, setCheckActive] = useState(true);

    useEffect(() => {
        const activeStatus = isActive();
        setCheckActive(activeStatus);
        const path = window.location.pathname.replace(process.env.REACT_APP_DEPLOY_URL, "");
        const isRootOrMain = path === "/" || path === "" || path === "main";
        if (!activeStatus && !isRootOrMain) {
            alert("로그인 세션이 만료되었습니다. 초기 페이지로 돌아갑니다 (관리자 라우터)");
            console.log("로그인 세션이 만료되었습니다. 초기 페이지로 돌아갑니다 (관리자 라우터)");
            <Navigate to={process.env.REACT_APP_DEPLOY_URL} replace />;
        }
    }, []);

    return (
        <Routes>
            {/* 전 라우터 공통 :  */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "/"} element={<Main />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "main"} element={<Main />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "login-ing"} element={<LoginIng />} />

            {/* isActive가 false이면 메인 페이지 외의 다른 페이지로 리다이렉트 */}
            {/* {!checkActive && (
                <>
                    <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/*"} element={<Navigate to={process.env.REACT_APP_DEPLOY_URL + "/"} replace />} />
                    <Route path={process.env.REACT_APP_DEPLOY_URL + "program/*"} element={<Navigate to={process.env.REACT_APP_DEPLOY_URL + "/"} replace />} />
                    <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<Navigate to={process.env.REACT_APP_DEPLOY_URL + "/"} replace />} />
                    <Route
                        path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"}
                        element={<Navigate to={process.env.REACT_APP_DEPLOY_URL + "/"} replace />}
                    />
                    <Route
                        path={process.env.REACT_APP_DEPLOY_URL + "personal-information"}
                        element={<Navigate to={process.env.REACT_APP_DEPLOY_URL + "/"} replace />}
                    />
                </>
            )} */}

            {/* 프로그램 전체 조회 */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program"} element={<ManageProgram />} />
            {/* 프로그램 단일 조회 */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id"} element={<AdminProgramDetail />} />
            {/*  */}
            <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id"} element={<ProgramDetail />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/application"} element={<Application />} />

            {/* Admin 고유 */}
            {/* 프로그램 추가 */}
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

            <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/survey"} element={<Survey />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<MyPageLayout />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"} element={<Terms />} />
            <Route path={process.env.REACT_APP_DEPLOY_URL + "personal-information"} element={<PersonalInfo />} />
        </Routes>
    );
}

export default Admin;
