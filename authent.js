window.onload = function () {
    let btnLogin = document.getElementById('loginBtn');
    let wlcDiv = document.getElementById('msgDiv');
    let btnLogout = document.getElementById('logoutBtn');
    let loginBx = document.getElementById('loginBox');
    let btnBox = document.getElementById('changeBtnBox');
    let colBtn = document.getElementById('changeCol');
    let txtBtn = document.getElementById('changeText');


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
            wlcDiv.style.display = 'block';
            wlcDiv.innerHTML = `Welcome ${user.displayName}<br>`;
            loginBx.style.display = 'none';
            btnLogout.style.display = 'block';
            btnBox.style.display = 'flex';
            
            let pic = document.createElement('img');
            pic.id = 'userPic';
            pic.src = user.photoURL;
            wlcDiv.appendChild(pic);
            if (user.displayName == 'Martin Larsson') {
                txtBtn.disabled = false;
            } else {
                txtBtn.disabled = true;
            }

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
            wlcDiv.style.display = 'block';
            wlcDiv.innerHTML = `Something went wrong! <br>
Error: ${error.message}`;
        });
    });

    btnLogout.addEventListener('click', function (ev) {
        firebase.auth().signOut()
            .then(function (result) {
                loginBx.style.display = 'block';
                btnLogout.style.display = 'none';
                btnBox.style.display = 'none';
            wlcDiv.innerHTML = '';
            changeColor('antiquewhite');
            })
            .catch(function (error) {
                console.log(error.code);
                console.log(error.message);
                wlcDiv.innerHTML = `Something went wrong! <br>
Error: ${error.message}`;
            });
    })
    colBtn.addEventListener('click', x => {
        changeColor('black');
    });
    txtBtn.addEventListener('click', x => {
        changeColor('antiquewhite');
    });

    function changeColor(col) {
        let bg = document.getElementsByTagName("BODY")[0];
        bg.style.backgroundColor = col;
    }
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
