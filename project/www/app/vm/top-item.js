define(['ko'], function (ko) {
    console.log('top-item');

    function topItemViewModel(player){
        this.id = ko.observable();
        this.img = ko.observable();
        this.name = ko.observable();
        this.score = ko.observable();

        var self = this;

        this.onClick = function(){
            if (self.id() === 0)
            {
                VK.callMethod('showInviteBox');
                return;
            }
            var url = 'https://vk.com/id' + self.id();
            var win = window.open(url, '_blank');
            win.focus();
        };

        this.set = function(player){
            this.id(player.id);
            this.img(player.img);
            this.name(player.name);
            this.score(player.score);
        };

        this.set(player);
    }

    return topItemViewModel;
});