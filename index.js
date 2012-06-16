var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

module.exports = function(filePath, delimiter, options) {

  options = options || {};
  options.encoding = options.encoding || 'utf8';

  if(options.encoding === 'binary')
    throw new Error('binary is not yet supported');

  delimiter = delimiter || '\n';

  var delimitEmitter = new DelimitEmitter(filePath, delimiter, options);
  delimitEmitter.start();
  return delimitEmitter;
};

function DelimitEmitter(filePath, delimiter, opts) {
  this.encoding = opts.encoding;
  this.filePath = filePath;
  this.delimiter = delimiter;
}

DelimitEmitter.prototype = new EventEmitter();

DelimitEmitter.prototype.start = function() {

  var self = this;

  var rs = fs.createReadStream(self.filePath, { 
    encoding: this.encoding,
    flags: 'r' });
  
  var lastLine = '';

  rs.on('data', function(data)  {
    data = lastLine + data;
    var dataParts = data.split(self.delimiter);
    lastLine = dataParts[dataParts.length - 1];
    dataParts = dataParts.slice(0,dataParts.length - 1);
    dataParts.forEach(function(part) {
      self.emit('data',part);
    });
  });

  rs.on('error',function(err) {
    self.emit('error', err);
  });

  rs.on('end', function() {
    if(lastLine !== '') self.emit('data',lastLine);
    self.emit('end');
  });
};

