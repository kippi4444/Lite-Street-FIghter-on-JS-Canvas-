    "use strict";

let startGame=true;


     let game =function (player1, player2, map, npc) {

        let canvasRects = document.getElementById('cnv')
                
        if (window.innerWidth > 1024 ) {
            canvasRects.width = 900;
            canvasRects.height = 410;
        }
        if (window.innerWidth <= 1024 && window.innerWidth > 800 ) {
         
            canvasRects.width = 600;
            canvasRects.height = canvasRects.width * 410 / 900;
        }
        if (window.innerWidth <= 800) {
         
            canvasRects.width = 400;
            canvasRects.height = canvasRects.width * 410 / 900;
        }
         let canvasHeight = canvasRects.height;
         let canvasWidth = canvasRects.width;
        
        canvasRects2.width =  canvasWidth;
        canvasRects2.height = canvasHeight;

        if (startGame){
            if (canvasRects && canvasRects.getContext('2d')) {

                let ctx2 = canvasRects.getContext('2d');


                //----------View-----------//
                function FightView() { //Массив объектов сцены
                    let ctx = canvasRects2.getContext('2d');
                    let self = this;
                    let viewSettings={
                        lPlayer1: null,
                        img: new Image(),
                        ko: "#666",
                        rPlayer2: null,
                        winner:"",
                        map: null,
                        bg:null,
                        lPlayer1ManHealth: null,
                        rPlayer2ManHealth: null,
                        colorlPlayer1: "#fff",
                        colorrPlayer2: "#fff",
                    };

                    self.closeGame = function(){
                        viewSettings=null;
                    };

                    self.players = function(p1, p2, setMap) {
                        viewSettings.map = setMap;
                        viewSettings.lPlayer1 = p1;
                        viewSettings.rPlayer2 = p2;
                        viewSettings.img.src = `img/maps/${viewSettings.map}.jpg`; 
                        viewSettings.bg = viewSettings.img;

                    };
                    //двойная буферизация
                    self.render = function() {
                        ctx2.drawImage(canvasRects2, 0, 0);
                    };

                    self.isPause = function(canvasDispay, pauseMenuDisplay) {
                        canvasRects.style.display = canvasDispay;
                        pauseMenu.style.display = pauseMenuDisplay;
                    };

                    self.isMuted = function(state){
                        let soundOnOff= document.getElementById("soundOnOff");
                        soundOnOff.innerHTML=`${state}`;
                    }
                    self.startAnimation = function() {
                        if(viewSettings.bg){
                        //----get start bg----//
                        self.startBgNameHealth();
                        //----- health -----//
                        self.updateHealth();
                        //-----wins-----//
                        self.counterWin();
                        }
                        requestAnimationFrame(self.startAnimation);
                    };

                    self.startBgNameHealth = function(colorState) {
                        //get background
                        if(viewSettings.bg){
                        ctx.drawImage(viewSettings.bg, 0, 0, canvasWidth, canvasHeight);
                        }
 

                        //---shadows on---//
                        ctx.shadowOffsetY = 1;
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = 'black';
                        //---table for KO---//
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = '#fff';
                        ctx.fillStyle = '#000';
                        ctx.beginPath()
                        ctx.rect(canvasWidth / 2 - canvasWidth / 37.5, canvasHeight / 10, canvasWidth / 14, canvasHeight / 12);
                        ctx.stroke();
                        ctx.fill();
                        //---health background player 1---//
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = 'red';
                        ctx.beginPath();
                        ctx.rect(canvasWidth / 10, canvasHeight / 8, canvasWidth / 100 / 3 * 100, canvasWidth / 100 * 2);
                        ctx.fill();
                        ctx.stroke();
                        //---health background player 2---//
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = 'red';
                        ctx.beginPath();
                        ctx.rect(canvasWidth - canvasWidth / 10 * 4.25, canvasHeight / 8, canvasWidth / 100 / 3 * 100, canvasWidth / 100 * 2);
                        ctx.fill();
                        ctx.stroke();
                        //---names selected characters---//
                        viewSettings.colorlPlayer1 = (colorState == "lPlayer1") ? ("yellow") : (viewSettings.colorlPlayer1);
                        viewSettings.colorrPlayer2 = (colorState == "rPlayer2") ? ("yellow") : (viewSettings.colorrPlayer2);

                        ctx.font = "1.2vw Arial";
                        ctx.fillStyle = viewSettings.colorlPlayer1;
                        ctx.beginPath()
                        ctx.fillText(viewSettings.lPlayer1, canvasWidth / 10, canvasHeight / 4.6);
                        ctx.fillStyle = viewSettings.colorrPlayer2;
                        ctx.fillText(viewSettings.rPlayer2, canvasWidth - canvasWidth / 10 - canvasWidth / 10 / 3, canvasHeight / 4.6);
                        //---shadows off---//
                        ctx.shadowOffsetY = 0;
                        ctx.shadowBlur = 0;
                        ctx.shadowColor = 'black';

                    };

                    self.updateHealth = function() {
                        //---player 1---//
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = '#ff6';
                        ctx.beginPath();
                        ctx.rect(canvasWidth / 10, canvasHeight / 8, viewSettings.lPlayer1ManHealth * canvasWidth / 100 / 3, canvasWidth / 100 * 2);
                        ctx.fill();
                        ctx.stroke();
                        //---player 2---//
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = '#ff6';
                        ctx.beginPath();
                        ctx.rect(canvasWidth - canvasWidth / 10 * 4.25, canvasHeight / 8, viewSettings.rPlayer2ManHealth * canvasWidth / 100 / 3, canvasWidth / 100 * 2);
                        ctx.fill();
                        ctx.stroke();

                    };

                    self.counterWin = function(string) {
                        viewSettings.ko = (string) ? (string) : (viewSettings.ko);
                        //-- KO--//
                        ctx.fillStyle = viewSettings.ko;
                        ctx.font = "2.5vw Times New Roman";
                        ctx.beginPath();
                        ctx.fillText("KO", canvasWidth / 2 - canvasWidth / 55, canvasHeight / 6);
                    };

                    self.endGame = function(win) {
                        viewSettings.winner = (win) ? (win) : (viewSettings.winner);
                        //---shadows on---//
                        ctx.shadowOffsetY = 1;
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = 'black';
                        ctx.fillStyle = 'white';
                        ctx.font = "5vw Times New Roman";
                        ctx.beginPath();
                        ctx.fillText(viewSettings.winner, canvasWidth / 2 - viewSettings.winner.length * 21 / 2, canvasHeight / 2);
                        //---shadows off---//
                        ctx.shadowOffsetY = 0;
                        ctx.shadowBlur = 0;
                        ctx.shadowColor = 'black';
                    };

                    self.animation1 = function(lPlayer1Man, lPlayer1Animate) { //Рисуем первого
                        let steplPlayer1 = lPlayer1Animate[lPlayer1Man.at].step;
                        viewSettings.lPlayer1ManHealth = lPlayer1Man.health;
                        //start animations
                        ctx.drawImage(
                            lPlayer1Animate[lPlayer1Man.at].el, //Объект Image анимации
                            Math.round(lPlayer1Man.fw * steplPlayer1), //Берем текущий кадр, ширина кадра * шаг
                            0, //Кадры идут один за другим, тут 0
                            lPlayer1Man.w, //Вырез в ширину объекта
                            lPlayer1Man.h, //И в высоту
                            lPlayer1Man.x, //Размещаем по горизонтали на холсте
                            lPlayer1Man.y, //И по вертикали
                            lPlayer1Man.ws, //Ширина как у кадра
                            lPlayer1Man.hs //Ну и высота
                            
                        );

                    };

                    self.animation2 = function(rPlayer2Man, rPlayer2Animate) { //Рисуем второго
                        let steprPlayer2 = rPlayer2Animate[rPlayer2Man.at].step;
                        viewSettings.rPlayer2ManHealth = rPlayer2Man.health;
                        //start animations
                        ctx.drawImage(
                            rPlayer2Animate[rPlayer2Man.at].el, //Объект Image анимации
                            Math.round(rPlayer2Man.fw * steprPlayer2), //Берем текущий кадр, ширина кадра * шаг
                            0, //Кадры идут один за другим, тут 0
                            rPlayer2Man.w, //Вырез в ширину объекта
                            rPlayer2Man.h, //И в высоту
                            rPlayer2Man.x, //Размещаем по горизонтали на холсте
                            rPlayer2Man.y, //И по вертикали
                            rPlayer2Man.ws, //Ширина как у кадра
                            rPlayer2Man.hs // высота
                        );

                    };

                }

                //----------View-----------//

                //----------Model-----------//
                function FightModel() {

                    let fView = null,
                        self = this;
                    let modelSettings={
                        lPlayer1: null,
                        rPlayer2: null,
                        requestlPlayer1Move: null,
                        requestrPlayer2Move:null,
                        lPlayer1Win: 0,
                        rPlayer2Win: 0,
                        isPause: false,
                        isMuted:false,
                        countPausePress: 0,
                        countMutedPress: 0,
                        theEnd: false,
                        ko: false,
                        count: 1,
                        stepForMove:10,
                        playerKO:0,
                        playerPoints:0,
                    };
                    let lPlayer1Man = {}, //Массивы объктов и их анимаций
                        lPlayer1Animate = {};
                    let rPlayer2Man = {}, //Массивы объктов и их анимаций
                        rPlayer2Animate = {};

                    self.init = function(view, man1, man2) {
                        fView = view;
                        modelSettings.lPlayer1 = man1;
                        modelSettings.rPlayer2 = man2;
                        fView.startAnimation();
                    };

                    self.closeGame = function() {
                        startGame=true;
                        modelSettings=null;
                        fView=null;
                     
                        
                    };

                    self.initAnimation = function() {
                        //Массив анимаций для объектов ///честно заимствованная идея
                        function Players(man) {
                            this.name = man;
                            this.at = 'stund'; //Стартовая анимация
                            this.ws = canvasHeight/4.55; //Ширина объекта отображение
                            this.hs =canvasWidth/9; //Высота объекта отображение
                            this.w = 70; //Ширина объекта для анимации
                            this.h =80; //Высота объекта для анимации
                            this.fw = 70; //Ширина кадра анимации
                            this.x = canvasWidth /10; //Положение по горизонтали
                            this.y = canvasHeight / 1.45; //Положение по вертикали
                            this.health = 100; //здоровье игрока
                        }

                        function Animations(name) {
                            this.stund = { //Ключ есть имя анимации
                                'el': null, //Объект Image
                                'src': `img/characters/${name}stund.png`, //Путь к изображению
                                'step': 0, //Текущий шаг анимации
                                'speed': 5, //Скорость анимации
                                'curr': 0, //Счетчик кадров
                                'steps': 3, //Количество кадров анимации, считаем от 0
                                'onend': null, //Функция для вызова по окончании анмации
                                'damage': 0, //сила удара
                                'sound': null,  //звук
                                'soundSrc': `sounds/none.wav`
                                
                            };
                            this.pow = {
                                'el': null,
                                'src': `img/characters/${name}pow.png`,
                                'step': 0,
                                'speed': 5,
                                'curr': 0,
                                'steps': 2,
                                'onend': 'stund',
                                'damage': 5,
                                'sound': null,
                                'soundSrc': `sounds/${name.slice(1)}/pow.wav`,
                                'points': 1,
                            }; 
                            this.kick = {
                                'el': null,
                                'src': `img/characters/${name}kick.png`,
                                'step': 0,
                                'speed': 5,
                                'curr': 0,
                                'steps': 4,
                                'onend': 'stund',
                                'damage': 8,
                                'sound': null,
                                'soundSrc': `sounds/${name.slice(1)}/kick.wav`,
                                'points': 3,
                            }; 
                            this.jump = {
                                'el': null,
                                'src': `img/characters/${name}jump.png`,
                                'step': 0,
                                'speed': 5,
                                'curr': 0,
                                'steps': 6,
                                'onend': 'stund',
                                'damage': 0,
                                'sound': null,
                                'soundSrc': `sounds/${name.slice(1)}/jump.wav`
                            }; 
                            this.movee = {
                                'el': null,
                                'src': `img/characters/${name}move.png`,
                                'step': 0,
                                'speed': 7,
                                'curr': 0,
                                'steps': 4,
                                'onend': 'stund',
                                'damage': 0,
                                'sound': null,
                                'soundSrc': `sounds/none.wav`
                            };
                            this.block = {
                                'el': null,
                                'src': `img/characters/${name}block.png`,
                                'step': 0,
                                'speed': 7,
                                'curr': 0,
                                'steps': 1,
                                'onend': null,
                                'damage': 0,
                                'sound': null,
                                'soundSrc': `sounds/${name.slice(1)}/block.wav`,
                                'points': 1,
                            }; 

                            this.dead = {
                                'el': null,
                                'src': `img/characters/${name}dead.png`,
                                'step': 0,
                                'speed': 20,
                                'curr': 0,
                                'steps': 4,
                                'onend': null,
                                'damage': 0,
                                'sound': null,
                                'soundSrc': `sounds/${name.slice(1)}/dead.wav`,
                                'points': -5,
                            }; 
                            

                        }

                        lPlayer1Man = new Players(modelSettings.lPlayer1);
                        lPlayer1Animate = new Animations("l" + modelSettings.lPlayer1);

                        for (let ka in lPlayer1Animate) { //И по всем их анимациям
                            let img = new Image(); //Подгружаем изображения
                            let song = new Audio();
                            img.src = lPlayer1Animate[ka].src; //Помещаем объект изобраения в анимацию
                            lPlayer1Animate[ka].el = img;
                            
                            song.src = lPlayer1Animate[ka].soundSrc;
                            lPlayer1Animate[ka].sound = song;

          
                        }
                        rPlayer2Man = new Players(modelSettings.rPlayer2);
                        rPlayer2Man.x = canvasWidth - 2 * rPlayer2Man.w;

                        rPlayer2Animate = new Animations("r" + modelSettings.rPlayer2);

                        for (let ra in rPlayer2Animate) { //И по всем их анимациям
                          
                            let img = new Image(); //Подгружаем изображения
                            let song = new Audio();
                            img.src = rPlayer2Animate[ra].src; //Помещаем объект изобраения в анимацию
                            rPlayer2Animate[ra].el = img;
   
                            song.src = rPlayer2Animate[ra].soundSrc;
                            rPlayer2Animate[ra].sound = song;

                        }


                    };
                    //---------------------------------------1person-------------------------//


                    self.move1 = function() {
                        //Проходим по объектам и отправляем на отрисовку
                        if (lPlayer1Man) {
                            
                            if (lPlayer1Man.at == "jump") {

                                fView.animation1(lPlayer1Man, lPlayer1Animate);
                                self.check1(lPlayer1Man, lPlayer1Animate);
                                switch (lPlayer1Animate[lPlayer1Man.at].step) { //реализация прыжка пока такая, но надо пересмотреть это убожество
                                    case 0:
                                        lPlayer1Man.y = canvasHeight / 1.6;
                                        break;
                                    case 1:
                                        lPlayer1Man.y = canvasHeight / 1.8;

                                        break;
                                    case 2:
                                        lPlayer1Man.y = canvasHeight / 2;
                                        break;
                                    case 3:
                                        lPlayer1Man.y = canvasHeight / 2.3;
                                        break;
                                    case 4:
                                        lPlayer1Man.y = canvasHeight / 1.7;;
                                        break;
                                    case 5:
                                        lPlayer1Man.y = canvasHeight / 1.6;
                                        break;
                                    case 6:
                                        lPlayer1Man.y = canvasHeight / 1.5;
                                        break;
                                }
                            } else {
                                lPlayer1Man.y = canvasHeight / 1.45;
                                fView.animation1(lPlayer1Man, lPlayer1Animate);
                                self.check1(lPlayer1Man, lPlayer1Animate);
                            }
                        }
                        
                        fView.render();
                        modelSettings.requestlPlayer1Move = requestAnimationFrame(self.move1);

                    };

                    self.check1 = function(lPlayer1Man, lPlayer1Animate) {

                        if (lPlayer1Animate[lPlayer1Man.at].curr >= lPlayer1Animate[lPlayer1Man.at].speed) { //Проверяем счетчик и если достигли speed, переходим к следующему кадру

                            if (lPlayer1Animate[lPlayer1Man.at].step >= lPlayer1Animate[lPlayer1Man.at].steps) { //Проверяем, если кадр последний переходим к первому
                                lPlayer1Animate[lPlayer1Man.at].step = 0;
                                if (lPlayer1Animate[lPlayer1Man.at].onend) //Кадр последний, значит вызываем функцию, если есть

                                    self.startPlayer1(modelSettings.lPlayer1, lPlayer1Animate[lPlayer1Man.at].onend, 0);
                                    cancelAnimationFrame(modelSettings.requestlPlayer1Move);
                            } else lPlayer1Animate[lPlayer1Man.at].step++;
                            lPlayer1Animate[lPlayer1Man.at].curr = 0; //Сбрасываем счетчик
                        }

                        lPlayer1Animate[lPlayer1Man.at].curr++; //Увеличиваем счетчик

                    };

                    //---------------------------------------2person-------------------------//

                    self.move2 = function() {

                        if (rPlayer2Animate) {

                            if (rPlayer2Man.at == "jump") {

                                fView.animation2(rPlayer2Man, rPlayer2Animate);
                                self.check2(rPlayer2Man, rPlayer2Animate);
                                switch (rPlayer2Animate[rPlayer2Man.at].step) { //реализация прыжка пока такая, но надо пересмотреть это убожество
                                    case 0:
                                        rPlayer2Man.y = canvasHeight / 1.6;
                                        break;
                                    case 1:
                                        rPlayer2Man.y = canvasHeight / 1.8;
                                        break;
                                    case 2:
                                        rPlayer2Man.y = canvasHeight / 2;
                                        break;
                                    case 3:
                                        rPlayer2Man.y = canvasHeight / 2.3;
                                        break;
                                    case 4:
                                        rPlayer2Man.y = canvasHeight / 1.9;
                                        break;
                                    case 5:
                                        rPlayer2Man.y = canvasHeight / 1.8;
                                        break;
                                    case 6:
                                        rPlayer2Man.y = canvasHeight / 1.6;
                                        break;
                                }
                            } else {
                                rPlayer2Man.y = canvasHeight / 1.45;
                                fView.animation2(rPlayer2Man, rPlayer2Animate);
                                self.check2(rPlayer2Man, rPlayer2Animate);
                            }

                        }

                        fView.render();
                        modelSettings.requestrPlayer2Move= requestAnimationFrame(self.move2);

                    };

                    self.check2 = function(rPlayer2Man, rPlayer2Animate) {

                        if (rPlayer2Animate[rPlayer2Man.at].curr >= rPlayer2Animate[rPlayer2Man.at].speed) { //Проверяем счетчик и если достигли speed, переходим к следующему кадру

                            if (rPlayer2Animate[rPlayer2Man.at].step >= rPlayer2Animate[rPlayer2Man.at].steps) { //Проверяем, если кадр последний переходим к первому
                                rPlayer2Animate[rPlayer2Man.at].step = 0;
                                if (rPlayer2Animate[rPlayer2Man.at].onend) //Кадр последний, значит вызываем функцию, если есть

                                    self.startPlayer2(modelSettings.rPlayer2, rPlayer2Animate[rPlayer2Man.at].onend, 0);
                                    cancelAnimationFrame(modelSettings.requestrPlayer2Move);
                            } else rPlayer2Animate[rPlayer2Man.at].step++;
                            rPlayer2Animate[rPlayer2Man.at].curr = 0; //Сбрасываем счетчик
                        }

                        rPlayer2Animate[rPlayer2Man.at].curr++; //Увеличиваем счетчик
                    };

                    //---------------------------------------1-2person-------------------------//
                    self.baseLogic = function() {
                        if ((rPlayer2Man.x >= lPlayer1Man.x) && (rPlayer2Man.x + rPlayer2Man.w / 1.7 <= lPlayer1Man.x) && (rPlayer2Man.y >= lPlayer1Man.y + lPlayer1Man.h / 2) && (rPlayer2Man.y + rPlayer2Man.h <= lPlayer1Man.y + lPlayer1Man.h / 2)) {
                            return true;
                        }
                        if ((lPlayer1Man.x <= rPlayer2Man.x) && (lPlayer1Man.x + lPlayer1Man.w / 1.7 >= rPlayer2Man.x) && (lPlayer1Man.y <= rPlayer2Man.y + rPlayer2Man.h / 2) && (lPlayer1Man.y + lPlayer1Man.h >= rPlayer2Man.y + rPlayer2Man.h / 2)) {
                            return true;
                        }

                        (rPlayer2Man.x <= 5) ? (rPlayer2Man.x = 5) : (rPlayer2Man.x);
                        (lPlayer1Man.x <= 5) ? (lPlayer1Man.x = 5) : (lPlayer1Man.x);
                        (rPlayer2Man.x >= canvasWidth - rPlayer2Man.w) ? (rPlayer2Man.x = canvasWidth - rPlayer2Man.w) : (rPlayer2Man.x);
                        (lPlayer1Man.x >= canvasWidth - lPlayer1Man.w / 2) ? (lPlayer1Man.x = canvasWidth - lPlayer1Man.w / 2) : (lPlayer1Man.x);

                    };

                    self.blockLogic = function() {
                        if (lPlayer1Man.at == "block") {
                            return false;
                        }
                        if (rPlayer2Man.at == "block") {
                            return false;
                        }
                        return true;

                    };
                            //-----1 player-----//
                    self.startPlayer1 = function(man1, animation, state) {

                        if (!modelSettings.theEnd && !modelSettings.ko && !modelSettings.isPause) {
                            if (man1 === modelSettings.lPlayer1) {
                                lPlayer1Man.at = animation; //ставим вид анимации
                                lPlayer1Man.x += modelSettings.stepForMove * state; //двигаем влево вправо
                                cancelAnimationFrame(modelSettings.requestlPlayer1Move);

                                (modelSettings.isMuted)?(""):(setTimeout(function() {
                                    lPlayer1Animate[lPlayer1Man.at].sound.play();}, 10));
                               
                                self.move1();

                                if (rPlayer2Man.health > 0) {

                                    //===points===///
                                    if(lPlayer1Animate[lPlayer1Man.at].points&&self.baseLogic()){
                                        modelSettings.playerPoints+=Number(lPlayer1Animate[lPlayer1Man.at].points);
                                    }
                                     //===points===///
                             
                                    if (lPlayer1Animate[lPlayer1Man.at].damage >= rPlayer2Man.health) 
                                        rPlayer2Man.health = self.baseLogic() && self.blockLogic() ? (rPlayer2Man.health - rPlayer2Man.health) : (rPlayer2Man.health);
                                    if (lPlayer1Animate[lPlayer1Man.at].damage < rPlayer2Man.health) 
                                        rPlayer2Man.health = self.baseLogic() && self.blockLogic() ? (rPlayer2Man.health - lPlayer1Animate[lPlayer1Man.at].damage) : (rPlayer2Man.health);
                                } else if (rPlayer2Man.health <= 0) {
                                    ++modelSettings.lPlayer1Win;
                                    modelSettings.playerKO+=Number(modelSettings.lPlayer1Win);
                                   
                                    rPlayer2Man.health = 0.1;
                                    rPlayer2Man.w = 80;
                                    rPlayer2Man.fw = 80;
                                    self.startPlayer2(modelSettings.rPlayer2, "dead", 3); 
                                    self.raund();
                                }
                            }
                        }
                        if (modelSettings.theEnd && modelSettings.ko) {
                            self.endGame();
                        }
                        if (modelSettings.ko && !modelSettings.theEnd) {
                            self.ko();
                        }
                        if (modelSettings.isPause) {
                            self.isPause();
                        }
                    };
                            //-----2 player-----//
                    self.startPlayer2 = function(man2, animation, state) {
                        if (!modelSettings.theEnd && !modelSettings.ko && !modelSettings.isPause) {
                            if (man2 === modelSettings.rPlayer2) {
                                rPlayer2Man.at = animation;
                                rPlayer2Man.x += modelSettings.stepForMove * state; //двигаем влево вправо
                                cancelAnimationFrame(modelSettings.requestrPlayer2Move);

                                (modelSettings.isMuted)?(""):(setTimeout(function() {
                                    rPlayer2Animate[rPlayer2Man.at].sound.play();}, 10));

                                self.move2();

                                if (lPlayer1Man.health > 0) {
                                    if (rPlayer2Animate[rPlayer2Man.at].damage>=lPlayer1Man.health)  //корректная отрисовка жизни при большем дамаге чем остаток жизни
                                        lPlayer1Man.health = self.baseLogic() && self.blockLogic() ? (lPlayer1Man.health - lPlayer1Man.health) : (lPlayer1Man.health);
                                    
                                    if(lPlayer1Man.health > rPlayer2Animate[rPlayer2Man.at].damage)
                                        lPlayer1Man.health = self.baseLogic() && self.blockLogic() ? (lPlayer1Man.health - rPlayer2Animate[rPlayer2Man.at].damage) : (lPlayer1Man.health);
                                } else if (lPlayer1Man.health <= 0) {
                                    ++modelSettings.rPlayer2Win; //счетчик побед правого игрока
                                    lPlayer1Man.health = 0.1; //жесткое присваивание жизней, чтобы корректно рисовалось(да не оч красиво, но работает)
                                    lPlayer1Man.w = 80; //анимация смерти чуть шире стоковых
                                    lPlayer1Man.fw = 80; //анимация смерти чуть шире стоковых
                                    self.startPlayer1(modelSettings.lPlayer1, "dead", -3); //анимация смерти
                                    self.raund();
                                }
                            }
                        }
                        if (modelSettings.theEnd && modelSettings.ko) {
                            self.endGame();
                        }
                        if (modelSettings.ko && !modelSettings.theEnd) {
                            self.ko();
                        }
                        if (modelSettings.isPause) {
                            self.isPause();
                        }
                    };

                    self.raund = function() {
                        if (modelSettings.lPlayer1Win < 2 && modelSettings.rPlayer2Win < 2) {
                            modelSettings.ko = true;
                        } else {
                            modelSettings.theEnd = true;
                            modelSettings.ko = true;
                        }
                    };

                    self.ko = function() {

                        fView.counterWin("#fff");
                        (modelSettings.lPlayer1Win > 0) ? (fView.startBgNameHealth("lPlayer1")) : ("");
                        (modelSettings.rPlayer2Win > 0) ? (fView.startBgNameHealth("rPlayer2")) : ("");
                        setTimeout(() => {
                            lPlayer1Man.w = 70;
                            lPlayer1Man.fw = 70;
                            rPlayer2Man.w = 70;
                            rPlayer2Man.fw = 70;
                            modelSettings.ko = false;
                            lPlayer1Animate[lPlayer1Man.at].curr = 0;
                            rPlayer2Animate[rPlayer2Man.at].curr = 0;
                            lPlayer1Man.x = lPlayer1Man.w;
                            rPlayer2Man.x = canvasWidth - 2 * rPlayer2Man.w;
                            lPlayer1Man.health = 100;
                            rPlayer2Man.health = 100;
                            rPlayer2Animate[rPlayer2Man.at].curr = 0;
                            lPlayer1Animate[lPlayer1Man.at].curr = 0;
                            self.startPlayer1(modelSettings.lPlayer1, "stund", 0);
                            self.startPlayer2(modelSettings.rPlayer2, "stund", 0);
                            fView.counterWin("#666");
                            
                        }, 1500);

                    };

                    self.endGame = function() {
                        let winner = (modelSettings.lPlayer1Win >= 2) ? (`${modelSettings.lPlayer1} Win!`) : (`${modelSettings.rPlayer2} Win!`);
                        
                        fView.counterWin("#fff");
                        // requestAnimationFrame(fView.endGame);
                        setTimeout(() => {
                            cancelAnimationFrame(modelSettings.requestlPlayer1Move);
                            cancelAnimationFrame(modelSettings.requestrPlayer2Move);
                            fView.endGame(winner);
                            fView.render();
                            

                        }, 1000);

                        ++modelSettings.count;
                        if (modelSettings.count == 2) {
                            setTimeout(() => {
                                fView.isPause("none", "block");
                                self.setCookieAndFirestore();
                                modelSettings=null;
                                startGame=true;
                            }, 5000);
                        }
                    };


                    self.isPause = function(onOff) {
                        
                        modelSettings.countPausePress = onOff ? (modelSettings.countPausePress + onOff) : (modelSettings.countPausePress);
                        if (modelSettings.countPausePress === 1) {
                            modelSettings.isPause = true;
                            cancelAnimationFrame(modelSettings.requestlPlayer1Move);
                            cancelAnimationFrame(modelSettings.requestrPlayer2Move);
                            fView.isPause("none", "block");
                            
                        } else {
                            fView.isPause("block", "none");
                            modelSettings.countPausePress = 0;
                            modelSettings.isPause = false;
                            self.startPlayer1(modelSettings.lPlayer1, "stund", 0);
                            self.startPlayer2(modelSettings.rPlayer2, "stund", 0);
                            return;
                        }
                       
                    };
                    self.mutedOnOff = function(){
                        ++modelSettings.countMutedPress;
                    if (modelSettings.countMutedPress === 1) {
                        modelSettings.isMuted=true;
                        fView.isMuted(`Выкл <i class="fas fa-volume-mute"></i>`);
                    } else {
                        modelSettings.countMutedPress = 0;
                        modelSettings.isMuted=false;
                        fView.isMuted(`Вкл <i class="fas fa-volume-up"></i>`);
                        return;
                    }
                    }
                    self.setCookieAndFirestore=function(){
                        if(getDataUser){
                            // getDataUser.stats.forEach((currentValue, index )=> {
                            //     if (index==0) getDataUser.stats.splice(0,1, (currentValue+=Number(modelSettings.playerPoints)));
                            //     if (index==1) getDataUser.stats.splice(1,1, (currentValue+=Number(modelSettings.playerKO)));
                            // });
                            getDataUser.points=Number(getDataUser.points)+Number(modelSettings.playerPoints);
                            if(modelSettings.playerKO>0){
                                getDataUser.ko=Number(getDataUser.ko)+Number(modelSettings.playerKO-1);
                            }
                            modelSettings.playerPoints=0;
                            modelSettings.playerKO=0;
                            document.cookie =`JsonSF=` + JSON.stringify(getDataUser);
                        firestore.collection("users").doc(getDataUser.name).update({points: getDataUser.points ,ko: getDataUser.ko })
                        .then (function(docRef){
                            console.log("save")
                        })
                        .catch(function(error){
                            console.log(error)
                        });
                        

                        };
                    };
                }
                  
                //----------Model-----------//

                //----------Controller-----------//
                function FightController() {
                    let fModel = null,
                        lPlayer1 = {
                            name: "",
                            keyMoveUp: "KeyW",
                            keyMoveLeft: "KeyA",
                            keyMoveRight: "KeyD",
                            keyKick: "KeyG",
                            keyPow: "KeyF",
                            keyBlock: "KeyR"
                        },
                        rPlayer2 = {
                            name: ""};
                    let npcRandom;
                            if(!npc){
                            rPlayer2.keyMoveUp="ArrowUp";
                            rPlayer2.keyMoveLeft="ArrowLeft";
                            rPlayer2.keyMoveRight= "ArrowRight";
                            rPlayer2.keyKick= "Numpad6";
                            rPlayer2.keyPow= "Numpad5";
                            rPlayer2.keyBlock= "Numpad8";
                        }

                    this.init = function(model, man1, man2) {
                        fModel = model;
                        lPlayer1.name = man1;
                        rPlayer2.name = man2;
                        fModel.initAnimation();

                        let soundOnOff= document.getElementById("soundOnOff");
                        soundOnOff.addEventListener("click", fModel.mutedOnOff,false);
                    

                        this.firstMove();
                        this.pressMove()
                    };
                    this.closeGame = function() {
                        fModel = null;
                        this.pressMove(true);

                    };

                    this.pressMove = function(end) {

                        window.addEventListener("keydown", keyDown);
                        window.addEventListener("keyup", keyUp);
                        let pressed = new Set();
                        let leftPlayer;
                        let rightPlayer;
                        let keys = []; 
                        function keyDown(EL) {
                            switch (EL.code) {
                                case rPlayer2.keyPow:
                                    if (!rightPlayer) {
                                        rightPlayer = setInterval(fModel.startPlayer2(rPlayer2.name, "pow", 0), 0);
                                    }
                                    break;
                                case rPlayer2.keyKick:
                                    
                                    if (!rightPlayer) {
                                        rightPlayer = setInterval(fModel.startPlayer2(rPlayer2.name, "kick", 0) , 0);
                                    }
                                    break;
                                case rPlayer2.keyBlock:
                                    if (!rightPlayer) {
                                        rightPlayer = setInterval(fModel.startPlayer2(rPlayer2.name, "block", 0), 0);
                                    }
                                    break;
//===========================================1 player
                                case (lPlayer1.keyPow):
                                    if (!leftPlayer) {
                                        leftPlayer = setInterval(fModel.startPlayer1(lPlayer1.name, "pow", 0),  0);
                                    }
                                    break;
                                case (lPlayer1.keyKick):
                                        if (!leftPlayer) {
                                            leftPlayer = setInterval(fModel.startPlayer1(lPlayer1.name, "kick", 0),   0);
                                        }
                                    break;
                                case (lPlayer1.keyBlock):
                                        if (!leftPlayer) {
                                            leftPlayer = setInterval( fModel.startPlayer1(lPlayer1.name, "block", 0),    0);
                                        }
                                    break;
                            }
                        }
                        //-----------------------------------------------------------------------
                        
                        function keyUp(EL) {
                            switch (EL.code) {
                                case rPlayer2.keyPow:
                                    clearInterval(rightPlayer);
                                    rightPlayer = 0;
                                    break;
                                case rPlayer2.keyKick:
                                    clearInterval(rightPlayer);
                                    rightPlayer = 0;
                                    break;
                                case rPlayer2.keyBlock:
                                    clearInterval(rightPlayer);
                                    rightPlayer = 0;
                                    break;
                                case (lPlayer1.keyPow):
                                    clearInterval(leftPlayer);
                                    leftPlayer = 0;
                                    break;
                                case (lPlayer1.keyKick):
                                    clearInterval(leftPlayer);
                                    leftPlayer = 0;
                                    break;
                                case (lPlayer1.keyBlock):
                                    clearInterval(leftPlayer);
                                    leftPlayer = 0;
                                    break;
                            }
                        }
                        //---
                        


                        onkeydown = onkeyup = function(e) {
                            keys[e.code] = e.type == 'keydown';
                        }

                        document.addEventListener('keydown', keydown);

                        function keydown() {

                            if (keys[rPlayer2.keyMoveRight]) {
                                
                                fModel.startPlayer2(rPlayer2.name, "movee", 1);
                            }
                            if (keys[rPlayer2.keyMoveLeft]) {
                                fModel.startPlayer2(rPlayer2.name, "movee", -1);
                            }
                            if (keys[rPlayer2.keyMoveUp]) {
                                fModel.startPlayer2(rPlayer2.name, "jump", 0);
                            }

                            if (keys[lPlayer1.keyMoveUp]) {
                                fModel.startPlayer1(lPlayer1.name, "jump", 0);
                            }
                            if (keys[lPlayer1.keyMoveRight]) {
                                fModel.startPlayer1(lPlayer1.name, "movee", 1);
                            }
                            if (keys[lPlayer1.keyMoveLeft]) {
                                fModel.startPlayer1(lPlayer1.name, "movee", -1);
                            }
                        }

                        function runOnKeys(func, ...codes) {
                            

                            document.addEventListener('keydown', setMove), false; 
                            function setMove (event) {
                                pressed.add(event.code);

                                for (let code of codes) { // все ли клавиши из набора нажаты?
                                    if (!pressed.has(code)) {
                                        return;
                                    }
                                }

                                pressed.clear();

                                func();
                            };

                            document.addEventListener('keyup', clearMove, false);
                            function clearMove (event) {
                                pressed.delete(event.code);
                            }

                            if(end){
                                document.removeEventListener('keydown', setMove, false);
                                document.removeEventListener('keyup', clearMove, false);
                                

                            }
                        }

                        //--------1 player-------//
                        //----move----//
                        // runOnKeys(() => fModel.startPlayer1(lPlayer1.name, "block", 0), lPlayer1.keyBlock);
                        runOnKeys(() => fModel.startPlayer1(lPlayer1.name, "jump", 3), lPlayer1.keyMoveUp, lPlayer1.keyMoveRight);
                        runOnKeys(() => fModel.startPlayer1(lPlayer1.name, "jump", -3), lPlayer1.keyMoveUp, lPlayer1.keyMoveLeft);
                        //----fight----//
                        // runOnKeys(() => fModel.startPlayer1(lPlayer1.name, "pow", 0), lPlayer1.keyPow);
                        // runOnKeys(() => fModel.startPlayer1(lPlayer1.name, "kick", 0), lPlayer1.keyKick);
                        //--------2 player-------//
                        //----move----//
                        // runOnKeys(() => fModel.startPlayer2(rPlayer2.name, "block", 0), rPlayer2.keyBlock);
                        runOnKeys(() => fModel.startPlayer2(rPlayer2.name, "jump", 3), rPlayer2.keyMoveUp, rPlayer2.keyMoveRight);
                        runOnKeys(() => fModel.startPlayer2(rPlayer2.name, "jump", -3), rPlayer2.keyMoveUp, rPlayer2.keyMoveLeft);
                        //----fight----//
                        // runOnKeys(() => fModel.startPlayer2(rPlayer2.name, "pow", 0), rPlayer2.keyPow);
                        // runOnKeys(() => fModel.startPlayer2(rPlayer2.name, "kick", 0), rPlayer2.keyKick);

                        //=========================esc====================//

                        runOnKeys(() => fModel.isPause(1), "Escape");


                        //=====================npc==================//
                        if (npc){
                            npcRandom=setInterval(randomMoveBot, 500);
                            function randomMoveBot () {
                               let moves=[
                                     function(){fModel.startPlayer2(lPlayer1.name, "jump", -3)},
                                     function(){fModel.startPlayer2(lPlayer1.name, "jump", 3)},
                                     function(){fModel.startPlayer2(rPlayer2.name, "movee", 1)},
                                     function(){fModel.startPlayer2(rPlayer2.name, "movee", -1)},
                                     function(){fModel.startPlayer2(rPlayer2.name, "jump", 0)},
                                ]
                                let moveFight=[
                                    function(){fModel.startPlayer2(rPlayer2.name, "pow", 0)},
                                    function(){fModel.startPlayer2(rPlayer2.name, "kick", 0)},
                                    function(){fModel.startPlayer2(rPlayer2.name, "block", 0)},
                                 ]
                                let playMove=moves[Math.floor(Math.random()*moves.length)];
                                let playFight=moveFight[Math.floor(Math.random()*moveFight.length)];
                                let all=[
                                    function(){playMove()},
                                    function(){playFight()},
                                ]

                                let randomMove=all[Math.floor(Math.random()*all.length)];
                                randomMove();
                            }
                        }
                        //===========================end===============///
                        if (end){
                            window.removeEventListener("keydown", keyDown, false);
                            window.removeEventListener("keyup", keyUp, false);
                            document.removeEventListener('keydown', keydown, false);
                            keys=null;
                            pressed=null;
                            if(npc){
                            npc=false;
                            clearInterval(npcRandom);
                            npcRandom=null;}
                        }
                    };

                    this.firstMove = function() {
                        
                        fModel.startPlayer1(lPlayer1.name, "stund", 0);
                        fModel.startPlayer2(rPlayer2.name, "stund", 0);
                    };

                }


                //----------Controller-----------//

                    //--init---//

                let modelFighter = new FightModel,
                controllerFighter = new FightController,
                viewFighter = new FightView;
                viewFighter.players(changePlayer1, changePlayer2, map);
                modelFighter.init(viewFighter, changePlayer1, changePlayer2);
                controllerFighter.init(modelFighter, changePlayer1, changePlayer2);
                if (window.location.hash.slice(1) =="game" || window.location.hash.slice(1) =="game2" ){
                    window.addEventListener("popstate", closeAllGame);
                }else {
                    window.removeEventListener("popstate", closeAllGame);
                }

                function closeAllGame(){
                    if(modelFighter){
                    modelFighter.closeGame();
                    viewFighter.closeGame();
                    controllerFighter.closeGame();
                       
                    modelFighter = null;
                    controllerFighter = null;
                    viewFighter = null;
                    console.log("clean")
                    }
                }
        
             startGame=false;
            }
        }else{
            
            return;
        }
       
        } 




