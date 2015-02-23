require.config({"config":{"delite/theme":{"layersMap":{"delite/themes/{{theme}}/common.css":"deliteful-StarRating-build/themes/layer_{{theme}}.css","delite/themes/{{theme}}/global.css":"deliteful-StarRating-build/themes/layer_{{theme}}.css","deliteful/StarRating/themes/{{theme}}/StarRating.css":"deliteful-StarRating-build/themes/layer_{{theme}}.css","deliteful/StarRating/themes/{{theme}}/StarRating_rtl.css":"deliteful-StarRating-build/themes/layer_{{theme}}.css"}}}});require.config({"config":{"requirejs-dplugins/i18n":{"bundlesMap":{"deliteful-StarRating-build/nls/layer":["deliteful/StarRating/nls/StarRating"]},"localesMap":{"deliteful-StarRating-build/nls/layer":["root"]}}}});
define("delite/theme",["require","requirejs-dplugins/has","module","requirejs-dplugins/css"],function(a,b,c,d){"use strict";var e=c.config(),f={themeMap:e.themeMap||[[/.*/,"bootstrap"]],getTheme:function(){var a=f.theme||e.theme;if(!a){var b=location.search.match(/theme=(\w+)/);a=b&&b.length>1?b[1]:null}if(!a)for(var c=e.userAgent||(location.search.match(/ua=(\w+)/)?RegExp.$1:navigator.userAgent),d=this.themeMap,g=0;g<d.length;g++)if(d[g][0].test(c)){a=d[g][1];break}return f.theme=a,a},load:function(g,i,j){e=c.config();var k=c.id.replace(/\/.*/,"")+"/themes/{{theme}}/common.css",l=g?[k,g]:[k];if(b("builder"))return l.forEach(function(a){d.buildFunctions.addOnce(h,a)}),void j();e.layersMap&&(l=l.map(function(a){return e.layersMap[a]||a}));var m=l.map(function(a){return d.id+"!"+a.replace(/{{theme}}/,f.getTheme())});a(m,function(){j(arguments)})}};if(b("builder")){var g,h=[];f.writeFile=function(a,b,c,d){g=d},f.onLayerEnd=function(a,b){function e(a){var c=/^(?:\.\/)?(([^\/]*\/)*)[^\/]*$/;return b.path.replace(c,"$1themes/layer_"+(a||"{{theme}}")+".css")}if(b.name&&b.path){var i=f.themeMap.map(function(a){var b=a[1],c=e(b),f=h.map(function(a){return a.replace(/{{theme}}/g,b)});return d.buildFunctions.writeLayer(g,c,f)}).every(function(a){return a}),j=b.name.replace(/^(([^\/]*\/)*)[^\/]*$/,"$1themes/layer_{{theme}}.css");i&&d.buildFunctions.writeConfig(a,c.id,j,h),h=[]}}}return f}),define("deliteful/StarRating",["requirejs-dplugins/has","dpointer/events","dojo/keys","dojo/dom-class","delite/register","delite/FormValueWidget","requirejs-dplugins/has!bidi?./StarRating/bidi/StarRating","requirejs-dplugins/i18n!./StarRating/nls/StarRating","delite/uacss","delite/theme!./StarRating/themes/{{theme}}/StarRating.css","requirejs-dplugins/has!bidi?delite/theme!./StarRating/themes/{{theme}}/StarRating_rtl.css"],function(a,b,c,d,e,f,g,h){var i=e.dcl([f],{baseClass:"d-star-rating",max:5,value:0,editHalfValues:!1,allowZero:!0,_hovering:!1,_otherEventsHandles:[],_incrementKeyCodes:[c.RIGHT_ARROW,c.UP_ARROW,c.NUMPAD_PLUS],_decrementKeyCodes:[c.LEFT_ARROW,c.DOWN_ARROW,c.NUMPAD_MINUS],render:function(){this.focusNode=this.ownerDocument.createElement("div"),this.appendChild(this.focusNode),b.setTouchAction(this,"none"),this.focusNode.setAttribute("role","slider"),this.focusNode.setAttribute("aria-valuemin",0)},createdCallback:e.after(function(){var a=this.getElementsByTagName("INPUT");a.length?(this.valueNode=a[0],isNaN(parseFloat(this.valueNode.value))||(this.value=this.valueNode.value),this.valueNode.style.display="none"):(this.valueNode=this.ownerDocument.createElement("input"),this.valueNode.style.display="none",this.appendChild(this.valueNode)),["disabled","max","value","name","readOnly","allowZero"].forEach(function(a){this.notifyCurrentValue(a)},this)}),refreshRendering:function(a){"disabled"in a&&d.toggle(this,this.baseClass+"-disabled",this.disabled),"max"in a&&this.focusNode.setAttribute("aria-valuemax",this.max),("max"in a||"value"in a)&&this._refreshStarsRendering(),"value"in a&&(this.focusNode.setAttribute("aria-valuenow",this.value),this.focusNode.setAttribute("aria-valuetext",h["aria-valuetext"].replace("${value}",this.value)),this.valueNode.value=this.value),"name"in a&&this.name&&(this.valueNode.name=this.name),("readOnly"in a||"disabled"in a)&&this._refreshEditionEventHandlers(),("readOnly"in a||"disabled"in a||"allowZero"in a)&&this._updateZeroArea()},_refreshStarsRendering:function(){var a=this.focusNode.children.length-1!==2*this.max;a&&(this.focusNode.innerHTML=""),this._updateStars(this.value,a)},_refreshEditionEventHandlers:function(){var a=this.disabled||this.readOnly;if(a||this._keyDownHandle?a&&this._keyDownHandle&&(this._keyDownHandle.remove(),this._keyDownHandle=null):this._keyDownHandle=this.on("keydown",this._keyDownHandler.bind(this)),a||this._startHandles){if(a&&this._startHandles){for(;this._startHandles.length;)this._startHandles.pop().remove();this._startHandles=null}}else this._startHandles=[this.on("pointerover",this._pointerOverHandler.bind(this)),this.on("pointerdown",this._wireHandlers.bind(this))]},_removeEventsHandlers:function(){for(;this._otherEventsHandles.length;)this._otherEventsHandles.pop().remove()},_wireHandlers:function(){this._otherEventsHandles.length||(this._otherEventsHandles.push(this.on("pointerup",this._pointerUpHandler.bind(this))),this._otherEventsHandles.push(this.on("pointerleave",this._pointerLeaveHandler.bind(this))),this._otherEventsHandles.push(this.on("pointercancel",this._pointerLeaveHandler.bind(this))))},_pointerOverHandler:function(a){this._wireHandlers(),this._hovering||"mouse"!==a.pointerType||(this._hovering=!0,d.add(this,this.baseClass+"-hovered"));var b=a.target.value;void 0!==b&&(this._hovering?b!==this._hoveredValue&&(d.add(this,this.baseClass+"-hovered"),this._updateStars(b,!1),this._hoveredValue=b):(this._previousOnChangeValue=this.value,this.handleOnChange(b)))},_pointerUpHandler:function(a){var b=a.target.value;void 0!==b&&this.handleOnChange(b),this._hovering?d.remove(this,this.baseClass+"-hovered"):this._removeEventsHandlers()},_pointerLeaveHandler:function(){this._hovering&&(this._hovering=!1,this._hoveredValue=null,d.remove(this,this.baseClass+"-hovered"),this._updateStars(this.value,!1)),this._removeEventsHandlers()},_keyDownHandler:function(a){-1!==this._incrementKeyCodes.indexOf(a.keyCode)?(a.preventDefault(),this._incrementValue()):-1!==this._decrementKeyCodes.indexOf(a.keyCode)&&(a.preventDefault(),this._decrementValue())},_incrementValue:function(){this.value<this.max&&(this.value=this.value+(this.editHalfValues?.5:1))},_decrementValue:function(){this.value>(this.allowZero?0:this.editHalfValues?.5:1)&&(this.value=this.value-(this.editHalfValues?.5:1))},_updateStars:function(a,b){var c=this.focusNode.querySelectorAll("div");b&&(this._zeroSettingArea=this.ownerDocument.createElement("div"),this._zeroSettingArea.className=this.baseClass+"-zero",this._zeroSettingArea.value=0,this.focusNode.appendChild(this._zeroSettingArea),this._updateZeroArea());for(var d=0;d<2*this.max;d++){var e=this.baseClass+(d%2?"-end ":"-start ");if(e+=a>=.5*(d+1)?this.baseClass+"-full":this.baseClass+"-empty",b){var f=this.ownerDocument.createElement("div");f.value=this.editHalfValues?(d+1)/2:Math.ceil((d+1)/2),this.focusNode.appendChild(f)}else f=c[d+1];f.className=this.baseClass+"-star-icon "+e}},_updateZeroArea:function(){this.readOnly||!this.allowZero?(d.add(this._zeroSettingArea,"d-hidden"),delete this.focusNode.value):(d.remove(this._zeroSettingArea,"d-hidden"),this.focusNode.value=0)}});return e("d-star-rating",a("bidi")?[HTMLElement,i,g]:[HTMLElement,i])}),define("deliteful/StarRating/bidi/StarRating",["dcl/dcl","dojo/keys"],function(a,b){return a(null,{attachedCallback:function(){this.isLeftToRight()||(this._incrementKeyCodes=[b.LEFT_ARROW,b.UP_ARROW,b.NUMPAD_PLUS],this._decrementKeyCodes=[b.RIGHT_ARROW,b.DOWN_ARROW,b.NUMPAD_MINUS])}})}),define("requirejs-dplugins/i18n",["./i18n/common","./i18n/build","module"],function(a,b,c){var d,e,f=a.mixin,g=a.eachProp,h=a.parseName,i=a.getMasterMid,j=function(a){var b={};return g(a,function(a,c){c.forEach(function(c){b[c]=a})}),b},k=function(a,b){var c={};return a._pseudoRoot&&(c[b]={},f(c,a._pseudoRoot),delete a._pseudoRoot,f(c[b],a),a=c),a},l=function(b,c,d){var e=i(b);c([e],function(e){var g=function(b,h,i,j){var k=function(c){f(j,c),i=a.getParentLocale(i),!c._flattened&&i?g(b,h,i,j):(j._flattened=!0,d(j))};e[i]===!0||1===e[i]?c([b+i+"/"+h],k):k(e[i]||{})};e=k(e,b.masterLocale),g(b.prefix,b.suffix,b.requestedLocale,{})})},m=function(a,b,c,d,e,f){for(var g=a.requestedLocale,h=c.localesMap[b];g&&h.indexOf(g)<0;)g=d(g);g?(a.masterLocale=g,e([b+"_"+g],function(){o(a,c,e,f)})):(console.log("i18n: no relevant layer "+b+" found for locale "+a.requestedLocale+"."),f())},n=function(a,b,c,d,e,f){var g=function(h){h?e(["maybe!"+b+"_"+h],function(b){b?(a.masterLocale=h,o(a,c,e,f)):g(d(h))}):(console.log("i18n: no relevant layer "+b+" found for locale "+a.requestedLocale+"."),f())};g(a.requestedLocale)},o=function(a,b,c,d){var e=i(a);a.requestedLocale===a.masterLocale||b.layerOnly||!b.enhanceLayer?c([e],function(a){a.root&&(a=a.root),d(a)}):l(a,c,d)};return{load:function(b,e,g,k){if(!b)return void g();k=k||{};var o,p,q={};return f(q,"function"==typeof c.config?c.config()||{}:{}),k.isBuild?(d=q.localesList,void g()):(q.enhanceLayer=void 0===q.enhanceLayer?!0:q.enhanceLayer,b=h(b),b.requestedLocale=b.requestedLocale||a.getLocale(q.locale||k.locale),o=i(b),q.bundlesMap?(q.bundlesMap=j(q.bundlesMap),p=q.bundlesMap[o],!p&&q.layerOnly?(console.log("i18n: module "+o+" not found in layer."),void g()):p?q.languagePack?void n(b,p,q,a.getParentLocale,e,g):void m(b,p,q,a.getParentLocale,e,g):void l(b,e,g)):void l(b,e,g))},write:function(a,c,d){var e,f=h(c);f.requestedLocale?(e=b.resolveSync(f.requestedLocale,f),"root"!==f.requestedLocale&&(e._pseudoRoot={},e._flattened=!0),d.asModule(a+"!"+c,"define("+JSON.stringify(e)+")")):b.addBundleToNlsLayer(f)},writeFile:function(a,b,c,d){e=d},onLayerEnd:function(a,f){if(f.name&&f.path){var g;b.setLocalesList(d),g=b.getLayersContent(),b.writeLayers(g,f,e),b.writeConfig(c.id,f,a)}b.reset()}}}),define("requirejs-dplugins/i18n/build",["./common"],function(a){var b,c,d=[],e=a.mixin,f=a.eachProp,g=a.getMasterMid,h=function(a){var b;return c||(b=a.name.match(/^(.*\/)?(.*)$/),c=(b[1]||"")+"nls/"+b[2]),c},i=function(a,b){var c=a.path.match(/^(.*\/)?(.*)\.js$/);return(c[1]||"")+"nls/"+c[2]+"_"+b+".js"},j=function(){return b=[],d.forEach(function(a){var c=require(g(a));f(c,function(a){c[a]&&b.indexOf(a)<0&&b.push(a)})}),b},k=function(a,b){return a.root=a.root===!0||1===a.root?require(b.prefix+"root/"+b.suffix):a.root,a},l=function(b){var c={};return f(b,function(b){for(var d=a.getParentLocale(b);d&&"root"!==d;)c[d]=c[d]||{},c[d][b]=!0,d=a.getParentLocale(d)}),c},m=function(b,c,d){var f,h=b,i={};if(2===arguments.length&&(d=k(require(g(c)),c)),"root"!==h){for(;h&&"root"!==h;)d[h]&&(f=require(c.prefix+h+"/"+c.suffix),e(i,f)),h=a.getParentLocale(h);f=d.root,e(i,f)}else e(i,d);return i};return{addBundleToNlsLayer:function(a){d.push(a)},setLocalesList:function(a){b=a?a.slice():j(),b.indexOf("root")<0&&b.push("root")},reset:function(){d=[],b=void 0,c=void 0},getLayersContent:function(){var a={};return d.forEach(function(c){var d=k(require(g(c)),c),e=l(d);b.forEach(function(b){var f=m(b,c,d);a[b]=a[b]||"";var g;"root"!==b?(g=c.prefix+b+"/"+c.suffix,f._flattened=!0,f._pseudoRoot=e[b]||{}):g=c.prefix+c.suffix,a[b]+='define("'+g+'",'+JSON.stringify(f)+");"})}),a},writeLayers:function(a,b,c){f(a,function(a,d){d+="define('"+h(b)+"_"+a+"', true);",c(i(b,a),d)})},writeConfig:function(a,c,e){var f=d.map(g),i=h(c),j={config:{}};j.config[a]={bundlesMap:{},localesMap:{}},j.config[a].bundlesMap[i]=f,j.config[a].localesMap[i]=b,e("require.config("+JSON.stringify(j)+");")},resolveSync:m}}),define("requirejs-dplugins/i18n/common",["./parentLocale"],function(a){var b=/(^.*(?:^|\/)nls\/)([^\/]*)\/?([^\/]*)$/;return{eachProp:function(a,b){var c;for(c in a)a.hasOwnProperty(c)&&b(c,a[c])},getLocale:function(a){return a||(a="undefined"==typeof navigator?"root":navigator.language||navigator.userLanguage||"root"),a.toLowerCase()},getParentLocale:function(b){if(!b||"root"===b)return void 0;if(a[b])return a[b];var c=b.split("-");return c.pop(),c.length>0?c.join("-"):"root"},mixin:function c(a,b,d){var e;for(e in b)!b.hasOwnProperty(e)||a.hasOwnProperty(e)&&!d?"object"==typeof b[e]&&(!a[e]&&b[e]&&(a[e]={}),c(a[e],b[e],d)):a[e]=b[e]},parseName:function(a){var c=a.match(b);return{prefix:c[1],masterLocale:"root",requestedLocale:c[3]?c[2]:null,suffix:c[3]||c[2]}},getMasterMid:function(a){return"root"===a.masterLocale?a.prefix+a.suffix:a.prefix+a.masterLocale+"/"+a.suffix}}}),define("requirejs-dplugins/i18n/parentLocale",{"en-ag":"en-001","en-ai":"en-001","en-bb":"en-001","en-bm":"en-001","en-bs":"en-001","en-bw":"en-001","en-bz":"en-001","en-cc":"en-001","en-ck":"en-001","en-cm":"en-001","en-cx":"en-001","en-dm":"en-001","en-er":"en-001","en-fj":"en-001","en-fm":"en-001","en-gb":"en-001","en-gd":"en-001","en-gh":"en-001","en-gm":"en-001","en-gy":"en-001","en-jm":"en-001","en-ke":"en-001","en-ki":"en-001","en-kn":"en-001","en-ky":"en-001","en-lc":"en-001","en-lr":"en-001","en-ls":"en-001","en-mg":"en-001","en-ms":"en-001","en-mu":"en-001","en-mw":"en-001","en-na":"en-001","en-nf":"en-001","en-ng":"en-001","en-nr":"en-001","en-nu":"en-001","en-pg":"en-001","en-ph":"en-001","en-pn":"en-001","en-pw":"en-001","en-rw":"en-001","en-sb":"en-001","en-sc":"en-001","en-sd":"en-001","en-sl":"en-001","en-ss":"en-001","en-sx":"en-001","en-sz":"en-001","en-tc":"en-001","en-tk":"en-001","en-to":"en-001","en-tt":"en-001","en-tv":"en-001","en-tz":"en-001","en-ug":"en-001","en-vc":"en-001","en-vu":"en-001","en-ws":"en-001","en-za":"en-001","en-zm":"en-001","en-zw":"en-001","en-150":"en-gb","en-au":"en-gb","en-be":"en-gb","en-dg":"en-gb","en-fk":"en-gb","en-gg":"en-gb","en-gi":"en-gb","en-hk":"en-gb","en-ie":"en-gb","en-im":"en-gb","en-in":"en-gb","en-io":"en-gb","en-je":"en-gb","en-mo":"en-gb","en-mt":"en-gb","en-nz":"en-gb","en-pk":"en-gb","en-sg":"en-gb","en-sh":"en-gb","en-vg":"en-gb","es-ar":"es-419","es-bo":"es-419","es-cl":"es-419","es-co":"es-419","es-cr":"es-419","es-cu":"es-419","es-do":"es-419","es-ec":"es-419","es-gt":"es-419","es-hn":"es-419","es-mx":"es-419","es-ni":"es-419","es-pa":"es-419","es-pe":"es-419","es-pr":"es-419","es-py":"es-419","es-sv":"es-419","es-us":"es-419","es-uy":"es-419","es-ve":"es-419","pt-ao":"pt-pt","pt-cv":"pt-pt","pt-gw":"pt-pt","pt-mo":"pt-pt","pt-mz":"pt-pt","pt-st":"pt-pt","pt-tl":"pt-pt","az-cyrl":"root","bs-cyrl":"root","en-dsrt":"root","ha-arab":"root","mn-mong":"root","ms-arab":"root","pa-arab":"root","shi-latn":"root","sr-latn":"root","uz-arab":"root","uz-cyrl":"root","vai-latn":"root","zh-hant":"root","zh-hant-mo":"zh-hant-hk"}),define("dojo/dom-class",["./_base/lang","./_base/array","./dom"],function(a,b,c){function d(a){if("string"==typeof a||a instanceof String){if(a&&!g.test(a))return h[0]=a,h;var c=a.split(g);return c.length&&!c[0]&&c.shift(),c.length&&!c[c.length-1]&&c.pop(),c}return a?b.filter(a,function(a){return a}):[]}var e,f="className",g=/\s+/,h=[""],i={};return e={contains:function(a,b){return(" "+c.byId(a)[f]+" ").indexOf(" "+b+" ")>=0},add:function(a,b){a=c.byId(a),b=d(b);var e,g=a[f];g=g?" "+g+" ":" ",e=g.length;for(var h,i=0,j=b.length;j>i;++i)h=b[i],h&&g.indexOf(" "+h+" ")<0&&(g+=h+" ");e<g.length&&(a[f]=g.substr(1,g.length-2))},remove:function(b,e){b=c.byId(b);var g;if(void 0!==e){e=d(e),g=" "+b[f]+" ";for(var h=0,i=e.length;i>h;++h)g=g.replace(" "+e[h]+" "," ");g=a.trim(g)}else g="";b[f]!=g&&(b[f]=g)},replace:function(a,b,d){a=c.byId(a),i[f]=a[f],e.remove(i,d),e.add(i,b),a[f]!==i[f]&&(a[f]=i[f])},toggle:function(a,b,f){if(a=c.byId(a),void 0===f){b=d(b);for(var g,h=0,i=b.length;i>h;++h)g=b[h],e[e.contains(a,g)?"remove":"add"](a,g)}else e[f?"add":"remove"](a,b);return f}}}),define("dojo/_base/array",["./kernel","../has","./lang"],function(a,b,c){function d(a){return h[a]=new Function("item","index","array",a)}function e(a){var b=!a;return function(c,e,f){var g,i=0,j=c&&c.length||0;if(j&&"string"==typeof c&&(c=c.split("")),"string"==typeof e&&(e=h[e]||d(e)),f){for(;j>i;++i)if(g=!e.call(f,c[i],i,c),a^g)return!g}else for(;j>i;++i)if(g=!e(c[i],i,c),a^g)return!g;return b}}function f(a){var b=1,c=0,d=0;return a||(b=c=d=-1),function(e,f,h,j){if(j&&b>0)return i.lastIndexOf(e,f,h);var k,l=e&&e.length||0,m=a?l+d:c;for(h===g?k=a?c:l+d:0>h?(k=l+h,0>k&&(k=c)):k=h>=l?l+d:h,l&&"string"==typeof e&&(e=e.split(""));k!=m;k+=b)if(e[k]==f)return k;return-1}}var g,h={},i={every:e(!1),some:e(!0),indexOf:f(!0),lastIndexOf:f(!1),forEach:function(a,b,c){var e=0,f=a&&a.length||0;if(f&&"string"==typeof a&&(a=a.split("")),"string"==typeof b&&(b=h[b]||d(b)),c)for(;f>e;++e)b.call(c,a[e],e,a);else for(;f>e;++e)b(a[e],e,a)},map:function(a,b,c,e){var f=0,g=a&&a.length||0,i=new(e||Array)(g);if(g&&"string"==typeof a&&(a=a.split("")),"string"==typeof b&&(b=h[b]||d(b)),c)for(;g>f;++f)i[f]=b.call(c,a[f],f,a);else for(;g>f;++f)i[f]=b(a[f],f,a);return i},filter:function(a,b,c){var e,f=0,g=a&&a.length||0,i=[];if(g&&"string"==typeof a&&(a=a.split("")),"string"==typeof b&&(b=h[b]||d(b)),c)for(;g>f;++f)e=a[f],b.call(c,e,f,a)&&i.push(e);else for(;g>f;++f)e=a[f],b(e,f,a)&&i.push(e);return i},clearCache:function(){h={}}};return b("extend-dojo")&&c.mixin(a,i),i}),define("dojo/keys",["./_base/kernel","./sniff"],function(a,b){return a.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:b("webkit")?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,UP_DPAD:175,DOWN_DPAD:176,LEFT_DPAD:177,RIGHT_DPAD:178,copyKey:b("mac")&&!b("air")?b("safari")?91:224:17}});
//# sourceMappingURL=layer.map