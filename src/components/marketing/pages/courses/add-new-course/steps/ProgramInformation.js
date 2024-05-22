// // import React, { useState, useLayoutEffect, useEffect } from "react";
// // import { Card, Row, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "assets/scss/addProgram.scss";
// // import { ko } from "date-fns/esm/locale";
// // import axios from "axios";
// // import DefaultImg from "assets/images/Default_img.png";
// // import { Input } from "reactstrap";
// // import moment from "moment";
// // import { getProgramDetailsAdmin } from "services/program";
// // import { setIn } from "formik";

// // const ProgramInformation = (props, data) => {
// //     const [programInformation, setProgramInformation] = useState(null);
// //     const [programInformationLoading, setProgramInformationLoading] = useState(null);
// //     const [isEdit, setIsEdit] = useState(false);
// //     const [name, setName] = useState();
// //     const [information, setInformation] = useState();
// //     const [startDate, setStartDate] = useState();
// //     const [endDate, setEndDate] = useState();
// //     const [applyStartDate, setApplyStartDate] = useState();
// //     const [applyEndDate, setApplyEndDate] = useState();
// //     const [quota, setQuota] = useState();
// //     const [currentQuota, setCurrentQuota] = useState();
// //     const [category, setCategory] = useState();
// //     const [managerName, setManegerName] = useState();
// //     const [manegerContact, setManegerContact] = useState();
// //     const [filePath, setFilePath] = useState([]);
// //     const [poster, setPoster] = useState();
// //     const [updatePoster, setUpdatePoster] = useState();
// //     const [preview, setPreview] = useState();
// //     const [updateFiles, setUpdateFiles] = useState();
// //     const [today, setToday] = useState();

// //     console.log("PID", props.param1.id);
// //     console.log("name", props.data.name);

// //     useEffect(() => {
// //         setName(props.data.name);
// //         setInformation(props.data.information);
// //         setStartDate(props.data.startDate);
// //         setEndDate(props.data.endDate);
// //         setApplyStartDate(props.data.applyStartDate);
// //         setApplyEndDate(props.data.applyEndDate);
// //         setQuota(props.data.quota);
// //         setCurrentQuota(props.data.currentQuota);
// //         setCategory(props.data.category);
// //         setManegerName(props.data.managerName);
// //         setManegerContact(props.data.manegerContact);
// //     }, [props.data]);
// //     //     var currDate = new Date();
// //     //     setToday(currDate.setDate(currDate.getDate()));

// //     //     const response = getProgramDetailsAdmin(props.param1.id);
// //     //     const programData = response.data;
// //     //     setName(programData.name);
// //     // }, []);

// //     // useLayoutEffect(() => {
// //     //     var currDate = new Date();
// //     //     setToday(currDate.setDate(currDate.getDate()));

// //     //     const response = getProgramDetailsAdmin(props.param1.id);
// //     //     const programData = response.data;
// //     //     setName(programData.name);
// //     // }, []);

// //     // const onEdit = (e) => {
// //     //     const name = e.target.name;
// //     //     const value = e.target.value;

// //     //     seteditInfo({
// //     //         ...editInfo,
// //     //         [name]: value,
// //     //     });
// //     // };

// //     // const getFormatDate = (date) => {
// //     //     var year = date.getFullYear(); //yyyy
// //     //     var month = 1 + date.getMonth(); //M
// //     //     month = month >= 10 ? month : "0" + month; //month 두자리로 저장
// //     //     var day = date.getDate(); //d
// //     //     day = day >= 10 ? day : "0" + day; //day 두자리로 저장

// //     //     var hour = date.getHours();
// //     //     hour = hour >= 10 ? hour : "0" + hour; //hour 두자리로 저장
// //     //     var minute = date.getMinutes();
// //     //     minute = minute >= 10 ? minute : "0" + minute; //minute 두자리로 저장

// //     //     return year + "-" + month + "-" + day + " " + hour + ":" + minute; //'-' 추가하여 yyyy-MM-dd HH:mm 형태 생성 가능
// //     // };

// //     // const readProgramInformation = async (id) => {
// //     //     console.log("ID is", id);
// //     //     setProgramInformationLoading(false);
// //     //     // const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id);
// //     //     const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/admin/programs/" + id, {
// //     //         headers: {
// //     //             Authorization: "Bearer " + sessionStorage.getItem("token"),
// //     //         },
// //     //     });

// //     //     // const response = getProgramDetailsAdmin(id);
// //     //     console.log("pinfo : ", response.data);
// //     //     setProgramInformation(response.data);

// //     //     var filePathList = [];

// //     //     setFilePath(filePathList);
// //     //     seteditInfo(response.data[0]);
// //     //     setStart_date(programInformation.startDate);
// //     //     // console.log("SD", startDate);
// //     //     setEnd_date(programInformation.endDate);
// //     //     setApplyStart_date(programInformation.ApplystartDate);
// //     //     setApplyEnd_date(programInformation.ApplyendDate);

// //     //     setProgramInformationLoading(true);
// //     // };

// //     // const edit = () => {
// //     //     setIsEdit(true);
// //     // };

// //     // const save = () => {
// //     //     editInformation();
// //     //     setIsEdit(false);
// //     // };

// //     // const editInformation = async () => {
// //     //     var params = new URLSearchParams();

// //     //     if (editStart) editInfo.start_date = getFormatDate(startDate);
// //     //     if (editEnd) editInfo.end_date = getFormatDate(endDate);
// //     //     if (editApplyStart) editInfo.applystart_date = getFormatDate(ApplystartDate);
// //     //     if (editApplyEnd) editInfo.applyend_date = getFormatDate(ApplyendDate);

// //     //     // 포스터 업데이트
// //     //     const imgFormData = new FormData();

// //     //     if (updatePoster != null) {
// //     //         imgFormData.append("program_id", editInfo.id);
// //     //         imgFormData.append("img", updatePoster);
// //     //         imgFormData.append("file_name", updatePoster.name);
// //     //         imgFormData.append("file_type", "1");
// //     //     }

// //     //     params.append("id", editInfo.id);
// //     //     params.append("program_name", editInfo.program_name);
// //     //     params.append("information", editInfo.information);
// //     //     params.append("quota", editInfo.quota);
// //     //     params.append("category_id", editInfo.category_Id);
// //     //     params.append("start_date", editInfo.start_date);
// //     //     params.append("end_date", editInfo.end_date);
// //     //     params.append("Applystart_date", editInfo.applystart_date);
// //     //     params.append("Applyend_date", editInfo.applyend_date);
// //     //     params.append("manager_name", editInfo.manager_name);
// //     //     params.append("manager_contact", editInfo.manager_contact);

// //     //     if (window.confirm("프로그램을 수정하시겠습니까?") && editInfo) {
// //     //         const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/edit", params);

// //     //         //포스터 업데이트
// //     //         if (updatePoster != null) {
// //     //             if (poster != null) {
// //     //                 const posterRes = axios({
// //     //                     url: process.env.REACT_APP_RESTAPI_HOST + "program/editPoster",
// //     //                     cache: false,
// //     //                     contentType: false,
// //     //                     processData: false,
// //     //                     data: imgFormData,
// //     //                     method: "post",
// //     //                     headers: { "Content-Type": "multipart/form-data" },
// //     //                     success: function (posterRes) {
// //     //                         console.log(posterRes);
// //     //                     },
// //     //                     error: function (error) {
// //     //                         console.log(error);
// //     //                     },
// //     //                 });
// //     //             } else {
// //     //                 const posterRes = axios({
// //     //                     url: process.env.REACT_APP_RESTAPI_HOST + "program/addPoster",
// //     //                     cache: false,
// //     //                     contentType: false,
// //     //                     processData: false,
// //     //                     data: imgFormData,
// //     //                     method: "post",
// //     //                     headers: { "Content-Type": "multipart/form-data" },
// //     //                     success: function (posterRes) {
// //     //                         console.log(posterRes);
// //     //                     },
// //     //                     error: function (error) {
// //     //                         console.log(error);
// //     //                     },
// //     //                 });
// //     //             }
// //     //         } else {
// //     //             if (poster == null) {
// //     //                 var deletePosterParam = new URLSearchParams();
// //     //                 deletePosterParam.append("program_id", editInfo.id);
// //     //                 const responseFile = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/editFile/delete", deletePosterParam);
// //     //             }
// //     //         }

// //     //         // 파일 업데이트
// //     //         if (updateFiles != null) {
// //     //             for (var i = 0; updateFiles.length; i++) {
// //     //                 const filesFormData = new FormData();
// //     //                 filesFormData.append("program_id", editInfo.id);
// //     //                 filesFormData.append("attach_file", updateFiles[i]);
// //     //                 filesFormData.append("file_name", updateFiles[i].name);
// //     //                 filesFormData.append("file_type", "0");

// //     //                 const filesRes = axios({
// //     //                     url: process.env.REACT_APP_RESTAPI_HOST + "program/editFiles",
// //     //                     cache: false,
// //     //                     contentType: false,
// //     //                     processData: false,
// //     //                     data: filesFormData,
// //     //                     method: "post",
// //     //                     headers: { "Content-Type": "multipart/form-data" },
// //     //                     success: function (filesRes) {
// //     //                         console.log(filesRes);
// //     //                     },
// //     //                     error: function (error) {
// //     //                         console.log("파일 수정 에러");
// //     //                         console.log(error);
// //     //                     },
// //     //                 });
// //     //             }
// //     //         }

// //     //         alert(" 프로그램이 수정 되었습니다.");
// //     //         seteditStart(false);
// //     //         seteditEnd(false);
// //     //         seteditApplyStart(false);
// //     //         seteditApplyEnd(false);
// //     //         readProgramInformation(props.param1.id);

// //     //         window.location.reload();
// //     //     }
// //     // };

// //     // const onLoadPoster = async (e) => {
// //     //     const name = e.target.name;
// //     //     const value = e.target.files[0];
// //     //     setUpdatePoster(e.target.files[0]);
// //     //     setPreview(URL.createObjectURL(e.target.files[0]));
// //     //     seteditInfo({
// //     //         ...editInfo,
// //     //         [name]: value,
// //     //     });
// //     // };

// //     // const onLoadFile = async (e) => {
// //     //     const name = e.target.name;
// //     //     const value = e.target.files[0];
// //     //     setUpdateFiles(e.target.files);
// //     //     seteditInfo({
// //     //         ...editInfo,
// //     //         [name]: value,
// //     //     });
// //     // };

// //     // const deletePoster = () => {
// //     //     setPoster(null);
// //     //     setUpdatePoster(null);
// //     // };

// //     // const to_date2 = (date_str) => {
// //     //     var yyyyMMdd = String(date_str);
// //     //     var sYear = yyyyMMdd.substring(0, 4);
// //     //     var sMonth = yyyyMMdd.substring(5, 7);
// //     //     var sDate = yyyyMMdd.substring(8, 10);
// //     //     var HH = yyyyMMdd.substring(11, 13);
// //     //     var mm = yyyyMMdd.substring(14, 16);
// //     //     return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate), Number(HH), Number(mm));
// //     // };

// //     return (
// //         <Form>
// //             <Row>
// //                 <Col className="InformationCard" xl={8} lg={12} md={12} sm={12}>
// //                     <Card className="mt-2 ms-2 shadow">
// //                         <Card.Header className="border-bottom px-4 py-3">
// //                             <h4 className="mb-0">프로그램 기본 정보</h4>
// //                         </Card.Header>
// //                         <Card.Body>
// //                             <Form>
// //                                 <Row>
// //                                     <Col xs={12} className="mb-4">
// //                                         <Form.Group controlId="program_title">
// //                                             <Form.Label>
// //                                                 프로그램 제목 <span className="text-danger">*</span>
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="프로그램 제목을 입력하세요."
// //                                                 name="program_title"
// //                                                 value={name}
// //                                                 required
// //                                                 disabled
// //                                             />
// //                                         </Form.Group>
// //                                     </Col>

// //                                     <Col xs={12} className="mb-4">
// //                                         <Form.Group controlId="formProjectBrief">
// //                                             <Form.Label>
// //                                                 프로그램 설명 <span className="text-danger">*</span>
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 as="textarea"
// //                                                 rows={10}
// //                                                 name="program_description"
// //                                                 value={information}
// //                                                 placeholder="프로그램에 관한 정보를 입력하세요."
// //                                                 disabled
// //                                             />
// //                                         </Form.Group>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Label>
// //                                             프로그램 시작 날짜 <span className="text-danger">*</span>
// //                                         </Form.Label>
// //                                         <InputGroup className="datePicker-wrapper">
// //                                             <DatePicker
// //                                                 locale={ko}
// //                                                 value={startDate}
// //                                                 dateFormat="yyyy-MM-dd HH:mm"
// //                                                 className="datePicker"
// //                                                 placeholderText="시작 날짜를 선택해주세요."
// //                                                 showTimeSelect
// //                                                 disabled
// //                                             />
// //                                         </InputGroup>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Label>
// //                                             프로그램 종료 날짜 <span className="text-danger">*</span>
// //                                         </Form.Label>
// //                                         <InputGroup>
// //                                             <DatePicker
// //                                                 locale={ko}
// //                                                 value={endDate}
// //                                                 dateFormat="yyyy-MM-dd HH:mm"
// //                                                 className="datePicker"
// //                                                 placeholderText="종료 날짜를 선택해주세요."
// //                                                 // selected={endDate}
// //                                                 showTimeSelect
// //                                                 disabled
// //                                             />
// //                                         </InputGroup>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Label>
// //                                             신청 시작 날짜 <span className="text-danger">*</span>
// //                                         </Form.Label>
// //                                         <InputGroup className="datePicker-wrapper">
// //                                             <DatePicker
// //                                                 locale={ko}
// //                                                 value={applyStartDate}
// //                                                 dateFormat="yyyy-MM-dd HH:mm"
// //                                                 className="datePicker"
// //                                                 name="Applystart_date"
// //                                                 placeholderText="신청 시작 날짜를 선택해주세요."
// //                                                 showTimeSelect
// //                                                 disabled
// //                                             />
// //                                         </InputGroup>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Label>
// //                                             신청 마감 날짜 <span className="text-danger">*</span>
// //                                         </Form.Label>
// //                                         <InputGroup>
// //                                             <DatePicker
// //                                                 locale={ko}
// //                                                 value={applyEndDate}
// //                                                 dateFormat="yyyy-MM-dd HH:mm"
// //                                                 className="datePicker"
// //                                                 placeholderText="신청 마감 날짜를 선택해주세요."
// //                                                 name="Applyend_date"
// //                                                 showTimeSelect
// //                                                 disabled
// //                                             />
// //                                         </InputGroup>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Group>
// //                                             <Form.Label>
// //                                                 프로그램 정원 <span className="text-danger">*</span>
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="숫자만 기입"
// //                                                 id="program_quota"
// //                                                 name="program_quota"
// //                                                 value={quota}
// //                                                 disabled
// //                                             />
// //                                         </Form.Group>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Group controlId="program_category">
// //                                             <Form.Label>
// //                                                 카테고리 <span className="text-danger">*</span>
// //                                             </Form.Label>
// //                                             <select className="form-select" id="program_category" name="program_category" required disabled value={category}>
// //                                                 <option value="1">대회</option>
// //                                                 <option value="2">봉사</option>
// //                                                 <option value="3">캠프</option>
// //                                                 <option value="4">행사</option>
// //                                                 <option value="5">맥북</option>
// //                                                 <option value="6">프로젝트/스터디</option>
// //                                                 <option value="7">인턴/현장실습</option>
// //                                                 <option value="8">특강</option>
// //                                                 <option value="9">기타</option>
// //                                             </select>
// //                                             <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
// //                                         </Form.Group>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Group>
// //                                             <Form.Label>담당자</Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="담당자 이름을 입력하세요."
// //                                                 name="manager_name"
// //                                                 value={managerName}
// //                                                 disabled
// //                                             />
// //                                         </Form.Group>
// //                                     </Col>

// //                                     <Col md={6} xs={12} className="mb-4">
// //                                         <Form.Group>
// //                                             <Form.Label>담당자 연락처</Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="담당자 연락처를 입력하세요."
// //                                                 name="manager_contact"
// //                                                 value={manegerContact}
// //                                                 disabled
// //                                             />
// //                                         </Form.Group>
// //                                     </Col>
// //                                 </Row>
// //                             </Form>
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>
// //         </Form>
// //     );
// // };

// // export default ProgramInformation;

// import React, { useState, useEffect } from "react";
// import { Card, Row, Form, Col, InputGroup } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { ko } from "date-fns/esm/locale";

// const ProgramInformation = (props) => {
//     const [name, setName] = useState("");
//     const [information, setInformation] = useState("");
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [applyStartDate, setApplyStartDate] = useState(new Date());
//     const [applyEndDate, setApplyEndDate] = useState(new Date());
//     const [quota, setQuota] = useState("");
//     const [category, setCategory] = useState("");
//     const [managerName, setManagerName] = useState("");
//     const [managerContact, setManagerContact] = useState("");

//     console.log("PID", props.param1.id);
//     console.log("name", props.data.name);

//     useEffect(() => {
//         setName(props.data.name);
//         setInformation(props.data.information);
//         setStartDate(new Date(props.data.startDate));
//         setEndDate(new Date(props.data.endDate));
//         setApplyStartDate(new Date(props.data.applyStartDate));
//         setApplyEndDate(new Date(props.data.applyEndDate));
//         setQuota(props.data.quota);
//         setCategory(props.data.categoryId);
//         setManagerName(props.data.managerName);
//         setManagerContact(props.data.managerContact);
//     }, [props.data]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         switch (name) {
//             case "program_title":
//                 setName(value);
//                 break;
//             case "program_description":
//                 setInformation(value);
//                 break;
//             case "program_quota":
//                 setQuota(value);
//                 break;
//             case "manager_name":
//                 setManagerName(value);
//                 break;
//             case "manager_contact":
//                 setManagerContact(value);
//                 break;
//             case "program_category":
//                 setCategory(value);
//                 break;
//             default:
//                 break;
//         }
//         console.log(`${name}: ${value}`);
//     };

//     return (
//         <Form>
//             <Row>
//                 <Col className="InformationCard" xl={8} lg={12} md={12} sm={12}>
//                     <Card className="mt-2 ms-2 shadow">
//                         <Card.Header className="border-bottom px-4 py-3">
//                             <h4 className="mb-0">프로그램 기본 정보</h4>
//                         </Card.Header>
//                         <Card.Body>
//                             <Form>
//                                 <Row>
//                                     <Col xs={12} className="mb-4">
//                                         <Form.Group controlId="program_title">
//                                             <Form.Label>
//                                                 프로그램 제목 <span className="text-danger">*</span>
//                                             </Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="프로그램 제목을 입력하세요."
//                                                 name="program_title"
//                                                 value={name}
//                                                 required
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                         9
//                                     </Col>

//                                     <Col xs={12} className="mb-4">
//                                         <Form.Group controlId="formProjectBrief">
//                                             <Form.Label>
//                                                 프로그램 설명 <span className="text-danger">*</span>
//                                             </Form.Label>
//                                             <Form.Control
//                                                 as="textarea"
//                                                 rows={10}
//                                                 name="program_description"
//                                                 value={information}
//                                                 placeholder="프로그램에 관한 정보를 입력하세요."
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Label>
//                                             프로그램 시작 날짜 <span className="text-danger">*</span>
//                                         </Form.Label>
//                                         <InputGroup className="datePicker-wrapper">
//                                             <DatePicker
//                                                 locale={ko}
//                                                 selected={startDate}
//                                                 dateFormat="yyyy-MM-dd HH:mm"
//                                                 className="datePicker"
//                                                 placeholderText="시작 날짜를 선택해주세요."
//                                                 showTimeSelect
//                                                 onChange={(date) => {
//                                                     setStartDate(date);
//                                                     console.log("startDate:", date);
//                                                 }}
//                                             />
//                                         </InputGroup>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Label>
//                                             프로그램 종료 날짜 <span className="text-danger">*</span>
//                                         </Form.Label>
//                                         <InputGroup>
//                                             <DatePicker
//                                                 locale={ko}
//                                                 selected={endDate}
//                                                 dateFormat="yyyy-MM-dd HH:mm"
//                                                 className="datePicker"
//                                                 placeholderText="종료 날짜를 선택해주세요."
//                                                 showTimeSelect
//                                                 onChange={(date) => {
//                                                     setEndDate(date);
//                                                     console.log("endDate:", date);
//                                                 }}
//                                             />
//                                         </InputGroup>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Label>
//                                             신청 시작 날짜 <span className="text-danger">*</span>
//                                         </Form.Label>
//                                         <InputGroup className="datePicker-wrapper">
//                                             <DatePicker
//                                                 locale={ko}
//                                                 selected={applyStartDate}
//                                                 dateFormat="yyyy-MM-dd HH:mm"
//                                                 className="datePicker"
//                                                 name="applyStartDate"
//                                                 placeholderText="신청 시작 날짜를 선택해주세요."
//                                                 showTimeSelect
//                                                 onChange={(date) => {
//                                                     setApplyStartDate(date);
//                                                     console.log("applyStartDate:", date);
//                                                 }}
//                                             />
//                                         </InputGroup>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Label>
//                                             신청 마감 날짜 <span className="text-danger">*</span>
//                                         </Form.Label>
//                                         <InputGroup>
//                                             <DatePicker
//                                                 locale={ko}
//                                                 selected={applyEndDate}
//                                                 dateFormat="yyyy-MM-dd HH:mm"
//                                                 className="datePicker"
//                                                 placeholderText="신청 마감 날짜를 선택해주세요."
//                                                 name="applyEndDate"
//                                                 showTimeSelect
//                                                 onChange={(date) => {
//                                                     setApplyEndDate(date);
//                                                     console.log("applyEndDate:", date);
//                                                 }}
//                                             />
//                                         </InputGroup>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Group>
//                                             <Form.Label>
//                                                 프로그램 정원 <span className="text-danger">*</span>
//                                             </Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="숫자만 기입"
//                                                 id="program_quota"
//                                                 name="program_quota"
//                                                 value={quota}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Group controlId="program_category">
//                                             <Form.Label>
//                                                 카테고리 <span className="text-danger">*</span>
//                                             </Form.Label>
//                                             <select
//                                                 className="form-select"
//                                                 id="program_category"
//                                                 name="program_category"
//                                                 required
//                                                 value={category}
//                                                 onChange={handleInputChange}
//                                             >
//                                                 <option value="1">대회</option>
//                                                 <option value="2">봉사</option>
//                                                 <option value="3">캠프</option>
//                                                 <option value="4">행사</option>
//                                                 <option value="5">맥북</option>
//                                                 <option value="6">프로젝트/스터디</option>
//                                                 <option value="7">인턴/현장실습</option>
//                                                 <option value="8">특강</option>
//                                                 <option value="9">기타</option>
//                                             </select>
//                                             <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
//                                         </Form.Group>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Group>
//                                             <Form.Label>담당자</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="담당자 이름을 입력하세요."
//                                                 name="manager_name"
//                                                 value={managerName}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>

//                                     <Col md={6} xs={12} className="mb-4">
//                                         <Form.Group>
//                                             <Form.Label>담당자 연락처</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="담당자 연락처를 입력하세요."
//                                                 name="manager_contact"
//                                                 value={managerContact}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Form>
//     );
// };

// export default ProgramInformation;

import React, { useState, useEffect } from "react";
import { Card, Row, Form, Col, InputGroup, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import DefaultImg from "assets/images/Default_img.png";
import AllProgramsData from "pages/Main/AllProgramsData";

const ProgramInformation = ({ data, setProgramData }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProgramData((prevData) => ({
            ...prevData,
            [name]: value,
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
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) => handleDateChange(date, "startDate")}
                                                className="form-control datePicker"
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
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) => handleDateChange(date, "endDate")}
                                                className="form-control datePicker"
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
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) => handleDateChange(date, "applyStartDate")}
                                                className="form-control datePicker"
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
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) => handleDateChange(date, "applyEndDate")}
                                                className="form-control datePicker"
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
                <Col xl={4} lg={12} md={12} sm={12}>
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
                </Col>
            </Row>
        </Form>
    );
};

export default ProgramInformation;
