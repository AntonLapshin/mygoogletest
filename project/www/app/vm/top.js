define(['ko', 'vm/top-item', 'js/players', 'model/player'], function (ko, topItemViewModel, players, player) {

    var MAX_PLAYERS = 8;

    function toViewModel(playerModel){
        return new topItemViewModel(playerModel);
    }

    function sortRule(a, b){
        return b.score() - a.score();
    }

    var topViewModel = {
        isVisible: ko.observable(false),

        players: ko.observableArray(),

        myself: null,
        allTop: [],
        friendsTop: [],

        setVisiblePlayers: function(players){
            players.sort(sortRule);
            this.players(players);
        },

        sort: function(){
            this.setVisiblePlayers(this.players());
        },

        toAllTop: function () {
            var self = this;

            if (this.allTop.length === 0) {
                var playersViewModels = [];
                players.getTopPlayers(function(players){
                    for(var i = 0; i < MAX_PLAYERS; i++){
                        if (players[i])
                            players[i].place = i;

                        var playerViewModel = players[i] ? toViewModel(players[i]) : toViewModel(player.playerInvite());
                        playersViewModels.push(playerViewModel);
                    }
                    self.allTop = playersViewModels;
                    self.setVisiblePlayers(self.allTop);
                });
            }
            else
                self.setVisiblePlayers(this.allTop);
        },

        toFriendsTop: function () {
            var self = this;

            if (this.friendsTop.length === 0) {
                var playersViewModels = [];
                players.getFriendsPlayers(function(players){
                    playersViewModels.push(self.myself);

                    for(var i = 0; i < MAX_PLAYERS - 1; i++){
                        var playerViewModel = players[i] ? toViewModel(players[i]) : toViewModel(player.playerInvite());
                        playersViewModels.push(playerViewModel);
                    }
                    self.friendsTop = playersViewModels;
                    self.setVisiblePlayers(self.friendsTop);
                });
            }
            else
                self.setVisiblePlayers(this.friendsTop);
        }
    };

    topViewModel.toAllTop();

    return topViewModel;
});