
import { Subscription } from 'egg'

/**
* 间隔时间段，定时任务测试
*/
export default class AddUserJob extends Subscription {
  static get schedule() {
    return {
      interval: '600000m', // 60s 间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const ctx = this.ctx;

    console.log('每60s执行一次增加User的定时任务！！' + new Date())

    this.ctx.app.io.of('/').emit('test', '我是定时任务，60s一次的主推的消息啊!!!');

    const test = await ctx.service.user.addUserByScheduleTest();

    console.log(test)
  }
}
