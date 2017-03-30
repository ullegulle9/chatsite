window.onload = function () {
    let btnLogin = document.getElementById('loginBtn');
    let wlcDiv = document.getElementById('msgDiv');
    let btnLogout = document.getElementById('logoutBtn');
    let loginBx = document.getElementById('loginBox');
    let btnBox = document.getElementById('changeBtnBox');
    let colBtn = document.getElementById('changeCol');
    let txtBtn = document.getElementById('changeText');
    let btnTwt = document.getElementById('twtBtn');


    var provider = new firebase.auth.GithubAuthProvider();
    var provider2 = new firebase.auth.TwitterAuthProvider();


    function showLoggedInContent(user){
        wlcDiv.style.display = 'block';
            wlcDiv.innerHTML = `Welcome ${user.displayName}<br>`;
            loginBx.style.display = 'none';
            btnLogout.style.display = 'block';
            btnBox.style.display = 'flex';

            let pic = document.createElement('img');
            pic.id = 'userPic';
            pic.src = user.photoURL;
            wlcDiv.appendChild(pic);
    }

    //GitHub login

    btnLogin.addEventListener('click', function (ev) {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            showLoggedInContent(user);
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
            wlcDiv.style.display = 'block';
            wlcDiv.innerHTML = `Something went wrong! <br>
Error: ${error.message}`;
        });
    });



    //Twitter login

    btnTwt.addEventListener('click', function (ev) {
        firebase.auth().signInWithPopup(provider2).then(function (result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            let user = result.user;
            showLoggedInContent(user);
            txtBtn.disabled = true;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            wlcDiv.style.display = 'block';
            wlcDiv.innerHTML = `Something went wrong! <br>
Error: ${error.message}`;
        });
    })



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




