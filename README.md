#wakanda-eventsource#

*This package is based on a fork a repository from [Choisel Fogang](https://github.com/choisel), you can find the original repository there:
https://github.com/choisel/Wakanda. In addition to the Server-Sent Events aka EventSource support, the original repository also include a dedicated Cross-Origin Resources Sharing (aka CORS) support for Wakanda.*
 
##About##
 
This package is meant to provide an HTTP Push support to [WakandaDB](http://wakandadb.org) / [Wakanda](http://wakanda.org) via the W3C / WHATWG HTML5 Standard called **Server-Sent Events** aka **Event Source**.

This push technology [can be used on all modern platforms](http://caniuse.com/#search=eventsource) excluding IE for wich the [EventSource Polyfill](https://github.com/Yaffle/EventSource) works well

##How to use##

###Start the service###

Start the service on Wakanda Server. A good place for this code is usually a Wakanda bootstrap file.

```javascript

require('wakanda-eventsource').start();

```

The default listened pattern is "/eventsource". 

###Push Messages / Events###

Default `ServerEvent` are received by the client as `MessageEvent`. To send a `MessageEvent`to all client listeners you can simply write:

```javascript

require('wakanda-eventsource').push('a message from the server');

```

If you want to dispatch on the client a specific Server Event you can use `pushEvent()`

```javascript

require('wakanda-eventsource').pushEvent({
    'itempurchased', 
    '5 "DVD" items have been purchased'
});

```

If you want the pushed messaged to be an object message, you can tell the method to encode it in JSON (you could do it yourself but this will make your code lighter). This option works for both `push()`and `pushEvent()` methods.

```javascript

require('wakanda-eventsource').pushEvent(
    'itempurchased',
    {
    	nb: 5,
    	type: 'DVD'
    },
    true // encode in JSON
);

```

###Listen Server Messages / Events from the client###

You must first create an `EventSource` Listener

```javascript

var sse = new EventSource('/eventsource');

```

You can then listen to basic Server Message Events via an `onmessage` handler

```javascript

sse.onmessage = function onservermessage(event) {
	console.log(event)
};

```

Or you can listen to any specific events using `addEventListener()`


```javascript

sse.addEventListener('itempurchased', function onitempurchased(event) {
	var
		data;

	data = JSON.parse(event.data);
	console.log(data.nb, '"' + data.type + '"', 'items have been purchased')
});

```

##Potential Enhancements##

* this implementation should support **CORS** to allow potential event subscriptions for external web applications
* this implementation should differentiate authenticated connections from anonymous ones, The `push()`and `pushEvent()` methods could be able to send server events to only the current **user**, **group**, or even **session** (or even a specific other one if enough permissions).
* It should be possible to create multiple event sources with different patterns or sub-patterns which could be used as specific **channels**
* This implementation use **last event ID string** for reconnections but needs more tests
* an experimental `pause(delay)` method invite clients to reconnect later (we may allow to pause all connections not belonging to important groups)
* A parallel client-side lib could help binding such server-sent events to wakanda datasources for live update features

##References##

* [W3C Candidate Recommmendation](http://w3.org/TR/Eventsource)
* [WHATWG HTML Living Standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html)
* [HTML5 Rocks tutorial](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
* [Can I use...](http://caniuse.com/#search=eventsource)
* [EventSource Polyfill](https://github.com/Yaffle/EventSource) (with IE support)
* [Server Sent Events - Who said it's not yet ready? (Wakanda forum)](http://forum.wakanda.org/showthread.php?4264-Server-Sent-Events-Who-said-it-s-not-yet-ready)
* [Notification Library - Receive server events to update datasources](http://forum.wakanda.org/showthread.php?4362-Notification-Library-Receive-server-events-to-update-datasources)

##Disclaimer##

This package is not a native Wakanda component and 4D gives no guaranty to its usage

##Credits##

This package could not have been done that quick without the preliminary works and involvements from [Choisel Fogang](https://github.com/choisel) and [Vegar Ringdal](https://github.com/vegarringdal)

##License##


Copyright (c) 2013 Alexandre Morgaut

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
