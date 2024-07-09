export function isActive() {
    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const token = userData ? userData.exp : null;
    try {
        // console.log(token);
        if (token < (new Date().getTime() + 1) / 1000) {
            console.log("expired");
            return false;
        }
    } catch (err) {
        return false;
    }
    console.log("active");
    return true;
}
