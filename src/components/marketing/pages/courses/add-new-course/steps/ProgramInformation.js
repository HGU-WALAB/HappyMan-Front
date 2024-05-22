import React, { useState, useEffect } from "react";
import { Card, Row, Form, Col, InputGroup, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import PreviewDefault from "assets/images/previewDefault.png";
import DefaultImg from "assets/images/Default_img.png";
import AllProgramsData from "pages/Main/AllProgramsData";
import { Input } from "reactstrap";
import moment from "moment";

const ProgramInformation = ({ data, setProgramData }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProgramData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePosterChange = (e) => {
        const file = e.target.files[0]; // 첫 번째 파일만 처리
        console.log("선택된 파일:", file); // 파일이 잘 선택되었는지 확인
        setProgramData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleDateChange = (date, field) => {
        setProgramData((prevData) => ({
            ...prevData,
            [field]: date,
        }));
    };

    return (
        <Form>
            <Row>
                <Col className="InformationCard" xl={8} lg={12} md={12} sm={12}>
                    <Card className="mt-2 ms-2 shadow">
                        <Card.Header className="border-bottom px-4 py-3">
                            <h4 className="mb-0">프로그램 기본 정보</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Group controlId="program_title">
                                            <Form.Label>
                                                프로그램 제목 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="프로그램 제목을 입력하세요."
                                                name="name"
                                                value={data.name}
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Group controlId="teacher">
                                            <Form.Label>
                                                강사명 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="강사명을 입력하세요."
                                                name="teacher"
                                                value={data.teacher}
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12} className="mb-4">
                                        <Form.Group controlId="formProjectBrief">
                                            <Form.Label>
                                                프로그램 설명 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={10}
                                                name="information"
                                                value={data.information}
                                                placeholder="프로그램에 관한 정보를 입력하세요."
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Label>
                                            프로그램 시작 날짜 <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup className="datePicker-wrapper">
                                            <DatePicker
                                                locale={ko}
                                                selected={new Date(data.startDate)}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                onChange={(date) => handleDateChange(moment(date).format("YYYY-MM-DD HH:mm:ss"), "startDate")}
                                                className="form-control datePicker"
                                                showTimeSelect
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Label>
                                            프로그램 종료 날짜 <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup className="datePicker-wrapper">
                                            <DatePicker
                                                locale={ko}
                                                selected={new Date(data.endDate)}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                onChange={(date) => handleDateChange(moment(date).format("YYYY-MM-DD HH:mm:ss"), "endDate")}
                                                className="form-control datePicker"
                                                showTimeSelect
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Label>
                                            신청 시작 날짜 <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup className="datePicker-wrapper">
                                            <DatePicker
                                                locale={ko}
                                                selected={new Date(data.applyStartDate)}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                onChange={(date) => handleDateChange(moment(date).format("YYYY-MM-DD HH:mm:ss"), "applyStartDate")}
                                                className="form-control datePicker"
                                                showTimeSelect
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Label>
                                            신청 종료 날짜 <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup className="datePicker-wrapper">
                                            <DatePicker
                                                locale={ko}
                                                selected={new Date(data.applyEndDate)}
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                onChange={(date) => handleDateChange(moment(date).format("YYYY-MM-DD HH:mm:ss"), "applyEndDate")}
                                                className="form-control datePicker"
                                                showTimeSelect
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Group controlId="formProjectName">
                                            <Form.Label>
                                                인원 수 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quota"
                                                value={data.quota}
                                                placeholder="모집 인원 수를 입력하세요."
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Group controlId="formProjectName">
                                            <Form.Label>
                                                카테고리 ID <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="categoryId"
                                                value={data.categoryId} // 이 부분이 현재 선택된 카테고리 ID를 반영합니다.
                                                onChange={handleInputChange} // 사용자가 선택할 때 이 함수가 호출됩니다.
                                                aria-label="카테고리 선택"
                                            >
                                                <option value="1">대회</option>
                                                <option value="2">봉사</option>
                                                <option value="3">캠프</option>
                                                <option value="4">행사</option>
                                                <option value="5">맥북</option>
                                                <option value="6">프로젝트/스터디</option>
                                                <option value="7">인턴/현장실습</option>
                                                <option value="8">특강</option>
                                                <option value="9">기타</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Group controlId="formProjectName">
                                            <Form.Label>
                                                담당자 이름 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="managerName"
                                                value={data.managerName}
                                                placeholder="담당자 이름을 입력하세요."
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} xs={12} className="mb-4">
                                        <Form.Group controlId="formProjectName">
                                            <Form.Label>
                                                담당자 연락처 <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="managerContact"
                                                value={data.managerContact}
                                                placeholder="담당자 연락처를 입력하세요."
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col xl={4} lg={12} md={12} sm={12}>
                    <Card className="mb-3 me-2 mt-2 shadow">
                        <Card.Header className="border-bottom px-4 py-3">
                            <h4 className="mb-0">프로그램 포스터</h4>
                        </Card.Header>
                        <Card.Body className="p-3">
                            {data.image ? (
                                <Image width="100%" object-fit="contain" src={`${process.env.REACT_APP_RESTAPI_HOST}${data.image}`} alt="" />
                            ) : (
                                <Image width="100%" object-fit="contain" src={DefaultImg} alt="" />
                            )}
                        </Card.Body>
                    </Card>
                </Col> */}
                <Col xl={4} lg={12} md={12} sm={12}>
                    <div className="img_wrap dropzone p-2 border-dashed mb-3 d-flex justify-content-center">
                        {data.image ? (
                            <img src={`${process.env.REACT_APP_RESTAPI_HOST}${data.image}`} alt="" width="100%" />
                        ) : (
                            <img src={PreviewDefault} alt="" width="100%" />
                        )}
                    </div>
                    <Form className="upload_input">
                        <Input id="image" name="image" accept="image/jpeg, image/png, image/jpg, image/heic" type="file" onChange={handlePosterChange} />
                    </Form>
                </Col>
            </Row>
        </Form>
    );
};

export default ProgramInformation;
