let inputName = document.getElementById('nameInput');
let nameBtn = document.getElementById('saveName');
let welcomeDiv = document.getElementById('welcome');
let logOut = document.getElementById('forget');
let chatField = document.getElementById('chatInput');
let chatBtn = document.getElementById('send');
let wBox = document.getElementById('welcomeTitleBox');

var numberOfMessages;
let chtBox = document.getElementById('chatBox');
let msgBox = document.getElementById('messageBox');
chtBox.style.display = 'none';
nameBtn.addEventListener('click', saveName);
inputName.addEventListener('keypress', x => {
    if (x.keyCode == 13) {
        saveName();
    }
});
logOut.addEventListener('click', forgetName);


updateChat();

let loggedInUser;


console.log(typeof (data));

window.onload = function () {
    if (localStorage.getItem("name") !== null) {
        welcomeDiv.innerHTML = `<h1>Welcome ${localStorage.getItem("name")}</h1>`;
        loggedInUser = localStorage.getItem("name");
        chtBox.style.display = 'flex';
        inputName.style.display = 'none';
        nameBtn.style.display = 'none';
        wBox.style.display = 'none';

    } else {
        logOut.style.display = 'none';
    }

}

function saveName() {
    if (inputName.value.length > 0) {
        console.log(inputName.value.length);
        let name = inputName.value;
        localStorage.setItem("name", name);
        chtBox.style.display = 'flex';
        inputName.style.display = 'none';
        nameBtn.style.display = 'none';
        logOut.style.display = 'block';
        welcomeDiv.innerHTML = `<h1>Welcome ${localStorage.getItem("name")} </h1>`;
        loggedInUser = name;
        wBox.style.display = 'none';
    } else {
        welcomeDiv.innerHTML = 'You need to enter a name to login!';
    }

}

function forgetName() {
    localStorage.removeItem("name");
    inputName.style.display = 'block';
    nameBtn.style.display = 'block';
    welcomeDiv.innerHTML = '';
    logOut.style.display = 'none';
    chtBox.style.display = 'none';
    wBox.innerHTML = '<p>See you again soon!</p>';
    wBox.style.display = 'block';
}

chatBtn.addEventListener('click', function (e) {
    sendMessage();
    chatField.value = '';
});
chatField.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        sendMessage();
        chatField.value = '';
    }
});

function sendMessage() {
    let message = chatField.value;
    let name = localStorage.getItem("name");
    let time = new Date().toString();
    let id = numberOfMessages + 1;
    console.log(time);
    let obj = {
        Name: name,
        Message: message,
        ID: id,
        Time: time
    };

    firebase.database().ref('messages/' + obj.ID).set(obj);
}

let likeBool = false;
let disLikeBool = false;
let pressed = false;


function updateChat() {

    firebase.database().ref('messages/').on('value', function (snapshot) {
        var data = snapshot.val();

        msgBox.innerHTML = '';
        for (let p in data) {
            let pObj = data[p];
            let votes = data[p].Votes;
            let upVote = 0;
            let downVote = 0;
            let upVoters = [];
            let downVoters = [];
            //console.log(data[p].Votes);
            //console.log(pObj.ID);
            if (votes == undefined) {
                upVote = 0;
                downVote = 0;
            } else {
                for (let prop in votes) {

                    if (votes[prop] == 1) {
                        upVote++;
                        upVoters.push(prop);
                    } else if (votes[prop] == -1) {
                        downVote++;
                        downVoters.push(prop);
                    }
                }
            }

            //console.log(upVoters);
            let newDiv = document.createElement('div');
            newDiv.className = 'chatMsg';
            let html = `<span class="chatName">${pObj.Name}:</span> <span                   class="chatText">${pObj.Message}</span><br>
                        <span class="postedAt">Posted at ${pObj.Time}, ID: ${pObj.ID}</span><br>
                        <img class="rateBtn upVote" src="like.png"><div class="dropDown"><span class="greenVote">${upVote}</span></div><img class="rateBtn downVote" src="dislike.png"><div class="dropDown"><span class="redVote">${downVote}</span></div>`;

            newDiv.innerHTML = html;
            let like = newDiv.getElementsByClassName('upVote'); //upThumb
            let disLike = newDiv.getElementsByClassName('downVote'); //downThumb
            let showLikes = newDiv.getElementsByClassName('greenVote');
            let showDisLikes = newDiv.getElementsByClassName('redVote');
            like[0].addEventListener('click', function (e) {
                likeBool = true;
                rateMsg(pObj.ID);
            });
            disLike[0].addEventListener('click', function (e) {
                disLikeBool = true;
                rateMsg(pObj.ID);
            });
            
            //SHOW LIKES
            showLikes[0].addEventListener('click', function (e) {
                likeBool = true;
                
                let popupdiv = document.getElementById('likePop');
                console.log(popupdiv);
                if (popupdiv === null){
                    
                    showVotes(e.target, upVoters);
                }
                else {
                    popupdiv.outerHTML = '';
                    delete popupdiv;
                    likeBool = false;
                }
                
            });
            
            //SHOW DISLIKES
            
            showDisLikes[0].addEventListener('click', function (e) {
                disLikeBool = true;
                let popupdiv = document.getElementById('disPop');
                if (popupdiv === null){
                    showVotes(e.target, downVoters);
                }
                else {
                    popupdiv.outerHTML = '';
                    delete popupdiv;
                    disLikeBool = false;
                }
            });
            msgBox.appendChild(newDiv);


        }
        if (data === null) {
            numberOfMessages = 0;
        } else {
            numberOfMessages = 0;
            for (let p in data) {
                numberOfMessages++;
            }
        }
    });

}


function showVotes(e, voters) {
    if (likeBool) {

        //console.log(pressed);
        let div = document.createElement('div');
        div.className = 'dropdown-content';
        div.id = 'likePop';
        voters.forEach(function (x) {
            let html = `<p class="voteContent">${x}</p>`;
            div.innerHTML += html;

        })
        div.style.display = 'block';
        e.appendChild(div);
        

    } else if (disLikeBool) {

        //console.log(pressed);
        let div = document.createElement('div');
        div.className = 'dropdown-content';
        div.id = 'disPop';
        
        voters.forEach(function (x) {
            let html = `<p class="voteContent">${x}</p>`;
            div.innerHTML += html;

        })
        div.style.display = 'block';
        e.appendChild(div);
        
    }
    likeBool = false;
    disLikeBool = false;
}


function rateMsg(id) {
    if (likeBool) {
        firebase.database().ref(`messages/${id}/Votes/${loggedInUser}`).transaction(function (x) {
            return 1;
        });
    } else if (disLikeBool) {
        firebase.database().ref(`messages/${id}/Votes/${loggedInUser}`).transaction(function (x) {
            return -1;
        });
    }
    updateChat();
    likeBool = false;
    disLikeBool = false;
}
