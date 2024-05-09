import React, { useState, useLayoutEffect } from "react";
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";
import PreviewDefault from "assets/images/previewDefault.png";
import { Input } from "reactstrap";

const BasicInformation = (props) => {
    const { validated, next, handleChange, preview, onLoadPoster, onLoadFile } = props;
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [ApplystartDate, setApplyStartDate] = useState();
    const [ApplyendDate, setApplyEndDate] = useState();
    const [today, setToday] = useState();

    // 제출버튼 (임시)
    const submitButton = (event) => {
        event.preventDefault(); // 기본 동작 방지
        const form = {
            Title: props.data.name,
            information: props.data.information,
            applyStartDate: props.data.applyStartDate,
            applyEndDate: props.data.applyEndDate,
            startDate: props.data.startDate,
            endDate: props.data.endDate,
            managerName: props.data.managerName,
            managerContact: props.data.managerContact,
            categoryId: props.data.categoryId,
        };

        // form 객체의 내용을 콘솔에 출력
        console.log("입력된 내용:", form);

        // 다음 동작 수행
        props.submit(form);
    };

    // 입력 변수들을 하나의 객체에 담기
    const inputVariables = {
        startDate,
        endDate,
        ApplystartDate,
        ApplyendDate,
        today,
    };

    // 일자 선택을 위해 현재 일자 저장
    useLayoutEffect(() => {
        var currDate = new Date();
        setToday(currDate.setDate(currDate.getDate()));
    }, []);

    // form 내용
    return (
        <Form noValidate validated={validated} onSubmit={next}>
            {/* Card */}
            <Card className="mb-3 ">
                <Card.Header className="border-bottom px-4 py-3">
                    <h4 className="mb-0">프로그램 기본 정보</h4>
                </Card.Header>
                {/* Card body */}
                <Card.Body>
                    {/* <Form> */}
                    <Row>
                        {/* 프로그램 제목 */}
                        <Col xs={12} className="mb-4">
                            <Form.Group controlId="Title">
                                <Form.Label>
                                    프로그램 제목 <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="Title" onChange={handleChange} required />
                                <Form.Control.Feedback type="invalid">제목을 입력해주세요.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {/* 프로그램 설명 */}
                        <Col xs={12} className="mb-4">
                            <Form.Group controlId="information">
                                <Form.Label>
                                    프로그램 설명 <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    name="information"
                                    onChange={handleChange}
                                    placeholder="프로그램에 관한 정보를 입력하세요."
                                    required
                                />
                                <Form.Control.Feedback type="invalid">프로그램 설명을 입력해주세요.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {/* file */}
                        <Col xs={12} className="mb-4">
                            <Form.Group controlId="information">
                                <Form.Label>첨부 파일 1</Form.Label>
                                <Form className="upload_input">
                                    <Input id="file" name="file" type="file" onChange={onLoadFile} multiple />
                                </Form>
                            </Form.Group>
                        </Col>

                        {/* Start Date */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="start_date">
                                <Form.Label>
                                    프로그램 시작 날짜 <span className="text-danger">*</span>
                                </Form.Label>

                                <InputGroup className="datePicker-wrapper">
                                    <DatePicker
                                        required
                                        locale={ko}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="datePicker form-control"
                                        placeholderText="시작 날짜를 선택해주세요."
                                        selected={startDate}
                                        minDate={today}
                                        maxDate={endDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            props.setStart_date(date);
                                        }}
                                        showTimeSelect
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        {/* End Date */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Label>
                                프로그램 종료 날짜 <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup required>
                                <DatePicker
                                    required
                                    locale={ko}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    className="datePicker form-control"
                                    placeholderText="종료 날짜를 선택해주세요."
                                    selected={endDate}
                                    minDate={startDate}
                                    onChange={(date) => {
                                        if (startDate === undefined) {
                                            alert("프로그램 시작날짜를 먼저 선택하세요.");
                                        } else {
                                            setEndDate(date);
                                            props.setEnd_date(date);
                                        }
                                    }}
                                    showTimeSelect
                                />
                            </InputGroup>
                        </Col>

                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="Applystart_date">
                                <Form.Label>
                                    신청 시작 날짜 <span className="text-danger">*</span>
                                </Form.Label>

                                <InputGroup className="datePicker-wrapper">
                                    <DatePicker
                                        required
                                        locale={ko}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="datePicker form-control"
                                        placeholderText="시작 날짜를 선택해주세요."
                                        selected={ApplystartDate}
                                        minDate={today}
                                        // maxDate={startDate}
                                        onChange={(date) => {
                                            setApplyStartDate(date);
                                            props.setApplyStart_date(date);
                                        }}
                                        showTimeSelect
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        {/* End Date */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Label>
                                신청 마감 날짜 <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup required>
                                <DatePicker
                                    required
                                    locale={ko}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    className="datePicker form-control"
                                    placeholderText="종료 날짜를 선택해주세요."
                                    selected={ApplyendDate}
                                    minDate={ApplystartDate}
                                    // maxDate={startDate}
                                    onChange={(date) => {
                                        if (ApplystartDate === undefined) {
                                            alert("신청 시작 날짜를 먼저 선택하세요.");
                                        } else {
                                            setApplyEndDate(date);
                                            props.setApplyEnd_date(date);
                                        }
                                    }}
                                    showTimeSelect
                                />
                            </InputGroup>
                        </Col>

                        {/* 프로그램 정원 */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group>
                                <Form.Label>프로그램 정원 (입력 값이 없다면 정원은 무제한이 됩니다.)</Form.Label>
                                <Form.Control type="number" placeholder="" id="quota" name="quota" onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        {/* 카테고리 */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="categoryId">
                                <Form.Label>
                                    카테고리 <span className="text-danger">*</span>
                                </Form.Label>
                                <select class="form-select" id="categoryId" name="categoryId" onChange={handleChange} required>
                                    <option selected value="">
                                        카테고리를 선택해주세요.
                                    </option>
                                    <option value="1">대회</option>
                                    <option value="2">봉사</option>
                                    <option value="3">캠프</option>
                                    <option value="4">행사</option>
                                    <option value="5">맥북</option>
                                </select>
                                <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* 문의 */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="managerName">
                                <Form.Label>담당자</Form.Label>
                                <Form.Control type="text" placeholder="담당자 이름을 입력하세요." name="managerName" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="managerContact">
                                <Form.Label>담당자 연락처</Form.Label>
                                <Form.Control type="text" placeholder="담당자 연락처를 입력하세요." name="managerContact" onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        {/* Project Cover Image */}
                        <Col xs={5} className="mb-4">
                            <h5 className="mb-3">프로그램 이미지(포스터) </h5>
                            <div className="img_wrap dropzone p-2 border-dashed mb-3 d-flex justify-content-center">
                                {preview ? <img src={preview} alt="" width="100%" /> : <img src={PreviewDefault} alt="" width="100%" />}
                            </div>
                            {/* <form className="upload_input">
                <input type="file" id="image" accept="image/jpeg, image/png" onChange={onLoadPoster} />
              </form> */}

                            <Form className="upload_input">
                                <Input id="image" name="file" accept="image/jpeg, image/png, image/jpg, image/heic" type="file" onChange={onLoadPoster} />
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* Button */}
            <div className="d-flex justify-content-end">
                {/* type="submit" */}
                <Button variant="primary" onClick={submitButton} type="submit">
                    다음
                </Button>
            </div>
        </Form>
    );
};

export default BasicInformation;
