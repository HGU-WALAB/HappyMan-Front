import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import { Col, Row, Card, Form, Button, InputGroup } from "react-bootstrap";
import FormBuilderModal from "./FormBuilderModal";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import axios from "axios";
import "assets/scss/formBuilder.css";
import { useEffect } from "react";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

var formData = [];

class FormBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: 0,
            isOpen: false,
            opacity: 0,
            formResult: "",
            title: "",
            isSet: false,
            category: "",
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // 이전 props의 formResult와 현재 props의 formResult를 비교하여 변경 여부를 확인합니다.
        if (prevProps.formResult !== this.props.formResult) {
            // console.log("Form Result Updated:", this.props.formResult);
            // formResult를 formData의 applicationForm에 추가합니다.
            const updatedApplicationForm = JSON.parse(this.props.formResult);
            const updatedFormData = { ...this.props.formData, applicationForm: updatedApplicationForm };

            // formData를 업데이트합니다.
            this.props.setFormData(updatedFormData);
        }
    }

    fb = createRef();
    componentDidMount() {
        var fbTemplate = document.getElementById("fb-editor");
        var options = {
            disabledActionButtons: ["save", "clear", "data"],
        };
        // formData =

        var formBuilder = $(this.fb.current).formBuilder({ formData });

        // if (this.props.template === "2") {
        //     document.getElementById("saveApplication").addEventListener("click", () => {
        //         const result = formBuilder.actions.save();
        //         this.setState({ formResult: JSON.stringify(result, null, 2) }, () => {
        //             // 상위 컴포넌트로 formResult 전달
        //             this.props.updateFormResult(this.state.formResult);
        //         });
        //     });
        // }

        if (this.props.template === "2") {
            document.getElementById("saveApplication").addEventListener("click", () => {
                const result = this.formBuilderInstance.actions.save();
                this.setState({ formResult: JSON.stringify(result, null, 2) }, () => {
                    // 상위 컴포넌트로 formResult 전달
                    this.props.updateFormResult(this.state.formResult);
                });
            });
        }
        if (this.props.template === "1") {
            document.getElementById("saveData").addEventListener("click", () => {
                const result = formBuilder.actions.save();
                this.setState({ formResult: JSON.stringify(result, null, 2) });
            });
        }

        if (this.props.template === "0") {
            document.getElementById("submitData").addEventListener("click", () => {
                const result = formBuilder.actions.save();
                this.setState({ formResult: JSON.stringify(result, null, 2) });
            });
        }

        if (this.props.edit === "1") {
            document.getElementById("submitData").addEventListener("click", () => {
                const result = formBuilder.actions.save();
                this.setState({ formResult: JSON.stringify(result, null, 2) });
            });
        }

        document.getElementById("clear-all-fields").onclick = function () {
            if (window.confirm("전부 지우고 새로 작성하시겠습니까?") == true) {
                formBuilder.actions.clearFields();
            }
        };
    }

    modalState = () => {
        this.setState({ modalOpen: 1 });
        this.setState({ isOpen: true });
    };

    afterOpen = () => {
        setTimeout(() => {
            this.setState({ opacity: 1 });
        }, 100);
    };

    beforeClose = () => {
        return new Promise((resolve) => {
            this.setState({ opacity: 1 });
            setTimeout(resolve, 300);
        });
    };

    toggleModal = (e) => {
        this.setState({ opacity: 1, isOpen: false });
    };

    handleChange = (e) => {
        this.setState({ title: e.target.value }, () => {
            // console.log("Title:", this.state.title); // 로그 출력
        });
    };

    handleChange_category = (e) => {
        this.setState({ category: e.target.value });
    };

    createApplication = async () => {
        var params = new URLSearchParams();
        params.append("name", this.state.title);
        params.append("content", this.state.formResult);
        params.append("category_id", this.state.category);
        params.append("admin_id", window.sessionStorage.getItem("id"));

        // formBuilder 인스턴스를 이미 생성된 것을 활용하도록 수정
        const formBuilder = $(this.fb.current).formBuilder();

        // formBuilder에서 결과를 가져옵니다.
        const result = formBuilder.actions.save();

        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "application/add", params);
        if (response.data === 1) {
            alert("템플릿으로 저장 되었습니다.");
            window.location.reload();
        } else if (response.data === -2) alert("동일한 이름의 템플릿이 존재합니다.");

        // 새로운 applicationForm을 생성하고 기존 formData에 추가합니다.
        const formDataWithApplicationForm = { ...this.props.data, applicationForm: JSON.parse(this.state.formResult) };

        // formData를 업데이트합니다.
        this.props.setData(formDataWithApplicationForm);

        // formResult 상태를 업데이트합니다.
        this.setState({ formResult: JSON.stringify(result, null, 2) });

        // isOpen 상태와 opacity, isSet 상태를 업데이트합니다.
        this.setState({ opacity: 1, isOpen: false, isSet: true });

        if (response.data === 1 && this.props.template === "1") {
            // 추가 작업이 필요한 경우 이 부분에 추가 코드를 작성합니다.
        }
    };

    createSurvey = async () => {
        var params = new URLSearchParams();
        params.append("name", this.state.title);
        params.append("content", this.state.formResult);
        params.append("category_id", this.state.category);
        params.append("admin_id", window.sessionStorage.getItem("id"));

        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "survey/add", params);
        if (response.data === 1) {
            alert("템플릿으로 저장 되었습니다.");
            window.location.reload();
        } else if (response.data === -2) alert("동일한 이름의 템플릿이 존재합니다.");
        this.setState({ opacity: 1, isOpen: false });
        this.setState({ isSet: true });
        if (response.data === 1 && this.props.template === "1") {
        }
    };

    saveApplication = async () => {
        this.props.saveApplication(this.state.formResult);
    };

    clickSubmit = async () => {
        this.props.saveApplication(this.state.formResult);
        this.props.submit(this.state.formResult);
        // console.log("받아온 from data는 : ", this.props.data);
        // this.props.data.applicationForm = JSON.stringify(this.state.formResult);
        this.props.data.applicationForm = this.state.formResult;
        console.log("최종확인 ", this.props.data.applicationForm);
        if (this.props.program === "1") {
            this.props.saveFunction();
            this.props.addProgram(); // addProgram 함수 호출
        }
    };

    // 임시로
    handleNext = () => {
        // 다음 단계로 넘어가는 작업 수행
        this.saveApplication(); // saveApplication 실행
        this.props.addProgram(); // addProgram 실행
    };

    render() {
        return (
            <>
                <Card className="mb-3  border-0">
                    <Card.Header className="border-bottom px-4 py-3">
                        {this.props.survey === "1" ? <h4 className="mb-0">프로그램 설문지</h4> : <h4 className="mb-0">프로그램 신청서</h4>}
                    </Card.Header>
                    <Card.Body>
                        <div id="fb-editor" ref={this.fb} />
                        <div class="saveDataWrap" className="d-flex justify-content-end">
                            <Button id="clear-all-fields" variant="danger" type="button" className="mt-3 me-3">
                                새로 작성
                            </Button>
                            {this.props.template === "1" ? (
                                <Button id="saveData" type="button" className="mt-3" onClick={this.modalState}>
                                    템플릿으로 저장
                                </Button>
                            ) : (
                                ""
                            )}

                            {this.state.isOpen ? (
                                <>
                                    <ModalProvider backgroundComponent={FadingBackground}>
                                        <StyledModal
                                            isOpen={this.state.isOpen}
                                            afterOpen={this.afterOpen}
                                            beforeClose={this.beforeClose}
                                            onBackgroundClick={this.toggleModal}
                                            onEscapeKeydown={this.toggleModal}
                                            opacity={this.opacity}
                                            backgroundProps={this.opacity}
                                        >
                                            <div>
                                                <button type="button" class="btn-close" aria-label="Close" onClick={this.toggleModal}></button>

                                                <Form className="mt-2">
                                                    {this.props.template === "1" ? (
                                                        <>
                                                            <Row>
                                                                <Col xs={12} className="mt-3">
                                                                    <Form.Group controlId="program_category">
                                                                        {this.props.survey === "1" ? (
                                                                            <Form.Label>
                                                                                설문지 템플릿의 카테고리를 선택해주세요. <span className="text-danger">*</span>
                                                                            </Form.Label>
                                                                        ) : (
                                                                            <Form.Label>
                                                                                신청서 템플릿의 카테고리를 선택해주세요. <span className="text-danger">*</span>
                                                                            </Form.Label>
                                                                        )}

                                                                        <select
                                                                            class="form-select"
                                                                            id="program_category"
                                                                            name="program_category"
                                                                            onChange={this.handleChange_category}
                                                                            required
                                                                        >
                                                                            <option selected value="">
                                                                                카테고리
                                                                            </option>
                                                                            <option value="1">대회</option>
                                                                            <option value="2">봉사</option>
                                                                            <option value="3">캠프</option>
                                                                            <option value="4">행사</option>
                                                                            <option value="5">맥북</option>
                                                                            <option value="6">프로젝트/스터디</option>
                                                                            <option value="7">인턴/현장실습</option>
                                                                            <option value="8">특강</option>
                                                                            <option value="9">기타</option>
                                                                        </select>
                                                                        <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            {this.props.survey === "1" ? (
                                                                <Row>
                                                                    <Col xs={12} className="mt-6">
                                                                        <Form.Group controlId="formProjectTitle">
                                                                            <Form.Label>
                                                                                저장할 설문지 템플릿 이름을 입력해주세요. <span className="text-danger">*</span>
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Enter survey title"
                                                                                required
                                                                                onChange={this.handleChange}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xs={12} className="mt-6 d-flex justify-content-end">
                                                                        <Button variant="primary" type="button" className="ms-2" onClick={this.createSurvey}>
                                                                            저장
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            ) : (
                                                                <Row>
                                                                    <Col xs={12} className="mt-6">
                                                                        <Form.Group controlId="formProjectTitle">
                                                                            <Form.Label>
                                                                                저장할 신청서 템플릿 이름을 입력해주세요. <span className="text-danger">*</span>
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Enter application title"
                                                                                required
                                                                                onChange={this.handleChange}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xs={12} className="mt-6 d-flex justify-content-end">
                                                                        <Button
                                                                            variant="primary"
                                                                            type="button"
                                                                            className="ms-2"
                                                                            onClick={this.createApplication}
                                                                        >
                                                                            저장
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <Row>
                                                            <Col xs={12} className="mt-6">
                                                                <Form.Group controlId="formProjectTitle">
                                                                    <Form.Label>
                                                                        저장할 신청서 템플릿 이름을 입력해주세요. <span className="text-danger">*</span>
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Enter application title"
                                                                        required
                                                                        onChange={this.handleChange}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={12} className="mt-6 d-flex justify-content-end">
                                                                <Button variant="primary" type="button" className="ms-2" onClick={this.createApplication}>
                                                                    저장
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    )}
                                                </Form>
                                            </div>
                                        </StyledModal>
                                    </ModalProvider>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </Card.Body>
                </Card>
                {this.props.edit === "1" ? (
                    <div className="d-flex justify-content-end">
                        <Button id="submitData" className="btn btn-primary" type="button" onClick={this.clickSubmit}>
                            완료
                        </Button>
                    </div>
                ) : // : this.props.template === "0" ? (
                //     <div className="d-flex justify-content-end">
                //         <Button id="saveApplication" variant="primary" type="submit" onClick={this.saveApplication}>
                //             다음
                //         </Button>
                //     </div>
                // )
                this.props.template === "0" ? (
                    <div className="d-flex justify-content-end">
                        <Button id="submitData" className="btn btn-primary" type="button" onClick={this.clickSubmit}>
                            완료
                        </Button>
                    </div>
                ) : (
                    ""
                )}
                {/* {this.props.template === "0" ? (
          <div className="d-flex justify-content-end">
            <Button id="saveApplication" variant="primary" type="submit" onClick={this.saveApplication}>
              다음
            </Button>
           
          </div>
        ) : (
          ""
        )} */}
                {/* {this.props.template === "2" ? (
          <div className="d-flex justify-content-end">
            <Button id="submitData" className="btn btn-primary" type="button" onClick={this.clickSubmit}>
              완료
            </Button>
          </div>
        ) : (
          ""
        )} */}
            </>
        );
    }
}

export default FormBuilder;

const StyledModal = Modal.styled`
  width: 22rem;
  height: 23rem;
  padding : 20px;
  border-radius:20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FadingBackground = styled(BaseModalBackground)`
    opacity: ${(props) => props.opacity};
    transition: all 0.3s ease-in-out;
`;
