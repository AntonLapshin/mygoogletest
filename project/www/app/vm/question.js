define(['ko', 'model/questions'], function (ko, questions) {
    console.log('questionViewModel');

    var time = '1:00',
        timerEnabled = false;

    function initQuestions() {
        for (var i = 0; i < questions.length; i++) {
            var q = questions[i];

            for (var j = 0; j < q.answers.length; j++) {
                q.answers[j] = { desc: q.answers[j] };
                q.answers[j].isSelected = ko.observable(false);
            }
        }
    }

    initQuestions();

    var questionViewModel = {
        isVisible: ko.observable(false),

        currentQuestion: ko.observable(),
        questions: questions,
        index: ko.observable(),
        time: ko.observable(),
        score: 0,

        tick: function () {
            if (this.time() == '1:00') {
                this.time('0:59');
            }
            else if (this.time() == '0:00') {
                this.next();
            }
            else {
                var sec = this.time().substr(2);
                var num = parseInt(sec, 10);
                num--;
                if (num < 10) {
                    this.time('0:0' + num);
                }
                else {
                    this.time('0:' + num);
                }
            }
            var self = this;
            if (timerEnabled === true) setTimeout(function () {
                self.tick();
            }, 1000);
        },

        start: function () {
            var self = this;
            this.score = 0;
            setTimeout(function () {
                self.tick();
            }, 1000);
            timerEnabled = true;
            this.isVisible(true);
            this.index(0);
            this.time(time);
            this.currentQuestion(questions[this.index()]);
        },

        next: function (answer) {
            if (answer != undefined) {
                var right = questions[this.index()].right;
                if (answer.desc === right) {
                    this.score++;
                }
            }

            if (this.index() == questions.length - 1) {
                this.finish();
                return;
            }

            this.time(time);
            this.index(this.index() + 1);
            this.currentQuestion(questions[this.index()]);
        },

        callback: null,
        finish: function () {
            timerEnabled = false;
            this.isVisible(false);
            this.callback(this.score);
        }
    };

    return questionViewModel;
});