const firebaseConfig = {
    apiKey: "AIzaSyAEzk1MBxf_Y3noFBRiu8SIl_igBj-CBLQ",
    authDomain: "project-he-6e4d5.firebaseapp.com",
    databaseURL: "https://project-he-6e4d5-default-rtdb.firebaseio.com",
    projectId: "project-he-6e4d5",
    storageBucket: "project-he-6e4d5.appspot.com",
    messagingSenderId: "359901498250",
    appId: "1:359901498250:web:560723e162e4646ae29673",
    measurementId: "G-DXPMVVVLLD"
};

// 파이어베이스 앱 초기화
const app = firebase.initializeApp(firebaseConfig);

// 파이어베이스 실시간 데이터베이스 생성
const database = firebase.database();

// 데이터 저장 실습
function writeUserData(userId, email, nick) {
    database.ref("users/" + userId).set({
        email: email,
        nick: nick
    });
}




// 데이터 읽기 실습(멤버 조회)
// function readUserData() {
//     database.ref("users/").on('value', (snapshot) => {
//         // - users/ : 가장 상위(전체 조회)
//         // - 특정 아이디 선택 : users/특정 아이디

//         // 실시간 데이터베이스 값 접근
//         console.log(snapshot.val());

//         let data = snapshot.val();
//         let keys = Object.keys(data);

//         // { key : value({key : value }) } 접근 방법 / value 안에 key : value로 되어 있을 때
//         // 객체의 접근 방법 : . / 대괄호(인덱스)
//         // 객체의 키 값만 출력 object.keys()
//         console.log(Object.keys(data));
//         console.log(data["asd12345"]);
//         console.log(data[keys[0]]);

//         const result = document.getElementById("result");
//         // 데이터베이스 웹 페이지 출력
//         result.innerText = `${data[keys[0]].email} / ${data[keys[0]].nick}`;
//     })
// }



// Q1. 전체 조회된 결과 출력
//      - 테이블 태그 or 목록 태그 활용해서 출력
function readUserData() {
    database.ref("users/").on('value', (snapshot) => {
        // - users/ : 가장 상위(전체 조회)
        // - 특정 아이디 선택 : users/특정 아이디

        // 실시간 데이터베이스 값 접근
        console.log(snapshot.val());

        let data = snapshot.val();
        let keys = Object.keys(data);

        const result = document.getElementById("result");
        // 데이터베이스 웹 페이지 출력
        let res = "<ul>"
        for(let i = 0; i < keys.length; i++){
            res += `<li>${data[keys[i]].email} / ${data[keys[i]].nick}</li>`
        }
        res += "</ul>";
        result.innerHTML = res;
    })
}

// Q2. 아이디 조회
function readUserData2(inputId) {
    database.ref("users/"+inputId).on('value', (snapshot) => {

        let data = snapshot.val();
        console.log(data);
        const result2 = document.getElementById("result2");
        result2.innerText = `${inputId}, ${data.email}, ${data.nick}`;
        // 데이터베이스 웹 페이지 출력
    })  
}       
///////////////////////////////////////////


const btn = document.sign.btn;
const readBtn = document.getElementById("readBtn");

const btn2 = document.frm.btn2;

readBtn.addEventListener("click", () => {
    readUserData();
});

btn2.addEventListener('click', (e)=>{
    e.preventDefault();
    const inputId = document.frm.id2.value;
    readUserData2(inputId);
})

btn.addEventListener("click", (event) => {
    event.preventDefault();

    const id = document.sign.id.value;
    const email = document.sign.email.value;
    const nick = document.sign.nick.value;

    console.log(id, email, nick);

    writeUserData(id, email, nick);

});