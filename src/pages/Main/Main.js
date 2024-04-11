// import node module libraries
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Fragment } from "react";
import { Col, Row, Container, Nav, Tab, Form } from "react-bootstrap";

// import sub components
import HeroHeader from "components/marketing/pages/courses/course-index/HeroHeader";

// import data files
import AllProgramsData from "pages/Main/AllProgramsData";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";
import axios from "axios";
import { getCategory } from "services/mainApi";
import { get } from "jquery";

const Main = ({ totalInfo, eventInfo }) => {
    // const [totalInfo, setTotalInfo] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [competitionInfo, setCompetitionInfo] = useState([]);
    const [volunteerInfo, setVolunteerInfo] = useState([]);
    const [campInfo, setCampInfo] = useState([]);
    // const [eventInfo, setEventInfo] = useState([]);
    const [macbookInfo, setMacbookInfo] = useState([]);
    const [studyInfo, setStudyInfo] = useState([]);
    const [internInfo, setInternInfo] = useState([]);
    const [lectureInfo, setLectureInfo] = useState([]);
    const [etcInfo, setEtcInfo] = useState([]);
    const [totalLoading, setTotalLoading] = useState(false);
    const [fileInfo, setFileInfo] = useState([]);
    const [categories, setCategories] = useState([]); // json 형식의 로딩을 위해서
    const [selectedCategory, setSelectedCategory] = useState("all"); // 카테고리별로 보여주기 위함
    const [activeTab, setActiveTab] = useState("all");

    const handleTabChange = (categoryId) => {
        console.log("카테고리 ID : ", categoryId);
        setActiveTab(categoryId.toString());
    };

    const Home = {
        programBySelectedCategory: [
            {
                programId: 1,
                programName: "비즈플로우",
                imageUrl: "",
            },
        ],
        categories: [],
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                setTotalLoading(true);
                const categoryData = await getCategory();
                // Home.categories 대신 categories를 사용
                setCategories(categoryData.categories);
                setTotalLoading(false);
                console.log("카테고리 데이터 : ", categoryData.categories);
            } catch (error) {
                console.error("카테고리 정보를 가져오는 데 실패했습니다.", error);
                setTotalLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <Fragment>
            {setTotalLoading ? (
                <>
                    <NavbarDefault login={false} />
                    <HeroHeader />

                    <div className="pt-lg-3 pb-lg-3 pt-8 pb-6">
                        <Container>
                            <div className="py-6">
                                <Container>
                                    <Row className="mb-6">
                                        <Col md={12}>
                                            {/* <Tab.Container defaultActiveKey="all">
                                                <Nav className="nav-lb-tab fs-4">
                                                    {categories.map((category) => (
                                                        <Nav.Item key={category.id}>
                                                            <Nav.Link eventKey={category.id.toString()} className="mb-sm-3 mb-md-0">
                                                                {category.name}
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    ))}
                                                </Nav>

                                                <Tab.Content>
                                                    {categories.map((category) => (
                                                        <Tab.Pane key={category.id} eventKey={category.id.toString()} className="pb-4 p-4 ps-0 pe-0">
                                                            <AllProgramsData
                                                                categoryId={category.id.toString()}
                                                                total_data={totalInfo}
                                                                category_data={eventInfo}
                                                            />
                                                        </Tab.Pane>
                                                    ))}
                                                </Tab.Content>
                                            </Tab.Container> */}

                                            <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                                                <Nav className="nav-lb-tab fs-4">
                                                    {categories.map((category) => (
                                                        <Nav.Item key={category.id}>
                                                            <Nav.Link eventKey={category.id.toString()} className="mb-sm-3 mb-md-0">
                                                                {category.name}
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    ))}
                                                </Nav>

                                                <Tab.Content>
                                                    {categories.map((category) => (
                                                        <Tab.Pane key={category.id} eventKey={category.id.toString()} className="pb-4 p-4 ps-0 pe-0">
                                                            {/* 머저리같았음을 기억하기 */}
                                                            {activeTab === category.id.toString() && <AllProgramsData categoryId={category.id} />}
                                                        </Tab.Pane>
                                                    ))}
                                                </Tab.Content>
                                            </Tab.Container>

                                            {/* <Tab.Container defaultActiveKey="total">
                                                <Nav className="nav-lb-tab fs-4">
                                                    {categories.map((category) => (
                                                        <Nav.Item key={category.id}>
                                                            <Nav.Link eventKey={category.id.toString()} className="mb-sm-3 mb-md-0">
                                                                {category.name}
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    ))}
                                                </Nav>

                                                <Tab.Content>
                                                    <Tab.Pane eventKey="all" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="all" total_data={totalInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="1" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="0" total_data={totalInfo} category_data={totalInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="2" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="1" total_data={totalInfo} category_data={competitionInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="3" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="2" total_data={totalInfo} category_data={volunteerInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="4" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="3" total_data={totalInfo} category_data={campInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="5" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="4" total_data={totalInfo} category_data={eventInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="6" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="5" total_data={totalInfo} category_data={macbookInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="7" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="6" total_data={totalInfo} category_data={studyInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="8" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="7" total_data={totalInfo} category_data={internInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="9" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="8" total_data={totalInfo} category_data={lectureInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="10" className="pb-4 p-4 ps-0 pe-0">
                                                        <Row>
                                                            <AllProgramsData category="9" total_data={totalInfo} category_data={etcInfo} />
                                                        </Row>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Tab.Container> */}
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Container>
                    </div>
                    {/* 하단부 Footer */}
                    <Footer />
                </>
            ) : (
                ""
            )}
        </Fragment>
    );
};

export default Main;
