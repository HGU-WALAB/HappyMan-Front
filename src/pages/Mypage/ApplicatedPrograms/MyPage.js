// import React, { Fragment, useEffect, useState } from "react";
// import { Col, Row, Card, Nav, Tab } from "react-bootstrap";
// import axios from "axios";

// // import sub components
// import ReadyProgramTable from "components/dashboard/ReadyProgramTable";
// import OngoingProgramTable from "components/dashboard/OngoingProgramTable";
// import CompleteProgramTable from "components/dashboard/CompleteProgramTable";
// import { ready } from "jquery";

// const MyPage = () => {
//     const [participation, setParticipation] = useState([]);
//     const [readyProgram, setReadyProgram] = useState([]);
//     const [ongoingProgram, setOngoingProgram] = useState([]);
//     const user_id = window.sessionStorage.getItem("id");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // 유저 신청기록 조회
//                 const participation = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/my-participation`, {
//                     headers: {
//                         Authorization: "Bearer " + sessionStorage.getItem("token"),
//                     },
//                 });
//                 console.log("participation", participation.data.participations);
//                 // 분류 로직 추가
//                 const ready = participation.data.participations.filter((p) => p.status === "대기" || p.status === "거절");
//                 const ongoing = participation.data.participations.filter((p) => p.status === "수료" || p.status === "미수료");

//                 setParticipation(participation.data.participations);
//                 setReadyProgram(ready);
//                 setOngoingProgram(ongoing);
//             } catch (error) {
//                 console.error("Error fetching user information:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         console.log("대기란", readyProgram);
//     }, [readyProgram]);

//     useEffect(() => {
//         console.log("진행란", ongoingProgram);
//     }, [ongoingProgram]);

//     return (
//         <Fragment>
//             <>
//                 <Row>
//                     <Col lg={12} md={12} sm={12}>
//                         <Tab.Container defaultActiveKey="all">
//                             <Card>
//                                 <Card.Header className="border-bottom-0 p-0 bg-white">
//                                     <Nav className="nav-lb-tab  fs-4">
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="application" className="mb-sm-3 mb-md-0">
//                                                 신청
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                         <Nav.Item>
//                                             <Nav.Link eventKey="progress" className="mb-sm-3 mb-md-0">
//                                                 진행
//                                             </Nav.Link>
//                                         </Nav.Item>
//                                     </Nav>
//                                 </Card.Header>

//                                 <Card.Body className="p-0">
//                                     <Tab.Content>
//                                         <Tab.Pane eventKey="application" className="pb-0">
//                                             <ReadyProgramTable readyProgram={readyProgram} />
//                                         </Tab.Pane>
//                                         <Tab.Pane eventKey="progress" className="pb-0">
//                                             <OngoingProgramTable ongoingProgram={ongoingProgram} />
//                                         </Tab.Pane>
//                                     </Tab.Content>
//                                 </Card.Body>
//                             </Card>
//                         </Tab.Container>
//                     </Col>
//                 </Row>
//             </>
//         </Fragment>
//     );
// };

// export default MyPage;

import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Card, Nav, Tab } from "react-bootstrap";
import axios from "axios";

// import sub components
import ReadyProgramTable from "components/dashboard/ReadyProgramTable";
import OngoingProgramTable from "components/dashboard/OngoingProgramTable";
import CompleteProgramTable from "components/dashboard/CompleteProgramTable";

const MyPage = () => {
    const [participation, setParticipation] = useState([]);
    const [readyProgram, setReadyProgram] = useState([]);
    const [ongoingProgram, setOngoingProgram] = useState([]);
    const user_id = window.sessionStorage.getItem("id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 유저 신청기록 조회
                const participation = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/my-participation`, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                });
                console.log("participation", participation.data.participations);
                // 분류 로직 추가
                const ready = participation.data.participations.filter((p) => p.status === "대기" || p.status === "거절");
                const ongoing = participation.data.participations.filter((p) => p.status === "수료" || p.status === "미수료");

                setParticipation(participation.data.participations);
                setReadyProgram(ready);
                setOngoingProgram(ongoing);
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("대기란", readyProgram);
    }, [readyProgram]);

    useEffect(() => {
        console.log("진행란", ongoingProgram);
    }, [ongoingProgram]);

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Tab.Container defaultActiveKey="application">
                        <Card>
                            <Card.Header className="border-bottom-0 p-0 bg-white">
                                <Nav className="nav-lb-tab fs-4">
                                    <Nav.Item>
                                        <Nav.Link eventKey="application" className="mb-sm-3 mb-md-0">
                                            신청
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="progress" className="mb-sm-3 mb-md-0">
                                            진행
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="application" className="pb-0">
                                        <ReadyProgramTable readyProgram={readyProgram} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="progress" className="pb-0">
                                        <OngoingProgramTable ongoingProgram={ongoingProgram} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>
        </Fragment>
    );
};

export default MyPage;
