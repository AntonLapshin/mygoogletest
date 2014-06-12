define(['ko', 'model/top', 'vm/top-item'], function (ko, top, topItemViewModel) {
    console.log('topViewModel');

    var unknowImg = 'https://vk.com/images/deactivated_50.gif';

    var topViewModel = {
        isVisible: ko.observable(false),

        players: ko.observableArray(),

        toAllTop: function(){
            var players = [];
            for(var i = 0; i < 8; i++)
            {
                var player = top[i];
                var vm = new topItemViewModel(player);
                players.push(vm);
            }
            this.players(players);
        },

        toFriendsTop: function(){
            var self = this;
            require(["vm/main"], function(mainViewModel){
                var players = [];
                players.push(mainViewModel.playerViewModel);
                for(var i = 1; i < 8; i++)
                {
                    var player = { img: unknowImg, name: 'Пригласить друга', score: '', id: 0 };
                    var vm = new topItemViewModel(player);
                    players.push(vm);
                }
                self.players(players);
            });
        },

        emptyPlayer: function(){
            var player = {
                id: '0',
                img: unknowImg,
                name: 'Loading...',
                score: 'Loading...'
            };
            return new topItemViewModel(player);
        }
    };

    topViewModel.toAllTop();

    return topViewModel;
});