import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io } = app;

  router.get('/', controller.home.index);
  router.get('/user', controller.home.getUser);
  router.get('/users', controller.home.getUsers);
  router.put('/user', controller.home.updateUser);
  router.post('/user', controller.home.addUser);
  router.delete('/user', controller.home.deleteUser);
  router.get('/testStaticMethods', controller.home.testStaticMethods);
  router.get('/testInstanceFunction', controller.home.testInstanceFunction);

  // app.io.of('/chat')
  io.of('/').route('chat', io.controller.chat.sendMsg);
};