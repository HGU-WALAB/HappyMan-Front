import React from "react";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Admin from "./routes/admin";
import NotLogin from "./routes/notLogin";
import User from "./routes/user";
import { tokenState } from "atom/swapState";

const { persistAtom } = recoilPersist();

function App() {
    // token 유효성 검사를 위한 현재일자 가져오기
    const today = new Date();
    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const token = userData ? userData.exp : null;
    const status = userData ? userData.status : null;

    // 토큰 존재 + 유효 + 사용자 ADMIN인지 확인
    const isAdmin = token !== null && status === "ADMIN" && token < today.getTime();
    // 토큰 존재 + 유효 + 사용자 USER인지 확인
    const isUser = token !== null && status === "USER" && token < today.getTime();

    console.log("isAdmin:", isAdmin);
    console.log("isUser:", isUser);

    return (
        <>
            <RecoilRoot>
                <recoilPersist persistAtoms={[tokenState]} />
                <BrowserRouter>
                    {isAdmin
                        ? // 관리자 권한이 있는 경우에는 Admin
                          (console.log("관리자 라우터"), (<Admin />))
                        : isUser
                        ? // 유저 권한이 있는 경우에는 User
                          (console.log("사용자 라우터"), (<User />))
                        : // 토큰이 아예 없는 경우에는 notLogin
                          (console.log("미가입 라우터"), (<NotLogin />))}

                    {/* 임시용 */}
                    {/* <User /> */}
                </BrowserRouter>
            </RecoilRoot>
        </>
    );
}

export default App;
