define(['ko'], function (ko) {
    console.log('intro');

    var introViewModel = {
        isVisible: ko.observable(false),

        header: 'Тест: Примут ли тебя в Google?',
        desc: 'При приеме на работу в Google соискателей ждут каверзные вопросы, многочасовые собеседования и непредсказуемый результат. Узнайте, достаточно ли у вас знаний о природе вещей, чтобы работать в этой компании.',

        callback: null,
        start: function(){
            var self = this;
            setTimeout(function(){
                self.isVisible(false);
                self.callback();
            }, 300);
            //this.isVisible(false);
            //this.callback();
        }
    };

    return introViewModel;
});