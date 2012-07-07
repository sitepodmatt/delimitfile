delimitfile
======

Simple node.js stream wrapper to handle reading delimited text based files in streaming fashion.

\n is default delimiter, a regex instance can be passed as delimiter (take care with escaping though). 

example
=======

``` js
var lineStream = require('delimitfile')('story.txt','\n');

lineStream.on('data',function (line) {
  console.log(line);
});

lineStream.on('end',function () {
  console.log('all done');
});
```

install
=======

cd <projectdir>  
npm install --save delimitfile

license
=======
The MIT License

author
=======
[Twitter - @nonuby](http://www.twitter.com/nonuby) 
[Nonuby Blog](http://blog.nonuby.com/) 

