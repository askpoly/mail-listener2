function collectDataWithPause(stream, emlbuffer, fetchingPauseThreshold, fetchingPauseTime, debug) {
  var saved = 0;
  stream.on('data', function (chunk) {
    saved += chunk.length;
    if (saved > fetchingPauseThreshold) {
      debug('calling pause parsing. Processed:' + emlbuffer.length);
      pauseParsing(stream, fetchingPauseTime, debug);
      saved = 0;
    }
    emlbuffer = Buffer.concat([emlbuffer, chunk]);
  });
}

function resumeParsing(stream, debug) {
  return function () {
    debug('resuming parsing');
    stream.resume();
  };
}

function pauseParsing(stream, timeout, debug) {
  debug('pausing parsing for ' + timeout + ' ms');
  stream.pause();
  setTimeout(resumeParsing(stream, debug), timeout || 5000);
}

module.exports = {
  collectDataWithPause: collectDataWithPause,
};

