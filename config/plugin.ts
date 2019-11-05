import { EggPlugin } from 'egg';

const plugin: EggPlugin = {

  // 添加 mongoose 插件
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

};

export default plugin;
