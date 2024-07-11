import axios from "axios";

// 사용자 정보 불러오기
export const getAllUser = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/users/user`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        console.log("전체 사용자 조회 성공 : ", response.data.users);
        const res = response.data.users;
        // console.log("보낼거", res);
        return res;
    } catch (error) {
        console.log("전체 사용자 조회 실패 : ", error);
    }
};

// 관리자 정보 불러오기
export const getAllAdmin = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/users/admin`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        console.log("전체 관리자 조회 성공 : ", response.data.users);
        const res = response.data.users;
        // console.log("보낼거", res);
        return res;
    } catch (error) {
        console.log("전체 관리자 조회 실패 : ", error);
    }
};
