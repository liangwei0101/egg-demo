import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572947163069_8100';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: ['packet'],
      },
      '/chat': {
        connectionMiddleware: ['connection'],
        packetMiddleware: [],
      },
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };

  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1/egg-demo',
    options: {},
  };

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    dateScalarMode: 'timestamp'
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
