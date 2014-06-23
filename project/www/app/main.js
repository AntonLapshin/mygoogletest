requirejs.config({
    paths: {
        vm: 'vm',
        js: 'js',
        model: 'model',
        ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min', //'../lib/ko',
        koext: '../lib/koext-amd',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min', //'../lib/jquery',
        infuser: '../lib/infuser-amd',
        TrafficCop: '../lib/TrafficCop',
        vk: '//vk.com/js/api/xd_connection'
    }
});

require(['vk', 'ko', 'koext', 'vm/main', 'infuser'],
    function (vk, ko, koext, mainViewModel, infuser) {
        infuser.defaults.templateUrl = "app/view";
        ko.applyBindings(mainViewModel);

        VK.init(function () {
            console.log('vk init success');

//            VK.addCallback('onOrderSuccess', function(order_id) {
//                alert('onOrderSuccess '+ order_id);
//            });
//            VK.addCallback('onOrderFail', function() {
//                alert('onOrderFail');
//            });
//            VK.addCallback('onOrderCancel', function() {
//                alert('onOrderCancel');
//            });
//
//            VK.callMethod('showOrderBox', { type: 'offers', currency: 1});

        }, function () {
        }, '5.21');

        console.log('main');
    });

