// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { isActive } from "functions/isActive";
// import Main from "../pages/Main/Main";
// import SignIn from "../pages/Login/SignIn";
// import SignUp from "../pages/Login/SignUp";
// import Application from "../pages/Application";
// import ProgramDetail from "../pages/ProgramDetail";
// import Terms from "../pages/terms";
// import PersonalInfo from "../pages/PersonalInfo";
// import Approve from "pages/Login/UserApprove";
// import LoginIng from "components/login/LoginIng";
// import MyPageLayout from "pages/Mypage/MyPageLayout";
// import ManageProgram from "pages/Admin/ManageProgram";
// import AdminProgramDetail from "pages/AdminProgramDetail";
// import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";

// function Admin() {
//     const [checkActive, setCheckActive] = useState(true); // isActive 상태를 여기서 관리합니다.

//     useEffect(() => {
//         setCheckActive(isActive());
//         console.log(checkActive);
//         if (!checkActive) {
//             console.log(checkActive);
//             alert("로그인 세션이 만료되었습니다. 초기 페이지로 돌아갑니다");
//             console.log("로그인 세션이 만료되었습니다. 초기 페이지로 돌아갑니다");
//         }
//     }, [checkActive]);
//     return (
//         <>
//             <Routes>
//                 <Route path={process.env.REACT_APP_DEPLOY_URL} element={<Main />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "main"} element={<Main />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "sign-in"} element={<SignIn />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "approve"} element={<Approve />} />
//                 {/* 임시로 로그인 프로세스 파일 추가 */}
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "login-ing"} element={<LoginIng />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<MyPageLayout />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program"} element={<ManageProgram />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id"} element={<AdminProgramDetail />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
//                 {/* <Route path={process.env.REACT_APP_DEFAULT_URL + "admin/*"} element={<Navigate replace to="/swap/" />} />
//                 <Route path={process.env.REACT_APP_DEFAULT_URL + "mypage"} element={<Navigate replace to="/swap/" />} /> */}
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/application"} element={<Application />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id"} element={<ProgramDetail />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"} element={<Terms />} />
//                 <Route path={process.env.REACT_APP_DEPLOY_URL + "personal-information"} element={<PersonalInfo />} />
//             </Routes>
//         </>
//     );
// }

// export default Admin;

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { isActive } from "functions/isActive";
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

function NotLogin() {
    const [checkActive, setCheckActive] = useState(true);

    useEffect(() => {
        const activeStatus = isActive();
        setCheckActive(activeStatus);
        const path = window.location.pathname.replace(process.env.REACT_APP_DEPLOY_URL, "");
        const isRootOrMain = path === "/" || path === "" || path === "main";
        if (!activeStatus && !isRootOrMain) {
            alert("접근 권한이 없습니다. 초기 페이지로 돌아갑니다");
            console.log("로그인 세션이 만료되었습니다. 초기 페이지로 돌아갑니다");
        }
    }, []);

    return (
        <>
            <Routes>
                {/* 메인 페이지와 /main 페이지는 항상 접근 가능 */}
                <Route path={process.env.REACT_APP_DEPLOY_URL} element={<Main />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "main"} element={<Main />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"} element={<Terms />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "login-ing"} element={<LoginIng />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id"} element={<ProgramDetail />} />
                {/* 나머지 경로는 checkActive 상태에 따라 접근 제한 */}
                {checkActive ? (
                    <>
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "sign-in"} element={<SignIn />} />
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "approve"} element={<Approve />} />

                        <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<MyPageLayout />} />
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program"} element={<ManageProgram />} />
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id"} element={<AdminProgramDetail />} />
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/program/detail/:id/:applicantid"} element={<ApplicationFormView />} />
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/application"} element={<Application />} />

                        <Route path={process.env.REACT_APP_DEPLOY_URL + "personal-information"} element={<PersonalInfo />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to={process.env.REACT_APP_DEPLOY_URL} replace />} />
                )}
            </Routes>
        </>
    );
}

export default NotLogin;
