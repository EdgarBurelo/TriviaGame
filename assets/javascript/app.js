var question = {
    "questionText":"",
    "wrongAnswers":[],
    "rightAnswers":""
};

var Game = {
    "startGame":false,
    "pushComplete":false,
    "questionSelFalg":false,
    "pastQuestions": [],
    "rightAns":0,
    "wrongAns":0,
    "score":0,
    "questionArr": [],
    "questionVals":[
        {"text":"my name","RA":"Edgar", "WA":["pepe","Juan","Carlos"]},
        {"text":"my age","RA":"27", "WA":["28","29","26"]},
        {"text":"my color","RA":"black", "WA":["red","blue","white"]}
        
    ],
    "evalContfunc": function() {

    },
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
        }
    }

};