import { Fragment, useState, useLayoutEffect, useEffect } from "react";
import { Row, Col, Card, Tab, Nav, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";
import { getProgramDetailsAdmin } from "services/program";
import ProgramInformation from "components/marketing/pages/courses/add-new-course/steps/ProgramInformation";
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
import ApplicantsListItems from "components/dashboard/user/ApplicantsListItems";
import ApplicantsListItems2 from "components/dashboard/single/overview/ParticipantManage";
import SurveyFormView from "components/dashboard/single/overview/ParticipantManage";
import ApplicationDataView from "../pages/ApplicationDataView";
import SurveyDataView from "../pages/SurveyDataView";

const AdminProgramDetail = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [programName, setProgramName] = useState();
    const [programData, setProgramData] = useState({
        name: "",
        information: "",
        startDate: new Date(),
        endDate: new Date(),
        applyStartDate: new Date(),
        applyEndDate: new Date(),
        quota: "",
        categoryId: "",
        managerName: "",
        managerContact: "",
    });
    const id = useParams();

    useEffect(() => {
        const fetchProgramDetailsAdmin = async () => {
            try {
                const url = window.location.href;
                const programId = parseInt(url.substring(url.lastIndexOf("/") + 1));
                console.log("프로그램아이디 : ", programId);
                const data = await getProgramDetailsAdmin(programId); // 프로그램 ID를 매개변수로 전달
                setProgramName(data.name); // 프로그램 데이터 상태 업데이트
                setProgramData(data);
                console.log(programData.name);
            } catch (error) {
                console.error("프로그램 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchProgramDetailsAdmin();
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

    const handleProgramUpdate = async () => {
        const formData = new FormData();
        formData.append("id", id["id"]);
        formData.append("name", programData.name);
        formData.append("information", programData.information);
        formData.append("startDate", programData.startDate);
        formData.append("endDate", programData.endDate);
        formData.append("applyStartDate", programData.applyStartDate);
        formData.append("applyEndDate", programData.applyEndDate);
        formData.append("quota", programData.quota);
        formData.append("categoryId", programData.categoryId);
        formData.append("managerName", programData.managerName);
        formData.append("managerContact", programData.managerContact);

        const token = sessionStorage.getItem("token");

        if (window.confirm("프로그램 정보를 수정하시겠습니까?")) {
            try {
                const response = await axios.patch(
                    `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs/${id.id}`, // 여기서 수정
                    formData, // FormData 객체를 요청 데이터로 전달
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "multipart/form-data", // multipart/form-data 형식으로 전송
                        },
                    }
                );
                window.location.reload();
                alert("프로그램 정보가 수정되었습니다.");
            } catch (error) {
                console.error("Error updating user status:", error);
                alert("프로그램 정보 수정에 실패하였습니다. 다시 시도해 주세요.");
            }
        }
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
                                            <button className="btn btn-outline-success" onClick={handleProgramUpdate}>
                                                프로그램 정보 수정
                                            </button>
                                            <> </>
                                            <Link to="/HappyMan/admin/program" className="btn btn-success">
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
                                                    <Nav.Link eventKey="applicationData" className="mb-sm-3 mb-md-0">
                                                        신청응답
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="applicant" className="mb-sm-3 mb-md-0">
                                                        신청자 관리
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="survey" className="mb-sm-3 mb-md-0">
                                                        참가자 관리
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Card.Header>
                                        <Card.Body className="p-0">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="information" className="pb-4">
                                                    {programData && <ProgramInformation param1={id} data={programData} setProgramData={setProgramData} />}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="application" className="pb-4">
                                                    <ApplicationFormView param2={id} />
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="applicant" className="pb-4">
                                                    <ApplicantsListItems param4={id} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="survey" className="pb-4">
                                                    <ApplicantsListItems2 param4={id} />
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
