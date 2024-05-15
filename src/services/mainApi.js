// Main 화면에 출력되는 것들에 대한 API
// 비로그인 상태에서도 볼 수 있어야 하기 때문에, JWT Header를 씌우면 안 됨

import axios from "axios";

export async function getCategory() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/all/categories`);
        const categoryData = response.data;
        // console.log("카테고리 정보 가져오기 성공");
        return categoryData;
    } catch (error) {
        console.log("카테고리 정보 가져오기 실패");
        throw error;
    }
}

export async function getPrograms() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/all/programs`);
        const programData = response.data;
        console.log("프로그램 정보 불러오기 성공");
        return programData;
    } catch (error) {
        console.log("프로그램 정보 불러오기 실패");
        throw error;
    }
}

export async function getProgramsAfterLogin() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"), // 여기에 공백 추가
            },
        });
        const programData = response.data;
        console.log("(로그인 후) 프로그램 정보 불러오기 성공");
        return programData;
    } catch (error) {
        console.log("(로그인 후) 프로그램 정보 불러오기 실패");
        throw error;
    }
}
