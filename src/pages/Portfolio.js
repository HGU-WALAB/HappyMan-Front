import { Fragment, useLayoutEffect, useState, useRef, useEffect } from "react";
import { Card, Button, Row, Col, Image, Table, Form } from "react-bootstrap";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ProfileBackground from "assets/images/background/profile-bg.jpg";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = (props) => {
    const [complete, setComplete] = useState();
    const [uncomplete, setUncomplete] = useState();
    const [semesters, setSemesters] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/programs/complete-percent/graph", {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                });
                setComplete(response.data.completed);
                setUncomplete(response.data.uncompleted);
                setSemesters(response.data.semesters);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []); // 빈 배열을 전달하여 페이지가 로드될 때 한 번만 실행되도록 함

    const data = {
        labels: ["수료", "미수료"],
        datasets: [
            {
                data: [complete, uncomplete],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    // return (
    //     <Card>
    //         {data ? (
    //             <DonutDiv>
    //                 <Doughnut data={data} />
    //                 <div>수료율 {((complete / (uncomplete + complete)) * 100).toFixed(2)}%</div>
    //                 <Doughnut data={data} />
    //             </DonutDiv>
    //         ) : (
    //             <div>수료한 캠프가 없습니다</div>
    //         )}
    //     </Card>
    // );
    return (
        <Card>
            {semesters.length > 0 ? (
                // 수료여부가 있을 시 데이터
                semesters.map((semesterData, index) => {
                    // 그래프 출력 데이터 정형화하기
                    const data = {
                        labels: ["수료", "미수료"],
                        datasets: [
                            {
                                data: [semesterData.completed, semesterData.uncompleted],
                                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                                borderWidth: 1,
                            },
                        ],
                    };

                    // 수료율 체크
                    const completionRate = ((semesterData.completed / (semesterData.completed + semesterData.uncompleted)) * 100).toFixed(2);

                    // 출력되는 데이터
                    return (
                        <Whole>
                            <DonutDiv key={index}>
                                <h5>{semesterData.semester}학기</h5>
                                <Doughnut data={data} />
                                <div>수료율 {completionRate}%</div>
                            </DonutDiv>
                        </Whole>
                    );
                })
            ) : (
                // 수료여부가 없을 시 데이터
                <div>수료한 캠프가 없습니다</div>
            )}
        </Card>
    );
};

export default Portfolio;

const Whole = styled.div`
    display: flex;
    justify-content: center;
`;

const DonutDiv = styled.div`
    align-items: center;
    width: 50%;
    padding: 5%;
`;

const StyledModal = Modal.styled`
  width: 50rem;
  height: auto;
  padding : 20px;
  border-radius:20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FadingBackground = styled(BaseModalBackground)`
    opacity: ${(props) => props.opacity};
    transition: all 0.3s ease-in-out;
`;
