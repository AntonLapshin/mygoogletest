define(function () {
    var unknowImg = 'https://vk.com/images/deactivated_50.gif',
        staticTop =
            [
                { id: 1854, img: 'https://pp.vk.me/c312816/v312816854/418e/Dj_b1-tDbnA.jpg', name: 'Александр Митьков', score: 'Глава компании (1590)' },
                { id: 83683296, img: 'https://pp.vk.me/c306201/v306201296/68f4/miitl2DFNNU.jpg', name: 'Олег Павленко', score: 'Глава компании (1470)' },
                { id: 40513911, img: 'https://pp.vk.me/c617821/v617821911/d788/Nt_qvJkP1dw.jpg', name: 'Татьяна Кнауб', score: 'CEO (1330)' },
                { id: 68369564, img: 'https://pp.vk.me/c313126/v313126564/87f2/uBvNbtCPVII.jpg', name: 'Слава Гущин', score: 'CEO (1290)' },
                { id: 157853322, img: 'https://pp.vk.me/c617217/v617217322/8577/cAb_KGEGp5Q.jpg', name: 'Женя Миронов', score: 'CEO (1270)' },
                { id: 24256368, img: 'https://pp.vk.me/c619420/v619420368/626c/TeI0Oer8zL4.jpg', name: 'Кристинка Ткаченко', score: 'CEO (1203)' },
                { id: 56571440, img: 'https://pp.vk.me/c411816/v411816440/9424/pZvOayDFFcA.jpg', name: 'Анатолий Красавчик Попов', score: 'CEO (1190)' },
                { id: 119006596, img: 'https://pp.vk.me/c617827/v617827596/a922/fHXptl7p_58.jpg', name: 'Жека Клюшников', score: 'CEO (1180)' }
            ];

    return {

        getStaticTop: function(){
            var players = [];
            for(var i = 0; i < staticTop; i++){
                var data = staticTop[i];
                players.push(this.player(data.id, data.img, data.name, data.score))
            }
        },

        playerInvite: function () {
            return {
                id: '0',
                img: unknowImg,
                name: 'Пригласить друга',
                score: 0
            };
        },

        playerLoading: function () {
            return {
                id: '0',
                img: unknowImg,
                name: 'Загружается',
                score: 0
            };
        },

        player: function (id, img, name, score) {
            return {
                id: id,
                img: img,
                name: name,
                score: score
            };
        }
    }

});