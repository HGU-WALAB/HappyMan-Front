import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function LoginForm() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    // 로그인 버튼 클릭 프로세스 관리
    const handleSubmit = (event) => {
        event.preventDefault();
        // 입력된 내용 콘솔창에 띄우기 (로그인 API 성공시 각주처리, 디버깅용으로 사용)
        console.log("ID :", userId);
        console.log("PW :", password);

        // 로그인 API는 이곳에 연동하기
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hisnet ID</Form.Label>
                <Form.Control type="id" placeholder="아이디를 입력하세요" value={userId} onChange={(e) => setUserId(e.target.value)} />
                {/* 필요하면 사용하기 */}
                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hisnet PW</Form.Label>
                <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
                로그인
            </Button>
        </Form>
    );
}

export default LoginForm;
