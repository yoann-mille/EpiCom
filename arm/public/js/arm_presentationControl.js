var socket = io.connect();

socket.on('play', function (filec) {
    document.location.href = '/' + file + 'name?' + file;
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
