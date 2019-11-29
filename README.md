# egg-ts-mongoose-template

### QuickStart && Development

```bash
$ yarn install
$ yarn dev
$ open http://localhost:7001/
```

# Node 使用 Egg 框架 之 上TS 的教程（一）

### Node + Egg + TS + Mongodb + Resetful

1. 作为一个从优美的、面向对象的、专业的：C、C++、C#、JAVA一路过来的程序员，开始让我写JS，我是拒绝的。这哪里是在写代码，明明是在写 **console.log()** 啊！！! 连少个参数、参数类型不对都不告诉我，我太难了。

2. 我那祖传的：**面向对象** 和 **23种设计模式**，在这JS的代码中失去了灵魂。

3. 顺便说句： **async** 和 **await** 真香。

3. 网上的教程都是egg少部分的结合，没有真正的做到俺们这篇的强。废话不多说，开始！

老规矩，本地教程的地址为：[https://github.com/liangwei0101/egg-demo/tree/egg-ts-mongoose-template](https://github.com/liangwei0101/egg-demo/tree/egg-ts-mongoose-template)

##### 运行环境： Node ，Yarn/NPM，MongoDB

egg为node.js的一个框架，用起来还是挺简单的，大伙看看就会了。

## Node + egg + ts + Mongodb  示例
![数据库保存](https://user-gold-cdn.xitu.io/2019/11/7/16e465087f50e600?w=1240&h=275&f=png&s=54889)
![接口返回字段](https://user-gold-cdn.xitu.io/2019/11/7/16e4650887f3be79?w=1240&h=585&f=png&s=93903)


## 目录结构
![项目结构](https://user-gold-cdn.xitu.io/2019/11/7/16e465087f8814ca?w=290&h=446&f=png&s=22383)

```
egg-demo
├── app
│   ├── controller (前端的请求会到这里来！)
│   │   └── home.ts
│   ├── model（数据库表结构抽象出来的模型）
│   │   └── User.ts
│   ├── service（controller 层不建议承载过多的业务，业务重时放在service层）
│   │   └── user.ts
│   └── router.ts （Url的相关映射）
├── config （框架的配置文件）
│   ├── config.default.ts
│   ├── config.local.ts
│   ├── config.prod.ts
│   └── plugin.ts
├── test （测试文件夹）
│   └── **/*.test.ts
├── typings （目录用于放置 d.ts 文件）
│   └── **/*.d.ts
├── README.md
├── package.json
├── tsconfig.json
└── tslint.json
```
## 配置
demo配置了两处地方：
+ 数据库
```
  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1/egg-demo',
    options: {},
  };
```
+ csrf（先关闭，要不然post报错）
```
  config.security = {
    csrf: {
      enable: false,
    },
  };
```
## router 

对于resetful风格的接口来说，用http的关键字来标识动作，用名词来标识资源。已user为例子：
对于请求 '/user'的请求，在下方代码的指定映射到对应的函数中。
```
  router.get('/user', controller.home.getUser);
  router.post('/user', controller.home.addUser);
  router.put('/user', controller.home.updateUser);
  router.delete('/user', controller.home.deleteUser);
```
## controller
这里是请求对应的函数的类。
```
  // 这里是get('/user')的处理函数
  public async getUser() {
    const { ctx } = this;
    
    // 这里就是随你怎么来。可以数据库查，或者别的。
    const user = { ... };
    // 返回的值
    ctx.body = user;
  }

  // 下面类似，不再解释了啊
  public async addUser() {
    const { ctx } = this;

    // 模拟前端传递过来的数据（方便测试）
    const user = new UserModel();
    user.userName = 'add user';
    user.userNo = 99;

    const res = await ctx.model.User.create(user);
    ctx.body = res;
  }

  public async deleteUser() {
    const { ctx } = this;

    const user = new UserModel();
    user.userNo = 99;

    const res = await UserModel.findOneAndRemove({ userNo: user.userNo });

    ctx.body = res;
  }
```
## service层
这里没有啥讲的，就是一些业务性的东西放这里，让被controller或者其他service调用。
```
  /**
  * sayHi to you
  * @param name - your name
  */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
```
## Model （画重点，用mongodb的注意啦）
1. 首先我们创建一个Schema
```
/**
  * 定义一个User的Schema
*/
const UserSchema: Schema = new Schema({
  userNo: {
    type: Number,
    index: true,
  },

  userName: String,
},
  {
    timestamps: true,
  },
);
```
2. 索引
```
// userNo 为索引
UserSchema.index({ userNo: 1, });
```
3. 实例方法和静态方法
```
// UserSchema的实例方法
UserSchema.methods.userInstanceTestMethods = function () {

  const user: IUser = new UserModel();
  user.userName = '我是实例化方法测试';
  user.userNo = 9527;

  return user;
};

// UserSchema的实例方法
UserSchema.statics.userStaticTestMethods = function () {

  const user: IUser = new UserModel();
  user.userName = '我是静态方法测试';
  user.userNo = 9528;

  return user;
};
```
4. 创建User接口字段
```
/**
  * 用户字段接口
*/
export interface IUser {

  userNo: number;

  userName: string;
}
```
5. 实例方法和静态方法接口的定义，注意：这里的接口要和Schema中定义的函数的名称和返回值一致。
```
export interface IUserDocument extends IUser, Document {
  /**
  * 实例方法接口（名称需要和Schema的方法名一样）
  */
 userInstanceTestMethods: () => IUser;
}
/**
  * 静态方法接口
*/
export interface IUserModel extends Model<IUserDocument> {

  /**
   * 静态方法
   */
  userStaticTestMethods: () => IUser;
}
```
6. 导出model即可。
```
export const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);
```
7. 为了怕有需求使用到ctx.model.User，我们需要将UserSchema挂载到ctx中
```
// egg-mongoose注入
export default (app: Application) => {

  const mongoose = app.mongoose;
  // 这里为了挂载到ctx中，让正常ctx.model.User也能使用
  mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
};
```
## 使用Model
使用mode能使用IUser字段接口，实例方法，静态方法。
```
  // 这里的user是: IUser的类型。然后就能尽情的点点点啦！
  const user = await UserModel.findOne();
  // 等价于
  const users = await this.ctx.model.User.find();
  // 实例方法
  const newUser = new UserModel();
  newUser.userInstanceTestMethods();
  // 静态方法
  UserModel.userStaticTestMethods();
```
## 最后，单元测试！！！
可能很多人觉得单元测试不写就不写，写了浪费时间。但是等你发现你要重构的时候，没有足够的单元测试的时候，你会觉得，什么鬼，不敢动啊！！！所以，我觉得还是要写单元测试，这个东西是费点时间，但是后期好啊。

```
 test/app/controller/home.test.ts
    √ should GET / (49ms)
    √ addUser (39ms)
    √ getUser
    √ getUsers
    √ updateUser
    √ deleteUser
    √ testStaticMethods
    √ testInstanceFunction

  test/app/service/Test.test.js
    √ sayHi
    √ testUserInstanceServiceMethods
    √ testUserInstanceServiceMethods

  11 passing (4s)
```
看见他打绿色的 √ √ 我就很开心。

今天有点晚了，后面给大家写：定时任务，GraphQL，redis，部署等内容。

# Node 使用 Egg 框架 之 上TS 的教程（二）

# Node + Egg + TS + Mongodb + Resetful + graphql

**本节课内容： graphql 和 egg 定时任务**

##### 运行环境： Node ，Yarn/NPM，MongoDB

梁老师又开课啦！上节课讲到Node使用Mongodb上TS的一些操作，[上节课的链接]([https://www.jianshu.com/p/5fbade6874c1](https://www.jianshu.com/p/5fbade6874c1)
)。

老规矩，本地教程的地址为：[https://github.com/liangwei0101/egg-demo/tree/egg-ts-mongoose-template](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fliangwei0101%2Fegg-demo%2Ftree%2Fegg-ts-mongoose-template)


```
egg-demo
├── app
│   ├── controller (前端的请求会到这里来！)
│   │   └── home.ts
│   ├── model（数据库表结构抽象出来的模型）
│   │   └── User.ts
│   ├── graphql（graphql文件夹）
│   │   └── mutation（所有的mutation声明文件夹）
│   │       └── schema.graphql（所有的mutation声明文件）
│   │   └── query（所有的query声明文件夹）
│   │        └── schema.graphql（所有的query声明文件）
│   │   └── user（user model的声明和实现）
│   │        └── resolver.js（声明函数的实现）
│   │        └── schema.graphql（user schema的字段声明）
│   ├── service（controller 层不建议承载过多的业务，业务重时放在service层）
│   │   └── user.ts
│   ├── schedule（定时任务文件夹）
│   │   └── addUserJob.ts
│   └── router.ts （Url的相关映射）
├── config （框架的配置文件）
│   ├── config.default.ts
│   ├── config.local.ts
│   ├── config.prod.ts
│   └── plugin.ts
├── test （测试文件夹）
│   └── **/*.test.ts
├── typings （目录用于放置 d.ts 文件）
│   └── **/*.d.ts
├── README.md
├── package.json
├── tsconfig.json
└── tslint.json
```
本次教程增加了**schedule**文件夹和**graphql**文件夹。

##### egg 使用 graphql

graphql 只是一种restful的一种不足的一种解决方案吧。它就是在 **数据库操作完以后，将字段的返回权交给了用户，意思是，用户想返回哪个字段就返回哪个字段，假如说，我pc端和移动端公用一套接口，pc端需要100个字段，移动端需要10个字段，使用resetful无论你需不需要，都会给你返回，而graphql很好的解决了这个问题，因为选择权在调用方。**

是不是感觉很神奇，js和ts可以共存。此教程，先上一个js和ts版本共存的，等下期教程将使用纯ts教程。使用js的问题是，在 resolver.js 中，将不能享受ts代码的代码提示和编译检查。但是很多项目可能都是之前存在的项目，此类js不能立马重构或者改动。共存也是有意义的，逐步重构或者重写吧。

```
// plugin.ts
const plugin: EggPlugin = {
  // mongoose
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // 添加 graphql
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
};
```
```
// config.default.ts
  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
  };

  config.middleware = ['graphql'];
```
**使用user举例**：
定义User schema 的返回字段
```
//  schema 
type User {
  _id: String
  userNo: String
  userName: String
}
```
```
// 查询所有声明 
type Query {
   // 函数名字为user 返回为 User的数组
  user: [User]
}
// Mutation 所有声明 
type Mutation {
   // 函数名字为user 返回为 User对象
  user: User
}
```
Mutation 和 Query 声明函数的实现处：
```
'use strict';

module.exports = {
  Query: {
    async user(root, { }, ctx) {
      return await ctx.model.User.find();
    },
  },
  Mutation: {
    async user(root, { }, ctx) {
      return await ctx.model.User.create({userName: 'add user', userNo: 99});
    },
  }
}
```
然后打开浏览器输入：[http://127.0.0.1:7001/graphql](http://127.0.0.1:7001/graphql)，没病，查询一个瞧瞧！！
![graphql使用截图](https://upload-images.jianshu.io/upload_images/9942046-cb2c88a96914a28b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### egg 定时任务

定时任务和我们一般定时任务差不多。定时任务一般分两种：
+ 一种是 **间隔若干时间执行** 某个任务 
+ 另一种是 **某个时间点执行** 某个任务

1. 间隔若干时间执行（每隔60s将会执行一次）
```
  static get schedule() {
    return {
      interval: '60s', // 60s 间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const ctx = this.ctx;

    console.log('每60s执行一次增加User的定时任务！！' + new Date())

    const test = await ctx.service.user.addUserByScheduleTest();

    console.log(test)
  }
```
2. 某个时间点执行（每个月的15号:00:00 分执行）
```
  static get schedule() {
    return {
      cron: '0 0 0 15 * *', // 每个月的15号:00:00 分执行
      type: 'worker', // 只指定一个随机进程执行job 防止出现数据冲突
      disable: false, // 是否开启
      cronOptions: {
        tz: 'Asia/Shanghai',
      },
    };
  }

  async subscribe () {
    const ctx = this.ctx;

    console.log('每个月的15号:00:00 分执行！！' + new Date())
  }
```
时间的配置请看：[egg的官方文档]([https://eggjs.org/zh-cn/basics/schedule.html](https://eggjs.org/zh-cn/basics/schedule.html)
)。又挺晚啦，下节课给大家上graphql 的ts版本。

# Node 使用 Egg 框架 之 上TS 的教程（三）

##### Node + Egg + TS + typegoose + Resetful + schedule + type-graphql+ websocket

梁老师课堂，不间断，最终版教程来啦。

本次教材地址：[https://github.com/liangwei0101/egg-demo/tree/egg-ts-mongoose-graphql.ts-websocket](https://github.com/liangwei0101/egg-demo/tree/egg-ts-mongoose-graphql.ts-websocket)

## 本次教材讲解：typegoose  和 type-graphql 以及 websocket

网上找了一圈，都没有 egg + typegoose +  type-graphql 的教程，还是我来吧。
mongoose 和  graphql 一起使用，会有啥问题呢？当然，正常的问题是不存在，**但是很多废代码**。拿上节课的代码来说。
```
// schema.graphql（user schema的字段声明）
type User {
  userNo: Number
  userName: String
}
```

```
const UserSchema: Schema = new Schema({
  userNo: {
    type: Number,
    index: true,
  },
  userName: String,
}),
```
在schema.graphql我们要声明如上的字段。我们可以发现，其实我们的字段都是一样的，却多写了一遍。当我们的model很多的时候，就会产生大量的这个问题。引出我们的主角：typegoose 和 type-graphql 。

## 使用 typegoose 和  type-graphql 

1. typegoose 主要作用：就是将 *加了注解的类* 转化成 对应的 mongoose的属性、实例方法、静态方法等等。

2. type-graphql 的主要作用：也是讲 将 *加了注解的类* 转化成对应的 graphql 的声明字段、query、Mutation等。

看到这里我们应该可以理解到为啥代码比之前的写法少了重复的代码。
```
egg-demo
├── app
│   ├── controller (前端的请求会到这里来！)
│   │   └── home.ts
│   ├── model（数据库表结构抽象出来的模型）
│   │   └── User.ts
│   ├── graphql（graphql文件夹）
│   │   └── schemaResolver（所有Resolver）
│   │       └── userResolver.ts（user的Resolver文件）
│   ├── ├──index.ts （type-graphql的初始化）
│   ├── service（controller 层不建议承载过多的业务，业务重时放在service层）
│   │   └── user.ts
│   ├── io（websocket文件夹）
│   │   └── controller（前端通过websocket通信的请求）
│   │       └── chat.ts（controller相应的处理）
│   ├── schedule（定时任务文件夹）
│   │   └── addUserJob.ts
│   └── router.ts （Url的相关映射）
├── config （框架的配置文件）
│   ├── config.default.ts
│   ├── config.local.ts
│   ├── config.prod.ts
│   └── plugin.ts
├── test （测试文件夹）
│   └── **/*.test.ts
├── typings （目录用于放置 d.ts 文件）
│   └── **/*.d.ts
├── README.md
├── package.json
├── tsconfig.json
└── tslint.json
```
本次教程改动了model文件夹和graphql文件夹，以及增加了IO文件夹。

## Model

```
@ObjectType()
export default class BaseModel extends Typegoose {

  @Field({ description: "id" })
  _id?: string

  @prop()
  @Field({ description: "创建时间" })
  createdAt: Date

  @prop()
  @Field({ description: "更新时间" })
  updatedAt: Date
}
```

```
/**
  * 用户类
*/
@ObjectType()
@index({ userNo: 1 })
export class User extends BaseModel {
  @prop({ required: true })
  @Field(() => Int, { description: "编号" })
  userNo: number;

  @prop({ required: true })
  @Field({ nullable: true, description: "名称" })
  userName?: string;

  //#region（实例方法 和 实例方法）
  @instanceMethod
  public async userInstanceTestMethods(this: InstanceType<User>) {
    const user: User = new User();
    user.userName = '我是实例化方法测试';
    user.userNo = 9527;
    return user;
  }

  @staticMethod
  public static async userStaticTestMethods(this: ModelType<User> & typeof User) {
    const user: User = new User();
    user.userName = '我是静态方法测试';
    user.userNo = 9527;
    return user;
  }
  //#endregion
}
export const UserModel = new User().getModelForClass(User)
```

+  @prop({ required: true })  这个注解是：这个是要转化成 mongoose 字段的，并且是必须填写。
+  @Field({ nullable: true, description: "名称" })这个注解是：这个字段将会转成 graphql的 schema，可选，描述是名称。
+ @instanceMethod 是 mongoose model 的实例方法。
+ @staticMethod 是 mongoose model 的静态方法。
+ 通过导出的 UserModel ，我们将能操作mongoose 的find，create、实例方法，静态方法，hook等。
+ 通过 model 继承BaseModel，我们每一个model将能少写三个正常js的graphql 的字段。 

## graphql 对应schema 的  Resolver
```
@Resolver(User)
export class UserResolver {

  @Query(() => [User], { description: '查询用户列表' })
  async getUser() {
    return await UserModel.find();
  }

  @Mutation(() => User, { description: '增加用户' })
  async addUser() {

    let user = new UserModel();
    user.userNo = 666;
    user.userName = 'liang';

    return await UserModel.create(user);
  }
}
```
+ @Resolver(User) ：意思为这个User model 对应的 Resolver。
+  @Query(() => [User], { description: '查询用户列表' }) ：意思为：这个是函数是Query，返回的是一个数组，描述是XXX。
+ @Mutation(() => User, { description: '增加用户' })： 同理。  

写到这里，我们已经可以运行啦。我们输入：http://127.0.0.1:7001/graphql 将能看到新的界面。我们的 Query 和 Mutation 还有相应的注解都在其中。
![graphql 界面](https://user-gold-cdn.xitu.io/2019/11/28/16eb25742212325b?w=1240&h=592&f=png&s=105135)

其实到这里，我这里不建议项目中原来用js的上这种方式。如果是存在许多js和ts共存的，我个人建议采用[教程二](https://www.jianshu.com/p/859006440e75)里面的方式去重构。

## websocket 教程
这个简单很多，我们只要：

```
  // config.default.ts 配置一下
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
  // plugin.ts 开启
  io: {
    enable: true,
    package: 'egg-socket.io',
  }
```
加到路由中：访问 /的websocket将会到这个sendMsg函数处理。
```
  io.of('/').route('chat', io.controller.chat.sendMsg);
```
到了这里，ts版本会报错，因为controller中定义的chat他不认识。这里需要我们手写一下index.d.ts就好了。 

```
declare module 'egg' {
  interface CustomController {
    chat: any;
  }

  interface EggSocketNameSpace {
    emit: any
  }
}
```
前端我这里用的vue框架，vue中的使用简单些。就是下载包，然后在main.js中使用一波就好了。在相应的页面去做这个事情就好了。
 ```
// main.js
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:7001',
}))

 ```
```
//接收服务端的信息
this.sockets.subscribe("test", data => {
   alert(data)
 });
```
好啦，egg 上ts的教程，完美结束。愿大家写起来都开心啊。不用在写没有提示的点点点了。。。若是有帮助，给github里的项目start一下啊，我也是琢磨了很久的呢。看到网上又没有这方面教程，写这些个更希望希望能帮到大家。谢谢~~
