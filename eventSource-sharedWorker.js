﻿var	clientPorts,	sse;clientPorts = [];sse = require("wakanda-eventsource");self.onconnect = function onconnect(msg) {	var		port;	port = msg.ports[0];	port.onmessage = function onmessage(event) {		var			data;		data = event.data;		switch (data.type) {		case sse.PUSH:			// MESSAGE PUSHED via ServerSent.prototype.send()			clientPorts.forEach(function dispatchData(clientConnection, index) {				if (!clientConnection) {					// WORKER CONNECTION LOST					// HTTP CONNECTION CLOSED BY CLIENT ?					clientPorts.splice(index, 1);					return;				}				clientConnection.postMessage({					type: sse.PUSH, 					message: data.message				});			});			break;		case "register":			// HTTP REQUEST HANDLER CONNECTIONS			clientPorts.push(port);			port.postMessage({				type: sse.CONNECTION_READY			});			break;		case "disconnect":			// unused for now			clientPorts.splice(ports.indexOf(port), 1);			port.close();			break;		case sse.STOP:			// service stopped - close all connections			clientPorts.forEach(function dispatchData(clientConnection, index) {				if (!clientConnection) {					// WORKER CONNECTION LOST					// HTTP CONNECTION CLOSED BY CLIENT ?					clientPorts.splice(index, 1);					return;				}				clientConnection.postMessage({					type: sse.STOP				})				clientPorts.splice(index, 1);				clientConnection.close();			});			break;		default:			console.warning('unexpected message', data);		}	};};