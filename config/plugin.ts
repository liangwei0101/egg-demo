import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  // mongoose
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // graphql
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  // cors
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  // socket.io
  io: {
    enable: true,
    package: 'egg-socket.io',
  }
};

export default plugin;
