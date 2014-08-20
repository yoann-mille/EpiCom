var socket = io.connect();

socket.on('play', function (file) {
    console.log(file);
    document.location.href = '/' + file + '?name=' + file;
});

socket.on('pause', function () {
    Reveal.togglePause();
    console.log('pause');
});

socket.on('unpause', function () {
    console.log('unpause');
    if (Reveal.isPaused())
	Reveal.togglePause();
});

socket.on('stop', function () {
    console.log('quit');
    document.location.href = '/';
});

socket.on('playURL', function (url) {
    console.log('playURL');
    document.location.href = '/playURL?playURL=' + url;
});