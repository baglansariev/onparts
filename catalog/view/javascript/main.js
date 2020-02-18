$(function () {
    $('.category-point').on('mouseover', function () {
        $(this).find('.subcategories-list').fadeIn();
    }).on('mouseleave', function () {
        $(this).find('.subcategories-list').fadeOut();
    });

    $('.mobile-menu-toggler').click(function () {
        $('.mobile-menu-cover').fadeIn();
    });
    $('.mobile-menu-close').click(function () {
        $('.mobile-menu-cover').fadeOut();
    });

    $('.mobile-category-toggler').click(function () {
        $('.mobile-category-cover').fadeIn();
    });
    $('.mobile-category-close').click(function () {
        $('.mobile-category-cover').fadeOut();
    });
    $('.phone_mask').mask('+7(999)999-99-99', {autoclear: false});

});

var prod = {
    // mailformat: /^[a-zA-Z]+[0-9]*-*_*\.*[a-zA-Z]*@[a-zA-Z]+-*[0-9]*\.[a-zA-Z]+$/,
    captcha: 9,
    getForm : function (product_name = '') {
        $('.callback-cover form textarea').val(product_name);
        $('.callback-cover').fadeIn();
    },
    closeForm: function () {
        $('.callback-cover').fadeOut();
    },
    send: function () {
        let cl_data = {
            'cl_name': $('[name=cl_name]').val(),
            'cl_phone': $('[name=cl_phone]').val(),
            'cl_email': $('[name=cl_email]').val(),
            'cl_captcha': $('[name=cl_captcha]').val(),
            'cl_msg': $('[name=cl_msg]').val(),
        };

        if(this.isCaptcha(cl_data.cl_captcha)){
            this.closeForm();
            $.ajax({
                url: '/index.php?route=mail/price',
                type: 'POST',
                data: cl_data,
                dataType: 'json',
                success: function (result) {
                    alert(result.msg);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        else{
            alert('Ответ на контрольный вопрос неверный!');
        }

    },
    isCaptcha: function (captcha) {
        if(parseInt(captcha) === this.captcha){
            return true;
        }
        return false;
    },
    // isEmail: function (email) {
    //     if(email.match(this.mailformat)){
    //         return true;
    //     }
    //     return false;
    // }
};