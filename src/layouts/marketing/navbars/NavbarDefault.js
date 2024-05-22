/* 네비게이션 컴포넌트, 하위로 로그인, 프로필, 마이페이지 등의 링크가 있음 */

// import node module libraries
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Image, Navbar, Nav, Container, Form, Dropdown, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import LoginForm from "components/login/LoginForm";
import LoginBtn from "components/login/LoginBtn";
import "../../../assets/scss/navbar.scss";

// import media files
import Logo from "assets/images/SWAPLogo.png";
import NavbarProfile from "./NavbarProfile";

const NavbarDefault = ({ headerstyle }, { props }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const [showMenu, setShowMenu] = useState(true);
    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };

    const [expandedMenu, setExpandedMenu] = useState(false);
    const today = new Date();

    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const token = userData ? userData.exp : null;
    const status = userData ? userData.status : null;

    // 현재 사용자의 상태를 세션스토리지에서 가져와 위의 퀵메뉴 출력
    const QuickMenu = () => {
        return (
            <Fragment>
                {/* 관리자일 때  */}
                {status === "ADMIN" ? (
                    <Nav>
                        <Nav.Link className="h4" href="/admin/program">
                            관리자 페이지
                        </Nav.Link>
                        {/* <Nav.Link className="h4" href="/admin/program" target="_blank" rel="noopener noreferrer">
                            관리자 페이지
                        </Nav.Link> */}

                        <Nav.Link className="h4" href="/mypage">
                            마이페이지
                        </Nav.Link>
                    </Nav>
                ) : (
                    // 사용자일 때
                    <Nav>
                        <Nav.Link className="h4" href="/mypage">
                            마이페이지
                        </Nav.Link>
                    </Nav>
                )}
                {/* 로그아웃은 공통 */}
                <NavbarProfile />
            </Fragment>
        );
    };

    const [isLogin, setIsLogin] = useState(false);

    // 로그인 성공 시 프로세스 (바뀐 로그인에 맞춰 수정 필요)
    const onSuccess = async (response) => {
        var login = 0;
        const params = new URLSearchParams();
        params.append("token", response.tokenObj.id_token);
        params.append("name", response.profileObj.name);
        params.append("email", response.profileObj.email);
        params.append("expire", response.tokenObj.expires_at);
        params.append("manageID", window.sessionStorage.getItem("id"));

        const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login", params);

        if (res.data == "notHandong") {
            alert("한동 메일로 로그인하여 주세요.");
            navigate("/");
        } else if (res.data !== "fail" && res.data !== "newUser") {
            const r = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + res.data.id);
            window.sessionStorage.setItem("email", response.profileObj.email);
            window.sessionStorage.setItem("name", response.profileObj.name);
            window.sessionStorage.setItem("profileImg", response.profileObj.imageUrl);
            window.sessionStorage.setItem("token", response.tokenObj.id_token);
            window.sessionStorage.setItem("expires_at", response.tokenObj.expires_at);
            window.sessionStorage.setItem("status", res.data.status);
            window.sessionStorage.setItem("id", res.data.id);
            window.sessionStorage.setItem("myname", r.data[0].name);
            window.sessionStorage.setItem("myemail", r.data[0].email);
            // window.sessionStorage.setItem("myname", res.data.status);

            setIsLogin(true);
            login = 1;

            console.log("로그인 성공");
        } else if (res.data === "newUser") {
            console.log("user 등록 페이지로 가기!!");

            navigate("/sign-up", { state: { data: response.profileObj, tokenObj: response.tokenObj } });
        } else {
            alert("로그인 할 수 없습니다. 관리자에게 문의해주세요.");
            setIsLogin(false);
        }
    };

    // 로그인 실패 시
    const onFailure = (error) => {
        console.log(error);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    // 실제 화면 출력
    return (
        <Fragment>
            <Navbar
                onToggle={(collapsed) => setExpandedMenu(collapsed)}
                expanded={expandedMenu}
                expand="lg"
                className={`${isLogin ? "bg-white" : ""} navbar p-2 ${headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"}`}
            >
                <Container fluid className="px-0 ps-2">
                    <Navbar.Brand as={Link} to="/">
                        <Image src={Logo} alt="" width="170px" />
                    </Navbar.Brand>

                    <div
                        className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
                            isLogin ? (isDesktop || isLaptop ? "d-none" : "d-flex") : "d-none"
                        }`}
                    >
                        <QuickMenu />
                    </div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="icon-bar top-bar mt-0"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Search Form */}
                        {/* <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control type="Search" id="formSearch" className="ps-6" placeholder="Search Courses" />
            </Form> */}

                        <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                            {/* 세션스토리지의 토큰 값이 유효하면 퀵메뉴, 유효하지 않으면 로그인 창 출력 */}
                            {token !== null && token < today.getTime() ? (
                                <QuickMenu />
                            ) : (
                                // 로그인 창으로 이동
                                <LoginBtn />
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
    headerstyle: PropTypes.string,
    login: PropTypes.bool,
};

export default NavbarDefault;
