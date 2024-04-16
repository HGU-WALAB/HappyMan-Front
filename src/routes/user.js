import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Main from "../pages/Main/Main";
import Application from "../pages/Application";
import Survey from "../pages/Survey";
import ProgramDetail from "../pages/ProgramDetail";
import MyPageLayout from "../pages/Mypage/MyPageLayout";
import Terms from "../pages/terms";
import PersonalInfo from "../pages/PersonalInfo";

function Admin() {
    return (
        <>
            <Routes>
                <Route path={process.env.REACT_APP_DEPLOY_URL} element={<Main />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "main"} element={<Main />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "admin/*"} element={<Navigate replace to="/HappyMan/" />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/application"} element={<Application />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id/survey"} element={<Survey />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "program/:id"} element={<ProgramDetail />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "mypage"} element={<MyPageLayout />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "terms-and-conditions"} element={<Terms />} />
                <Route path={process.env.REACT_APP_DEPLOY_URL + "personal-information"} element={<PersonalInfo />} />
            </Routes>
        </>
    );
}

export default Admin;
