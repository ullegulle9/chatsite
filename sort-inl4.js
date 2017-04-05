let fNameIn = document.getElementById('fName');
let sNameIn = document.getElementById('sName');
let ShNumberIn = document.getElementById('shNumber');
let addBtn = document.getElementById('addPlayer');
let table = document.getElementById('playerTable');
table.style.display = 'none';
let tableContent = document.getElementById('tBody');
let db = firebase.database();
let sortBy = document.getElementById('sortSelect');
let showNo = document.getElementById('showAmount');
let playersToShow;
let sortByCat;

let lastPlayerShown = null; // Keeping track of latest shown element
let firstPlayerShown = [];
let nextPressCount = 0;
let prevFirst = null;
let last = false;

updateDb();

// Function to add Player

function addPlayer() {
    let fName = fNameIn.value;
    let sName = sNameIn.value;
    let shNumber = Number(ShNumberIn.value);
    let obj = {
        Firstname: fName,
        Surname: sName,
        Shirtnumber: shNumber
    };
    db.ref('Players/' + shNumber).set(obj);
    playersToShow = Number(showNo.value);
    sortByCat = sortBy.value;
    sortPlayers(sortByCat, playersToShow);
}


// Event to add player

addBtn.addEventListener('click', x => {
    if (fNameIn.value !== null || sNameIn.value !== null || ShNumberIn.value !== null) {
        addPlayer();
    }
});



// Updates database

function updateDb() {
    let sort = sortBy.value;
    let num = Number(showNo.value);
    let count = 0;
    db.ref('Players/').orderByChild(sort).limitToFirst(num)
        .once('value', function (snapshot) {
            snapshot.forEach(child => {

                let allData = child.val();
                if (count == 0) {
                    firstPlayerShown.push(allData);
                }
                let tr = document.createElement('tr');
                tableContent.appendChild(tr);
                let html = `<td>${allData.Surname}</td>
                            <td>${allData.Firstname}</td>
                            <td>${allData.Shirtnumber}</td>`;
                tr.innerHTML = html;
                lastPlayerShown = allData;
                table.style.display = 'block';
                count++;
            })
        });
}



// Sort by what category

sortBy.addEventListener('change', ev => {
    playersToShow = Number(showNo.value);
    sortByCat = sortBy.value;
    sortPlayers(sortByCat, playersToShow);
})


// Amount of list elements to show

showNo.addEventListener('change', ev => {
    sortByCat = sortBy.value;
    playersToShow = Number(showNo.value);
    sortPlayers(sortByCat, playersToShow);
})



// Sorting the players first time




function sortPlayers(sort, num) {
    let count = 0;
    tableContent.innerHTML = '';
    firstPlayerShown = [];
    nextPressCount = 0;
    prevSpan.disabled = true;
    prevSpan.className = 'inActive';
    db.ref('Players/').orderByChild(sort).limitToFirst(num)
        .once('value', function (snapshot) {
            snapshot.forEach(child => {
                let allData = child.val();
                if (count == 0) {
                    firstPlayerShown.push(allData);
                }
                let tr = document.createElement('tr');
                tableContent.appendChild(tr);
                let html = `<td>${allData.Surname}</td>
                            <td>${allData.Firstname}</td>
                            <td>${allData.Shirtnumber}</td>`;
                tr.innerHTML = html;
                lastPlayerShown = allData;
                count++;
            })

            if (num > count) {
                last = true;
            } else {
                last = false;
            }
            if (last) {
                nextSpan.disabled = true;
                nextSpan.className = 'inActive';
            } else {
                nextSpan.disabled = false;
                nextSpan.className = 'active';
            }
        });



}

let nextSpan = document.getElementById('nextList');
let prevSpan = document.getElementById('prevList');
prevSpan.disabled = true;


// Show NEXT table

nextSpan.addEventListener('click', ev => {
    tableContent.innerHTML = '';
    let sort = sortBy.value;
    let num = Number(showNo.value);
    let count = 0;
    nextPressCount++;
    prevFirst = firstPlayerShown[nextPressCount - 1];
    db.ref('Players/').orderByChild(sort).startAt(lastPlayerShown[sort]).limitToFirst(num + 1).once('value', function (snapshot) {
        snapshot.forEach(child => {

            let allData = child.val();

            if (allData.Shirtnumber !== lastPlayerShown.Shirtnumber) {
                if (count == 0) {
                    firstPlayerShown.push(allData);

                }
               
                let tr = document.createElement('tr');
                tableContent.appendChild(tr);
                let html = `<td>${allData.Surname}</td>
                            <td>${allData.Firstname}</td>
                            <td>${allData.Shirtnumber}</td>`;
                tr.innerHTML = html;
                lastPlayerShown = allData;

                count++;

            }

        })
        if (num > count) {
            last = true;
        } else {
            last = false;
        }
        if (last) {
            nextSpan.disabled = true;
            nextSpan.className = 'inActive';
        }
    })

    prevSpan.disabled = false;
    prevSpan.className = 'active';
})




// Show PREVIOUS table

prevSpan.addEventListener('click', ev => {
    tableContent.innerHTML = '';
    let sort = sortBy.value;
    let num = Number(showNo.value);
    last = false;
    nextSpan.disabled = false;
    nextSpan.className = 'active';
    db.ref('Players/').orderByChild(sort).startAt(prevFirst[sort]).limitToFirst(num).once('value', function (snapshot) {
        snapshot.forEach(child => {

            let allData = child.val();
            if (allData.Shirtnumber !== lastPlayerShown.Shirtnumber) {

                let tr = document.createElement('tr');
                tableContent.appendChild(tr);
                let html = `<td>${allData.Surname}</td>
                            <td>${allData.Firstname}</td>
                            <td>${allData.Shirtnumber}</td>`;
                tr.innerHTML = html;
                lastPlayerShown = allData;

            }

        })
    })
    nextPressCount--;
    firstPlayerShown.pop();
    prevFirst = firstPlayerShown[nextPressCount - 1];
    if (nextPressCount < 1) {
        prevSpan.disabled = true;
        prevSpan.className = 'inActive';
    }
})
