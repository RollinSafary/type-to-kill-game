import { Facade } from '@koreez/pure-mvc';
import IGame from './IGame';
import BootSceneMediator from './view/scenes/BootSceneMediator';
import GameSceneMediator from './view/scenes/GameSceneMediator';
import StartupCommand from './controller/StartupCommand';

const consoleArgs: string[] = [
  ``,
  `background: ${'#c8c8ff'}`,
  `background: ${'#9696ff'}`,
  `color: ${'#ffffff'}; background: ${'#0000ff'};`,
  `background: ${'#9696ff'}`,
  `background: ${'#c8c8ff'}`,
];

export default class GameFacade extends Facade {
  public static NAME: string = 'GameFacade';
  public static STARTUP: string = `${GameFacade.NAME}StartUp`;
  public static game: IGame;

  public static getInstance(key: string): GameFacade {
    if (!Facade.instanceMap[key]) {
      const instance: GameFacade = new GameFacade(key);
      Facade.instanceMap[key] = instance;
    }
    return Facade.instanceMap[key] as GameFacade;
  }

  public initializeFacade(): void {
    GameFacade.game.events.once('ready', this.ready, this);
  }

  public sendNotification(notificationName: string, ...args: any[]): void {
    consoleArgs[0] = `%c %c %c ${notificationName}${
      args.length > 0 ? ' | ' + args : ''
    } %c %c `;
    console.log.apply(console, consoleArgs);
    super.sendNotification(notificationName, ...args);
  }

  protected initializeModel(): void {
    super.initializeModel();
  }

  protected initializeController(): void {
    super.initializeController();
    this.registerCommand(GameFacade.STARTUP, StartupCommand);
  }

  protected initializeView(): void {
    super.initializeView();
    this.registerMediator(new BootSceneMediator(null));
    this.registerMediator(new GameSceneMediator(null));
  }

  private startup(): void {
    this.sendNotification(GameFacade.STARTUP);
  }

  private ready(): void {
    super.initializeFacade();
    this.startup();
  }
}
