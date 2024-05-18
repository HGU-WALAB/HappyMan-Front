// import node module libraries
import React, { Fragment, useState, useLayoutEffect, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { Col, Row, Container, Card, Form, Button, ListGroup, Badge, Image } from "react-bootstrap";
// import imgA from "assets/images/application/application-01.png";
import DefaultImg from "assets/images/Default_img.png";
import FormRender from "./FormRender";
import moment from "moment";

// import custom components
import axios from "axios";

import "assets/scss/application.scss";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";
import { post } from "jquery";

const Application = () => {
    const { id: programId } = useParams();
    const id = useParams();
    const infinite = "무제한";
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState();
    // 프로그램 전체 정보
    const [programInfo, setProgramInfo] = useState({});

    const [programInfoLoading, setProgramInfoLoading] = useState(false);
    const [applicationData, setApplicationData] = useState();

    const [applicantInformation, setApplicantInformation] = useState(null);
    const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);

    // 날짜 관련
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [applyStartDate, setApplyStartDate] = useState();
    const [applyEndDate, setApplyEndDate] = useState();
    const [dday, setDday] = useState();
    const [daysLeft, setdaysLeft] = useState(true);
    // 정원 관련
    const [quotaLeft, setquotaLeft] = useState(true);
    // 상태 관련
    const [status, setStatus] = useState();
    // 파일 관련
    const [poster, setPoster] = useState();

    var ID = parseInt(window.sessionStorage.getItem("id"));
    var programID = parseInt(id["id"]);

    useEffect(() => {
        const fetchProgramInformation = async () => {
            setProgramInfoLoading(false);
            var params = new URLSearchParams();

            if (programId != null) {
                params.append("id", programId);
                try {
                    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/programs/" + programId + "/application", {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                        },
                    });

                    // console.log("불러온 값은 : ", response.data);
                    setApplicationData(response.data.applicationForm);
                    // console.log("불러온 값 중 form은 : ", response.data.applicationForm);
                    setProgramInfo(response.data);
                    setProgramInfoLoading(true);

                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].file_type === 1) {
                            setPoster(response.data[i].file_name);
                        }
                    }

                    // 여기서 상태를 업데이트하고 로그를 출력합니다.
                    setStartDate(response.data.startDate);
                    setEndDate(response.data.endDate);
                    setApplyStartDate(response.data.applyStartDate);
                    setApplyEndDate(response.data.applyEndDate);
                    setPoster(response.data.image);
                    // console.log(poster);

                    if (response.data.currentQuota >= response.data.quota && (response.data.quota != 0 || response.data.quota != "무제한")) {
                        setquotaLeft(false);
                    } else {
                        setquotaLeft(true);
                    }

                    const Dday = async (applyEndDate) => {
                        var date1 = moment(applyEndDate);
                        var date2 = moment();

                        var days = date1.diff(date2, "days") + 1;

                        if (date2 > date1) {
                            setdaysLeft(false);
                            setDday("마감");
                        } else {
                            setdaysLeft(true);
                            setDday("D-" + days);
                        }
                    };
                } catch (error) {
                    console.error("네트워크 요청 중 오류 발생:", error);
                    // 오류 처리
                }
            }
        };

        fetchProgramInformation();
    }, [programId]);

    // Render를 위해 넘겨주는 props 값들
    const props = { programID: programID };

    return (
        <Fragment>
            <NavbarDefault />

            <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary ">
                <Container>
                    <Row className="align-items-center ">
                        <Col xl={7} lg={7} md={12} sm={12}>
                            <div>
                                <h1 className="text-white display-4 fw-semi-bold">{programInfo.name}</h1>
                                <div className="d-flex flex-row align-middle">
                                    <Badge bg="warning" className="me-3">
                                        {" "}
                                        {dday}{" "}
                                    </Badge>
                                    <span className="text-white me-1">
                                        <i className="fe fe-users"></i>
                                    </span>
                                    <span className="fw-bold text-white"> 신청기간 - </span>
                                    <span className="text-white">
                                        {" "}
                                        {applyStartDate} ~ {applyEndDate}
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="py-6 mt-lg-n18">
                <Container>
                    <Row>
                        <Col xl={8} lg={8} md={12} sm={12}>
                            {/*  Card */}
                            <Card className="mb-4 mb-lg-4">
                                {/*  Card header */}
                                <Card.Header>
                                    <h3 className="mb-0">신청서</h3>
                                </Card.Header>
                                {/*  Card body */}
                                <Card.Body>
                                    <FormRender programID={programID} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={12} sm={12}>
                            {/*  Card */}
                            <Card className="border-0 mb-3">
                                {/*  Card body */}
                                <div className="p-3 text-center">
                                    {poster ? (
                                        <Image width="100%" object-fit="contain" src={`${process.env.REACT_APP_RESTAPI_HOST}${poster}`} alt="" />
                                    ) : (
                                        <Image width="100%" object-fit="contain" src={DefaultImg} alt="" />
                                    )}
                                </div>
                                <hr className="m-0" />
                                <div className="p-5">
                                    {/*  List */}
                                    <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                                            <span className="text-success me-1">
                                                <i className="fe fe-user"></i>
                                            </span>
                                            <span className="fw-bold text-dark"> 모집인원 - </span>
                                            <span>
                                                {" "}
                                                {programInfo.currentQuota + "명"} /{" "}
                                                {programInfo.quota == null || programInfo.quota === 0 ? infinite : programInfo.quota + "명"}{" "}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                                            <span className="text-success me-1">
                                                <i className="fe fe-calendar"></i>
                                            </span>
                                            <span>
                                                <span className="fw-bold text-dark"> 날짜 - </span>
                                                <span>
                                                    {" "}
                                                    {startDate} ~ {endDate}{" "}
                                                </span>
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                                            <span className="text-success me-1">
                                                <i className="fe fe-grid"></i>
                                            </span>
                                            <span>
                                                <span className="fw-bold text-dark"> 카테고리 - </span>
                                                <span>{programInfo.category}</span>
                                            </span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <hr className="m-0" />
                                {programInfo.managerName != null ? (
                                    <div className="p-5">
                                        <div className=" fw-bold text-dark mb-2">문의</div>
                                        <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                                            <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                                                <span className="text-success me-1">
                                                    <i className="fe fe-user"></i>
                                                </span>
                                                <span>{programInfo.managerName}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                                                <span className="text-success me-1">
                                                    <i className="fe fe-phone"></i>
                                                </span>
                                                <span>{programInfo.managerContact}</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <hr className="m-0" />
                                <div className="p-4">
                                    <Link to="" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                        프로그램 내용 자세히 보기
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </Fragment>
    );
};

export default Application;
