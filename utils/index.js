function collectDataWithPause(stream, emlbuffer, fetchingPauseThreshold, fetchingPauseTime) {
  var saved = 0;
  stream.on('data', function (chunk) {
    saved += chunk.length;
    if (saved > fetchingPauseThreshold) {
      pauseParsing(stream, fetchingPauseTime);
      saved = 0;
    }
    emlbuffer = Buffer.concat([emlbuffer, chunk]);
  });
}

function resumeParsing(stream) {
  return function () {
    stream.resume();
  };
}

function pauseParsing(stream, timeout) {
  stream.pause();
  setTimeout(resumeParsing(stream), timeout || 5000);
}

module.exports = {
  collectDataWithPause: collectDataWithPause,
};

