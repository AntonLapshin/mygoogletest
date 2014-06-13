define(['ko', 'js/vk', 'model/results'], function (ko, vk, results) {
    console.log('top-item');

    function topItemViewModel(player){
        var self = this;

        this.player = ko.observable();
        this.score = ko.observable(0);
        this.post = ko.computed(function(){
            return this.score() === 0 ? 'Тест не пройден' : results[Math.floor(this.score() / 1000)].name;
        }, this);

        this.starSrc = 'https://pp.vk.me/c620622/v620622333/9994/3XuLiq4H_vw.jpg';

        this.onClick = function(){
            if (self.player().id == 0) // may be "0"
            {
                vk.invite();
                return;
            }
            var url = 'https://vk.com/id' + self.player().id;
            var win = window.open(url, '_blank');
            win.focus();
        };

        this.set = function(player){
            self.player(player);
            self.score(player.score);
        };

        this.set(player);
    }

    return topItemViewModel;
});