$(document).ready(function () {
    // Active section full page, with navigation slide.
    $('#fullpage').fullpage({
        verticalCentered: false,
        menu: '#menu',
        anchors: ['section01', 'section11', 'section21', 'section31'],
        css3: false,
        onLeave: function(index, nextIndex, direction) {
            $('#slide-out').find('.active').removeClass('active');
            $('#slide-out li').eq(nextIndex).addClass('active').find('a').addClass('active');
        },
        // afterRender: function(){
        //     $('#logo').loadgo({
        //         'opacity':    1,
        //         'animated':   true,
        //         'bgcolor':    '#231F20',
        //         'direction': 'lr',
        //         'image' : 'assets/images/logo-loader.png',
        //     });
        //     $('header').animate({'opacity' : 0});
        //     $('.logo-league').animate({'opacity' : 0});
        //     $('.scroll-down').animate({'opacity' : 0});
        //     var p = 0;
        //     window.setTimeout(function () {
        //         interval = window.setInterval(function (){
        //             if ($('#logo').loadgo('getprogress') == 100) {
        //                 window.clearInterval(interval);
        //                 $('#logo-loader').animate({'opacity' : 0, "z-index" : 0}, '500', function(){
        //                     $('header').delay('300').animate({'opacity' : 1});
        //                     $('.logo-league').delay('600').animate({'opacity' : 1});
        //                     $('.scroll-down').delay('800').animate({'opacity' : 1});
        //                 });
        //             }
        //             else {
        //                 var prog = p*10;
        //                 $('#logo').loadgo('setprogress', prog);
        //                 // $('#demo-progress-' + index).html(prog + '%');
        //                 p++;
        //             }
        //         }, 150);
        //     }, 300);
        // }
    });

    // Button for show and hide sidebar menu.
    $('#nav-icon3').sideNav();
    var eventCount = 0; //event counter
    $('#slide-out').attrchange({
        trackValues: true,
        /* enables tracking old and new values */
        callback: function (e) { //callback handler on DOM changes
            var transform = $(this).css('transform').split(',')[4];
            if (transform > -50) {
                //ouvert
                $(this).css('left', '0');
                $('#nav-icon3').addClass('open');
            } else {
                // fermé
                $(this).css('left', '6px');
                $('#nav-icon3').removeClass('open');
            }
            $('#nav-icon3').css('left', parseInt(transform)+300);
        }
    }).css('left', '6px');
    $('#nav-icon3').css('left', '').removeClass('open');

    // scrollbar inside content per section
    $(window).on("load", function () {
        $(".half-large").mCustomScrollbar({
            axis: 'y',
            setTop: 50,
            setHeight: $(window).height(),
            autoHideScrollbar: true,
            alwaysShowScrollbar: 1,
            mouseWheel: {enable: true},
            //theme: 'dark',
        });
    });
});
