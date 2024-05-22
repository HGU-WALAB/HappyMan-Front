// import node module libraries
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Fragment } from "react";
import { Col, Row, Container, Nav, Tab, Form } from "react-bootstrap";

// import sub components
import HeroHeader from "components/marketing/pages/courses/course-index/HeroHeader";

// import data files
import SelectedProgramsData from "pages/Main/SelectedProgramsData";
import AllProgramsData from "./AllProgramsData";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";
import axios from "axios";
import { getCategory, getCategoryAfterLogin } from "services/mainApi";
import { get } from "jquery";

const Main = ({}) => {
    // const [totalInfo, setTotalInfo] = useState([]);
    // const [eventInfo, setEventInfo] = useState([]);
    const [totalLoading, setTotalLoading] = useState(false);
    const [fileInfo, setFileInfo] = useState([]);
    const [categories, setCategories] = useState([]); // json 형식의 로딩을 위해서
    const [selectedCategory, setSelectedCategory] = useState("all"); // 카테고리별로 보여주기 위함
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (categoryId) => {
        console.log("카테고리 ID : ", categoryId);
        setActiveTab(categoryId.toString());
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
                handleTabChange(activeTab);
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
                                            <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                                                <Nav className="nav-lb-tab fs-4">
                                                    {/* categories에 "전쳬" 를 넣고 id는 0으로 하고 이걸 누르면 전체가 다 나오게 만들기 */}
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
                                                            {activeTab === category.id.toString() &&
                                                                (activeTab === "0" ? (
                                                                    <AllProgramsData categoryId={category.id} />
                                                                ) : (
                                                                    <SelectedProgramsData categoryId={category.id} />
                                                                ))}
                                                        </Tab.Pane>
                                                    ))}
                                                </Tab.Content>
                                            </Tab.Container>
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
