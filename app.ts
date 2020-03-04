import 'reflect-metadata'
import * as fs from 'fs-extra';
import { join, sep } from 'path';
import { find } from 'fs-jetpack';
import { watch } from 'chokidar';
import * as mongoose from 'mongoose';
import * as prettier from 'prettier';
import { Application, IBoot } from 'egg';

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async configWillLoad() {
    // Ready to call configDidLoad,`
    // Config, plugin files are referred,`
    // this is the last chance to modify the config.
    await this.connectDB(this.app)
    await this.customLoadModel();
    if (this.app.config.env !== 'unittest') {
      await this.app.graphql.init()
    }
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
    // await this.customLoadModel();
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }

  //#region 手动挂载model，测试需要ctx.model 

  public async connectDB(app: Application) {
    const { url, options } = app.config.mongoose
    if (url) {
      const connection = await mongoose.connect(url, options)
      app.context.connection = connection
    }
  }

  /**
  * 手动挂载model
  */
  private async customLoadModel() {
    this.watchModel(this.app)
    await this.loadModel(this.app)
  }

  private capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  private getModelName(file: string) {
    const filename = file.split(sep).pop() || ''
    const name = this.capitalizeFirstLetter(filename.replace(/\.ts$|\.js$/g, ''))
    return name
  }

  private async loadModel(app: Application) {
    const { baseDir } = app
    const modelDir = join(baseDir, 'app', 'model')
    if (!fs.existsSync(modelDir)) return

    // TODO: handle other env
    const matching = app.config.env === 'local' || app.config.env === 'unittest' ? '*.ts' : '*.js'

    const files = find(modelDir, { matching })
    app.model = {}
    const modelWhitelist: String[] = app.config.modelWhitelist;

    try {
      for (const file of files) {
        const modelPath = join(baseDir, file)
        const Model = require(modelPath).default
        const name = this.getModelName(file)
        if (modelWhitelist.indexOf(name) === -1) {
          try {
            app.model[name] = new Model().getModelForClass(Model)
          }
          catch (e) {
            console.log('如果要挂载到model请将export default');
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  private watchModel(app: Application) {
    const { baseDir } = app
    const modelDir = join(baseDir, 'app', 'model')
    const typingsDir = join(baseDir, 'typings')

    if (!fs.existsSync(modelDir)) return

    fs.ensureDirSync(typingsDir)
    watch(modelDir).on('all', (eventType: string) => {
      if (['add', 'change'].includes(eventType)) {
        this.createTyingFile(app)
      }

      if (['unlink'].includes(eventType)) {
        this.createTyingFile(app)
      }
    })
  }

  private createTyingFile(app: Application) {
    const { baseDir } = app
    const modelDir = join(baseDir, 'app', 'model')
    const files = find(modelDir, { matching: '*.ts' })
    const typingPath = join(baseDir, 'typings', 'typegoose.d.ts')
    const pathArr = this.formatPaths(files)
    const importText = pathArr
      .map(i => `import ${i.name} from '${i.importPath}'`)
      .join('\n')
    const repoText = pathArr
      .map(i => `${i.name}: ModelType<InstanceType<${i.name}>>`)
      .join('\n')

    const text = this.getTypingText(importText, repoText)
    this.writeTyping(typingPath, text)
  }

  private getTypingText(importText: string, modelText: string) {
    const tpl = `
  import 'egg'
  import { InstanceType, ModelType } from 'typegoose'
  import * as mongoose from 'mongoose'
  
  ${importText}
  
  declare module 'egg' {
    interface Context {
      connection: mongoose.Collection
      model: {
        ${modelText}
      }
    }
  }
  `
    return tpl
  }

  private writeTyping(path: string, text: string) {
    fs.writeFileSync(path, this.formatCode(text), { encoding: 'utf8' })
  }

  private formatCode(text: string) {
    return prettier.format(text, {
      semi: false,
      tabWidth: 2,
      singleQuote: true,
      parser: 'typescript',
      trailingComma: 'all',
    })
  }

  private formatPaths(files: string[]) {
    return files.map(file => {
      const name = this.getModelName(file)
      file = file.split(sep).join('/')
      const importPath = `../${file}`.replace(/\.ts$|\.js$/g, '')
      return {
        name,
        importPath,
      }
    })
  }

  //#endregion
}