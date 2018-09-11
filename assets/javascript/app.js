var question = {
    "questionText":"",
    "wrongAnswers":[],
    "rightAnswers":""
};

var Game = {
    "startGame":false,
    "pushComplete":false,
    "questionSelFalg":false,
    "questionEvalFlag":false,
    "pastQuestions": [],
    "intervalId":0,
    "rightAns":0,
    "wrongAns":0,
    "score":0,
    "questionArr": [],
    "questionVals":[
        {"text":"What is the capital of Mozambique","RA":"maputo", "WA":["matola","nampula","beira"]},
        {"text":"What is the capital of Australia","RA":"Canberra", "WA":["Perth","Sydney","Melbourne"]},
        {"text":"What is the capital of Liberia","RA":"monrovia", "WA":["harper","kakata","gbarnga"]},
        {"text":"What is the capital of Gabon","RA":"Libreville", "WA":["Franceville","Moanda","Oyem"]},
        {"text":"What is the capital of Taiwan","RA":"Taipei", "WA":["Tianan city","Taichung","Kaohsiung City"]},
        {"text":"What is the capital of Belgium","RA":"Brussels", "WA":["Ghent","Antwerp","Bruges"]},
        {"text":"What is the capital of Sierra Leone","RA":"Freetown", "WA":["Koidu","Bo","Kenema"]},
        {"text":"What is the capital of Serbia","RA":"Belgrade", "WA":["Zenum","Novi Sad","Nis"]},
        {"text":"What is the capital of Chile","RA":"Santiago", "WA":["Valdivia","Valparaiso","Concepcion"]},
        {"text":"What is the capital of Mexico","RA":"Ciudad de Mexico", "WA":["Guadalajara","Monterrey","Tijuana"]}
        //{"text":"What is the capital of ...","RA":"", "WA":["","",""]},
        
    ],
    "questionPush": function() {
        if (!this.pushComplete) {
            $(Game.questionVals).each(function(index, element) {
                var Question1 = jQuery.extend(true, {}, question);
                Question1.questionText = element.text;
                Question1.rightAnswers = element.RA;
                Question1.wrongAnswers = element.WA;
                Game.questionArr.push(Question1);
                

            });
            Game.pushComplete = true;
        }

    },
    "randomQuestionSelect": function() {
        if (this.pushComplete && !this.questionSelFalg) {
            
            do {
                flag = false;
                var rand = Math.floor(Math.random() * Game.questionArr.length);
                var ques = Game.questionArr[rand];
                
                if (Game.pastQuestions.indexOf(ques) == -1) {
                    Game.pastQuestions.push(ques);
                    flag = true;
                } 
            } while (!flag);
            this.setTimer(30);
            this.questionSelFalg = true;
            this.questionEvalFlag = false;
        }
    },
    "questionEval": function(answer) {
        
        if(this.pushComplete && this.questionSelFalg && !this.questionEvalFlag){
            if(this.pastQuestions[this.pastQuestions.length-1].rightAnswers==answer) {
                console.log("Right");
                this.rightAns++;
                //show Right answer function
                this.showRightAnsw();
                
            } else {
                this.wrongAns++;
                console.log("Wrong, the Right answer is: "+console.log(this.pastQuestions[this.pastQuestions.length-1].rightAnswers));
                //Show wrong answer function
                this.showWrongAns();
            }
           
            this.stop();
            this.finishEvalFunc();
            this.questionSelFalg = false;
            this.questionEvalFlag = true;
        }
        
    },
    "setTimer": function(val) {
        var number = val;

        function run() {
            Game.intervalId = setInterval(decrement, 1000);
        }

        function decrement() {
            number--;
            $("#timerT").html(number);
            //$("#timerT").html(number);
            console.log(number);

            if (number === 0 && Game.questionSelFalg) {
                console.log("Time finished: show wrong answer");
                Game.wrongAns++;
                Game.stop();
                Game.showWrongAns();
                Game.finishEvalFunc();
                Game.questionSelFalg = false;
                Game.questionEvalFlag = true;
                
            } else if (number === 0 && Game.questionEvalFlag) {
                Game.stop();
                Game.continueFunc();
            }
        }
        
        run()
    },
    
    "stop": function() {
        clearInterval(Game.intervalId);
    },
    "finishEvalFunc": function() {
        if (this.pushComplete && this.questionSelFalg && this.pastQuestions.length == this.questionArr.length) {
            this.score = Math.round(((this.rightAns / (this.rightAns+this.wrongAns))*100));
            console.log("finish your score is: "+this.score+"%");
            var target = $(".holder");
            var button = $("<div>");
            button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 buttonC align");
            button.attr("id", "btn2");
            var span = $("<span>");
            span.text("Finish!");
            span.attr("class", "buttonC");
            button.append(span);
            target.append(button);
            $(document).delegate('#btn2','click',function(event){
                console.log("finish");
                Game.finishFunc();
            });
            //FinishFunc
        } else {
            console.log("Continue");
            Game.setTimer(20);
            //Show Dom
            var target = $(".holder");
            var button = $("<div>");
            button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 buttonC align");
            button.attr("id", "btn1");
            var span = $("<span>");
            span.text("Continue!");
            span.attr("class", "buttonC");
            button.append(span);
            target.append(button);
            $("#btn1").on('click',function(event){
                //console.log(event);
                Game.continueFunc();
            });

        }
        
    }, 
    "finishFunc": function() {
        var target = $(".holder");
        target.empty();
        var finishHol = $("<div>");
        finishHol.attr("class", "col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 align alert alert-dark");
        
        var scoreH = $("<h5>");
        scoreH.text("Score: "+Game.score);
        var rightAnsH = $("<h5>");
        rightAnsH.text("Right Answers: "+Game.rightAns);
        var wrongAnsH = $("<h5>");
        wrongAnsH.text("Wrong Answers: "+Game.wrongAns);

        finishHol.append(scoreH);
        finishHol.append(rightAnsH);
        finishHol.append(wrongAnsH);
        target.append(finishHol);
    },
    "continueFunc": function() {
        Game.stop();
        this.randomQuestionSelect();
        this.questionDomGen();

    },
    "showRightAnsw": function() {
        var target = $(".holder");
        target.empty();
        var wrongAnsHol = $("<div>");
        wrongAnsHol.attr("class", "col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 align alert alert-success");
        var wrongAnsText = $("<h3>");
        wrongAnsText.text(Game.pastQuestions[Game.pastQuestions.length-1].rightAnswers+" is the right answer!");
        wrongAnsHol.append(wrongAnsText);
        target.append(wrongAnsHol);    
    },
    "showWrongAns": function() {
        var target = $(".holder");
        target.empty();
        var wrongAnsHol = $("<div>");
        wrongAnsHol.attr("class", "col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 align alert alert-danger");
        var wrongAnsText = $("<h3>");
        wrongAnsText.text("Wrong, the right answer is: "+ Game.pastQuestions[Game.pastQuestions.length-1].rightAnswers);
        wrongAnsHol.append(wrongAnsText);
        target.append(wrongAnsHol);
    },
    "startButton": function() {
        var target = $(".holder");
        var button = $("<div>");
        button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 button align");
        button.attr("id", "btn");
        var span = $("<span>");
        span.text("Start");
        span.attr("class", "button");
        button.append(span);
        target.append(button);
        $(document).delegate('#btn','click',function(event){
            //console.log(event);
            Game.questionPush();
            Game.randomQuestionSelect();
            Game.questionDomGen();
        });

    },
    "questionDomGen": function() {
        var target1 = $(".holder");
        target1.empty();
        var quesHolText = $("<div>");
        quesHolText.attr("class", "col-sm-10 offset-sm-1 col-lg-12 offset-lg-0 align");
        var quesText = $("<h5>");
        quesText.text(Game.pastQuestions[Game.pastQuestions.length - 1].questionText);
        var randArr = [];
        var ansArr = Game.pastQuestions[Game.pastQuestions.length-1].wrongAnswers;
        ansArr.push(Game.pastQuestions[Game.pastQuestions.length-1].rightAnswers);
        console.log(ansArr);
        quesHolText.append(quesText);
        target1.append(quesHolText);

        for(var i = 0; i < 4; i++) {
            do {
                var flag1 = false;
                var rand = Math.floor(Math.random() * 4);
                var select = ansArr[rand];
                
                if (randArr.indexOf(select) == -1) {
                    randArr.push(select);
                    flag1 = true;
                } 
            } while (!flag1);
            var ansHolText = $("<div>");
            ansHolText.attr("class","col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 button align");
            //var ansText = $("<span>");
            //ansText.attr("class","button");
            ansHolText.text(randArr[i]);
            //ansHolText.append(ansText);
            target1.append(ansHolText);
        }
        $(document).delegate('.button','click',function(event){
            console.log(event);
            console.log(event.target.innerText);
            var usrAns = event.target.innerText;
            Game.questionEval(usrAns);
        });
        
        console.log(randArr);
    }

};

$(document).ready(function() { 
    Game.startButton();
});
