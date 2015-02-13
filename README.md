# deliteful-StarRating-build

Build version of [ibm-js/deliteful/StarRating](https://github.com/ibm-js/deliteful/StarRating).

## Status

No official release yet.

## Installation

_Bower_ release installation:

    $ bower install deliteful-StarRating-build

_Manual_ master installation:

    $ git clone git://github.com/ibm-js/deliteful-StarRating-build.git

Then install dependencies with bower (or manually from github if you prefer to):

	$ cd deliteful-StarRating-build
	$ bower install


## How to use

To load the minified layer you need to wrap your main `require` call with another `require`, requiring `"deliteful-StarRating-build/layer"`. Then you should continue to
refer to modules with `"deliteful/foo"`.

For example, this code:
```js
require(["app/main", "deliteful/foo"], function() {
	...
});
```
Becomes:
```js
require(["deliteful-StarRating-build/layer"], function() {
	require(["app/main", "deliteful/foo"], function() {
		...
	});
});
```

## Licensing

This project is distributed by the Dojo Foundation and licensed under the ["New" BSD License](./LICENSE).
All contributions require a [Dojo Foundation CLA](http://dojofoundation.org/about/claForm).
