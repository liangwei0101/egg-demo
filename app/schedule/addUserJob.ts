import { Subscription } from 'egg'
import { UserModel } from '../model/User'

export default class AddUserJob extends Subscription {

  static get schedule() {
    return {
      interval: '10m', // 60s 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log('我是60s执行一次的定时任务！！' + new Date())

    const user = new UserModel();
    user.userName = 'add user';
    user.userNo = Math.floor(Math.random()*10);
    console.log('====================')
    console.log(user)
    console.log('====================')
    const aa = await user.save();
    console.log('====================1')
    console.log(aa)
    console.log('====================1')


  }

}