var touchstartOrMousedown = (('ontouchstart' in window)) ? 'touchstart' : 'mousedown';
var touchendOrMouseup = (('ontouchend' in window)) ? 'touchend' : 'mouseup';
var sounds = [];
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var circleTimeoutID;
var bufferLoader = new BufferLoader(
    context,
    [
      'media/1.wav',
      'media/2.wav',
      'media/3.wav',
      'media/4.wav',
      'media/5.wav',
      'media/6.wav',
      'media/7.wav',
      'media/8.wav',
    ],
    finishedLoading
  );

bufferLoader.load();

function finishedLoading(bufferList) {
    sounds = bufferList;
}

function playSound(number) {
    var source = context.createBufferSource();
    source.buffer = sounds[number];
    source.connect(context.destination);
    source.start(0);
}

function hideCircle() {
    if(circleTimeoutID !== undefined) {
        window.clearTimeout(circleTimeoutID);
    }
    circleTimeoutID = window.setTimeout(showCircle, 1500);
    $('.circle-wrap').addClass('hidden');
}

function showCircle() {
    window.clearTimeout(circleTimeoutID);
    $('.circle-wrap').removeClass('hidden');
}

$('.pad').on(touchstartOrMousedown, function() {
    $(this).addClass('pressed');
    hideCircle();
    playSound($(this).index());
});

$('html').on(touchendOrMouseup, function() {
    $('.pad').removeClass('pressed');
});

$('.circle-wrap').on(touchstartOrMousedown, function() {
    $(this).toggleClass('active');
});
