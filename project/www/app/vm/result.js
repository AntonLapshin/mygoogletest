define(['ko', 'model/results'], function (ko, results) {
    console.log('results');

    var resultViewModel = {
        isVisible: ko.observable(false),

        result: ko.observable(results[0]),

        show: function (value) {
            var self = this;
            var post = results[value].name;

            require(["vm/main"], function(mainViewModel){
                mainViewModel.playerViewModel.score(post + ' (51)');
            });

            VK.api('wall.post', { attachments: 'photo-22454303_329340417', message: 'Моя должность в Google: ' + post + '. Заходи, чтобы проверить на какую должность в Google возьмут тебя https://vk.com/app4382885'}, function (result) {
                self.result(results[value]);
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