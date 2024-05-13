import $, { map } from "jquery";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "assets/scss/formBuilder.scss";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const FormRender = (programID) => {
    const navigate = useNavigate();

    const [originalFormData, setOriginalFormData] = useState([]);
    const [isFormRender, setIsFormRender] = useState(false);

    useLayoutEffect(() => {
        console.log("받아온 프로그램 ID", programID.programID);
        readFormData(programID.programID);
        // readApplicantData(props.programid, props.userid);
        // readApplicantInformation(props.userid);
    }, []);

    useEffect(() => {
        componentDidMount();
    }, [originalFormData]);

    const componentDidMount = () => {
        const getUserDataBtn = document.getElementById("get-user-data");
        const fbRender = document.getElementById("fb-render");
        const formData = JSON.stringify(originalFormData);
        const formRenderInstance = $(fbRender).formRender({ formData });

        getUserDataBtn.addEventListener("click", () => {
            const formInformation = formRenderInstance.userData;
            addFormData(formInformation);
        });
    };

    // form의 값을 읽어옴 (프로그램 ID로)
    const readFormData = async (id) => {
        console.log("읽기 시도", id);
        // const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
        const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/programs/" + id + "/application", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        const json_total = response.data.applicationForm;
        console.log("받아온 JSON : ", json_total);
        const json_sub = json_total.slice(1, json_total.length - 1);
        const arr = JSON.parse("[" + json_sub + "]");
        // const arr = [json_total];

        console.log("Arr", json_total);
        setOriginalFormData(json_total);
        setIsFormRender(true);
    };

    // const readApplicantData = async (programID, userID) => {
    //     const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/" + programID + "/applicants/" + userID);
    //     const canApply = response.data.length === 0;
    //     // setCanApply(canApply); // 해당 부분에 대한 상태 업데이트 코드가 제거되어 있음
    // };

    // const readApplicantInformation = async (id) => {
    //     const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    //     // setApplicantInformation(response.data); // 해당 부분에 대한 상태 업데이트 코드가 제거되어 있음
    // };

    const displayAlert = (message) => {
        alert(message);
    };

    const saveApplicationData = async (programID, userID, formInformation) => {
        // saveApplicationData 함수 내용은 그대로 유지
    };

    const addFormData = async (formInformation) => {
        // saveApplicationData 호출 추가
    };

    return (
        <div>
            <form id="fb-render"></form>
            <div className="d-flex justify-content-end">
                <Button className="btn btn-success" id="get-user-data">
                    신청하기
                </Button>
            </div>
        </div>
    );
};

export default FormRender;
