// import node module libraries
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Card, Image } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
// import media files
import Logo from "assets/images/OnlyLogo.png";
import LoginForm from "components/login/LoginForm";

const SignIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSuccess = async (response) => {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("token", response.tokenObj.id_token);
        params.append("name", response.profileObj.name);
        params.append("email", response.profileObj.email);
        params.append("expire", response.tokenObj.expires_at);
        params.append("manageID", window.sessionStorage.getItem("id"));

        const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login", params);
        if (res.data !== "fail") {
            window.sessionStorage.setItem("email", response.profileObj.email);
            window.sessionStorage.setItem("name", response.profileObj.name);
            window.sessionStorage.setItem("token", response.tokenObj.id_token);
            window.sessionStorage.setItem("expires_at", response.tokenObj.expires_at);
            window.sessionStorage.setItem("status", res.data.status);
            window.sessionStorage.setItem("id", res.data.id);

            // window.location.reload();
            navigate("/main", (params = { login: true }));
            console.log("로그인 성공");
        } else {
            alert("로그인 할 수 없습니다. 관리자에게 문의해주세요.");
        }
        setLoading(false);
    };

    const onFailure = (error) => {
        console.log(error);
    };

    return (
        <Fragment>
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-6">
                            <div className="mb-4 d-flex flex-column align-items-center">
                                <Link to="/" className="m-0">
                                    <Image src={Logo} width="50px" className="mb-4" alt="" />
                                </Link>
                                <h1 className="mb-1 fw-bold">HappyMan</h1>
                            </div>
                            {/* Form */}
                            <Row className="d-flex justify-content-center">
                                <Col className="d-flex justify-content-center">
                                    <span>Hisnet 아이디 / 비밀번호로 로그인 해 주세요</span>
                                </Col>
                                <LoginForm />
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default SignIn;
