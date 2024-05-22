import React, { useState, useLayoutEffect } from "react";
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";
import PreviewDefault from "assets/images/previewDefault.png";
import { Input } from "reactstrap";
import moment from "moment";

const BasicInformation = (props) => {
    const { validated, next, handleChange, onLoadPoster, onLoadFile, preview, setFormData } = props;
    const { name, information, applyStartDate, applyEndDate, startDate, endDate, managerName, managerContact, categoryId, teacher } = props.data;
    const [today, setToday] = useState(new Date());

    // // 제출버튼 (임시)
    // const submitButton = (event) => {
    //     event.preventDefault(); // 기본 동작 방지
    //     const form = {
    //         Title: name,
    //         information: information,
    //         applyStartDate: moment(applyStartDate).format("YYYY-MM-DD HH:mm:ss"),
    //         applyEndDate: moment(applyEndDate).format("YYYY-MM-DD HH:mm:ss"),
    //         startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
    //         endDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
    //         managerName: managerName,
    //         managerContact: managerContact,
    //         categoryId: categoryId,
    //     };

    //     // form 객체의 내용을 콘솔에 출력
    //     console.log("입력된 내용:", form);

    //     next();
    // };

    // 일자 선택을 위해 현재 일자 저장
    useLayoutEffect(() => {
        setToday(new Date());
    }, []);

    const handleImageSelection = (e) => {
        const file = e.target.files[0]; // 선택한 이미지 파일
        onLoadPoster(e); // 미리보기 업데이트를 위해 onLoadPoster 함수 호출
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file, // formData의 image 필드에 이미지 파일을 할당
        }));
    };

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
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="Title">
                                <Form.Label>
                                    프로그램 제목 <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="name" onChange={handleChange} required />
                                <Form.Control.Feedback type="invalid">제목을 입력해주세요.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* 프로그램 제목 */}
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="Teacher">
                                <Form.Label>
                                    강사명 <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control type="text" placeholder="강사 이름을 입력하세요." name="teacher" onChange={handleChange} required />
                                <Form.Control.Feedback type="invalid">강사명을 입력해주세요.</Form.Control.Feedback>
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
                                    value={information}
                                />
                                <Form.Control.Feedback type="invalid">프로그램 설명을 입력해주세요.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {/* file */}
                        <Col xs={12} className="mb-4">
                            <Form.Group controlId="information">
                                <Form.Label>첨부 파일 </Form.Label>
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
                                            handleChange({ target: { name: "startDate", value: moment(date).format("YYYY-MM-DD HH:mm:ss") } });
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
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    className="datePicker form-control"
                                    placeholderText="종료 날짜를 선택해주세요."
                                    selected={endDate}
                                    minDate={startDate}
                                    onChange={(date) => {
                                        if (startDate === undefined) {
                                            alert("프로그램 시작날짜를 먼저 선택하세요.");
                                        } else {
                                            const formattedEndDate = moment(date).format("YYYY-MM-DD HH:mm");
                                            console.log("ED : ", formattedEndDate);
                                            handleChange({ target: { name: "endDate", value: moment(date).format("YYYY-MM-DD HH:mm:ss") } });
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
                                        selected={applyStartDate}
                                        minDate={today}
                                        // maxDate={startDate}
                                        onChange={(date) => {
                                            handleChange({ target: { name: "applyStartDate", value: moment(date).format("YYYY-MM-DD HH:mm:ss") } });
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
                                    selected={applyEndDate}
                                    minDate={applyStartDate}
                                    // maxDate={startDate}
                                    onChange={(date) => {
                                        if (applyStartDate === undefined) {
                                            alert("신청 시작 날짜를 먼저 선택하세요.");
                                        } else {
                                            handleChange({ target: { name: "applyEndDate", value: moment(date).format("YYYY-MM-DD HH:mm:ss") } });
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
                                <select className="form-select" id="categoryId" name="categoryId" onChange={handleChange} required value={categoryId}>
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
                                <Form.Control
                                    type="text"
                                    placeholder="담당자 이름을 입력하세요."
                                    name="managerName"
                                    onChange={handleChange}
                                    value={managerName}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Group controlId="managerContact">
                                <Form.Label>담당자 연락처</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="담당자 연락처를 입력하세요."
                                    name="managerContact"
                                    onChange={handleChange}
                                    value={managerContact}
                                />
                            </Form.Group>
                        </Col>

                        {/* Project Cover Image */}
                        {/* Project Cover Image */}
                        <Col xs={5} className="mb-4">
                            <h5 className="mb-3">프로그램 이미지(포스터) </h5>
                            <div className="img_wrap dropzone p-2 border-dashed mb-3 d-flex justify-content-center">
                                {preview ? <img src={preview} alt="" width="100%" /> : <img src={PreviewDefault} alt="" width="100%" />}
                            </div>
                            <Form className="upload_input">
                                <Input
                                    id="image"
                                    name="file"
                                    accept="image/jpeg, image/png, image/jpg, image/heic"
                                    type="file"
                                    onChange={handleImageSelection}
                                />
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* Button */}
            <div className="d-flex justify-content-end">
                {/* type="submit" */}
                <Button variant="primary" type="submit">
                    다음
                </Button>
            </div>
        </Form>
    );
};

export default BasicInformation;
