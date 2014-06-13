define(['jquery'], function ($) {
    console.log('ajax');

    var SERVER_NAME = "http://mygoogletestdb.herokuapp.com/",
        URL_END = "callback=?",
        TIMEOUT = 50000;

    function generateUrl(route, params) {
        var url = SERVER_NAME + route + "?";

        if (params != null) {
            for (var name in params) {
                url = url + name + "=" + params[name] + "&";
            }
        }

        url += URL_END;
        return url;
    }

    return {
        callAjax: function (route, params, onSuccess, onError) {
            $.ajax({
                url: generateUrl(route, params),
                type: 'GET',
                dataType: 'json',
                timeout: TIMEOUT,
                success: function (answer) {
                    if (answer.error != undefined) {
                        console.log(answer.error);
                        if (onError != undefined)
                            onError();
                    }
                    else {
                        onSuccess(answer);
                    }
                },
                error: function () {
                    console.log('Ошибка сервера, попробуйте еще раз.');
                    if (onError != undefined)onError();
                },
                complete: function () {
                }
            });
        }
    };
});