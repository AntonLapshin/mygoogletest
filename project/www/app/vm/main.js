define(['jquery', 'vm/top', 'vm/intro', 'vm/question', 'vm/result', 'vm/top-item', 'js/vk'],
    function ($, topViewModel, introViewModel, questionViewModel, resultViewModel, topItemViewModel, vkMethods) {
    console.log('mainViewModel');

    var mainViewModel = {
        playerViewModel: topViewModel.emptyPlayer(),
        topViewModel: topViewModel,
        introViewModel: introViewModel,
        questionViewModel: questionViewModel,
        resultViewModel: resultViewModel
    };

    vkMethods.getPlayerInfo(undefined, function(player){
        mainViewModel.playerViewModel.set(player);
    });

    mainViewModel.topViewModel.isVisible(true);

    mainViewModel.introViewModel.isVisible(true);
    $('#spider').fadeIn(500);

    mainViewModel.introViewModel.callback = function () {
        $('#spider').fadeOut(500);
        mainViewModel.questionViewModel.start();
    };

    mainViewModel.questionViewModel.callback = function(value){
        mainViewModel.resultViewModel.show(value);
    };

    mainViewModel.resultViewModel.callback = function(){
        mainViewModel.introViewModel.isVisible(true);
        $('#spider').fadeIn(500);
    };

    return mainViewModel;
});