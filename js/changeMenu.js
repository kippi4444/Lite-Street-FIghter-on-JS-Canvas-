"use strict";


const spaFighter = {
    state: {}, //текущее состояние spaFighter
    ui: { // элементы верстки, учавствующие в процессе
        main:document.getElementsByClassName('main')[0],
    },
    allCharImgSrc: new Map([
        [0, {
            name: "Ryu",
            src: "img/characters/faces/ryu.png"
        }],
        [1, {
            name: "Ken",
            src: "img/characters/faces/ken.png"
        }],
        [2, {
            name: "Barlog",
            src: "img/characters/faces/barlog.png"
        }],
        [3, {
            name: "Chun Li",
            src: "img/characters/faces/chunli.png"
        }],
        [4, {
            name: "Dee Jay",
            src: "img/characters/faces/deejay.png"
        }],
        [5, {
            name: "E.honda",
            src: "img/characters/faces/ehonda.png"
        }],
        [6, {
            name: "Feilong",
            src: "img/characters/faces/feilong.png"
        }],
        [7, {
            name: "Guile",
            src: "img/characters/faces/guile.png"
        }],

    ]),
    allMapsSrc: new Map([
        [0, {
            name: "bg",
            src: "img/maps/bg.jpg"
        }],
        [1, {
            name: "bg2",
            src: "img/maps/bg2.jpg"
        }],
        [2, {
            name: "bg3",
            src: "img/maps/bg3.jpg"
        }],
        [3, {
            name: "bg4",
            src: "img/maps/bg4.jpg"
        }],
        [4, {
            name: "bg5",
            src: "img/maps/bg5.jpg"
        }],

    ]),
    mainPage: 'main', // линк или id стартовой страницы
    host: window.location.hash ? window.location.href.split('#')[0] : window.location.href, // часть ссылки до хэша, т.е. хост spaFighter
    pageContent: { // содержимое страниц в примитивном виде
        main: `<div  id="back"> </div>
        <form class="enter ">
            <li>Авторизация <a href="#" class="enter_close" title="Закрыть модальное окно">X</a></li>
            <li>Имя: <input id="name" type="email" name="login" placeholder="Ваше имя"></li>
            <li>Пароль: <input id="pass" type="password" name="pass" placeholder="Ваш пароль"></li>
            <li><div id="info"></div></li>
            <li><button  class="form_button"  id="submit">Войти</button><button  class="form_button"  id="reg">Зарегистрироваться</button></li>
            
        </form>
        <div class="enter_button"><button id="enter_button">Войти</button></div>
        <nav id="mainMenu">
                    <ul class="mainmenu__list">
                        <li><a class="mainmenu__link" href="#characters2">Один Игрок</a></li>
                        <li><a class="mainmenu__link" href="#characters">Два Игрока</a></li>
                        <li><a class="mainmenu__link" href="#keys">Управление</a></li>
                        <li><a class="mainmenu__link" href="#stats">Статистика</a></li>
                    </ul>
                    </nav>`,
//=======block characters 2=======//
        characters2: `<div class="characters">
                        <div id="player1" style="grid-column: span 2;"><img src="img/characters/faces/ken.png"></div>

                        <div class="faces">
                            <button value="0"><img src="img/characters/faces/ryu.png"> </button>
                            <button value="1"><img src="img/characters/faces/ken.png"></button>
                            <button value="2"><img src="img/characters/faces/barlog.png"></button>
                            <button value="3"><img src="img/characters/faces/chunli.png"></button>
                            <button value=""><img src="img/characters/faces/deejay.png"></button>
                            <button value=""><img src="img/characters/faces/ehonda.png"></button>
                            <button value=""><img src="img/characters/faces/feilong.png"></button>
                            <button value=""><img src="img/characters/faces/guile.png"></button>
                        </div>
                        <div class="backNextButtons">
                            <button href="#main" value="8">Назад</button><button href="#game" value="9">ОК</button>
                        </div>
                        </div>`,
//=======block characters 2=======//
        characters: `<div class="characters">
                        <div id="player1"><img src="img/characters/faces/ken.png"></div>
                        <div id="player2"><img src="img/characters/faces/barlog.png"></div>
                        <div class="faces">
                            <button value="0"><img src="img/characters/faces/ryu.png"> </button>
                            <button value="1"><img src="img/characters/faces/ken.png"></button>
                            <button value="2"><img src="img/characters/faces/barlog.png"></button>
                            <button value="3"><img src="img/characters/faces/chunli.png"></button>
                            <button value=""><img src="img/characters/faces/deejay.png"></button>
                            <button value=""><img src="img/characters/faces/ehonda.png"></button>
                            <button value=""><img src="img/characters/faces/feilong.png"></button>
                             <button value=""><img src="img/characters/faces/guile.png"></button>
                        </div>
                        <div class="backNextButtons">
                            <button href="#main" value="8">Назад</button><button href="#maps" value="9">ОК</button>
                        </div>
                    </div>`,
//=======block keys=======//
        keys: `<div class="characters">
        <div class="maps">
                   <table id="allPlayersStats">
                   <tr><th><h3> Движение для 1 Игрока:</h3></th><th> <h3>Движение для 2 Игрока:</h3></th></tr>
                   <tr><th> w - прыжок</th><th>Arrow Up - прыжок</th></tr>
                   <tr><th>s - присесть</th><th>Arrow Down - присесть</th></tr>
                   <tr><th>a - движение влево</th><th>Arrow Left - движение влево</th></tr>
                   <tr><th>d - движение вправо</th><th>Arrow Right - движение вправо</th></tr>
                   <tr><th>f - легкий удар</th><th>Num 5 - легкий удар</th></tr>
                   <tr><th>g - тяжелый удар</th><th> Num 6 - тяжелый удар</th></tr>
                   <tr><th>v - средний удар в приседе</th><th> Num 3 - средний удар в приседе</th></tr>
                   <tr><th>r - блок</th><th>  Num 8 - блок</th></tr>
                   </table> 
                   </div>
                    <div class="backNextButtons">
                        <button href="#main" value="8">Назад</button>
                    </div>
                </div>`,
//=======block statistic=======//
        stats: `<div class="characters">
        <div class="maps"><table id="allPlayersStats"></table></div>
                <div class="backNextButtons">
                    <button href="#main" value="8" >Назад</button>
                </div>
            </div>`,
//=======block maps=======//
        maps:`<div class="characters">
                <div id="maps"><img src="img/maps/bg.jpg"></div>
                <div class="maps">
                    <button value="0"><img src="img/maps/bg.jpg"></button>
                    <button value="1"><img src="img/maps/bg2.jpg"></button>
                    <button value="2"><img src="img/maps/bg3.jpg"></button>
                    <button value="3"><img src="img/maps/bg4.jpg"></button>
                    <button value="4"><img src="img/maps/bg5.jpg"></button>
                </div>
                <div class="backNextButtons">
                        <button href="#characters" value="8">Назад</button><button href="#game2" value="9">Играть</button>
                </div>
              </div>`,
//=======block restart=======//
        restart: `<nav id="mainMenu">
        <ul class="mainmenu__list pause">
            <a class="active">Загрузка....пожалуйста подождите...</a>
        </ul>
    </nav>`,
    restart2: `<nav id="mainMenu">
    <ul class="mainmenu__list pause">
        <a class="active">Загрузка....пожалуйста подождите...</a>
    </ul>
</nav>`,
//=======block game 1=======//
        game: `
        <div class="enter_button"><button id="soundOnOff">Звук Вкл</button></div>
        <nav id="pauseMenu">
            <ul class="mainmenu__list pause">
                <li><a class="mainmenu__link" href="#restart">Начать заново</a></li>
                <li><a class="mainmenu__link" href="#characters2">Выбрать персонажа</a></li>
                <li><a class="mainmenu__link" href="#main">Главное меню</a></li>
            </ul>
        </nav>

        <canvas id="cnv"  style=" z-index: 0;"> </canvas>`,
//=======block game 2=======//
        game2: `
        <div class="enter_button"><button id="soundOnOff">Звук Вкл </button></div>
        <nav id="pauseMenu">
            <ul class="mainmenu__list pause">
                <li><a class="mainmenu__link" href="#restart2">Начать заново</a></li>
                <li><a class="mainmenu__link" href="#characters">Выбрать персонажа</a></li>
                <li><a class="mainmenu__link" href="#main">Главное меню</a></li>
            </ul>
        </nav>

        <canvas id="cnv"  style=" z-index: 0;"> </canvas>`,
//=======block error=======//
        error404: "<h2>404</h2><p>Страница не найдена</p>",
    }
};
const canvasRects2= document.createElement('canvas');

let map="bg";
let changePlayer1 = "Ken";
let changePlayer2 = "Barlog";
let URLHash;

let firestore=firebase.firestore();
let getDataUser=null;
let enter;
let info;
let userName;
let userPass;
let cookieName;
let allUsersStats=[];
let statistics;


function startListeners(){
    switch (window.location.hash.slice(1)){
        case ("characters") :
                let buttonsChar= document.getElementsByTagName("button");
                for (let i = 0; i < buttonsChar.length; i++) {
                    buttonsChar[i].addEventListener("click", updateSelectedChar1, false);
                    buttonsChar[i].addEventListener("contextmenu", updateSelectedChar2, false);
                }
            break;
        case ("characters2") :
                let buttonChar= document.getElementsByTagName("button");
                for (let i = 0; i < buttonChar.length; i++) {
                    buttonChar[i].addEventListener("click", updateSelectedChar1, false);
                }
            break;
        case "maps" :
                let buttonsMap= document.getElementsByTagName("button");
                for (let i = 0; i < buttonsMap.length; i++) {
                    buttonsMap[i].addEventListener("click", updateSelectedMap, false);
                }
            break;
        case "main" :
                logIn();
                if(!getDataUser){
                    openModal();
                }
            break;
        // case "keys" :
        //         let backFromStats=document.getElementById("backFromStats");
        //         backFromStats.addEventListener("click",backTo,false);
        //         function backTo(){
        //                 updateState()
        //                 };
        //     break;
        case "stats" :

                statistics=document.getElementById("allPlayersStats");
                statistics.innerHTML="";
                allUsersStats=[];
                getStatsAllUsers();
                
        break;
        case "restart" :
                // startGame=true;
                setTimeout(() => {

                    spaFighter.state.page="game";
                    window.location.href = `${spaFighter.host}#${spaFighter.state.page}`;
                    updateState();
                    setTimeout(game(changePlayer1, changePlayer2, map, false),10);
                }, 1000);

            break;
        case "restart2" :
                // startGame=true;
                setTimeout(() => {

                    spaFighter.state.page="game2";
                    window.location.href = `${spaFighter.host}#${spaFighter.state.page}`;
                    updateState();
                }, 1000);

            break;
        case "game" :
              
                let chars=["Ken","Barlog","Ryu", "Chun Li"];
                let maps=["bg","bg2","bg3","bg4","bg5"];
                changePlayer2 = chars[Math.floor(Math.random()*chars.length)];
                map=maps[Math.floor(Math.random()*maps.length)];
                 setTimeout(game(changePlayer1, changePlayer2, map, true),10);
   
                
            break;
        case "game2" :

       
                 setTimeout(game(changePlayer1, changePlayer2, map, false),10);
   
                
            break;

    }
    
}




//==========LOG IN LOG OUT ==========//
function logIn(){
    let enterClose=document.getElementsByClassName("enter_close")[0];
    let enterButton=document.getElementsByClassName("enter_button")[0];
    enterButton.addEventListener("click", openModal, false);
   
    if (getDataUser){
        enter_button.innerHTML="Личный кабинет";
        enterClose.addEventListener("click", closeModal, false);
        enterUserModal();
    }
}
function getCookieDateUser(){
    let name="JsonSF";
    if(document.cookie){
    getDataUser = JSON.parse(document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
))[1]);}
}

function logOut(){
    getDataUser=null;
    enter.innerHTML=`            <li>Авторизация <a href="#" class="enter_close" title="Закрыть модальное окно">X</a></li>
    <li>Имя: <input id="name" type="email" name="login" placeholder="Ваше имя"></li>
    <li>Пароль: <input id="pass" type="password" name="pass" placeholder="Ваш пароль"></li>
    <li><div id="info"></div></li>
    <li><button class="form_button" id="submit" >Войти</button><button  class="form_button" id="reg" >Зарегистрировать</button></li>`;
    document.cookie =`JsonSF=` + JSON.stringify(getDataUser)+"; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    openModal();
    }

function openModal(){
    let enterOverlay=document.getElementById("back");
        enter=document.getElementsByClassName("enter")[0];
        info = document.getElementById("info");
        enterOverlay.classList.add("back");
        enter.style.display="block";
        if (getDataUser){
            enter_button.innerHTML="Личный кабинет";
            let userExit=document.getElementById("exit");
                userExit.addEventListener("click", logOut, false);
        }
        else if(document.cookie){
            enter_button.innerHTML="Личный кабинет";
            getCookieDateUser();
            userName=document.getElementById("name");
            userPass=document.getElementById("pass");
            userName.value=getDataUser.name;
            userPass.value=getDataUser.password;
            getUser();
        }else{
            let sendInfo=document.getElementById("submit");
            let regButton=document.getElementById("reg");
            userName=document.getElementById("name");
            userPass=document.getElementById("pass");
            sendInfo.disabled=true;
            regButton.disabled=true;
            enter.addEventListener("input",()=>{
                if(userName.value.length>2 && userPass.value.length>2){
                    sendInfo.disabled=false;
                    regButton.disabled=false;
                }else{
                    sendInfo.disabled=true;
                    regButton.disabled=true;
                }
            });
            sendInfo.addEventListener("click", getUser, false);
            regButton.addEventListener("click", setUser, false);
        }
    
}

function closeModal(){
    let enterOverlay=document.getElementById("back");
        enterOverlay.classList.remove("back");
        enter.style.display="none";
}

//==========trip to date for login==========//
function getUser(){
    info.innerHTML="Загрузка...";
    firestore.collection("users").where("name", "==", userName.value).where("password", "==", userPass.value).get()
    .then(function(querySnapshot) {
        if (querySnapshot.docs.length>0){
            querySnapshot.forEach(function(doc) {
                getDataUser= doc.data();
                // console.log(doc.id, " => ", doc.data());
                document.cookie =`JsonSF=` + JSON.stringify(getDataUser);
                closeModal();
                enterUserModal();
                enter_button.innerHTML="Личный кабинет";
            });
         }
        else {
            info.style.color="red";
            info.innerHTML="Данные не верны";
        }
    })
    .catch(function(error) {
        getDataUser=null;
        openModal();
        info.innerHTML="Ошибка полученных данных";
        console.log("Error getting documents: ", error);
    });

}

function setUser(){
    const docRef=firestore.collection("users").doc(userName.value);
    firestore.collection("users").where("name", "==", userName.value).get()
    .then(function(querySnapshot) {
        if (querySnapshot.docs.length===0){
            setData();
        }else{
            info.style.color="red";
            info.innerHTML="Такое имя уже есть";
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    function setData(){
        docRef.set({name:userName.value, password: userPass.value, points:0 , ko:0})
        .then (function(){
            console.log("save")
            info.style.color="green";
            info.innerHTML="Вы зарегистрированны! Авторизируйтесь!";
            userName.value="";
            userPass.value="";
        })
        .catch(function(error){
            console.log(error)
        });
    }
}

function enterUserModal(){
    enter=document.getElementsByClassName("enter")[0];
    info.style.color="green";

    enter.innerHTML=`<li>Привет, ${getDataUser.name} <a href="#" class="enter_close" title="Закрыть модальное окно">X</a></li>
    <li><div id="info">Моя статистика</div></li>
    <li>Очки: ${getDataUser.points}</li>
    <li>КО: ${getDataUser.ko}</li>
    
    <li><button  class="form_button"  id="exit" >Выйти</button></li>`
}
//=======stats====///
function getStatsAllUsers(){

    firestore.collection("users")
    .where("points", ">=", 0)
    .orderBy("points", "desc").limit(10).get()
    .then(function(querySnapshot) {

            querySnapshot.forEach(function(doc) {

                allUsersStats.push(doc.data());
                
            });
            showStats();

    })
    .catch(function(error) {

        console.log("Error getting documents: ", error);
    });
}
function showStats(){

    statistics.innerHTML=`<tr><th>№</th><th>Имя</th> <th>кол-во очков</th> <th>кол-во КО</th></tr>`;
for (let i = 0; i < allUsersStats.length; i++) {
    
    statistics.innerHTML+=`<tr><th>${i+1}</th> <th>${allUsersStats[i].name}</th> <th>${allUsersStats[i].points}</th> <th>${allUsersStats[i].ko}</th></tr>`;
}

}

//==========menu characters==========//
function updateSelectedChar1() {
    if (this.value){
        if (this.value < 8) {
            player1.innerHTML = `<img src="${spaFighter.allCharImgSrc.get(Number(this.value)).src}">`;
            changePlayer1 = spaFighter.allCharImgSrc.get(Number(this.value)).name;
        }
    }
}

function updateSelectedChar2() {
    if (this.value){
        let changeCharacters= document.getElementsByClassName("faces")[0];
            changeCharacters.oncontextmenu = function(e) {
                e.preventDefault();
            };
        if (this.value < 8) {
            player2.innerHTML = `<img src="${spaFighter.allCharImgSrc.get(Number(this.value)).src}">`;
            changePlayer2 = spaFighter.allCharImgSrc.get(Number(this.value)).name;
        }
    };
}
//==========menu maps==========//
function updateSelectedMap() {
    if (this.value){
        if (this.value < 5) {
            maps.innerHTML = `<img src="${spaFighter.allMapsSrc.get(Number(this.value)).src}">`;
            map = spaFighter.allMapsSrc.get(Number(this.value)).name;
           
        }
    }
}
//==========update state page==========//
function updateState() {
    const localPage = spaFighter.host;
    setTimeout(startListeners,0);
    // console.log('1', spaFighter.state.page);

    if (spaFighter.state.page) { // если у нас хранится странца в текущем состоянии, то просто обновляем контент
      window.location.href = `${localPage}#${spaFighter.state.page}`;
     // window.history.pushState({page: spaFighter.state.page}, null, spaFighter.state.page);
      spaFighter.ui.main.innerHTML = spaFighter.pageContent[spaFighter.state.page];
    } else { // если нет текущего состояния, то получаем его и устанавливаем
      URLHash = window.location.hash ? window.location.hash.slice(1) : spaFighter.mainPage;
    //   console.log('2', URLHash);
      if (URLHash && (URLHash in spaFighter.pageContent)) {
        window.location.href = `${localPage}#${URLHash}`;
       // window.history.pushState({page: URLHash}, null, URLHash);
        spaFighter.ui.main.innerHTML = spaFighter.pageContent[URLHash];
        spaFighter.state.page = URLHash;
      } else {
        spaFighter.ui.main.innerHTML =  spaFighter.pageContent.error404;
      }

    //   console.log('2', spaFighter.state.page);
    }
  }


  
let init = function() { // вешаем слушателей на событие hashchange и кликам по пунктам меню
 //добавляем меню на страницу
      updateState();
  

    // window.addEventListener('hashchange', updateState);

    //   window.addEventListener('popstate', function(event) {
    //     // Get State value using event.state
        
    //     spaFighter.state.page = window.location.hash.slice(1);
    //     setTimeout(updateState, 0);
    //   });

      spaFighter.ui.main.addEventListener('click', function(event){
        event.preventDefault();
        if (event.target.getAttribute('href')){
        spaFighter.state.page = event.target.getAttribute('href').slice(1);

        updateState();
        }
        
      });
      
}
  
window.addEventListener('DOMContentLoaded', init);
