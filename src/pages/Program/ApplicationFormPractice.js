// import node module libraries
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import React, { Fragment, useState, useLayoutEffect } from "react";
import axios from "axios";
import Element from "json/Element";
import ElementCreate from "json/ElementCreate";
import jsonSkeleton from "json/jsonSkeleton.json";
import FormBuilder from "../FormBuilder";
import { useEffect } from "react";

const ApplicationFormPractice = (props) => {
    const { handleChange: handleChangeParent, next, saveApplication } = props;
    const { submit, previous } = props;
    const [readyJson, setReadyJson] = useState(false);
    const [createJson, setCreateJson] = useState(false);
    const [createElement, setCreateElement] = useState(false);
    const [jsonData, setJsonData] = useState([]);
    const [json, setJson] = useState(null);
    const [elementOption, setElementOption] = useState(0);
    const [obj, setObj] = useState();
    const [individual, setIndividual] = useState(false);
    var formOption = 0;
    const [formContent, setFormContent] = useState();
    const [readyFormContent, setReadyFormContent] = useState(false);
    const [readyElementOption, setReadyElementOption] = useState(false);
    const [formResult, setFormResult] = useState();
    const [formData, setFomData] = useState();

    useEffect(() => {
        // console.log("formData in ApplicationFormPractice @@@ :", props.data.applicationForm);
    }, [props.data.applicationForm]);

    const highFunction = (isSet) => {
        // console.log("isSet", isSet);
    };

    const submitButton = (form) => {
        props.submit(form);
    };

    useLayoutEffect(() => {
        // readApplication();
        // readJson();
        setJson(jsonSkeleton);
    }, []);

    const templateOptions = [
        { value: "1", label: "대회" },
        { value: "2", label: "봉사" },
        { value: "3", label: "캠프" },
        { value: "4", label: "동아리" },
        { value: "5", label: "행사" },
        { value: "6", label: "기타" },
        { value: "7", label: "직접생성" },
    ];
    // const [templateOptions, setTemplateOptions] = useState([]);

    const elementOptions = [
        { value: "1", label: "Text" },
        { value: "2", label: "Email" },
        { value: "3", label: "Password" },
        { value: "4", label: "Textarea" },
        { value: "5", label: "Select" },
        { value: "6", label: "CheckButton" },
        { value: "7", label: "RadioButton" },
        { value: "8", label: "File" },
        { value: "9", label: "개인정보활용동의" },
    ];

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     if (name === "application_form") {
    //         setFormOption(value);
    //         readJson(value);
    //     } else {
    //         // 다른 입력 필드에 대한 처리 로직 추가
    //         // 예: formData 상태 업데이트 등
    //     }
    // };

    const handleChange = (event) => {
        formOption = event.target.value;
        handleChange(event);
        // readJson();
    };

    const elementChange = (elementEvent) => {
        setCreateElement(false);
        setElementOption(elementEvent.target.value);
    };

    const save = (event) => {};

    // const saveApplication = (form) => {
    //   props.saveApplication(form);
    // };

    //DB에서 Application 종류 읽어오는 함수
    // const readApplication = async () => {
    //     setReadyElementOption(false);
    //     const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/name");

    //     setTemplateOptions(response.data);
    //     setReadyElementOption(true);
    // };

    // DB에서 Json 읽어오는 함수
    // const readJson = async () => {
    //     setReadyFormContent(false);

    //     setReadyJson(false);
    //     setCreateJson(false);
    //     setIndividual(false);
    //     var params = new URLSearchParams();

    //     params.append("category_id", formOption);

    //     const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "application/json", params);
    //     var json_total = response.data[0].content;
    //     var json_sub = json_total.slice(1, json_total.length - 1);

    //     var arr = JSON.parse("[" + json_sub + "]");

    //     setFormContent(arr);
    //     setReadyFormContent(true);

    //     setReadyJson(true);
    // };

    // selectbox에서 클릭한 element의 value 숫자 값을 jsonData라는 배열에 넣는 함수
    const addElement = () => {
        setJsonData((jsonData) => [...jsonData, elementOption]); // jsonData에 선택한 elementoption 값이 들어감.
        setCreateElement(true);
    };

    // 하위 컴포넌트의 값 받아오기
    const updateFormResult = (result) => {
        // formResult 상태 업데이트
        setFormResult(result);
    };

    return (
        <Form onSubmit={next}>
            {readyJson && readyElementOption ? (
                <div className="d-flex justify-content-end">
                    <Form.Group className="mb-3 w-26 ">
                        <FormSelect
                            options={templateOptions}
                            id="application_form"
                            name="application_form"
                            onChange={handleChange}
                            placeholder="신청서 템플릿 선택"
                        />
                    </Form.Group>
                </div>
            ) : (
                <div className="d-flex justify-content-end">
                    <Form.Group className="mb-3 w-26 ">
                        <FormSelect
                            options={templateOptions}
                            id="application_form"
                            name="application_form"
                            onChange={handleChange}
                            placeholder="신청서 템플릿 선택"
                        />
                    </Form.Group>
                </div>
            )}

            {
                // readyJson && formContent ? (
                // <FormBuilder content={formContent} propFunction={highFunction} submit={submitButton} saveApplication={saveApplication} template="0" />
                <FormBuilder
                    content={formContent}
                    propFunction={highFunction}
                    submit={submitButton}
                    saveApplication={saveApplication}
                    template="0"
                    updateFormResult={updateFormResult}
                    formResults={props.formResults}
                    data={props.data}
                />

                // ) : (
                //     <Card className="mb-3  border-0">
                //         <Card.Header className="border-bottom px-4 py-3">
                //             <h4 className="mb-0">프로그램 신청서</h4>
                //         </Card.Header>
                //         <Card.Body>
                //             <h4>신청서 템플릿을 선택해주세요 :)</h4>
                //         </Card.Body>
                //     </Card>
                // )
            }
        </Form>
    );
};
export default ApplicationFormPractice;
