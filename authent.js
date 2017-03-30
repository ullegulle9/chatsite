window.onload = function () {
    let btnLogin = document.getElementById('loginBtn');
    let wlcDiv = document.getElementById('msgDiv');
    let btnLogout = document.getElementById('logoutBtn');

    var provider = new firebase.auth.GithubAuthProvider();
    btnLogin.addEventListener('click', function (ev) {
        console.log('pressed');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token);
            console.log(user);
            wlcDiv.innerHTML = `Welcome ${user.displayName}`;
            btnLogin.style.display = 'none';
            btnLogout.style.display = 'block';

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
            console.log(email);
            console.log(credential);
            wlcDiv.innerHTML = `Something went wrong! <br>
Error: ${error.message}`;
        });
    });

    btnLogout.addEventListener('click', function (ev) {
        firebase.auth().signOut()
            .then(function (result) {
                wlcDiv.innerHTML = 'Auf wiedersen!';
                btnLogout.style.display = 'none';
            btnLogin.style.display = 'block';
            })
            .catch(function (error) {
                console.log(error.code);
                console.log(error.message);
                wlcDiv.innerHTML = `Something went wrong! <br>
Error: ${error.message}`;
            });
    })
}

/*

window.addEventListener('load', function () {
    var provider = new firebase.auth.GithubAuthProvider();
    console.log('före autentisering');

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log('Autentisering lyckades: ', result);
        })
        .catch(function (error) {
            console.log('Autentisering misslyckades: ', error);
        })
});
*/
