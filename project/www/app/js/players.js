define(['js/ajax', 'js/vk', 'model/player'], function (ajax, vk, player) {
    console.log('vk');

    function getPlayer(user, score){
        return player.player(user.id, user.img, user.name, score);
    }

    function getPlayers(ids, idScoreDic, callback){
        var players = [];
        vk.getUsers(ids, function(users){
            var players = [];
            for(var i = 0; i < users.length; i++){
                players.push(getPlayer(users[i], idScoreDic[users[i].id]));
            }
            callback(players);
        });
    }

    function getIdScoreDic(ids, scores){
        var dic = {};
        for(var i = 0; i < ids.length; i++){
            dic[ids[i]] = typeof scores[i] === "object" ? (scores[i].score || 0) : (scores[i] || 0);
        }
        return dic;
    }

    return {

        getOnePlayer: function(id, callback){
            var self = this;

            vk.getUser(id, function(user){
                ajax.callAjax('scores', { ids: [user.id] }, function(scores){
                    var score = scores.length === 1 ? scores[0].score : 0;
                    var player = getPlayer(user, score);
                    callback(player);
                });
            });
        },

        getTopPlayers: function(callback){
            ajax.callAjax('top', null, function (top) {
                var ids = [];
                var scores = [];
                for (var i = 0; i < top.length; i++) {
                    var player = top[i];
                    ids.push(player._id);
                    scores.push(player.score);
                }
                var idsText = ids.join(',');
                var idScoreDic = getIdScoreDic(ids, scores);
                getPlayers(idsText, idScoreDic, callback);
            });
        },

        getFriendsPlayers: function(callback){
            vk.getFriendsUsers(function(ids){
                if (ids.length === 0){
                    callback([]);
                    return;
                }
                ajax.callAjax('scores', { ids: ids }, function(scores){
                    var idsText = ids.join(',');
                    var idScoreDic = getIdScoreDic(ids, scores);
                    getPlayers(idsText, idScoreDic, callback);
                });
            });
        }
    };
});