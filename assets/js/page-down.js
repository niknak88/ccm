// Tween Greensock code
// Call to action for page down in heading page.

$(document).ready(function () {

    // animation for the text with tween greensock
    var text = $('.scroll-down-title span');
    var tl_text = new TimelineMax().repeat(-1);
    tl_text.to(text, 0.5, {y: "0%", ease: Power1.easeIn}).to(text, 0, {
        delay: 0.5,
        ease: Power1.easeIn
    }).to(text, 0.5, {y: "150%", delay: 1, ease: Power1.easeIn}, 'hoverTime');

    // animation for the line with tween greensock
    var line = $('.scroll-down-streak span');
    var tl_fill = new TimelineMax().repeat(-1);
    tl_fill.to(line, 0.5, {marginTop: 0, ease: Power1.easeIn, delay: 0.5}).to(line, 0.7, {
        marginTop: '200px',
        delay: 0.8,
        ease: Power1.easeIn
    }, 'hoverTime');

    // Event for stop animation in label step.
    var hoverText = new TimelineMax();
    var extra_tl = new TimelineMax();
    $('.scroll-down').mouseenter(function () {
        tl_text.tweenTo('hoverTime');
        tl_fill.tweenTo('hoverTime');
        hoverText.to(text, 0.5, {opacity: 0, delay: 3, onComplete: extra_anim});
    }).mouseleave(function () {
        extra_tl.seek(0).remove().invalidate().kill();
        hoverText.remove();
        hoverText.to(text, 0.5, {opacity: 1, onComplete: playAnimation});
    });

    function playAnimation() {
        extra_tl.seek(0).remove().invalidate().kill();
        tl_text.play();
        tl_fill.play();
    }

    // extra animation during hover.
    function extra_anim() {
        extra_tl = new TimelineMax();
        var extra = $('.hover-animation-text');
        var count = extra.find('li').length;
        extra_tl.seek(0).remove().invalidate().kill();
        $(extra).find('li').each(function (i) {
            extra_tl.to(extra, 0.3, {
                y: "-" + Math.round(100 / count) * (i + 1) + "%",
                delay: 0.1,
                ease: Power2.easeOut
            });
        });
        if (!tl_text.isActive() && !hoverText.isActive()) {
            extra_tl.eventCallback('onComplete', extra_tl_complete);
        }
        else {
            extra_tl.seek(0).remove().invalidate().kill();
        }
    }

    function extra_tl_complete() {
        extra_tl.seek(0).remove().invalidate().kill();
        $('#fullpage').fullpage.moveSectionDown();
    }


});