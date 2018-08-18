window.fbAsyncInit = function () {
    FB.init({
        appId: '210421869817495',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            axios.post('http://localhost:3000/users/loginfb', response.authResponse)
                .then((data_fb) => {
                    localStorage.setItem('token', data_fb.data.token)
                    swal({
                        title: "Login Success!",
                        icon: "success",
                        button: "next",
                    });
                    window.location.href="http://localhost:8080/dashboard.html"
                })
                .catch((err) => {
                    swal(err.message)
                })
        }
    });
}
