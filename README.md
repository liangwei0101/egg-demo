# egg-ts-mongoose-template

### QuickStart && Development

```bash
$ yarn install
$ yarn dev
$ open http://localhost:7001/
```

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
