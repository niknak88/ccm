$(document).ready(function () {
    // Active section full page, with navigation slide.
    $('#fullpage').fullpage({
        verticalCentered: false,
        menu: '#menu',
        anchors: ['section01', 'section11', 'section21', 'section31'],
        css3: false,
        afterRender: function(){
            $('#logo').loadgo({
                'opacity':    0.8,
                'animated':   true,
                'bgcolor':    '#231F20',
                'direction': 'lr',
                'image' : 'assets/images/logo-loader.png',
            });
            $('header').animate({'opacity' : 0});
            $('.logo-league').animate({'opacity' : 0});
            $('.scroll-down').animate({'opacity' : 0});
            var p = 0;
            window.setTimeout(function () {
                interval = window.setInterval(function (){
                    if ($('#logo').loadgo('getprogress') == 100) {
                        window.clearInterval(interval);
                        $('#logo-loader').animate({'opacity' : 0, "z-index" : 0}, '500', function(){
                            $('header').delay('300').animate({'opacity' : 1});
                            $('.logo-league').delay('600').animate({'opacity' : 1});
                            $('.scroll-down').delay('800').animate({'opacity' : 1});
                        });
                    }
                    else {
                        var prog = p*10;
                        $('#logo').loadgo('setprogress', prog);
                        // $('#demo-progress-' + index).html(prog + '%');
                        p++;
                    }
                }, 150);
            }, 300);
        }
    });
    
    // Button for show and hide sidebar menu.
    $('#nav-icon3').click(function(e){
        e.preventDefault();
        if($(this).hasClass('open')) {
            $(this).css('left', '').removeClass('open');
            $('nav').removeClass("open");
        }
        else {
            $(this).css('left', $('nav').width()).addClass('open');
            $('nav').addClass("open");
        }
        
    });
});
