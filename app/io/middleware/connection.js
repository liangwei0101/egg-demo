
'use strict';
module.exports = () => {
  return async (ctx, next) => {
    console.log('连接成功！！!');
    // ctx.socket.emit('test', 'connected!');
    await next();
  };
};