import React, { Fragment, useState, useLayoutEffect } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";
import ProfileCover from "components/marketing/common/headers/ProfileCover";
import EditProfile from "../EditProfile";
import MyPage from "./MyPage";
import Bookmark from "../Bookmark";
import Portfolio from "../Portfolio";
import mypageinfo from "./mypageinfo.json";

const MyPageLayout = () => {
    const [applicantInformationLoading, setApplicantInformationLoading] = useState(true);
    const [applicantInformation, setApplicantInformation] = useState(null);

    useLayoutEffect(() => {
        // API 호출 부분을 제거하고 대신에 JSON 파일에서 데이터를 가져오도록 변경
        setApplicantInformation(mypageinfo);
        setApplicantInformationLoading(false);
    }, []);

    return (
        <Fragment>
            <NavbarDefault login />
            {!applicantInformationLoading && (
                <div className="pt-5 pb-5">
                    {applicantInformation.status === 1 ? (
                        <Container>
                            <ProfileCover userInfo={applicantInformation} />
                            <Tab.Container id="left-tabs-example" defaultActiveKey="my_programs">
                                <Row className="mt-0 mt-md-4">
                                    <Col lg={3} md={4} sm={12}>
                                        <Nav variant="pills" className="me-auto flex-column bg-white shadow-sm mb-4 mb-lg-0 sidenav rounded-3">
                                            <Nav.Item>
                                                <Nav.Link eventKey="my_programs" className="border-bottom">
                                                    {" "}
                                                    <i className={`fe fe-list nav-icon`}></i> 신청한 프로그램
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="liked_programs" className="border-bottom">
                                                    {" "}
                                                    <i className={`fe fe-bookmark nav-icon`}></i> 저장한 프로그램
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="profile" className="border-bottom">
                                                    {" "}
                                                    <i className={`fe fe-user nav-icon`}></i> 프로필 정보
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="portfolio" className="border-bottom">
                                                    {" "}
                                                    <i className={`fe fe-file nav-icon`}></i> 활동내역 한눈에 보기
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col lg={9} md={8} sm={12}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="my_programs">
                                                <MyPage></MyPage>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="liked_programs">
                                                <Bookmark></Bookmark>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="profile">
                                                <EditProfile userInfo={applicantInformation}></EditProfile>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="portfolio">
                                                <Portfolio userInfo={applicantInformation}></Portfolio>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Container>
                    ) : (
                        <Container>
                            <ProfileCover userInfo={applicantInformation} />
                            <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                                <Row className="mt-0 mt-md-4">
                                    <Col lg={3} md={4} sm={12}>
                                        <Nav variant="pills" className="me-auto flex-column bg-white shadow-sm mb-4 mb-lg-0 sidenav rounded-3">
                                            <Nav.Item>
                                                <Nav.Link eventKey="profile" className="border-bottom">
                                                    {" "}
                                                    <i className={`fe fe-user nav-icon`}></i> 프로필 정보
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col lg={9} md={8} sm={12}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="profile">
                                                <EditProfile userInfo={applicantInformation}></EditProfile>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Container>
                    )}
                </div>
            )}
            <Footer />
        </Fragment>
    );
};

export default MyPageLayout;
