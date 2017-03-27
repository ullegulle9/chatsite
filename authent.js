let btnLogin = document.getElementById('loginBtn');


var provider = new firebase.auth.GithubAuthProvider();


btnLogin.addEventListener('click', function (ev) {
    console.log('pressed');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        let user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode);
        console.log(errorMessage);
    });
});
