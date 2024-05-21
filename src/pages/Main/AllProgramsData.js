import React, { Fragment, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { Image, Card, Badge, Form } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import moment from "moment";
import styled from "styled-components";

import "tippy.js/animations/scale.css";
import programImage from "assets/images/Default_img.png";
import { FormSelect } from "components/elements/form-select/FormSelect";
import { getPrograms, getProgramsAfterLogin } from "services/mainApi";
import { getProgramDetails } from "services/program";

// 권한 확인
const today = new Date();
const userData = JSON.parse(window.sessionStorage.getItem("userData"));
const token = userData ? userData.exp : null;
const status = userData ? userData.status : null;
const isAdmin = token !== null && status === "ADMIN" && token < today.getTime();
const isUser = token !== null && status === "USER" && token < today.getTime();

const Whole = styled.div`
    /* border: 5px solid red; */
`;

const AllProgramsData = (props) => {
    const [programs, setPrograms] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState("전체");
    const { categoryId } = props;

    useEffect(() => {
        async function fetchPrograms() {
            try {
                let programData;
                if (isAdmin || isUser) {
                    programData = await getProgramsAfterLogin();
                } else {
                    programData = await getPrograms();
                }
                const filteredPrograms = programData.programs.filter((program) => program.categoryId === categoryId);
                setPrograms(filteredPrograms);
                console.log(categoryOptions);
            } catch (error) {
                console.error("프로그램 정보를 불러오는 동안 오류가 발생했습니다:", error);
            }
        }
        fetchPrograms();
    }, [categoryId, isAdmin, isUser]);

    // // 카테고리 ID
    // var categoryIds = programs.map(function (program) {
    //     return program.categoryId;
    // });
    // console.log("받아온 카테고리 id는 : ", categoryIds);

    const [term, setTerm] = useState("진행");
    const [searchTerm, setSearchTerm] = useState("");
    const [termLoading, setTermLoading] = useState(true);
    const [alllikeData, setAllLikeData] = useState([]);
    const [userInfo, setUserInfo] = useState();

    var ID = parseInt(window.sessionStorage.getItem("id"));

    const getFilterTerm = (event) => {
        setTermLoading(false);
        setTerm(event.target.value);
        setTermLoading(true);
    };

    const getSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    const createDday = (applyenddate) => {
        var date1 = moment(applyenddate);
        var date2 = moment();

        var days = date1.diff(date2, "days") + 1;

        if (date2 > date1) {
            return "마감";
        } else {
            return "D-" + days;
        }
    };

    // 드롭다운리스트 형식으로 구분하기
    const categoryOptions = [
        { value: "진행", label: "신청 진행" },
        { value: "전체", label: "전체" },
        { value: "대기", label: "신청 대기" },
        { value: "마감", label: "신청 마감" },
    ];

    const filterByStatus = (program) => {
        if (term === "전체") return true;
        if (term === "진행" && moment(program.applyEndDate).isAfter(moment())) return true;
        if (term === "대기" && moment(program.applyStartDate).isAfter(moment())) return true;
        if (term === "마감" && moment(program.applyEndDate).isBefore(moment())) return true;
        return false;
    };

    // 찜 추가
    const addLike = async (programID) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(
                process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/bookmarks",
                {
                    programId: programID,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log("찜 추가 성공! ");
        } catch (error) {
            console.error("찜 추가 실패! 에러 : ", error);
        }
    };

    // 찜 삭제
    const deleteLike = async (programID) => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/bookmarks/${programID}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log("찜 삭제 성공! ");
        } catch (error) {
            console.error("찜 삭제 실패! 에러 : ", error);
        }
    };

    return (
        <Whole>
            <Row>
                <Row className="justify-content-md-between  ms-2 mb-xl-0">
                    <Col xl={8} lg={6} md={6} xs={12}>
                        {/* search records */}
                        <input type="search" className="form-control mx-3" placeholder="프로그램을 검색하세요" onChange={getSearchTerm} />
                    </Col>
                    <Col xxl={2} lg={2} md={6} xs={12}>
                        <Form.Control as={FormSelect} options={categoryOptions} defaultValue={defaultCategory} onChange={getFilterTerm} />
                    </Col>
                </Row>
                <Row className="mt-4 m-3">
                    {termLoading ? (
                        programs
                            .filter((program) => program.categoryId === categoryId) // categoryId와 일치하는 프로그램만 필터링
                            .filter(filterByStatus)
                            .filter((program) => Object.values(program).join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((item, index) => {
                                // 클릭한 페이지로 이동할 수 있게 해 줌
                                var address = process.env.REACT_APP_DEPLOY_URL + "program/" + item.id.toString();
                                return (
                                    <Col lg={3} md={6} sm={12} key={index}>
                                        <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                                            <Link to={address}>
                                                {item.image ? (
                                                    <Image
                                                        src={`${process.env.REACT_APP_RESTAPI_HOST}${item.image}`}
                                                        alt=""
                                                        className="card-img-top rounded-top-md programImage"
                                                        width="100px"
                                                        height="170px"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={programImage}
                                                        alt=""
                                                        className="card-img-top rounded-top-md programImage"
                                                        width="100px"
                                                        height="170px"
                                                    />
                                                )}
                                            </Link>
                                            <Card.Body style={{ height: "6rem" }}>
                                                <span className="text-dark fw-bold">
                                                    <Badge bg="primary" className="me-3 main-program-badge">
                                                        {" "}
                                                        {createDday(item.applyEndDate)}
                                                    </Badge>
                                                </span>
                                                <h3 className="h4 text-truncate-line-2 " style={{ height: "2.7rem" }}>
                                                    <Link to={address} className="text-inherit">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row className="align-items-center g-0">
                                                    <Col className="col-auto">
                                                        <div className={`lh-1  "d-none"`}>
                                                            <div className="fw-bold">신청마감일자</div>
                                                            <div className={` mt-1 `}>{moment(item.applyEndDate).format("YY-MM-DD HH:mm")}</div>
                                                        </div>
                                                    </Col>
                                                    <Col className="col ms-2">{/* <span>{item.name}</span> */}</Col>
                                                    <Col className="col-auto">
                                                        {isAdmin || isUser ? (
                                                            <Tippy content="프로그램 찜하기" animation={"scale"}>
                                                                <Button
                                                                    onClick={() => {
                                                                        if (isAdmin) {
                                                                            alert("관리자는 찜 기능을 사용하실 수 없습니다. ");
                                                                        } else {
                                                                            if (item.isBookmarked) {
                                                                                deleteLike(item.id);
                                                                                console.log("좋아요 삭제");
                                                                            } else {
                                                                                addLike(item.id);
                                                                                console.log("좋아요 등록");
                                                                            }
                                                                        }
                                                                    }}
                                                                    type="button"
                                                                    className="p-0 bg-transparent border-0 text-primary"
                                                                >
                                                                    {item.isBookmarked ? (
                                                                        <i className="fas fa-bookmark"></i>
                                                                    ) : (
                                                                        <i className="far fa-bookmark"></i>
                                                                    )}
                                                                </Button>
                                                            </Tippy>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                );
                            })
                    ) : (
                        <></>
                    )}
                </Row>
            </Row>
        </Whole>
    );
};

export default AllProgramsData;
