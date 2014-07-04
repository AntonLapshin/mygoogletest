define(['model/ad'], function (ad) {

    var ID_GROUP = '72833562';

    function random(min, max) {
        return (Math.random() * (max - min) + min) | 0
    }

    function srcToHttps(src) {
        return "https://pp.vk.me/c" + src.replace("http://cs", "").replace(".vk.me", "");
    }

    function parseUser(data) {
        return { id: data.uid || data.id, img: srcToHttps(data.photo_50), name: data.first_name + ' ' + data.last_name };
    }

    return {
        getAdItem: function (user) {
            var max = 0;

            ad.forEach(function (item) {
                item.score = 0;
                if (user.sex && user.sex === item.sex) item.score++;
                if (user.city && user.city === item.city) item.score++;

                if (user.bdate) {
                    var dateValues = user.bdate.split('.');
                    var lastValue = dateValues[dateValues.length - 1];
                    if (lastValue.length === 4) {
                        var year = parseInt(lastValue);
                        var age = (new Date()).getFullYear() - year;
                        if (age >= item.ageMin)
                            item.score++;
                        if (age <= item.ageMax)
                            item.score++;
                    }
                }
                if (item.score > max)
                    max = item.score;
            });

            var maxItems = [];
            ad.forEach(function (item) {
                if (item.score === max)
                    maxItems.push(item);
            });
//            ad.sort(function(a, b){
//                return b.score - a.score;
//            });

            return maxItems[random(0, maxItems.length)];
        }
    }
});