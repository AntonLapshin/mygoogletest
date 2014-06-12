define(function () {
    console.log('vk');

    return {
        getPlayerInfo: function(id, callback){
            VK.api('users.get', { user_ids: id, fields: 'photo_50', name_case: 'Nom' }, function(data){
                var response = data.response;
                console.log(response[0].uid);
                var player = { id: response[0].uid, img: response[0].photo_50, name: response[0].first_name + ' ' + response[0].last_name, score: 'Тест не пройден' };
                callback(player);
            });
        }
    };
});