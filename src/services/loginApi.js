import axios from "axios";

export const getToken = async (hisnetToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/auth/login`,
            { hisnetToken: hisnetToken } // 토큰을 요청의 본문에 담아 보냅니다.
        );
        const token = response.data.token;
        // alert(response.data.token);
        console.log("Hisnet Token : ", hisnetToken);
        console.log("토큰 받아오기 성공");

        return token;
    } catch (error) {
        console.log("연규야 토큰이 안받아와진다");
        throw error;
    }
};
