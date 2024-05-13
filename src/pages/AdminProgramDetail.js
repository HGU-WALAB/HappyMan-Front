import { Fragment, useState, useLayoutEffect, useEffect } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";
import { getProgramDetailsAdmin } from "services/program";
import ProgramInformation from "components/marketing/pages/courses/add-new-course/steps/ProgramInformation";
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
import ApplicantsListItems from "components/dashboard/user/ApplicantsListItems";
import SurveyFormView from "components/dashboard/single/overview/SurveyFormView";
import ApplicationDataView from "../pages/ApplicationDataView";
import SurveyDataView from "../pages/SurveyDataView";

const AdminProgramDetail = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [programName, setProgramName] = useState();
    const id = useParams();

    // useEffect(() => {
    //     if (id && id.id) {
    //         getProgramDetailsAdmin(id.id);
    //     }
    // }, [id]);

    useEffect(() => {
        const fetchProgramDetailsAdmin = async () => {
            try {
                const url = window.location.href;
                const programId = parseInt(url.substring(url.lastIndexOf("/") + 1));
                console.log("프로그램아이디 : ", programId);
                const data = await getProgramDetailsAdmin(programId); // 프로그램 ID를 매개변수로 전달
                setProgramName(data.name); // 프로그램 데이터 상태 업데이트
                // console.log("PN", data.name);
                // setProgramName(true); // 프로그램 데이터 로딩이 완료되었으므로 true로 설정
            } catch (error) {
                console.error("프로그램 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchProgramDetailsAdmin();

        // useEffect의 두 번째 인수가 빈 배열인 경우, 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    }, []);

    useLayoutEffect(() => {
        readProgramName();
    }, []);

    const readProgramName = async () => {
        var params = new URLSearchParams();
        if (id["id"] != null) {
            params.append("id", id["id"]);
            const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs/${id}`, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            });
            setProgramName(response.data.name);
        }
    };

    const ToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Fragment>
            <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
                <div className="navbar-vertical navbar">
                    <NavbarVertical showMenu={showMenu} onClick={(value) => setShowMenu(value)} />
                </div>
                <div id="page-content">
                    <div className="header">
                        <NavbarTop
                            data={{
                                showMenu: showMenu,
                                SidebarToggleMenu: ToggleMenu,
                            }}
                        />
                    </div>
                    <div className="container-fluid p-4">
                        <Tab.Container defaultActiveKey="information">
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
                                        <div className="mb-3 mb-md-0">
                                            <h1 className="mb-1 h2 fw-bold">{programName}</h1>
                                        </div>
                                        <div>
                                            <Link to="/HappyMan/admin/program" className="btn btn-success ">
                                                프로그램 목록 보기
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <Card>
                                        <Card.Header className="border-bottom-0 p-0 bg-white">
                                            <Nav className="nav-lb-tab">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="information" className="mb-sm-3 mb-md-0">
                                                        정보
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="application" className="mb-sm-3 mb-md-0">
                                                        신청서
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="applicationData" className="mb-sm-3 mb-md-0">
                                                        신청응답
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="applicant" className="mb-sm-3 mb-md-0">
                                                        신청현황
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="survey" className="mb-sm-3 mb-md-0">
                                                        설문지
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="surveyData" className="mb-sm-3 mb-md-0">
                                                        설문응답
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Card.Header>
                                        <Card.Body className="p-0">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="information" className="pb-4">
                                                    <ProgramInformation param1={id} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="application" className="pb-4">
                                                    <ApplicationFormView param2={id} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="applicationData" className="pb-4">
                                                    <ApplicationDataView param3={id} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="applicant" className="pb-4">
                                                    <ApplicantsListItems param4={id} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="survey" className="pb-4">
                                                    <SurveyFormView param3={id} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="surveyData" className="pb-4">
                                                    <SurveyDataView param3={id} />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminProgramDetail;
