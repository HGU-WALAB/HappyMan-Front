import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { tokenState } from "atom/swapState";
import { getToken } from "services/loginApi";
import { jwtDecode } from "jwt-decode";
import { loginState } from "recoil/atoms/loginState";
import jsPDF from "jspdf";

const { persistAtom } = recoilPersist();

function LoginIng() {
    const [tokenData, setTokenData] = useRecoilState(tokenState);
    const [loginInfo, setLoginInfo] = useRecoilState(loginState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const credential = urlParams.get("token");

                if (credential) {
                    // getToken 함수를 비동기적으로 호출하고 반환된 토큰을 변수에 저장
                    const token = await getToken(credential);
                    console.log("Raw Token: ", token);
                    sessionStorage.setItem("token", token);

                    const tokenData = jwtDecode(token);
                    setTokenData(tokenData);
                    sessionStorage.setItem("userData", JSON.stringify(tokenData));
                    setLoginInfo(JSON.stringify(tokenData));
                    console.log("Token", tokenData);

                    // 일단 임시로 멈춤용도 alert
                    console.log("로그인 성공");
                } else {
                    throw new Error("토큰이 존재하지 않습니다.");
                }
            } catch (error) {
                alert("로그인 실패!");
                console.log("Login API 오류:", error);
            }

            // 페이지 이동
            window.location.href = "/"; // 이동하고자 하는 URL로 변경 (상대경로)
        };

        fetchData();
    }, []); // 빈 배열을 전달하여 페이지가 로드될 때 한 번만 실행되도록 함

    return null; // 이 컴포넌트는 아무것도 렌더링하지 않음
}

export default LoginIng;
