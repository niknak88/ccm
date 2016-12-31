$(document).ready(function () {

    // Detect Subsection anchor and goto
    //console.log(document.URL);

    // Change share icon size.
    $(window).resize(function () {
        if ($(document).width() < 602) {
            $('.share .hb').each(function () {
                $(this).removeClass('hb-sm').addClass('hb-xs').closest('a').removeClass('hb-sm-margin').addClass('hb-xs-margin');
            });
        } else {
            $('.share .hb').each(function () {
                $(this).removeClass('hb-xs').addClass('hb-sm').closest('a').removeClass('hb-xs-margin').addClass('hb-sm-margin');
            });
        }
    });

    // Active section full page, with navigation slide.
    $('#fullpage').fullpage({
        verticalCentered: false,
        menu: '#menu',
        anchors: ['home', 'about', 'scheduler', 'standing', 'roster', 'training', 'contact'],
        css3: false,
        loopHorizontal: false,
        onLeave: function (index, nextIndex, direction) {
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
            $('#nav-icon3').css('left', parseInt(transform) + 300);
        }
    }).css('left', '6px').find('a').click(function () {
        setTimeout(function () {
            $('#nav-icon3').trigger("click");
        }, 250);
    });
    $('#nav-icon3').css('left', '').removeClass('open');

    // Active select js with materialize js
    $('select').material_select();

    // Change sub-section inside Fullpage section.
    $('.title-left a').click(function (e) {
        e.preventDefault();
        var wrap = $(this).closest('.row');
        wrap.find('.info-text-inside')
        //.fadeTo(200, 0)
            .hide(500)
            .removeClass('hide')
            .eq($(this).index())
            .show(800);
        //.fadeTo(200, 1);
        wrap.find('.title-left a').removeClass('active');
        $(this).addClass('active');
        //window.location.hash = $(this).attr('href');
    });

    // scrollbar inside content per section
    $(window).on("load", function () {
        // For section like "About" or "Try-out"
        $(".title-left").height($(window).height()).each(function(){
            $(this).closest('.row').find('.info-text-inside:not(:first)').hide();
        }).find('a').each(function () {
            var titleLeftChildHeight = 100 / $(this).parent().children().length;
            $(this).height(titleLeftChildHeight + "%");
        });

        // For section "Contact"
        $('#map').height($(window).height() - $('.carrousel-sponsors').outerHeight() + "px");

        // For each section requiring a scroll bar
        $(".half-large:not('.fixed')").mCustomScrollbar({
            axis: 'y',
            setTop: 50,
            setHeight: $(window).height(),
            autoHideScrollbar: true,
            alwaysShowScrollbar: 1,
            mouseWheel: {enable: true},
            //theme: 'dark',
        });
    });

    // Section Roster
    $('#section-roster .half-large').css('left', 0);
    $('.col.itemList').click(function () {
        $('.itemList').removeClass('active');
        $(this).addClass('active');
        $('.half-large').addClass('m8 push-m4 l6 push-l6 half-panel').removeClass('only-list').css('left', '');
        $('.half-panel-profile').addClass('open');
        $('#section-roster h1').removeClass('anim-title-reset').addClass('anim-title');
    });

    $("a#close-panel-profile").on("click", function (e) {
        e.preventDefault();
        $('.half-large').removeClass('m8 push-m4 l6 push-l6 half-panel').css('left', 0);
        $('.half-panel-profile').removeClass('open');
        $('.itemList').removeClass('active');
        $('#section-roster h1').removeClass('anim-title').addClass('anim-title-reset');
    });

    // Carousel sponsors
    var width_true = 1;
    var boucle = 1;
    while (width_true <= $(window).width()) {
        $(".scroller ul").find('li').each(function (i) {
            width_true += $(this, i).outerWidth(true);
        });
        boucle++;
    }
    var new_li = new Array();
    for (var i = 1; i < boucle; i++) {
        new_li.push($(".scroller ul").html());
    }
    for (var j = 0; j < new_li.length; j++) {
        $(".scroller ul").append(new_li[j]);
    }
    $(".scroller ul").endlessScroll({width: '100%', height: '100px', steps: -2, speed: 50, mousestop: true});

    // Shop
    $('.cta-shop a').click(function(e){
        e.preventDefault();
        $('.shop-panel').toggleClass('open');
    })
});
