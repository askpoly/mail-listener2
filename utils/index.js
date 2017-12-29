function collectDataWithPause(stream, fetchingPauseThreshold, fetchingPauseTime, debug, cb) {
  var saved = 0;
  var processed = 0;
  stream.on('data', function (chunk) {
    saved += chunk.length;
    processed += chunk.length;
    if (saved > fetchingPauseThreshold) {
      debug('calling pause parsing. Processed: ' + processed);
      pauseParsing(stream, fetchingPauseTime, debug);
      saved = 0;
    }
    cb(chunk);
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

