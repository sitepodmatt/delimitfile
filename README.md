delimitfile
======

Simple stream wrapper to handle delimited text based files.

\n is default delimiter, also as with standard split a regex 
object can be passed as delimiter (take care with escaping though). 

example
=======

``` js
var lineStream = require('delimitfile')('story.txt','\n');

lineStream.on('data',function (line) {
  console.log(line);
});
```

install
=======

cd <projectdirc>
npm install --save delimitfile

license
=======
mit

author
=======
[Twitter - @nonuby](http://www.twitter.com/nonuby) 

