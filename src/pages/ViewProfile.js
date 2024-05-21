import { Form, Image, Button, Card, Col, Row } from "react-bootstrap";
import React, { useState, useLayoutEffect, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";
import { FlatPickr } from "components/elements/flat-pickr/FlatPickr";
import data from "../layouts/form/data.json";

import axios from "axios";

const ViewProfile = (props) => {
    const customStyles = {
        control: (base) => ({
            ...base,
            height: 48.4,
            border: "1px solid #e8e7ed",
        }),
    };

    useEffect(() => {
        console.log(props.userInfo.name);
    });

    return (
        <Card className="border-0">
            <Card.Header>
                <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">프로필 정보</h3>
                    <p className="mb-0">이곳에서 본인의 프로필 정보를 확인하실 수 있습니다.</p>
                </div>
            </Card.Header>
            <Card.Body>
                {/* <hr className="my-5" /> */}
                <div>
                    <h4 className="mb-4">개인 정보</h4>
                    {/* Form */}
                    <Form>
                        <Row>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" id="name" name="name" placeholder="이름을 입력하세요 " value={props.userInfo.name} readOnly />
                            </Col>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>학번 </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="student_id"
                                    name="student_id"
                                    placeholder="학번을 입력하세요"
                                    value={props.userInfo.uniqueId}
                                    readOnly
                                />
                            </Col>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>학년 </Form.Label>
                                <Form.Control
                                    type="number"
                                    id="student_class"
                                    name="student_class"
                                    min="1"
                                    max="12"
                                    placeholder="학년 "
                                    value={props.userInfo.grade}
                                    readOnly
                                />
                            </Col>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>학기 </Form.Label>
                                <Form.Control
                                    type="number"
                                    id="semester"
                                    name="semester"
                                    min="1"
                                    max="12"
                                    placeholder="학기 "
                                    value={props.userInfo.semester}
                                    readOnly
                                />
                            </Col>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>이메일 </Form.Label>
                                <Form.Control type="email" id="email" name="email" placeholder="이메일을 입력하세요 " value={props.userInfo.email} readOnly />
                            </Col>
                            {/* <Col lg={6} md={6} className="mb-3">
                                <Form.Label>전화 </Form.Label>
                                <Form.Control
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="전화번호를 입력하세요 "
                                    value="{props.userInfo[0].phone}"
                                    required
                                    readOnly
                                />
                            </Col> */}
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>학부</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="department"
                                    name="department"
                                    placeholder="학부를 입력하세요 "
                                    value={props.userInfo.department}
                                    readOnly
                                />
                            </Col>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>전공 1</Form.Label>
                                <Form.Control type="text" id="major1" name="major1" placeholder="1전공 " value={props.userInfo.major1} readOnly />
                            </Col>
                            <Col lg={6} md={6} className="mb-3">
                                <Form.Label>전공 2</Form.Label>
                                <Form.Control type="text" id="major2" name="major2" placeholder="2전공 " value={props.userInfo.major2} readOnly />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ViewProfile;
