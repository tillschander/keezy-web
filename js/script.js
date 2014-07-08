$('.pad').mousedown(function() {
    $(this).addClass('pressed');
});

$('html').mouseup(function() {
    $('.pad').removeClass('pressed');
});
