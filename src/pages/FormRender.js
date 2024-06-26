// import $, { map } from "jquery";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect, useLayoutEffect } from "react";
// import { Button } from "react-bootstrap";
// import axios from "axios";
// import "assets/scss/formBuilder.scss";

// window.jQuery = $;
// window.$ = $;
// require("formBuilder/dist/form-render.min.js");

// const FormRender = (programID) => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState([]);
//     const [isFormRender, setIsFormRender] = useState(false);
//     const [jsonObject, setJsonObject] = useState(null);

//     var formInformation = "";

//     // useLayoutEffect(() => {
//     //     console.log("받아온 프로그램 ID", programID.programID);
//     //     readFormData(programID.programID);
//     //     // readApplicantData(props.programid, props.userid);
//     //     // readApplicantInformation(props.userid);
//     // }, []);

//     useLayoutEffect(() => {
//         readFormData(programID.programID);
//     }, []);

//     useEffect(() => {
//         componentDidMount();
//         console.log("O", formData);
//     }, [formData]);

//     const componentDidMount = () => {
//         console.log("실행확인");
//         const getUserDataBtn = document.getElementById("get-user-data");
//         const fbRender = document.getElementById("fb-render");
//         console.log("O", formData);
//         const formRenderInstance = $(fbRender).formRender({ formData });
//         console.log("Form 렌더링 현황 : ", formInformation);

//         // $(fbRender)
//         //     .find("input, select, textarea")
//         //     .each(function () {
//         //         $(this).on("input", () => {
//         //             const formData = $(fbRender).formRender("userData");
//         //             console.log("Form Input Data:", formData);
//         //         });
//         //     });

//         getUserDataBtn.addEventListener("click", () => {
//             const formInformation = formRenderInstance.userData;
//             addFormData(formInformation);
//             console.log("Form에 담긴 정보", formInformation);
//         });
//     };

//     //

//     // form의 값을 읽어옴 (프로그램 ID로)
//     const readFormData = async (id) => {
//         console.log("읽기 시도", id);
//         // const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
//         const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/programs/" + id + "/application", {
//             headers: {
//                 Authorization: "Bearer " + sessionStorage.getItem("token"),
//             },
//         });
//         console.log("받아온 JSON : ", formInformation);
//         const json_total = response.data.applicationForm;
//         // const jsonObject = JSON.parse(json_total);
//         // console.log(jsonObject);
//         const jsonString = JSON.stringify(json_total);
//         const json_sub = json_total.slice(1, json_total.length - 1);
//         const arr = JSON.parse("[" + json_sub + "]");
//         setFormData(arr);
//         // console.log(originalFormData);
//         setIsFormRender(true);
//     };

//     const displayAlert = (message) => {
//         alert(message);
//     };

//     // const saveApplicationData = async () => {
//     //     console.log("클릭은 되나");
//     //     var isFilled = true;
//     //     var params = new URLSearchParams();
//     //     params.append("program_id", programID.programID);
//     //     params.append("content", JSON.stringify(formInformation));

//     //     if (isFilled) {
//     //         const applicationForm = JSON.stringify(formData);
//     //         console.log("type", typeof applicationForm);
//     //         console.log("보낼 값", applicationForm);
//     //         await axios.post(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/${programID.programID}/apply`, applicationForm, {
//     //             headers: {
//     //                 Authorization: "Bearer " + sessionStorage.getItem("token"),
//     //             },
//     //         });
//     //         displayAlert(" 프로그램이 신청 되었습니다.");
//     //         navigate("/Happyman");
//     //         // props.param.count = props.param.count + 1;

//     //         // }
//     //     }
//     // };
//     const saveApplicationData = async () => {
//         console.log("클릭은 되나");
//         var isFilled = true;
//         var params = new URLSearchParams();
//         params.append("program_id", programID.programID);
//         params.append("content", JSON.stringify(formInformation));

//         if (isFilled) {
//             const applicationForm = JSON.stringify(formData);
//             console.log("type", typeof applicationForm);
//             console.log("보낼 값", applicationForm);
//             await axios.post(
//                 `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/${programID.programID}/apply`,
//                 { applicationForm: applicationForm }, // 요청 본문을 JSON 객체로 감싸기
//                 {
//                     headers: {
//                         "Content-Type": "application/json", // Content-Type을 JSON으로 설정
//                         Authorization: "Bearer " + sessionStorage.getItem("token"),
//                     },
//                 }
//             );
//             displayAlert("프로그램이 신청 되었습니다.");
//             navigate("/Happyman");
//         }
//     };

//     const addFormData = async (formInformation) => {
//         saveApplicationData();
//     };

//     return (
//         <div>
//             <form id="fb-render"></form>
//             <div className="d-flex justify-content-end">
//                 <Button className="btn btn-success" id="get-user-data">
//                     신청하기
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default FormRender;

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

    const [formData, setFormData] = useState([]);
    const [isFormRender, setIsFormRender] = useState(false);

    let formInformation = "";

    useLayoutEffect(() => {
        readFormData(programID.programID);
    }, [programID.programID]);

    useEffect(() => {
        if (isFormRender) {
            console.log("실행확인");
            const fbRender = document.getElementById("fb-render");
            const formRenderInstance = $(fbRender).formRender({ formData });
            console.log("Form 렌더링 현황 : ", formRenderInstance);

            $(fbRender)
                .find("input, select, textarea")
                .each(function () {
                    $(this).on("input", () => {
                        formInformation = $(fbRender).formRender("userData");
                        console.log("Form Input Data:", formInformation);
                    });
                });

            const getUserDataBtn = document.getElementById("get-user-data");
            const handleClick = () => {
                formInformation = formRenderInstance.userData;
                addFormData(formInformation);
                console.log("Form에 담긴 정보", formInformation);
            };

            getUserDataBtn.addEventListener("click", handleClick);

            // Clean up the event listener on component unmount
            return () => {
                getUserDataBtn.removeEventListener("click", handleClick);
            };
        }
    }, [isFormRender, formData]);

    const readFormData = async (id) => {
        console.log("읽기 시도", id);
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/${id}/application`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        console.log("받아온 JSON : ", response.data);
        const json_total = response.data.applicationForm;
        const json_sub = json_total.slice(1, json_total.length - 1);
        const arr = JSON.parse("[" + json_sub + "]");
        setFormData(arr);
        setIsFormRender(true);
    };

    const displayAlert = (message) => {
        alert(message);
    };

    const saveApplicationData = async () => {
        console.log("클릭은 되나");
        var isFilled = true;

        if (isFilled) {
            const applicationForm = JSON.stringify(formData);
            console.log("type", typeof applicationForm);
            console.log("보낼 값", applicationForm);
            await axios.post(
                `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/${programID.programID}/apply`,
                { applicationForm: applicationForm },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                }
            );
            displayAlert("프로그램이 신청 되었습니다.");
            navigate("/");
        }
    };

    const addFormData = async (formInformation) => {
        saveApplicationData();
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
