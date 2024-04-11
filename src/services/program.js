// 프로그램들의 추가,삭제,수정등을 조절하는 API
// 로그인 상태에서만 사용하므로, JWT를 전체에 적용해야 함

import axios from "axios";

// 프로그램 추가
export async function addProgram(e) {
    const programData = {
        image: e.image,
    };

    try {
        await axios.post(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs`, programData, {
            headers: {
                Authorization: "Bearer" + sessionStorage.getItem("token"),
            },
        });
        console.log("프로그램 추가 성공!");
    } catch (error) {
        console.log("프로그램 추가 실패!");
        throw error;
    }
}

export const getProgramDetails = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/9`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        console.log("프로그램 상세 데이터 조회 성공");
        return response.data;
    } catch (error) {
        console.log("프로그램 상세 데이터 조회 실패");

        throw error;
    }
};
