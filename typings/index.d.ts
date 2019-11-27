
import 'egg';

declare module 'egg' {
  interface CustomController {
    nsp: any;
    chat: any;
  }

  interface EggSocketNameSpace {
    emit: any
  }
}