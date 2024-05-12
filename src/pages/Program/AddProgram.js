import React, { useState, Fragment, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

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
    // 이 값을 하위 컴포넌트들에 넘기고, 다시 받아서 API로 전송
    const [formData, setFormData] = useState({
        // BasicInformation 에서 담을 값
        image: "", // 프로그램 포스터
        file: "", // 파일
        name: "", // 프로그램명
        quota: "", // 프로그램 정원
        information: "", // 프로그램 정보
        applyStartDate: "",
        applyEndDate: "",
        startDate: "",
        endDate: "",
        managerName: "",
        managerContact: "",
        categoryId: "",
        // 여기서부터는 ApplicationFormPractice의 값
        applicationForm: "",
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
        // console.log("입력된 값:", event.target.value);
        // console.log("입력 필드의 이름:", event.target.name);
        console.log("Form Data는 : ", formData);

        // formResults를 콘솔에 출력
        console.log("formResults in AddNewCourse:", formData.formResults);

        // 날짜 필드인 경우에만 moment 형식으로 변환하여 설정
        if (
            event.target.name === "startDate" ||
            event.target.name === "endDate" ||
            event.target.name === "applyStartDate" ||
            event.target.name === "applyEndDate"
        ) {
            // moment 형식으로 변환
            const formattedDate = moment(event.target.value).toDate();
            setFormData((prevFormData) => ({
                ...prevFormData,
                [event.target.name]: formattedDate,
            }));
        } else {
            // 날짜 필드가 아닌 경우 그대로 설정
            setFormData((prevFormData) => ({
                ...prevFormData,
                [event.target.name]: event.target.value,
            }));
        }
    };

    useEffect(() => {
        console.log("FD 는 말이죠 : ", formData);
    }, [formData]);

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
    const addProgram = async () => {
        const submitData = new FormData();
        submitData.append("name", formData.name);
        submitData.append("quota", formData.quota);
        submitData.append("information", formData.information);
        submitData.append("applyStartDate", moment(formData.applyStartDate).format("YYYY-MM-DD HH:mm:ss"));
        submitData.append("applyEndDate", moment(formData.applyEndDate).format("YYYY-MM-DD HH:mm:ss"));
        submitData.append("startDate", moment(formData.startDate).format("YYYY-MM-DD HH:mm:ss"));
        submitData.append("endDate", moment(formData.endDate).format("YYYY-MM-DD HH:mm:ss"));
        submitData.append("managerName", formData.managerName);
        submitData.append("managerContact", formData.managerContact);
        submitData.append("categoryId", formData.categoryId);
        submitData.append("applicationForm", formData.applicationForm);
        submitData.append("file", formData.file);
        submitData.append("image", formData.image);
        console.log("FD is : ", formData);
        console.log("SD is : ", submitData);

        console.log(submitData.get("name"));

        // // 이미지 파일 추가
        // if (poster != null) {
        //     formData.append("img", poster);
        // }

        // // 파일 추가
        // if (files != null) {
        //     for (var i = 0; i < files.length; i++) {
        //         formData.append("attach_file", files[i]);
        //     }
        // }

        if (window.confirm("프로그램을 추가하시겠습니까?")) {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/admin/programs",
                    submitData, // FormData를 요청 본문에 설정
                    {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                alert(" 프로그램이 추가 되었습니다.");

                navigate("/HappyMan/admin/program");
            } catch (error) {
                console.error("프로그램 추가 중 에러가 발생했습니다 :", error);
                // 에러 처리 로직 추가
            }
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
                    applicationForm={formData.applicationForm}
                    submit={addProgram}
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
                                    <Link to={process.env.REACT_APP_DEPLOY_URL + "admin/program"} className="btn btn-white ">
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
