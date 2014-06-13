define(['jquery', 'vm/top', 'vm/intro', 'vm/question', 'vm/result', 'vm/top-item', 'js/players', 'model/player'],
    function ($, topViewModel, introViewModel, questionViewModel, resultViewModel, topItemViewModel, players, player) {
    console.log('mainViewModel');

    var mainViewModel = {
        playerViewModel: new topItemViewModel(player.playerLoading()),
        topViewModel: topViewModel,
        introViewModel: introViewModel,
        questionViewModel: questionViewModel,
        resultViewModel: resultViewModel
    };

    players.getOnePlayer(undefined, function(player){
        mainViewModel.playerViewModel.set(player);
        mainViewModel.topViewModel.myself = mainViewModel.playerViewModel;
    });

    mainViewModel.topViewModel.isVisible(true);

    mainViewModel.introViewModel.isVisible(true);
    $('#spider').fadeIn(500);

    mainViewModel.introViewModel.callback = function () {
        $('#spider').fadeOut(500);
        mainViewModel.questionViewModel.start();
    };

    mainViewModel.questionViewModel.callback = function(score, elapsedTime){
        mainViewModel.resultViewModel.show(score, elapsedTime);
    };

    mainViewModel.resultViewModel.callback = function(){
        mainViewModel.introViewModel.isVisible(true);
        $('#spider').fadeIn(500);
    };

    return mainViewModel;
});