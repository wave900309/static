/**
 * Created with JetBrains WebStorm.
 * User: Ken
 * Date: 22/06/13
 * Time: 19:04
 * Copyright ©2013 Kenshin Yang.
 */

$(function () {
    $('.navi_sub').click(function () {
        var name = $(this).eq(0).attr('id');
        $.get(name + '.html', function (data) {
            $('#frame').html(data);
        });
        $('#frame').fadeTo(0, 0).fadeTo(600, 1.0);
        $('html,body').animate({scrollTop: 0}, 0);
        $('.navi_sub').not('#' + name).animate({'left': '0'}, 400);
        $('#' + name).animate({'left': '-15'}, 400);
    });

    $(window).load(function () {
        $.get('diya.html', function (data) {
            $('#frame').html(data);
        });
        $('#diya').animate({'left': '-15'}, 0);
    });

    $(document).ready(function () {
        $('html').niceScroll({cursorborderradius: '2px', cursorborder: '1px solid #666', cursorcolor: '#555'});
    });

    $('.link_sub').click(function () {
        var name = $(this).eq(0).attr('id');
        if (name == 'character') {
            name = 'diya';
            $('.navi').show();
            $('.navi_sub').not('#' + name).animate({'left': '0'}, 400);
            $('#' + name).animate({'left': '-15'}, 400);
        } else {
            $('.navi').hide();
        }
        $.get(name + '.html', function (data) {
            $('#frame').html(data);
        });
        $('#frame').fadeTo(0, 0).fadeTo(600, 1.0);
        $('html,body').animate({scrollTop: 0}, 0);
    })
});
