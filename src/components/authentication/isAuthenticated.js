import getCookie from "./getCookieValue";

function isAuthenticated(){
    var checkCookie = getCookie("auth-token");
    if(checkCookie!=null){
        return true;
    } else{
        return false;
    };
};

export default isAuthenticated;