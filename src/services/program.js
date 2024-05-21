// 프로그램들의 추가,삭제,수정등을 조절하는 API
// 로그인 상태에서만 사용하므로, JWT를 전체에 적용해야 함

import axios from "axios";

// 프로그램 추가
// export async function addProgram(e) {
//     const formData = new FormData();
//     formData.append("image", e.image); // 이미지 파일을 FormData에 추가

//     // 추가적인 텍스트 변수들을 FormData에 추가
//     formData.append("text1", e.text1);
//     formData.append("text2", e.text2);
//     formData.append("text3", e.text3);
//     formData.append("text4", e.text4);
//     formData.append("text5", e.text5);

//     try {
//         await axios.post(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs`, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data", // 멀티파트 형식으로 요청을 보내기 위한 헤더
//                 Authorization: "Bearer " + sessionStorage.getItem("token"),
//             },
//         });
//         console.log("프로그램 추가 성공!");
//     } catch (error) {
//         console.log("프로그램 추가 실패!");
//         throw error;
//     }
// }

// 프로그램 ID로 상세정보 가져오기

// 비로그인
export const getProgramDetails = async (programId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/all/programs/${programId}`);
        console.log("프로그램 상세 데이터 조회 성공 : ", response.data);
        return response.data;
    } catch (error) {
        console.log("프로그램 상세 조회 (사용자) 실패 : ", error);

        throw error;
    }
};

// 사용자
export const getProgramDetailsUser = async (programId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/programs/${programId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        console.log("프로그램 상세 데이터 조회 성공 : ", response.data);
        return response.data;
    } catch (error) {
        console.log("프로그램 상세 조회 (사용자) 실패 : ", error);

        throw error;
    }
};

// 관리자
export const getProgramDetailsAdmin = async (programId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs/${programId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        console.log("프로그램 상세 데이터 조회 (관리자) 성공", response.data);
        return response.data;
    } catch (error) {
        console.log("프로그램 상세 조회 (관리자) 실패 : ", error);
    }
};

// 관리자 페이지에서 프로그램 전체 정보 가져오기
export const getProgramAdmin = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        const result = response.data.programs;

        return result;
    } catch (error) {
        console.log("관리자 페이지 프로그램 조회 실패");

        throw error;
    }
};
