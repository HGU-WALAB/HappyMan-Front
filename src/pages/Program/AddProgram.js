import React, { useState, Fragment, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// import custom components
import GKStepper from "components/elements/stepper/GKStepper";

// import sub components ( Steps )
import BasicInformation from "pages/Program/BasicInformation";
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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        teacher: "",
    });

    const onLoadPoster = async (e) => {
        const file = e.target.files[0];
        setPoster(file);
        setPreview(URL.createObjectURL(file));
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    const onLoadFile = async (e) => {
        const selectedFile = e.target.files[0]; // 단일 파일만 선택되도록 변경
        setFiles(selectedFile); // 파일을 상태에 저장

        // 선택한 파일을 FormData에 추가
        setFormData((prevFormData) => ({
            ...prevFormData,
            file: selectedFile, // 파일을 file 필드에 저장 (단일 파일)
        }));
    };

    const handleChange = (event) => {
        // 날짜 필드인 경우에만 moment 형식으로 변환하여 설정
        if (
            event.target.name === "startDate" ||
            event.target.name === "endDate" ||
            event.target.name === "applyStartDate" ||
            event.target.name === "applyEndDate"
        ) {
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
        // 상태 업데이트 후 API 호출
        if (isSubmitting) {
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
            submitData.append("teacher", formData.teacher);

            if (formData.file instanceof FileList) {
                Array.from(formData.file).forEach((file, index) => {
                    submitData.append(`file${index}`, file);
                });
            } else if (formData.file instanceof File) {
                submitData.append("file0", formData.file);
            }

            submitData.append("image", formData.image);

            // 디버깅을 위해 폼 데이터를 로그로 출력
            for (let value of submitData.values()) {
                console.log(value);
            }

            axios
                .post(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/admin/programs", submitData, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    alert("프로그램이 추가 되었습니다.");
                    navigate("/admin/program");
                })
                .catch((error) => {
                    console.error("프로그램 추가 중 에러가 발생했습니다:", error);
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        }
    }, [isSubmitting, formData, navigate]);

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
        setFormData((prevFormData) => ({
            ...prevFormData,
            applicationForm: form, // 폼을 올바르게 설정
        }));
    };

    const addProgram = async () => {
        if (window.confirm("프로그램을 추가하시겠습니까?")) {
            setIsSubmitting(true);
        }
    };

    // 표시할 단계들
    const steps = [
        {
            id: 1,
            title: "프로그램 기본 정보 작성",
            content: (
                <BasicInformation
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
        },
    ];

    return (
        <Fragment>
            <div className="py-4 py-lg-6 bg-primary">
                <Container>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                            <div className="d-lg-flex align-items-center justify-content-between">
                                <div className="mb-4 mb-lg-0">
                                    <h1 className="text-white mb-1">새 프로그램 추가</h1>
                                </div>
                                <div>
                                    <Link to={process.env.REACT_APP_DEPLOY_URL + "admin/program"} className="btn btn-white ">
                                        프로그램 목록 보기
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <GKStepper currentStep={currentStep} steps={steps} />
        </Fragment>
    );
};

export default AddNewCourse;
