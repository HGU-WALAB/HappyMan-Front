// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Image, Card, ProgressBar, ListGroup, Badge, Form } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import moment from "moment";

import "tippy.js/animations/scale.css";
// import custom components
import programImage from "assets/images/Default_img.png";

const Bookmark = () => {
    const [toggleBookmark, setToggleBookmark] = useState(false);
    const [alllikeData, setAllLikeData] = useState([]);
    const [likedPrograms, setLikedPrograms] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);

    var ID = parseInt(window.sessionStorage.getItem("id"));

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        readLikedPrograms();
    }, []);

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

    const readLikedPrograms = async () => {
        var params = new URLSearchParams();
        params.append("user_id", ID);
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/bookmark", params);
        setLikedPrograms(response.data);
        console.log("Liked Programs: ", response.data);
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
        <>
            <Card>
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h3 className="mb-0">찜한 프로그램</h3>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row>
                        {bookmarked.map((item, index) => {
                            var address = "/program/" + item.id.toString();
                            return (
                                <Col lg={4} md={12} sm={12} key={index}>
                                    <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                                        <Link to={address}>
                                            {/* <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" /> */}
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
                                                    {createDday(item.applyend_date)}
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
                                                        <div className={` mt-1 `}>{item.applyEndDate}</div>
                                                    </div>
                                                </Col>
                                                <Col className="col ms-2"></Col>
                                                <Col className="col-auto">
                                                    <Tippy content="찜 삭제하기" animation={"scale"}>
                                                        <Button
                                                            onClick={() => deleteLike(item.id)}
                                                            type="button"
                                                            className="p-0 bg-transparent border-0 text-primary"
                                                        >
                                                            <i className="fe fe-trash"></i>
                                                        </Button>
                                                    </Tippy>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default Bookmark;
