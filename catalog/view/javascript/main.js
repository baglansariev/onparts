$(function () {
    $('.category-point').on('mouseover', function () {
        $(this).find('.subcategories-list').fadeIn();
    }).on('mouseleave', function () {
        $(this).find('.subcategories-list').fadeOut();
    });

    $('.mobile-search').click(function () {
        $('.search-container').fadeIn();
    });

    $('body').click(function (e) {
        if (e.target !== $('.mobile-category-link')[0] && e.target !== $('.header-category-title')[0]
            && e.target !== $('.header-category-title p')[0] && e.target !== $('.header-category-title span')[0]
            && e.target !== $('.header-category-title span i')[0])
        {
            menuSwitcher.hide($('.mobile-categories-list'));
        }

        if (e.target !== $('.mobile-menu-toggler')[0] && e.target !== $('.mobile-menu-toggler i')[0]) {
            menuSwitcher.hide($('.mobile-menu'));
        }

        if (e.target !== $('.mobile-search')[0] && e.target !== $('.mobile-search i')[0]
            && e.target !== $('#search')[0] && e.target !== $('#searchButton')[0]
            && e.target !== $('#search input')[0])
        {
            $('.search-container').fadeOut();
        }
    });
    $('body').on('touchend', function (e) {
        if (e.target !== $('.mobile-category-link')[0] && e.target !== $('.header-category-title')[0]
            && e.target !== $('.header-category-title p')[0] && e.target !== $('.header-category-title span')[0]
            && e.target !== $('.header-category-title span i')[0])
        {
            menuSwitcher.hide($('.mobile-categories-list'));
        }

        if (e.target !== $('.mobile-menu-toggler')[0] && e.target !== $('.mobile-menu-toggler i')[0]) {
            menuSwitcher.hide($('.mobile-menu'));
        }

        if (e.target !== $('.mobile-search')[0] && e.target !== $('.mobile-search i')[0]
            && e.target !== $('#search')[0] && e.target !== $('#searchButton')[0]
            && e.target !== $('#search input')[0])
        {
            $('.search-container').fadeOut();
        }
    });

    $('.phone_mask').mask('+7(999)999-99-99', {autoclear: false});

});

var menuSwitcher = {
    showClass: 'list-shown',
    hideClass: 'list-hidden',
    toggle: function(menu, menu_point) {
        if ( $(menu).hasClass(this.hideClass) ) {
            this.show(menu, menu_point);
        }
        else {
            this.hide(menu);
        }
    },
    show: function(menu, menu_point) {
        $(menu).removeClass(this.hideClass).addClass(this.showClass);
        let childHeight = $(menu).children(menu_point)[0].offsetHeight;
        let childCount = $(menu).children().length;
        $(menu).animate({
            height: childHeight * childCount,
        });
    },
    hide: function (menu) {
        $(menu).removeClass(this.showClass).addClass(this.hideClass);
        $(menu).animate({
            height: 0,
        });
    }
};

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