import { EggPlugin } from 'egg';

const plugin: EggPlugin = {

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
  }
};

export default plugin;
