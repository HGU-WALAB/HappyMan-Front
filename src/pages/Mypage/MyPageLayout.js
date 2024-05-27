import React, { Fragment, useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";
import ProfileCover from "components/marketing/common/headers/ProfileCover";
import ViewProfile from "./ProfileInfo/ViewProfile";
import MyPage from "./ApplicatedPrograms/MyPage";
import Bookmark from "./Bookmarked/Bookmark";
import Portfolio from "./Portfolio";
import mypageinfo from "./mypageinfo.json";
import { Edit } from "react-feather";

const MyPageLayout = () => {
    // const [applicantInformationLoading, setApplicantInformationLoading] = useState(true);
    // const [applicantInformation, setApplicantInformation] = useState(null);

    const [userInfo, setUserInfo] = useState();
    const [bookmarked, setBookmarked] = useState([]);

    const today = new Date();
    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const token = userData ? userData.exp : null;
    const status = userData ? userData.status : null;

    const isAdmin = token !== null && status === "ADMIN" && token < today.getTime();
    const isUser = token !== null && status === "USER" && token < today.getTime();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 유저 정보 불러오기
                const info = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/my-profile`, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                });
                // console.log("받아온 유저정보", info.data);
                setUserInfo(info.data);

                // 유저 북마크 조회
                const bookmarked = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/bookmarked`, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                });
                console.log("Bookmarked", bookmarked.data.programs);
                setBookmarked(bookmarked.data.programs);
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };

        fetchData();
    }, []);
    useLayoutEffect(() => {
        // setApplicantInformation(mypageinfo);
        // setApplicantInformationLoading(false);
    }, []);

    return (
        <Fragment>
            <NavbarDefault login />
            {isAdmin ? (
                // 관리자 화면 출력
                <div className="pt-5 pb-5">
                    <Container>관리자야</Container>
                </div>
            ) : (
                // 일반 사용자 화면 출력
                <div className="pt-5 pb-5">
                    <Container>
                        {/* <ProfileCover userInfo={applicantInformation} /> */}
                        <Tab.Container id="left-tabs-example" defaultActiveKey="my_programs">
                            <Row className="mt-0 mt-md-4">
                                <Col lg={3} md={4} sm={12}>
                                    <Nav variant="pills" className="me-auto flex-column bg-white shadow-sm mb-4 mb-lg-0 sidenav rounded-3">
                                        <Nav.Item>
                                            <Nav.Link eventKey="my_programs" className="border-bottom">
                                                <i className={`fe fe-list nav-icon`}></i> 신청한 프로그램
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="liked_programs" className="border-bottom">
                                                <i className={`fe fe-bookmark nav-icon`}></i> 찜한 프로그램
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="profile" className="border-bottom">
                                                <i className={`fe fe-user nav-icon`}></i> 프로필 정보
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="portfolio" className="border-bottom">
                                                <i className={`fe fe-file nav-icon`}></i> 활동내역 한눈에 보기
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9} md={8} sm={12}>
                                    <Tab.Content>
                                        {/* 신청한 프로그램 */}
                                        <Tab.Pane eventKey="my_programs">
                                            <MyPage></MyPage>
                                        </Tab.Pane>
                                        {/* 찜한 프로그램 */}
                                        <Tab.Pane eventKey="liked_programs">
                                            <Bookmark></Bookmark>
                                        </Tab.Pane>
                                        {/* 사용자 정보 */}
                                        <Tab.Pane eventKey="profile">{userInfo && <ViewProfile userInfo={userInfo}></ViewProfile>}</Tab.Pane>
                                        {/* 활동내역 보기 */}
                                        <Tab.Pane eventKey="portfolio">{<Portfolio />}</Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                </div>
            )}
            <Footer />
        </Fragment>
    );
};

export default MyPageLayout;
