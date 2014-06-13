define(['ko', 'model/results', 'js/ajax', 'js/players'], function (ko, results, ajax, players) {
    console.log('results');

    var resultViewModel = {
        isVisible: ko.observable(false),

        result: ko.observable(results[0]),

        show: function (score, elapsedTime) {
            var self = this,
                result = results[score],
                post = result.name;

            score = score * 1000 + elapsedTime;

            require(["vm/main"], function (mainViewModel) {
                if (score > mainViewModel.playerViewModel.score()) {
                    ajax.callAjax('upsert', { id: mainViewModel.playerViewModel.player().id, score: score }, function () { }, function (err) { });
                    mainViewModel.playerViewModel.score(score);
                    mainViewModel.topViewModel.sort();
                }
            });

            VK.api('wall.post', { attachments: 'photo-22454303_329340417', message: 'Моя должность в Google: ' + post + '. Заходи, чтобы проверить на какую должность в Google возьмут тебя https://vk.com/app4382885'}, function (answer) {
                self.result(result);
                self.isVisible(true);
            });
        },

        callback: null,
        again: function () {
            this.isVisible(false);
            this.callback();
        },

        invite: function () {
            VK.callMethod("showInviteBox");
        }
    };

    return resultViewModel;
});