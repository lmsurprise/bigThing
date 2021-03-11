$(function() {
    // 登陆注册表单的切换
    $('#reg').on('click', function() {
        $(this).parents(".login_box").hide().siblings(".reg_box").show();
    })
    $('#login').on('click', function() {
        $(this).parents(".reg_box").hide().siblings(".login_box").show();
    })

    // 自定义密码的效验规则
    // 获取layui中的form对象
    var form = layui.form;
    // 获取layui中的layer对象
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            //通过形参拿到重复输入的密码
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！去登陆');
                $('#login').click();
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                location.href = '/index.html';
            }
        })
    })

})