# Fast Feud

A web application to resolve the inevitable arguments and indecisiveness when deciding where to get food. 

## Api

The API is a standard [Express](https://github.com/expressjs/express) (Node.js) application, and makes use of the [Yelp API](https://www.yelp.com/developers/documentation/v3) to retrieve local restaurants for use by the client, as well as handling server side sockets.

## Client

The client is built with [React.js](https://github.com/facebook/react), allowing users to create rooms, which can then be used to discuss and vote on various restaurants, which are chosen at random with parameters configured by an admin. 

#### Technologies 

Outside of the functionality, the purpose of this app was to pick up a few new technologies. These were:

 - [Socket.io](https://github.com/socketio/socket.io)
 - [Gulp](https://github.com/gulpjs/gulp)