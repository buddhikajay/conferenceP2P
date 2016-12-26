var express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');
socket_io = require('socket.io');

var routes = require('./routes/index');
var users = require('./routes/users');
var webrtc = require('./routes/webrtc');

var app = express();
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webrtc);
app.use('/users', users);
app.use('/webrtc', webrtc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/* Socket.io */

io.on('connection', function(socket){
  console.log('connected '+socket.id);
  socket.emit('message', 'hi');
  socket.on('disconnect', function(){
    console.log('disconnected '+socket.id);
  });
});


/* User Registration Process. Inspired by Kurento Tutorial Node */

// Represents caller and callee sessions
function UserSession(id, name, socket) {
  this.id = id;
  this.name = name;
  this.socket = socket;
}

//UserSession.prototype.sendMessage = function(message) {
//  this.socket.send(JSON.stringify(message));
//}
//UserSession.prototype.notifyStateChangeToPartner = function(state){
//  if(userRegistry.getByName(this.partnerName)){
//    userRegistry.getByName(this.partnerName).socket.send(JSON.stringify({
//      id : 'partnerStatus',
//      status: state
//    }));
//  }
//}
//
//UserSession.prototype.getPartnerStatus = function(){
//  var status = 'offline';
//  if(userRegistry.getByName(this.partnerName)){
//    status = 'online';
//  }
//  this.socket.send(JSON.stringify({
//    id : 'partnerStatus',
//    status: status
//  }));
//}
//
//
////this was implemented later
//UserSession.prototype.sendToPartner = function(message){
//  if(userRegistry.getByName(this.partnerName)){
//    userRegistry.getByName(this.partnerName).socket.send(JSON.stringify(message));
//  }
//}
//
//
//// Represents registrar of users
//function UserRegistry() {
//  this.usersById = {};
//  this.usersByName = {};
//}
//
//UserRegistry.prototype.register = function(user) {
//  this.usersById[user.id] = user;
//  this.usersByName[user.name] = user;
//}
//
//UserRegistry.prototype.unregister = function(id) {
//  var user = this.getById(id);
//  if(user){
//    user.notifyStateChangeToPartner('offline');
//    delete this.usersById[id];
//    if (this.getByName(user.name)) delete this.usersByName[user.name];
//  }
//}
//
//UserRegistry.prototype.getById = function(id) {
//  return this.usersById[id];
//}
//
//UserRegistry.prototype.getByName = function(name) {
//  return this.usersByName[name];
//}
//
//UserRegistry.prototype.removeById = function(id) {
//  var userSession = this.usersById[id];
//  if (!userSession) return;
//  delete this.usersById[id];
//  delete this.usersByName[userSession.name];
//}

module.exports = app;
