/* 
네비게이션 바의 프로필 사진을 눌렀을 때 나오는 화면 
- 세션스토리지에서 사용자 이름 가져와 출력
- 로그아웃 버튼 클릭시 userData, token값 삭제 후 메인페이지 이동, 리렌더링
*/

// import node module libraries
import { Fragment, useLayoutEffect, useState } from "react";
import { Menu, Search } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, InputGroup, Dropdown, Form, ListGroup, Row, Col, OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";

// import data files

const NavbarProfile = ({ logout }) => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        // var ID = readUserInformation(window.sessionStorage.getItem("id"));
        // readUserInformation(ID);
    }, []);

    // const readInformation = () => {
    //   if (window.sessionStorage.getItem("status") === -2) setMenu(DashboardSuperMenu);
    //   else setMenu(DashboardMenu);
    // };

    // const readUserInformation = async (id) => {
    //   setUserInformationLoading(false);
    //   const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    //   setUserName(response.data[0].name);
    //   setUserEmail(response.data[0].email);
    //   setUserInformationLoading(true);
    // };

    // 로그아웃 시도 시 사용하는 기능 -> 세션스토리지 값 지우고 메인화면으로 되돌림
    const handleLogout = () => {
        // if (window.confirm("정말 로그아웃하시겠습니까?")) {
        // alert("로그아웃 시도!");
        sessionStorage.clear();
        navigate("/swap");
        // }
    };

    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const name = userData ? userData.name : null;
    const status = userData ? userData.status : null;

    return (
        <Fragment>
            <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} bsPrefix="dt" className="rounded-circle border-bottom-0" id="dropdownUser">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                        {/* 이걸 바꿔야 함  */}
                        <Image src={window.sessionStorage.getItem("profileImg")} className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-end mt-4 py-0" aria-labelledby="dropdownUser" align="end">
                    <Dropdown.Item className="mt-3">
                        <div className="d-flex">
                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                {/* 이걸 바꿔야 함  */}
                                <Image src={window.sessionStorage.getItem("profileImg")} className="rounded-circle" />
                            </div>
                            {/* {userInformationLoading ? ( */}
                            <div className="ms-3 lh-1">
                                {status === "USER" ? <h5 className="mb-1">{name} 학부생 </h5> : <h5 className="mb-1">{name} </h5>}
                                <p className="mb-0 text-muted">{window.sessionStorage.getItem("myemail")} </p>
                            </div>
                        </div>
                    </Dropdown.Item>
                    {/* 구글 -> 히즈넷 로그인으로 전환함에 따라 프로필,설정 불필요
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">
                        <i className="fe fe-user me-2"></i> 프로필
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <i className="fe fe-settings me-2"></i> <Link to="/swap/mypage">설정</Link>
                    </Dropdown.Item>
                    */}
                    <Dropdown.Divider />
                    {/* 구글 로그아웃 -> 자체 로그아웃으로 프로세스 변경 */}
                    <Dropdown.Item className="mb-3" onClick={handleLogout}>
                        <i className="fe fe-power me-2"></i> 로그아웃
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    );
};

export default NavbarProfile;
