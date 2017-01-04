$(function() {
    $('.container-games, .container-years').css('margin-top', $('#section-scheduler .title-page').outerHeight(true));
    var list = $('.row-game');
    var heightRow = ($(window).height()-3)/7;
    $('.row-game').height(heightRow);
    $('.row-year').each(function(i,e){
        setYearPosition(i, $(e), true);
    });
    ReorderAfterChangeAndResize();
    $(window).resize(function(){
        ReorderAfterChangeAndResize(true, true);
        $('.row-year').not('.hide').each(function(i, e){
            setYearPosition(i, $(e), true);
        });
    });

    $('.btn-top').click(function(){
        setGamePosition('top');
    });
    $('.btn-bottom').click(function(){
        setGamePosition('bottom');
    });

    $('.select-type').change(function(){
        var typeSelected = $(this).find('select').val();
        if(typeSelected.length) {
            $('.row-game, .row-year').removeClass('hide first-filter');
            $('.select-year li').removeClass('hide');
            $('.row-game').filter(function() {
                if(typeSelected.indexOf($(this).data('typeEvent')) == -1) {
                    return true;
                }
                return false;
            }).addClass('hide');
            $('.row-year').each(function(i, e){
                var rows = $('.row-game.first').eq(i)
                    .add($('.row-game.first').eq(i).nextUntil('.row-game.last'))
                    .add($('.row-game.last').not('.first').eq(i));
                var isHidden = checkGameYearhidden(rows);
                if(isHidden) {
                    $('.select-year').find('li').eq(i+1).addClass('hide');
                    $(e).addClass('hide');
                }
            });
            $('.row-year').not('.hide').each(function(i, e){
                setYearPosition(i, $(e), true);
            });
            if($('.row-year').not('.hide')) {
                selectPositionByTime($('.row-game').not('.hide'));
                setGamePosition('none'); // or set row game closest now date
            }
        }
        else {
            $('.row-game, .row-year').removeClass('hide first-filter');
            $('.select-year li').removeClass('hide');
            $('.row-game').removeAttr('selected');
            $('.row-game[current]').attr('selected', true);
            $('.row-year').each(function(i,e){
                setYearPosition(i, $(e), true);
            });
            setGamePosition('none');
        }
    });

    $('.select-year').change(function(){
        var yearSelected = $(this).find('select').val();
        if(yearSelected.length) {
            var i = $('.row-year').not('.hide').index($('.row-year[data-year='+yearSelected+']'));
            var className = getFilterActive(true);
            $('.row-game').removeAttr('selected');
            setYearPosition(i, $('.container-games, .container-years'), false);
            $('.row-game'+className).eq(i).not('.hide').attr('selected', 'true');
            checkShowOrHideButton(list, $('.row-game[selected]'));
        }
    });

    function setYearPosition(i, e, initPhase) {
        var className = getFilterActive(true);
        var firstGameYear = $('.row-game'+className).eq(i).position();
        var negValue = "";
        if(!initPhase) {
            negValue = "-";
        }
        e.css('top', negValue+firstGameYear.top+'px');
    }

    function setGamePosition(direction) {
        var list = $('.row-game');
        var selected = $('.row-game[selected]');

        var typeSelected = $('.select-type').find('select').val();
        if(typeSelected.length) {
            var list = $('.row-game').filter(function() {
                if(typeSelected.indexOf($(this).data('typeEvent')) == -1) {
                    return false;
                }
                return true;
            });
        }

        if(direction == "top") {
            selected = list.eq(list.index(selected)-1);
        } else if(direction == "bottom") {
            selected = list.eq(list.index(selected)+1);
        }

        if(selected.length) {
            $('.row-game[selected]').removeAttr('selected');
            selected.attr('selected', 'true');
            ReorderAfterChangeAndResize();
        }
        checkShowOrHideButton(list, selected);
    }

    function checkShowOrHideButton(list, selected) {
        if(list.index(selected) == 0) {
            $('.btn-top').addClass('hide');
        } else {
            $('.btn-top').removeClass('hide');
        }
        if(list.index(selected) >= list.length-3) {
            $('.btn-bottom').addClass('hide');
        } else {
            $('.btn-bottom').removeClass('hide');
        }
    }

    function checkGameYearhidden(elements) {
        var isHidden = true;
        $(elements).each(function(k, r){
            if(!$(this).hasClass('hide')){
                if(isHidden == true) {
                    $(r).addClass('first-filter');
                }
                isHidden = false;
                return false;
            }
        });
        return isHidden;
    }

    function getFilterActive(name) {
        typeSelected = $('.select-type').find('select').val();
        if(typeSelected.length) {
            if(name) {
                return '.first-filter';
            }
            return true;
        }
        if(name) {
            return '.first';
        }
        return false;
    }

    function ReorderAfterChangeAndResize(resize) {
        if(resize){
            heightRow = ($(window).height()-3)/7;
            $('.row-game').height(heightRow);
        }
        var current = $('.row-game[selected]').position();
        $('.container-games, .container-years').css('top', "-"+current.top+"px");
    }

    function selectPositionByTime(list) {
        var now = new Date();
        var today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,0,0).getTime();
        var timestamp = Math.round(today/1000);
        var currentItem = '';
        list.each(function(i, e){
            var previousItem = currentItem;
            currentItem = $(e);
            if(previousItem.length && previousItem.data('kickoffDate') < timestamp && $(e).data('kickoffDate') > timestamp) {
                return false;
            }
        });
        $('.row-game[selected]').removeAttr('selected');
        currentItem.attr('selected', 'true');
        ReorderAfterChangeAndResize(false);
    }
});