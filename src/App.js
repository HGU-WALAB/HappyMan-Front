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

    // console.log("status:", status);
    // console.log("token:", token);

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
                    {isAdmin ? (
                        // 토큰이 0이거나 -2인 경우에는 Admin
                        <Admin />
                    ) : isUser ? (
                        // 토큰이 1인 경우에는 User
                        <User />
                    ) : (
                        // 토큰이 아예 없는 경우에는 notLogin
                        <NotLogin />
                    )}

                    {/* 임시용 */}
                    {/* <User /> */}
                </BrowserRouter>
            </RecoilRoot>
        </>
    );
}

export default App;
