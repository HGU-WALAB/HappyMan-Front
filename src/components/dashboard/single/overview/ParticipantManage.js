// // import node module libraries
// import { Col, Card, Form, Button, Container, Row, Accordion, useAccordionButton, AccordionContext, ListGroup } from "react-bootstrap";
// import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from "react";
// import { Link } from "react-router-dom";

// // import custom components
// import axios from "axios";
// import $ from "jquery";
// import "assets/scss/formBuilder.scss";
// import FormBuilder from "pages/FormBuilder";

// // import simple bar scrolling used for notification item scrolling
// import SimpleBar from "simplebar-react";
// import "simplebar/dist/simplebar.min.css";

// window.jQuery = $;
// window.$ = $;
// require("formBuilder/dist/form-render.min.js");

// const SurveyFormView = (props) => {
//     const [showMenu, setShowMenu] = useState(true);
//     const [readyJson, setReadyJson] = useState(false);
//     const [formContent, setFormContent] = useState();
//     // const [json, setJson] = useState(null);
//     const [programInformation, setProgramInformation] = useState();

//     const [applicantInformation, setApplicantInformation] = useState(null);
//     const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
//     const [userInfo, setUserInfo] = useState();
//     const [originalFormData, setoriginalFormData] = useState([]);
//     const [studentFormData, setstudentFormData] = useState([]);
//     const [isEdit, setIsEdit] = useState(false);
//     const [applicantNum, setApplicantNum] = useState(0);
//     const [updateFormData, setUpdateFormData] = useState();
//     const [updateLoading, setUpdateLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         program_title: "Title",
//         program_category: "1",
//         program_description: "Hello, world!",
//         program_quota: "0",
//         program_img: "img",
//         start_date: "",
//         end_date: "",
//         Applystart_date: "",
//         Applyend_date: "",
//         manager_name: "",
//         manager_contact: "",
//         application_form: "",
//         survey_form: "",
//         poster: "",
//     });
//     useLayoutEffect(() => {
//         readApplicantInformation(props.param3.id);
//         readFormData(props.param3.id);
//         readProgramJson(props.param3.id);
//     }, []);

//     useEffect(() => {
//         // setJson(jsonSkeleton);
//         componentDidMount();
//     }, [originalFormData, userInfo]);

//     const readApplicantInformation = async (id) => {
//         setApplicantInformationLoading(false);
//         const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/survey/" + id);
//         setApplicantInformation(response.data);
//         setApplicantNum(response.data.length);
//         setApplicantInformationLoading(true);
//     };

//     const readProgramJson = async (id) => {
//         const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/read/survey/" + id);
//         var json_total = response.data[0].survey_form;
//         var json_sub = json_total.slice(1, json_total.length - 1);
//         var arr = JSON.parse("[" + json_sub + "]");
//         setProgramInformation(response.data[0]);
//         setFormContent(arr);
//         setReadyJson(true);
//     };

//     const ToggleMenu = () => {
//         return setShowMenu(!showMenu);
//     };
//     const handleChange = (event) => {
//         setFormData({
//             ...formData,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const submitButton = async (form) => {
//         setUpdateLoading(false);
//         setUpdateFormData(form);
//         setUpdateLoading(true);
//         var params = new URLSearchParams();
//         params.append("program_id", props.param3.id);
//         params.append("survey_form", form);

//         if (window.confirm("설문지를 수정하시겠습니까?")) {
//             const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/update/survey", params);

//             alert("설문지가 수정 되었습니다.");
//             window.location.reload();
//         }
//     };

//     const highFunction = (isSet) => {};

//     const readFormData = async (id) => {
//         const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "survey/readSurveyForm/" + id);
//         if (response.data[0].survey_form === null) var json_total_survey = "";
//         else var json_total_survey = response.data[0].survey_form;
//         setoriginalFormData(json_total_survey);
//     };

//     const getUserInfo = (user) => {
//         setUserInfo(user);
//         setstudentFormData(user.survey_form);
//     };

//     const edit = () => {
//         setIsEdit(true);
//     };

//     const save = () => {
//         setIsEdit(false);
//     };

//     const componentDidMount = async () => {
//         const fbRender = document.getElementById("fb-render4");
//         const formData = userInfo != null ? studentFormData : originalFormData;

//         $(fbRender).formRender({ formData });

//         const fbRender2 = document.getElementById("fb-render5");
//         const formData2 = userInfo != null ? studentFormData : originalFormData;
//         $(fbRender2).formRender({ formData2 });

//         if (updateLoading) {
//             const fbRender3 = document.getElementById("fb-render6");
//             const formData3 = updateFormData;
//             $(fbRender3).formRender({ formData3 });
//         }
//     };

//     const ContextAwareToggle = ({ eventKey, callback }) => {
//         const { activeEventKey } = useContext(AccordionContext);

//         const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

//         const isCurrentEventKey = activeEventKey === eventKey;

//         return (
//             <Fragment>
//                 <Link
//                     to="#"
//                     onClick={decoratedOnClick}
//                     aria-expanded={isCurrentEventKey}
//                     className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
//                     data-bs-toggle="collapse"
//                     aria-controls="courseTwo"
//                 >
//                     <div className="me-auto">작성한 학생들 ({applicantNum})</div>
//                     <span className="chevron-arrow ms-4">
//                         <i className="fe fe-chevron-down fs-4"></i>
//                     </span>
//                 </Link>
//             </Fragment>
//         );
//     };

//     return (
//         <Container>
//             <Row>
//                 {userInfo ? (
//                     isEdit === false ? (
//                         <>
//                             <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
//                                 <Card>
//                                     <Card.Header>설문지</Card.Header>

//                                     <Card.Body>
//                                         {/*  Form */}
//                                         <Form className="row" id="survey">
//                                             {/*  Name */}
//                                             <Col md={6} sm={12} className="mb-4">
//                                                 <Form.Group controlId="Name">
//                                                     <Form.Label>이름</Form.Label>
//                                                     <Form.Control type="text" placeholder="이름을 입력해 주세요" value={userInfo.name} readOnly />
//                                                 </Form.Group>
//                                             </Col>
//                                             {/*  Student Id */}
//                                             <Col md={6} sm={12} className="mb-4">
//                                                 <Form.Group controlId="StudentID">
//                                                     <Form.Label>학번</Form.Label>
//                                                     <Form.Control type="text" placeholder="학번을 입력해 주세요" value={userInfo.student_id} readOnly />
//                                                 </Form.Group>
//                                             </Col>
//                                             {/*  Department */}
//                                             <Col md={6} sm={12} className="mb-4">
//                                                 <Form.Group controlId="StudentID">
//                                                     <Form.Label>학부</Form.Label>
//                                                     <Form.Control type="text" placeholder="학부를 입력해 주세요" value={userInfo.department} readOnly />
//                                                 </Form.Group>
//                                             </Col>
//                                             {/*  Major1 */}
//                                             <Col md={6} sm={12} className="mb-4">
//                                                 <Form.Group controlId="StudentID">
//                                                     <Form.Label>전공</Form.Label>
//                                                     <Form.Control type="text" placeholder="전공을 입력해 주세요" value={userInfo.major1} readOnly />
//                                                 </Form.Group>
//                                             </Col>
//                                             {/*  Phone number */}
//                                             <Col md={6} sm={12} className="mb-4">
//                                                 <Form.Group controlId="Phone number">
//                                                     <Form.Label>전화번호</Form.Label>
//                                                     <Form.Control type="text" placeholder="Phone number (010-1234-5678)" value={userInfo.phone} readOnly />
//                                                 </Form.Group>
//                                             </Col>

//                                             {/*  이메일 */}
//                                             <Col md={6} sm={12} className="mb-4">
//                                                 <Form.Group controlId="Email">
//                                                     <Form.Label>이메일</Form.Label>
//                                                     <Form.Control type="text" placeholder="Handong123@handong.ac.kr" value={userInfo.email} readOnly />
//                                                 </Form.Group>
//                                             </Col>
//                                             <form id="fb-render4"></form>
//                                         </Form>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </>
//                     ) : (
//                         <>
//                             <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
//                                 {/* <h1>246~~~~~~~~</h1> */}
//                                 <Form className="row" id="survey">
//                                     <form id="fb-render5"></form>
//                                 </Form>
//                             </Col>
//                         </>
//                     )
//                 ) : /* 수정하고 난 다음 완료 버튼 눌렀을 때 뜨는 부분. 이때 formRender가 되지 않고, 해당 formRender에는 새롭게 수정된 Form 이 보여야한다. */
//                 isEdit === false ? (
//                     <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0 d-flex flex-column justify-content-between">
//                         <Card>
//                             <Card.Header>설문지</Card.Header>
//                             {/* <h1>259~~~~~~~~</h1> */}
//                             <Card.Body>
//                                 {/*  Form */}
//                                 <Form className="row" id="survey">
//                                     {/*  Name */}
//                                     <Col md={6} sm={12} className="mb-4">
//                                         <Form.Group controlId="Name">
//                                             <Form.Label>이름</Form.Label>
//                                             <Form.Control type="text" placeholder="이름을 입력해 주세요" />
//                                         </Form.Group>
//                                     </Col>
//                                     {/*  Student Id */}
//                                     <Col md={6} sm={12} className="mb-4">
//                                         <Form.Group controlId="StudentID">
//                                             <Form.Label>학번</Form.Label>
//                                             <Form.Control type="text" placeholder="학번을 입력해 주세요" />
//                                         </Form.Group>
//                                     </Col>
//                                     {/*  Department */}
//                                     <Col md={6} sm={12} className="mb-4">
//                                         <Form.Group controlId="StudentID">
//                                             <Form.Label>학부</Form.Label>
//                                             <Form.Control type="text" placeholder="학부를 입력해 주세요" />
//                                         </Form.Group>
//                                     </Col>
//                                     {/*  Major1 */}
//                                     <Col md={6} sm={12} className="mb-4">
//                                         <Form.Group controlId="StudentID">
//                                             <Form.Label>전공</Form.Label>
//                                             <Form.Control type="text" placeholder="전공을 입력해 주세요" />
//                                         </Form.Group>
//                                     </Col>
//                                     {/*  Phone number */}
//                                     <Col md={6} sm={12} className="mb-4">
//                                         <Form.Group controlId="Phone number">
//                                             <Form.Label>전화번호</Form.Label>
//                                             <Form.Control type="text" placeholder="Phone number (010-1234-5678)" />
//                                         </Form.Group>
//                                     </Col>

//                                     {/*  이메일 */}
//                                     <Col md={6} sm={12} className="mb-4">
//                                         <Form.Group controlId="Email">
//                                             <Form.Label>이메일</Form.Label>
//                                             <Form.Control type="text" placeholder="Handong123@handong.ac.kr" />
//                                         </Form.Group>
//                                     </Col>

//                                     <form id="fb-render4"></form>
//                                 </Form>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ) : (
//                     <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
//                         {/* <Card>
//               <Card.Header>신청서</Card.Header>
//               <Card.Body> */}
//                         <Row>
//                             {/* <h1>317~~~~~~~~</h1> */}
//                             <Form>
//                                 {/* {formContent.length > 0 ? <FormBuilder content={formContent} propFunction={highFunction} submit={submitButton} template="0" program="1" saveFunction={save} /> : ""} */}
//                                 <FormBuilder content={formContent} propFunction={highFunction} submit={submitButton} edit="1" saveFunction={save} />
//                             </Form>
//                         </Row>
//                         {/* </Card.Body>
//             </Card> */}
//                     </Col>
//                 )}
//                 <Col xl={3} lg={12} md={12} sm={12} className="d-flex flex-column justify-content-between">
//                     {applicantInformationLoading === true ? (
//                         isEdit === false ? (
//                             <>
//                                 {/* <h1>334~~~~~~~~</h1> */}
//                                 <Card className="my-3">
//                                     <Fragment>
//                                         <Accordion defaultActiveKey="1">
//                                             <ListGroup as="ul" variant="flush">
//                                                 <SimpleBar style={{ maxHeight: "700px" }}>
//                                                     {applicantInformation.length > 0 ? (
//                                                         <>
//                                                             <ListGroup.Item key="1" as="li">
//                                                                 <ContextAwareToggle eventKey="1">작성한 학생들 </ContextAwareToggle>
//                                                                 <Accordion.Collapse eventKey="1" className="test">
//                                                                     <ListGroup className="py-4" as="ul">
//                                                                         <div className="d-grid">
//                                                                             <Button
//                                                                                 variant="transparent"
//                                                                                 onClick={() => setUserInfo(null)}
//                                                                                 className=" Applicant d-flex px-0 py-1 justify-content-between align-items-center text-inherit text-decoration-none border-bottom"
//                                                                             >
//                                                                                 <div className="text-truncate">
//                                                                                     <span className="fs-5">기본 설문지폼 보기</span>
//                                                                                 </div>
//                                                                             </Button>
//                                                                         </div>
//                                                                         {applicantInformation.map((subitem, subindex) => (
//                                                                             <ListGroup.Item key={subindex} as="li" className="px-0 py-1 border-0">
//                                                                                 <div className="d-grid">
//                                                                                     <Button
//                                                                                         variant="transparent"
//                                                                                         onClick={() => getUserInfo(subitem)}
//                                                                                         className="Applicant d-flex px-0 py-1 justify-content-between align-items-center text-inherit text-decoration-none border-bottom"
//                                                                                     >
//                                                                                         <div className="text-truncate">
//                                                                                             <span className="fs-5">{subitem.name}</span>
//                                                                                         </div>
//                                                                                         <div className="text-truncate">
//                                                                                             <span>({subitem.student_id})</span>
//                                                                                         </div>
//                                                                                     </Button>
//                                                                                 </div>
//                                                                             </ListGroup.Item>
//                                                                         ))}
//                                                                     </ListGroup>
//                                                                 </Accordion.Collapse>
//                                                             </ListGroup.Item>
//                                                         </>
//                                                     ) : (
//                                                         <>
//                                                             {/* <h1>380~~~~~~~~</h1> */}
//                                                             <ListGroup.Item key="1" as="li">
//                                                                 <ContextAwareToggle eventKey="1">설문지 작성한 학생들</ContextAwareToggle>
//                                                                 <Accordion.Collapse eventKey="1">
//                                                                     <ListGroup variant="flush">
//                                                                         <ListGroup.Item className="border-0 fs-5 px-0 py-4">
//                                                                             설문지를 작성한 학생이 없습니다
//                                                                         </ListGroup.Item>
//                                                                     </ListGroup>
//                                                                 </Accordion.Collapse>
//                                                             </ListGroup.Item>
//                                                         </>
//                                                     )}
//                                                 </SimpleBar>
//                                             </ListGroup>
//                                         </Accordion>
//                                     </Fragment>
//                                 </Card>
//                                 {readyJson === true && programInformation.status !== 2 && programInformation.applicants_num === 0 ? (
//                                     <div className="d-flex justify-content-end align-items-end">
//                                         <Button variant="primary" onClick={edit}>
//                                             수정
//                                         </Button>
//                                     </div>
//                                 ) : (
//                                     ""
//                                 )}
//                             </>
//                         ) : (
//                             <></>
//                         )
//                     ) : (
//                         ""
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
// export default SurveyFormView;

// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";
import { Collection } from "react-bootstrap-icons";

const ApplicantsListItems2 = (props) => {
    const [userInfo, setUserInfo] = useState([]);
    const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
    const [program_id, setProgram_id] = useState();
    const [applicant_id, setApplicant_id] = useState([]);
    const [program_status, setProgram_status] = useState([]);
    const [applicant_status, setApplicant_status] = useState("0");
    const [programQuota, setProgramQuota] = useState();
    const [applicants_num, setApplicants_num] = useState();
    const [applicants, setApplicants] = useState([]);
    const [ids, setIds] = useState([]);
    const [applicantStatus, setApplicantStatus] = useState("미수료");

    const infinite = "무제한";

    // 이게 아래 테이블의 상위 부분
    const columns = useMemo(
        () => [
            { accessor: "id", Header: "ID", show: false },
            {
                accessor: "name",
                Header: "이름",
                Cell: ({ value }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <h5 className="mb-0">{value}</h5>
                        </div>
                    );
                },
            },
            {
                accessor: "uniqueId",
                Header: "학번",
                Cell: ({ value }) => {
                    if (value === 0) return "";
                    else return value;
                },
            },
            { accessor: "email", Header: "이메일" },
            {
                accessor: "major1",
                Header: "1전공",
            },
            {
                accessor: "semester",
                Header: "학기",
                Cell: ({ value }) => {
                    return value + " 학기";
                },
            },

            {
                accessor: "status",
                Header: "상태",
                Cell: ({ value, row }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <DotBadge
                                bg={
                                    row.original.status === "대기"
                                        ? "warning"
                                        : row.original.status === "수료"
                                        ? "success"
                                        : row.original.status === "거절"
                                        ? "danger"
                                        : row.original.status === "미수료"
                                        ? "secondary"
                                        : row.original.status === 4
                                        ? "primary"
                                        : ""
                                }
                            ></DotBadge>
                            {value === "대기"
                                ? "대기"
                                : value === "수료"
                                ? "수료"
                                : value === "거절"
                                ? "거절"
                                : value === "미수료"
                                ? "미수료"
                                : value === 4
                                ? "수료"
                                : ""}
                        </div>
                    );
                },
            },
        ],
        []
    );

    // console.log("열에 담은 메모내용 ", columns);

    // const update = async (e) => {
    //     var updateApplicantStatus = [];
    //     var params = new URLSearchParams();

    //     e.map((d) => {
    //         updateApplicantStatus.push(applicant_status);
    //     });

    //     params.append("status", updateApplicantStatus);
    //     params.append("program_id", program_id);
    //     console.log(params);

    //     if (updateApplicantId != "") {
    //         if (window.confirm("사용자 상태를 수정하시겠습니까?")) {
    //             const response = await axios.patch(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/admin/programs/110/applicants", params);
    //             readApplicantInformation(props.param4.id);
    //             alert("사용자 상태가 수정되었습니다.");
    //         }
    //     }
    // };

    const update = async () => {
        if (ids.length > 0) {
            // Construct the query string
            const queryString = `ids=${ids.join(",")}&status=${applicantStatus}`;

            // Retrieve the token
            const token = sessionStorage.getItem("token");

            // Log the ids, status, and token before making the API call
            console.log("Selected IDs:", ids);
            console.log("Applicant Status:", applicantStatus);
            console.log("Query String:", queryString);
            console.log("Token:", token); // Check the token

            if (window.confirm("사용자 상태를 수정하시겠습니까?")) {
                try {
                    const response = await axios.patch(
                        `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/participants/change-status?${queryString}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    readApplicantInformation(props.param4.id);
                    window.location.reload();
                    alert("사용자 상태가 수정되었습니다.");
                } catch (error) {
                    console.error("Error updating user status:", error);
                    alert("사용자 상태 수정에 실패하였습니다. 다시 시도해 주세요.");
                }
            }
        }
    };

    const updateIds = (id) => {
        setIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((prevId) => prevId !== id); // 이미 선택되어 있는 경우 제거
            } else {
                return [...prevIds, id]; // 선택되어 있지 않은 경우 추가
            }
        });
    };

    useEffect(() => {
        console.log("Updated IDs:", ids);
    }, [ids]);

    const data = useMemo(() => userInfo, [userInfo]);

    // 테이블의 체크박스 생성
    const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        state,
        gotoPage,
        pageCount,
        prepareRow,
        setGlobalFilter,
        selectedFlatRows, // 이 줄을 추가합니다.
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
                hiddenColumns: columns.map((column) => {
                    if (column.show === false) return column.accessor || column.id;
                    else return false;
                }),
            },
        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                                onChange={(e) => {
                                    row.getToggleRowSelectedProps().onChange(e);
                                    updateIds(row.original.id); // Call the function to update the IDs
                                }}
                            />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const { pageIndex, globalFilter } = state;

    // const handleChangeSelect = (e) => {
    //     setApplicant_status(e.target.value);
    // };
    const handleChangeSelect = (e) => {
        setApplicantStatus(e.target.value);
        console.log(applicantStatus);
    };

    useLayoutEffect(() => {
        readProgramStatus(props.param4.id);
        readApplicantInformation(props.param4.id);
        setProgram_id(props.param4.id);
    }, []);

    const readProgramStatus = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs/${id}/participants`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });

        console.log("ID는", id);
        const programData = response.data.participants; // 여러 사용자의 정보를 배열 형태로 가져옴

        // 프로그램 정보 갱신
        setProgram_status(programData.status); // 일단 첫 번째 사용자의 상태를 사용하겠습니다.

        // 총원 가져오기
        setProgramQuota(response.data.quota);
        // 현재원 가져오기
        setApplicants_num(response.data.currentQuota);

        setUserInfo(programData);

        console.log(programData);
    };

    const readApplicantInformation = async (id) => {
        setApplicantInformationLoading(false);

        const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);

        setApplicantInformationLoading(true);
        setUserInfo(response.data);
    };

    return (
        <Fragment>
            <div className=" overflow-hidden">
                <Row className="pe-3">
                    <Col xl={3} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-5 py-4 ">
                        <div className="d-flex align-items-center fs-5 mt-3">
                            <Icon path={mdiAccountMultipleOutline} size={1} />
                            신청현황 :{" "}
                            <span>
                                {" "}
                                {applicants_num + "명"} /{" "}
                                {programQuota == null || programQuota === 0 || programQuota === "무제한" ? infinite : programQuota + "명"}{" "}
                            </span>
                        </div>
                    </Col>
                    <Col xl={6} lg={12} md={6} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Students" />
                    </Col>

                    <Col xl={2} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-3 py-4 ">
                        <Form.Select onChange={handleChangeSelect}>
                            <option value="수료">수료</option>
                            <option value="미수료">미수료</option>
                        </Form.Select>
                    </Col>
                    <Col xl={1} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 py-4 d-flex justify-content-evenly">
                        <Button variant="primary" onClick={update}>
                            저장
                        </Button>
                    </Col>
                    {/* <Form.Group className="mb-3 w-26 ">
            <FormSelect options={templateOptions} id="application-template" name="application_form" onChange={handleChange} placeholder="신청서 템플릿 선택" />
          </Form.Group> */}
                </Row>
            </div>

            <div className="table-responsive ">
                <Table {...getTableProps()} className="text-nowrap">
                    <thead className="table-light">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            {/* Pagination @ Footer */}
            <Pagination previousPage={previousPage} pageCount={pageCount} pageIndex={pageIndex} gotoPage={gotoPage} nextPage={nextPage} />
        </Fragment>
    );
};

export default ApplicantsListItems2;
