define(['ko', 'js/vk', 'js/ad'], function (ko, vk, ad) {

    return {
        isVisible: ko.observable(false),
        adItem: ko.observable(null),

        show: function(id){
            var self = this;
            vk.getAdUser(id, function(adUser){
                self.adItem(ad.getAdItem(adUser));
                self.isVisible(true);
            });
        }
    };
});