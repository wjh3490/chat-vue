var app = require('express')();
var http = require('http').createServer(app);
const fs = require('fs');
const path = require('path');
var io = require('socket.io')(http);

let list = [];
let message = {};

io.on('connection', socket => {
  socket.on('login', data => {
    let n = list.find(item => item.name === data.name);
    if (n) {
      socket.emit('loginError', '用户已登录');
    } else {
      let name = +new Date();
      let o = {
        name: data.name,
        avatar: `http://localhost:3000/uploads/${name}.${data.suffix}`,
        sendId: socket.id
      };
      writeFile(`uploads/${name}.${data.suffix}`, data.file);
      list.push(o);

      socket.emit('loginSuccess', o);
      io.emit('userList', list);
    }
  });
  socket.on('disconnect', reason => {
    list = list.filter(item => item.sendId != socket.id);
    io.emit('userQuit', list);
  });
  //o = {
  //   a: [{b: '', time: 000}]
  //   b: [{a: '', time: 22}]
  // }

  socket.on('sendMsg', data => {
    if (!message[data.sendId]) message[data.sendId] = [];
    if (!message[data.receivedId]) message[data.receivedId] = [];

    message[data.sendId].push(data);

    const sendList = message[data.sendId];
    const receiveList = message[data.receivedId];
    let send = sendList.filter(item => item.receivedId === data.receivedId);
    let receive = receiveList.filter(item => item.receivedId === data.sendId);

    let m = [...send, ...receive].sort((a, b) => a.date - b.date);
    // let m = getList(data);
    socket.to(data.receivedId).emit('receiveMsg', m);
    socket.emit('receiveMsg', m);
  });

  socket.on('messageList', data => {
    if (!message[data.sendId]) message[data.sendId] = [];
    if (!message[data.receivedId]) message[data.receivedId] = [];

    const sendList = message[data.sendId];
    const receiveList = message[data.receivedId];
    let send = sendList.filter(item => item.receivedId === data.receivedId);
    let receive = receiveList.filter(item => item.receivedId === data.sendId);

    let m = [...send, ...receive].sort((a, b) => a.date - b.date);
    socket.emit('receiveList', m ? m : { date: '', msg: '' });
  });

  socket.on('sendFile', data => {
    let name = +new Date();
    let file = `http://localhost:3000/uploads/${name}.${data.suffix}`;
    writeFile(`uploads/${name}.${data.suffix}`, data.file);
    if (!message[data.sendId]) message[data.sendId] = [];
    if (!message[data.receivedId]) message[data.receivedId] = [];
    let d = { ...data };
    d.file = file;
    message[data.sendId].push(d);

    const sendList = message[data.sendId];
    const receiveList = message[data.receivedId];
    let send = sendList.filter(item => item.receivedId === data.receivedId);
    let receive = receiveList.filter(item => item.receivedId === data.sendId);

    let m = [...send, ...receive].sort((a, b) => a.date - b.date);
    socket.to(data.receivedId).emit('receiveFile', m);
    socket.emit('receiveFile', m);
  });
});

app.use('/uploads', require('express').static('uploads'));
app.use(function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS,PATCH' // cors
  });
  res.setHeader(
    'Access-Control-Allow-Headers',
    'x-requested-with,Authorization,content-type'
  );

  next();
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

function readFile(file, callback) {
  fs.readFile(path.join(__dirname, 'data', file), 'utf8', (err, data) => {
    if (err) return console.log('读取文件失败', err);
    callback && callback(data);
  });
}
function writeFile(filePath, data, callback) {
  fs.writeFile(path.join(__dirname, filePath), data, err => {
    if (err) return console.log('写入文件失败', err);
    callback && callback();
  });
}

function getList(data) {
  const sendList = message[data.sendId];
  const receiveList = message[data.receivedId];
  let send = sendList.filter(item => item.receivedId === data.receivedId);
  let receive = receiveList.filter(item => item.receivedId === data.sendId);

  let messageList = [...send, ...receive].sort((a, b) => a.date - b.date);

  return messageList;
}
