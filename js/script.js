var sounds = [];

function init() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    bufferLoader = new BufferLoader(
        context,
        [
          'media/sample1.mp3'
        ],
        finishedLoading
      );

    bufferLoader.load();
}

function finishedLoading(bufferList) {
    sounds = bufferList;
}

function playSound(number) {
    var source = context.createBufferSource();
    source.buffer = sounds[number];
    source.connect(context.destination);
    source.start(0);
}

$('.pad').mousedown(function() {
    $(this).addClass('pressed');
    playSound(0);
});

$('html').mouseup(function() {
    $('.pad').removeClass('pressed');
});

init();
