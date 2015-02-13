# deliteful-StarRating-build

Build version of [ibm-js/deliteful/StarRating](https://github.com/ibm-js/deliteful/StarRating).

## Status

No official release yet.

## Installation

_Bower_ release installation:

    $ bower install "https://github.com/edchat/deliteful-StarRating-build.git"

In the future (after it is published) it will be:

    $ bower install deliteful-StarRating-build


## How to use

To load the minified layer you need to wrap your main `require` call with another `require`, requiring `"deliteful-StarRating-build/layer"`. Then you should continue to
refer to modules with `"deliteful/StarRating"`.

For example, this code:
```js
require(["app/main", "deliteful/StarRating"], function() {
	...
});
```
Becomes:
```js
require(["deliteful-StarRating-build/layer"], function() {
	require(["app/main", "deliteful/StarRating"], function() {
		...
	});
});
```

Or you can load the "deliteful-StarRating-build/layer" with a script tag, and without the extra require for `"deliteful-StarRating-build/layer"`
```
<script src="bower_components/deliteful-StarRating-build/layer.js"></script>
```

## Licensing

This project is distributed by the Dojo Foundation and licensed under the ["New" BSD License](./LICENSE).
All contributions require a [Dojo Foundation CLA](http://dojofoundation.org/about/claForm).
