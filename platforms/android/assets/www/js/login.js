function localCallback()
{
document.getElementById("login").addEventListener("click", loginUser, false);
}



function loginUser(inputEmail){
 var email = document.getElementById("email").value;
    var nrDays = 7;
    createCookie('loginUserEmail',inputEmail,nrDays);
    window.location = "home.html";
}