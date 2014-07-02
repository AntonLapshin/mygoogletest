define(function () {

    var ID_GROUP = '72833562';

    function srcToHttps(src){
        return "https://pp.vk.me/c" + src.replace("http://cs", "").replace(".vk.me", "");
    }

    function parseUser(data){
        return { id: data.uid || data.id, img: srcToHttps(data.photo_50), name: data.first_name + ' ' + data.last_name };
    }

    return {
        invite: function () {
            VK.callMethod('showInviteBox');
        },

        getUser: function(id, callback){
            VK.api('users.get', { user_ids: id, fields: 'photo_50', name_case: 'Nom' }, function(data){
                var response = data.response;
                var user = parseUser(response[0]);
                callback(user);
            });
        },

        getUsers: function(ids, callback){
            VK.api('users.get', { user_ids: ids, fields: 'photo_50', name_case: 'Nom' }, function(data){
                var response = data.response;
                var users = [];
                for(var i = 0; i < response.length; i++){
                    users.push(parseUser(response[i]));
                }
                callback(users);
            });
        },

        getFriendsUsers: function(callback){
            var self = this;
            VK.api('friends.getAppUsers', function(data){
                var ids = data.response;
                if (ids.length === 0) {
                    callback([]);
                    return;
                }
                callback(ids);
            });
        },

        isUserInGroup: function(id){
            VK.api('groups.isMember', { user_id: id, group_id: ID_GROUP }, function(data){
                var response = data.response;
                return response.member == 1;
            });
        },

        getAdUser: function(id, callback){
            VK.api('users.get', { user_ids: id, fields: 'sex,city,bdate' }, function(data){
                callback(data.response[0]);
            });
        }
    }
});