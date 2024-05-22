import React from "react";
import { Button } from "react-bootstrap"; // 버튼 컴포넌트를 임포트합니다.
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 임포트합니다.

function LoginBtn() {
    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

    const handleSignInClick = () => {
        // 서버 배포용
        console.log("로그인 버튼 클릭");
        window.location.href =
            "https://walab.info:8443/HisnetLogin/hisnet-login?accessKey=LByzLqghXnUp0SHHbHiI&returnUrl=https://happymanhgu.netlify.app/login-ing";
        // 로컬 개발용
        // window.location.href = "https://walab.info:8443/HisnetLogin/hisnet-login?accessKey=LByzLqghXnUp0SHHbHiI&returnUrl=http://localhost:3000/login-ing";

        // navigate("/swap/sign-in"); // '/swap/sign-in'으로 페이지 이동을 합니다.
    };

    return (
        <Button className="h4" onClick={handleSignInClick}>
            로그인
        </Button>
    );
}

export default LoginBtn;
