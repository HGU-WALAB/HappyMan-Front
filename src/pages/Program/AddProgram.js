import React, { useState, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import custom components
import GKStepper from "components/elements/stepper/GKStepper";

// import sub components ( Steps )
import BasicInformation from "components/marketing/pages/courses/add-new-course/steps/BasicInformation";
import ApplicationFormPractice from "pages/Program/ApplicationFormPractice";
import SurveyForm from "pages/SurveyForm";

const AddNewCourse = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [poster, setPoster] = useState();
    const [files, setFiles] = useState();
    const [start_date, setStart_date] = useState(new Date());
    const [end_date, setEnd_date] = useState(new Date());
    const [Applystart_date, setApplyStart_date] = useState(new Date());
    const [Applyend_date, setApplyEnd_date] = useState(new Date());
    const [validated, setValidated] = useState(false);
    const [preview, setPreview] = useState();
    const [application, setApplication] = useState();
    const [formData, setFormData] = useState({
        image: "img", // 프로그램 포스터
        name: "Title", // 프로그램명
        quota: "1", // 프로그램 정원
        information: "0", // 프로그램 정보
        applyStartDate: "",
        applyEndDate: "",
        startDate: "",
        endDate: "",
        managerName: "",
        managerContact: "",
        categoryId: "",
    });

    const onLoadPoster = async (e) => {
        setPoster(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const onLoadFile = async (e) => {
        setFiles(e.target.files);
    };

    const handleChange = (event) => {
        // 입력된 값과 해당 입력 필드의 이름 출력
        console.log("입력된 값:", event.target.value);
        console.log("입력 필드의 이름:", event.target.name);
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // 정보 받아오기
    const getFormatDate = (date) => {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장. 10월 밑이면 앞에 0 붙이기
        var day = date.getDate(); //d
        day = day >= 10 ? day : "0" + day; //day 두자리로 저장

        var hour = date.getHours();
        hour = hour >= 10 ? hour : "0" + hour; //hour 두자리로 저장
        var minute = date.getMinutes();
        minute = minute >= 10 ? minute : "0" + minute; //minute 두자리로 저장

        return year + "-" + month + "-" + day + " " + hour + ":" + minute; //'-' 추가하여 yyyy-MM-dd HH:mm 형태 생성 가능
    };

    const next = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
        }
        setValidated(true);
    };
    const previous = () => {
        setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
    };

    const saveApplication = (form) => {
        setApplication(form);
    };

    // 제출 버튼 클릭시 실행되는 동작 -> 서버에 프로그램 추가 요청
    const addProgram = async (survey_form) => {
        var params = new URLSearchParams();
        var formattedStartDate = getFormatDate(start_date);
        var formattedEndDate = getFormatDate(end_date);
        var formattedApplyStartDate = getFormatDate(Applystart_date);
        var formattedApplyEndDate = getFormatDate(Applyend_date);

        const imgFormData = new FormData();
        if (poster != null) {
            imgFormData.append("img", poster);
        }

        const fileFormData = new FormData();
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                fileFormData.append("attach_file", files[i]);
            }
        }

        // 가져가는 값들 (기존의 step 들에서 저장함)
        params.append("admin_id", window.sessionStorage.getItem("id"));
        params.append("category_id", formData.program_category);
        params.append("application_form", formData.application_form);
        params.append("program_quota", formData.program_quota);
        params.append("program_name", formData.program_title);
        params.append("information", formData.program_description);
        params.append("start_date", formattedStartDate);
        params.append("end_date", formattedEndDate);
        params.append("Applystart_date", formattedApplyStartDate);
        params.append("Applyend_date", formattedApplyEndDate);
        params.append("manager_name", formData.manager_name);
        params.append("manager_contact", formData.manager_contact);
        params.append("application_form", application);
        params.append("survey_form", survey_form);

        if (window.confirm("프로그램을 추가하시겠습니까?")) {
            const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "admin/programs").then((response) => {
                // 포스터 업로드
                if (poster != null) {
                    imgFormData.append("program_id", response.data);
                    imgFormData.append("file_name", poster.name);
                    // 0: 파일 1: 이미지
                    imgFormData.append("file_type", "1");

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

                //파일 업로드
                if (files != null) {
                    fileFormData.append("program_id", response.data);
                    for (var i = 0; i < files.length; i++) {
                        fileFormData.append("file_name", files[i].name);
                    }
                    // 0: 파일 1: 이미지
                    fileFormData.append("file_type", "0");
                    const filesRes = axios({
                        url: process.env.REACT_APP_RESTAPI_HOST + "program/addFiles",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: fileFormData,
                        method: "post",
                        headers: { "Content-Type": "multipart/form-data" },
                        success: function (filesRes) {
                            console.log(filesRes);
                        },
                        error: function (error) {
                            console.log(error);
                        },
                    });
                }
            });

            alert(formData.program_title + " 프로그램이 추가 되었습니다.");

            navigate("/HappyMan/admin/program");
        }
    };

    // 표시할 단계들
    const steps = [
        // formData로 받아온 모든 정보를 관리, 나머지 항목은 데이터 구성을 위함
        {
            id: 1,
            title: "프로그램 기본 정보 작성",
            content: (
                <BasicInformation
                    // 이게 내부에서 담는 정보
                    data={formData}
                    handleChange={handleChange}
                    setStart_date={setStart_date}
                    setEnd_date={setEnd_date}
                    setApplyStart_date={setApplyStart_date}
                    setApplynd_date={setApplyEnd_date}
                    next={next}
                    validated={validated}
                    setValidated={setValidated}
                    preview={preview}
                    onLoadPoster={onLoadPoster}
                    onLoadFile={onLoadFile}
                    submit={addProgram}
                />
            ),
        },
        {
            id: 2,
            title: "프로그램 신청서 Form 제작",
            // content: <CoursesMedia data={formData} handleChange={handleChange} setStart_date={setStart_date} setEnd_date={setEnd_date} submit={addProgram} previous={previous} />,
            content: (
                <ApplicationFormPractice
                    data={formData}
                    handleChange={handleChange}
                    setEnd_date={setEnd_date}
                    next={next}
                    previous={previous}
                    saveApplication={saveApplication}
                />
            ),
            // content: <FormBuilder />,
            // content: <ApplicationForm data={formData} handleChange={handleChange} setStart_date={setStart_date} setEnd_date={setEnd_date} submit={addProgram} previous={previous} />,
        },
        // 임시로 주석처리 240403
        // {
        //     id: 3,
        //     title: "프로그램 설문지 Form 제작",
        //     content: <SurveyForm data={formData} handleChange={handleChange} setEnd_date={setEnd_date} previous={previous} submit={addProgram} />,
        // },
    ];

    return (
        <Fragment>
            <div className="py-4 py-lg-6 bg-primary">
                <Container>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                            {/* 상단바 */}
                            <div className="d-lg-flex align-items-center justify-content-between">
                                <div className="mb-4 mb-lg-0">
                                    <h1 className="text-white mb-1">새 프로그램 추가</h1>
                                </div>
                                <div>
                                    <Link to={process.env.REACT_APP_DEFAULT_URL + "admin/program"} className="btn btn-white ">
                                        프로그램 목록 보기
                                    </Link>{" "}
                                    {/* 저장 기능 나중에 추가 */}
                                    {/* <Link to="#" className="btn btn-success ">
                                      저장
                                    </Link> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Step을 나타내는 Bootstrap 컴포넌트 */}
            <GKStepper currentStep={currentStep} steps={steps} />
        </Fragment>
    );
};

export default AddNewCourse;
