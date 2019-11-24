import { Application } from 'egg';

module.exports = (app: Application) => {
  class Controller extends app.Controller {
    async sendMsg() {
      const nsp = app.io.of('/');
      nsp.emit('test', '我是测试');
    }
  }
  return Controller;
};