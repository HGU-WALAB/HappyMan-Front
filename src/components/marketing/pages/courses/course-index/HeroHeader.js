// Section : Hero Header
// Style : Welcome Text on left and image on right

// import node module libraries
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// import media files
import HeroImage from "assets/images/Main.png";
import UserMainImg from "assets/images/UserMain.png";
import styled from "styled-components";

const HeroHeader = () => {
    const today = new Date();
    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const token = userData ? userData.exp : null;
    const status = userData ? userData.status : null;

    // 토큰 존재 + 유효 + 사용자 ADMIN인지 확인
    const isAdmin = token !== null && status === "ADMIN" && token < today.getTime();
    // 토큰 존재 + 유효 + 사용자 USER인지 확인
    const isUser = token !== null && status === "USER" && token < today.getTime();

    const navigate = useNavigate();
    const checkApply = async () => {
        if (window.sessionStorage.getItem("userData") === null) {
            alert("로그인이 필요한 항목입니다. 로그인을 진행해 주세요.");
        } else {
            navigate("/mypage");
        }
    };

    return (
        <div className="bg-primary">
            <Container>
                {isAdmin ? (
                    // 관리자가 볼 화면
                    <Row className="align-items-center g-0">
                        <Col xl={5} lg={6} md={12}>
                            <div className="py-5 py-lg-0">
                                <h1 className="text-white display-4 fw-bold">HAPPY Manager</h1>
                                <p className="text-white-50 mb-4 lead">소프트웨어 중심대학 비교과 캠프 관리 서비스</p>
                                {/* <Button className="btn btn-success" onClick={checkApply}>
                                    내 활동내역 보러가기
                                </Button> */}
                            </div>
                        </Col>
                        <Col xl={7} lg={6} md={12} className="text-lg-end text-center">
                            <Image src={HeroImage} alt="" className="img-fluid" />
                        </Col>
                    </Row>
                ) : (
                    // 사용자가 볼 화면
                    <Row className="align-items-center g-0">
                        <Col xl={5} lg={6} md={12}>
                            <div className="py-5 py-lg-0">
                                <h1 className="text-white display-4 fw-bold">HAPPY Manager</h1>
                                <p className="text-white-50 mb-4 lead">소프트웨어 전공자를 위한 비교과 캠프 신청 서비스</p>
                                {/* <Button className="btn btn-success" onClick={checkApply}>
                                    내 활동내역 보러가기
                                </Button> */}
                            </div>
                        </Col>
                        <Col xl={7} lg={6} md={12} className="text-lg-end text-center">
                            <ImgBox>
                                <Image src={UserMainImg} alt="" className="img-fluid" />
                            </ImgBox>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};
export default HeroHeader;

const ImgBox = styled.div`
    width: 50%;
    height: 40%;
    margin-left: 20%;
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* border: 1px solid red; */
`;
