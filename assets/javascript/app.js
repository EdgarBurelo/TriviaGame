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
        {"text":"my name","RA":"Edgar", "WA":["pepe","Juan","Carlos"]},
        {"text":"my age","RA":"27", "WA":["28","29","26"]},
        {"text":"my color","RA":"black", "WA":["red","blue","white"]}
        
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
        ;
        if(this.pushComplete && this.questionSelFalg && !this.questionEvalFlag && this.pastQuestions[this.pastQuestions.length-1].rightAnswers==answer) {
            console.log("Right");
            this.rightAns++;
            //show Right answer function
        } else {
            this.wrongAns++;
            console.log("Wrong, the Right answer is: "+console.log(this.pastQuestions[this.pastQuestions.length-1].rightAnswers));
            //Show wrong answer function
        }
        this.score = Math.round(((this.rightAns / (this.rightAns+this.wrongAns))*100));
        this.stop();
        //finishEval function
        this.finishEvalFunc();
        this.questionSelFalg = false;
        this.questionEvalFlag = true;
        
    },
    "setTimer": function(val) {
        var number = val;

        function run() {
            Game.intervalId = setInterval(decrement, 1000);
        }

        function decrement() {
            number--;
            console.log(number);
            if (number === 0 && Game.questionSelFalg) {
                console.log("Time finished: show wrong answer");
                Game.stop();
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
            console.log("finish your score is: "+this.score+"%");
            //FinishFunc
        } else {
            console.log("Continue");
            Game.setTimer(20);
            //Show Dom
        }
        
    }, 
    "finishFunc": function() {
        //dom modification
    },
    "continueFunc": function() {
        Game.stop();
        this.randomQuestionSelect();
    },
    "showRightAnsw": function() {
        //dom modification
    },



};