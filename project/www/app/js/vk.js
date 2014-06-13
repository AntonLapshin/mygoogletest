define(function () {

    function parseUser(data){
        return { id: data.uid || data.id, img: data.photo_50, name: data.first_name + ' ' + data.last_name };
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
        }
    }
});