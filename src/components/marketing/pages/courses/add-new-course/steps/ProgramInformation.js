import React, { useState, useLayoutEffect, useEffect } from "react";
import { Card, Row, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";
import axios from "axios";
import DefaultImg from "assets/images/Default_img.png";
import { Input } from "reactstrap";
import moment from "moment";
import { getProgramDetailsAdmin } from "services/program";

const ProgramInformation = (props) => {
    const [programInformation, setProgramInformation] = useState(null);
    const [programInformationLoading, setProgramInformationLoading] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [programName, setProgramName] = useState();
    const [start_date, setStart_date] = useState();
    const [end_date, setEnd_date] = useState();
    const [editInfo, seteditInfo] = useState(null);
    const [editStart, seteditStart] = useState(false);
    const [editEnd, seteditEnd] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [Applystart_date, setApplyStart_date] = useState();
    const [Applyend_date, setApplyEnd_date] = useState();
    const [ApplystartDate, setApplyStartDate] = useState();
    const [ApplyendDate, setApplyEndDate] = useState();
    const [editApplyStart, seteditApplyStart] = useState(false);
    const [editApplyEnd, seteditApplyEnd] = useState(false);
    const [filePath, setFilePath] = useState([]);
    const [poster, setPoster] = useState();
    const [updatePoster, setUpdatePoster] = useState();
    const [preview, setPreview] = useState();
    const [updateFiles, setUpdateFiles] = useState();
    const [today, setToday] = useState();

    useEffect(() => {}, [programInformation]);

    useLayoutEffect(() => {
        var currDate = new Date();
        setToday(currDate.setDate(currDate.getDate()));

        readProgramInformation(props.param1.id);
    }, []);

    const onEdit = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        seteditInfo({
            ...editInfo,
            [name]: value,
        });
    };

    const getFormatDate = (date) => {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        var day = date.getDate(); //d
        day = day >= 10 ? day : "0" + day; //day 두자리로 저장

        var hour = date.getHours();
        hour = hour >= 10 ? hour : "0" + hour; //hour 두자리로 저장
        var minute = date.getMinutes();
        minute = minute >= 10 ? minute : "0" + minute; //minute 두자리로 저장

        return year + "-" + month + "-" + day + " " + hour + ":" + minute; //'-' 추가하여 yyyy-MM-dd HH:mm 형태 생성 가능
    };

    const readProgramInformation = async (id) => {
        console.log("ID is", id);
        setProgramInformationLoading(false);
        // const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id);
        const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/admin/programs/" + id, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });

        // const response = getProgramDetailsAdmin(id);
        console.log("pinfo : ", response.data);
        setProgramInformation(response.data);

        var filePathList = [];

        // for (var i = 0; i < response.data.length; i++) {
        //     if (response.data[i].file_type === 0) {
        //         filePathList.push(response.data[i].file_name);
        //     } else if (response.data[i].file_type === 1) {
        //         setPoster(response.data[i].file_name);
        //     }
        // }

        // console.log("yaho~~~~~~: ", response.data);
        // response.data[0].start_date = moment(response.data[0].start_date).format("YY-MM-DD HH:mm");
        // response.data[0].end_date = moment(response.data[0].end_date).format("YY-MM-DD HH:mm");
        // response.data[0].applystart_date = moment(response.data[0].applystart_date).format("YY-MM-DD HH:mm");
        // response.data[0].applyend_date = moment(response.data[0].applyend_date).format("YY-MM-DD HH:mm");

        setFilePath(filePathList);
        seteditInfo(response.data[0]);
        setStart_date(programInformation.startDate);
        // console.log("SD", startDate);
        setEnd_date(programInformation.endDate);
        setApplyStart_date(programInformation.ApplystartDate);
        setApplyEnd_date(programInformation.ApplyendDate);

        setProgramInformationLoading(true);
    };

    const edit = () => {
        setIsEdit(true);
    };

    const save = () => {
        editInformation();
        setIsEdit(false);
    };

    const editInformation = async () => {
        var params = new URLSearchParams();

        if (editStart) editInfo.start_date = getFormatDate(startDate);
        if (editEnd) editInfo.end_date = getFormatDate(endDate);
        if (editApplyStart) editInfo.applystart_date = getFormatDate(ApplystartDate);
        if (editApplyEnd) editInfo.applyend_date = getFormatDate(ApplyendDate);

        // 포스터 업데이트
        const imgFormData = new FormData();

        if (updatePoster != null) {
            imgFormData.append("program_id", editInfo.id);
            imgFormData.append("img", updatePoster);
            imgFormData.append("file_name", updatePoster.name);
            imgFormData.append("file_type", "1");
        }

        params.append("id", editInfo.id);
        params.append("program_name", editInfo.program_name);
        params.append("information", editInfo.information);
        params.append("quota", editInfo.quota);
        params.append("category_id", editInfo.category_Id);
        params.append("start_date", editInfo.start_date);
        params.append("end_date", editInfo.end_date);
        params.append("Applystart_date", editInfo.applystart_date);
        params.append("Applyend_date", editInfo.applyend_date);
        params.append("manager_name", editInfo.manager_name);
        params.append("manager_contact", editInfo.manager_contact);

        if (window.confirm("프로그램을 수정하시겠습니까?") && editInfo) {
            const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/edit", params);

            //포스터 업데이트
            if (updatePoster != null) {
                if (poster != null) {
                    const posterRes = axios({
                        url: process.env.REACT_APP_RESTAPI_HOST + "program/editPoster",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: imgFormData,
                        method: "post",
                        headers: { "Content-Type": "multipart/form-data" },
                        success: function (posterRes) {
                            console.log(posterRes);
                        },
                        error: function (error) {
                            console.log(error);
                        },
                    });
                } else {
                    const posterRes = axios({
                        url: process.env.REACT_APP_RESTAPI_HOST + "program/addPoster",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: imgFormData,
                        method: "post",
                        headers: { "Content-Type": "multipart/form-data" },
                        success: function (posterRes) {
                            console.log(posterRes);
                        },
                        error: function (error) {
                            console.log(error);
                        },
                    });
                }
            } else {
                if (poster == null) {
                    var deletePosterParam = new URLSearchParams();
                    deletePosterParam.append("program_id", editInfo.id);
                    const responseFile = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/editFile/delete", deletePosterParam);
                }
            }

            // 파일 업데이트
            if (updateFiles != null) {
                for (var i = 0; updateFiles.length; i++) {
                    const filesFormData = new FormData();
                    filesFormData.append("program_id", editInfo.id);
                    filesFormData.append("attach_file", updateFiles[i]);
                    filesFormData.append("file_name", updateFiles[i].name);
                    filesFormData.append("file_type", "0");

                    const filesRes = axios({
                        url: process.env.REACT_APP_RESTAPI_HOST + "program/editFiles",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: filesFormData,
                        method: "post",
                        headers: { "Content-Type": "multipart/form-data" },
                        success: function (filesRes) {
                            console.log(filesRes);
                        },
                        error: function (error) {
                            console.log("파일 수정 에러");
                            console.log(error);
                        },
                    });
                }
            }

            alert(" 프로그램이 수정 되었습니다.");
            seteditStart(false);
            seteditEnd(false);
            seteditApplyStart(false);
            seteditApplyEnd(false);
            readProgramInformation(props.param1.id);

            window.location.reload();
        }
    };

    const onLoadPoster = async (e) => {
        const name = e.target.name;
        const value = e.target.files[0];
        setUpdatePoster(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        seteditInfo({
            ...editInfo,
            [name]: value,
        });
    };

    const onLoadFile = async (e) => {
        const name = e.target.name;
        const value = e.target.files[0];
        setUpdateFiles(e.target.files);
        seteditInfo({
            ...editInfo,
            [name]: value,
        });
    };

    const deletePoster = () => {
        setPoster(null);
        setUpdatePoster(null);
    };

    const to_date2 = (date_str) => {
        var yyyyMMdd = String(date_str);
        var sYear = yyyyMMdd.substring(0, 4);
        var sMonth = yyyyMMdd.substring(5, 7);
        var sDate = yyyyMMdd.substring(8, 10);
        var HH = yyyyMMdd.substring(11, 13);
        var mm = yyyyMMdd.substring(14, 16);
        return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate), Number(HH), Number(mm));
    };

    return (
        <Form>
            {programInformationLoading === true ? (
                // isEdit === false ? (
                <>
                    <Row>
                        <Col className="InformationCard" xl={8} lg={12} md={12} sm={12}>
                            <Card className="mt-2 ms-2 shadow">
                                <Card.Header className="border-bottom px-4 py-3">
                                    <h4 className="mb-0">프로그램 기본 정보</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col xs={12} className="mb-4">
                                                <Form.Group controlId="program_title">
                                                    <Form.Label>
                                                        프로그램 제목 <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="프로그램 제목을 입력하세요."
                                                        name="program_title"
                                                        value={programName}
                                                        required
                                                        disabled
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
                                                        name="program_description"
                                                        value={programInformation[0].information}
                                                        placeholder="프로그램에 관한 정보를 입력하세요."
                                                        disabled
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
                                                        value={start_date}
                                                        dateFormat="yyyy-MM-dd HH:mm"
                                                        className="datePicker"
                                                        placeholderText="시작 날짜를 선택해주세요."
                                                        showTimeSelect
                                                        disabled
                                                    />
                                                </InputGroup>
                                            </Col>

                                            <Col md={6} xs={12} className="mb-4">
                                                <Form.Label>
                                                    프로그램 종료 날짜 <span className="text-danger">*</span>
                                                </Form.Label>
                                                <InputGroup>
                                                    <DatePicker
                                                        locale={ko}
                                                        value={end_date}
                                                        dateFormat="yyyy-MM-dd HH:mm"
                                                        className="datePicker"
                                                        placeholderText="종료 날짜를 선택해주세요."
                                                        // selected={endDate}
                                                        showTimeSelect
                                                        disabled
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
                                                        value={programInformation[0].applystart_date}
                                                        dateFormat="yyyy-MM-dd HH:mm"
                                                        className="datePicker"
                                                        name="Applystart_date"
                                                        placeholderText="신청 시작 날짜를 선택해주세요."
                                                        showTimeSelect
                                                        disabled
                                                    />
                                                </InputGroup>
                                            </Col>

                                            <Col md={6} xs={12} className="mb-4">
                                                <Form.Label>
                                                    신청 마감 날짜 <span className="text-danger">*</span>
                                                </Form.Label>
                                                <InputGroup>
                                                    <DatePicker
                                                        locale={ko}
                                                        value={programInformation[0].applyend_date}
                                                        dateFormat="yyyy-MM-dd HH:mm"
                                                        className="datePicker"
                                                        placeholderText="신청 마감 날짜를 선택해주세요."
                                                        name="Applyend_date"
                                                        showTimeSelect
                                                        disabled
                                                    />
                                                </InputGroup>
                                            </Col>

                                            <Col md={6} xs={12} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label>
                                                        프로그램 정원 <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="숫자만 기입"
                                                        id="program_quota"
                                                        name="program_quota"
                                                        value={programInformation[0].quota}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} xs={12} className="mb-4">
                                                <Form.Group controlId="program_category">
                                                    <Form.Label>
                                                        카테고리 <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <select
                                                        className="form-select"
                                                        id="program_category"
                                                        name="program_category"
                                                        required
                                                        disabled
                                                        value={programInformation[0].category_Id}
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
                                                    </select>
                                                    <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} xs={12} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label>담당자</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="담당자 이름을 입력하세요."
                                                        name="manager_name"
                                                        value={programInformation[0].manager_name}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} xs={12} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label>담당자 연락처</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="담당자 연락처를 입력하세요."
                                                        name="manager_contact"
                                                        value={programInformation[0].manager_contact}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {/* 
                        <Col md={6} xs={12} className="mb-4">
                          <Form.Group>
                            {filePath[0] ? (
                              <>
                                <Form.Label>첨부파일</Form.Label>
                                <br />
                                {filePath.map((item, i) => {
                                  var name = item.split("/");

                                  return (
                                    <>
                                      <a href={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + item} download target="_blank" className="ms-1">
                                        {name[2]}
                                      </a>
                                      <br />
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              ""
                            )}
                          </Form.Group>
                        </Col> */}
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} lg={12} md={12} sm={12}>
                            <Card className="mb-3 me-2 mt-2 shadow">
                                <Card.Header className="border-bottom px-4 py-3">
                                    <h4 className="mb-0">프로그램 포스터</h4>
                                </Card.Header>
                                <Card.Body className="p-3">
                                    {poster ? (
                                        <Image
                                            width="100%"
                                            object-fit="contain"
                                            src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + poster}
                                            alt=""
                                        />
                                    ) : (
                                        <Image width="100%" object-fit="contain" src={DefaultImg} alt="" />
                                    )}
                                </Card.Body>
                            </Card>
                            {filePath[0] ? (
                                <>
                                    <Card className="mb-3 me-2 shadow">
                                        <Card.Header className="border-bottom px-4 py-3">
                                            <h4 className="mb-0">첨부파일</h4>
                                        </Card.Header>
                                        <Card.Body>
                                            {filePath.map((item, i) => {
                                                var name = item.split("/");

                                                return (
                                                    <>
                                                        <a
                                                            href={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + item}
                                                            download
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {name[2]}
                                                        </a>
                                                        <br />
                                                    </>
                                                );
                                            })}
                                        </Card.Body>
                                    </Card>

                                    <br />
                                </>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>
                    {programInformation[0].status === 0 && programInformation[0].applicants_num === 0 ? (
                        <div className="d-flex justify-content-end me-4">
                            <Button variant="primary" onClick={edit}>
                                수정
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </Form>
    );
};

export default ProgramInformation;
