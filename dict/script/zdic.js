/**
 * Created with JetBrains WebStorm.
 * User: Ken
 * Date: 24/06/13
 * Time: 21:19
 * Copyright ©2013 Kenshin Yang.
 */
$(function () {
    $('html').not('content').mouseup(function (e) {
        var word = getSelectedText().trim();
        if (word.length > 0) {
            $('body').append('<div id="search" style="opacity:0.2;position: absolute;display: none"><img id="search_img" src="data:image/gif;base64,R0lGODlhCwAXAIAAAP///8zMzCH5BAEAAAAALAAAAAALABcAAAIkhI+poRfcHkxyukqr1e9yw0lASJbkWIKn+nkY0sJv1kW13TgFADs=" alt="search"></div>')
                .append('<div id="content"><img src="data:image/gif;base64,R0lGODlhPgANAJEAAMzMzJmZmf///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAAPgANAAACX4wvh8At7SB7kkIbpTJp4ykBnxiOZrgFnXJW5evGULoucnbB+c3QtI4LgngkjedHbO2WQoDPAxwypc3RkxUtTrVV1BGazCqbV9t2TE1ze19s+H32spBxeNc4B9f3d0gBACH5BAUKAAIALAAAAAAUAA0AAAImhC+pGe2HlnIPAjlpsBcLvVnep3EjaHqoqJYstkKnK7dUCtNRThUAIfkEBQoAAgAsBwAAABQADQAAAiaEL6kZ7YeWcg8COWmwFwu9Wd6ncSNoeqioliy2Qqcrt1QK01FOFQAh+QQFCgACACwOAAAAFAANAAACJoQvqRnth5ZyDwI5abAXC71Z3qdxI2h6qKiWLLZCpyu3VArTUU4VACH5BAUKAAIALBUAAAAUAA0AAAImhC+pGe2HlnIPAjlpsBcLvVnep3EjaHqoqJYstkKnK7dUCtNRThUAIfkEBQoAAgAsHAAAABQADQAAAiaEL6kZ7YeWcg8COWmwFwu9Wd6ncSNoeqioliy2Qqcrt1QK01FOFQAh+QQFCgACACwjAAAAFAANAAACJoQvqRnth5ZyDwI5abAXC71Z3qdxI2h6qKiWLLZCpyu3VArTUU4VACH5BAUKAAIALCoAAAAUAA0AAAImhC+pGe2HlnIPAjlpsBcLvVnep3EjaHqoqJYstkKnK7dUCtNRThUAIfkEBQoAAgAsKgAAABQADQAAAiaML6kJ7YeWcg8GOSmwFwu9Wd6ncSNoeqioliy2Qqcrt1QK01FOFQAh+QQFCgACACwjAAAAFAANAAACJowvqQnth5ZyDwY5KbAXC71Z3qdxI2h6qKiWLLZCpyu3VArTUU4VACH5BAUKAAIALBwAAAAUAA0AAAImjC+pCe2HlnIPBjkpsBcLvVnep3EjaHqoqJYstkKnK7dUCtNRThUAIfkEBQoAAgAsFQAAABQADQAAAiaML6kJ7YeWcg8GOSmwFwu9Wd6ncSNoeqioliy2Qqcrt1QK01FOFQAh+QQFCgACACwOAAAAFAANAAACJowvqQnth5ZyDwY5KbAXC71Z3qdxI2h6qKiWLLZCpyu3VArTUU4VACH5BAkKAAIALAAAAAA+AA0AAAJElC+hiwgPm5y0zsUmjLZ7iinU9nzmGQYjebZdum7ufIUxR+eJrbF6DuvJfrSghAQgFnlHn7JlbCCfrqjDSf1YD9PspAAAOw==" alt="content" style="margin-left: 104px;margin-top: 77px"/></div>');
            $('#search').css('left', e.pageX + 7).css('top', e.pageY - 7).fadeTo(200, 1.0);
            $('#search_img').mouseover(function () {
                $('#content').fadeTo(100, 1.0).css({'left': e.pageX + 18, 'top': e.pageY - 7}).niceScroll({cursorborderradius: '0px', cursorwidth: "3px", cursorborder: '1px solid #cccccc', cursorcolor: '#cccccc'});
                if (word.length == 1) {
                    dict(word);
                }
                if (word.length > 1) {
                    dicts(word);
                }
                word = "";
            });
        } else {
            $('#search,#content').fadeOut(200, function () {
                $(this).remove();
            });
        }
    });
});

/*查询单个字*/
function dict(word) {
    var key = encodeURIComponent(word);
    $.ajax({
        url: 'http://www.zdic.net/search/?c=3&q=' + key,
        type: 'GET',
        success: function (res) {
            var content = res.responseText;
            var body = content.substring(content.indexOf('基本字义'), content.indexOf('</div>'));
            var css = '<style type="text/css">' + content.substring(content.indexOf('\<!--') + 4, content.indexOf('--\>')) + '</style>';
            var result = '<html><head>' + css + '</head><body><h1>' + word + '</h1><div><div><p><strong>' + body + '</body></html>';
            $('#content').html(result);
        }
    });
}

/*查询词语*/
function dicts(word) {
    var key = encodeURIComponent(word);
    $.ajax({
        url: 'http://www.zdic.net/search/?c=3&q=' + key,
        type: 'GET',
        success: function (res) {
            var content = res.responseText;
            var body = content.substring(content.indexOf('<div class="cdnr">'), content.indexOf('<div class="footer">'));
            var css = '<style type="text/css">' + content.substring(content.indexOf('&lt;!--') + 7, content.indexOf('--&gt;')) + '</style>';
            var result = '<html><head>' + css + '</head><body>' + body + '</body></html>';
            $('#content').html(result);
            if (body == "") {
                $('#content').html('<div style="margin-left: 104px;margin-top: 77px">暂无释义</div>');
            }
        }
    });
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}
