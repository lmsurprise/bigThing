// 声明接口跟地址， ajaxPrefilter（） 方法options可以拿到调用接口时的api接口地址
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
})