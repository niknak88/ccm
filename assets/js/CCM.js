$(document).ready(function () {
    
    // Active section full page, with navigation slide.
    $('#fullpage').fullpage({
        verticalCentered: false,
        menu: '#menu',
        anchors: ['section01', 'section11', 'section21', 'section31'],
        css3: false
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
