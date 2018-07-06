import { Mediator } from '@koreez/pure-mvc';
import GameFacade from '../../GameFacade';
import IGame from '../../IGame';
import BaseScene from './BaseScene';

export default abstract class BaseSceneMediator<
  T extends BaseScene
> extends Mediator<T> {
  protected game: IGame;

  constructor(name: string, viewComponent: T) {
    super(name, viewComponent);
    this.game = GameFacade.game;
    if (this.viewComponent) {
      this.registerEvents();
    }
  }

  public setViewComponent(viewComponent: T): void {
    super.setViewComponent(viewComponent);
    this.registerEvents();
  }

  protected registerEvents(): void {
    this.viewComponent.sys.events.on('boot', this.onSceneBoot, this);
    this.viewComponent.sys.events.on('pause', this.onScenePause, this);
    this.viewComponent.sys.events.on('resume', this.onSceneResume, this);
    this.viewComponent.sys.events.on('sleep', this.onSceneSleep, this);
    this.viewComponent.sys.events.on('wake', this.onSceneWake, this);
    this.viewComponent.sys.events.on('start', this.onSceneStart, this);
    this.viewComponent.sys.events.on('shutdown', this.onSceneShutdown, this);
    this.viewComponent.sys.events.on('destroy', this.onSceneDestroy, this);
  }

  protected onSceneBoot(): void {
    this.sendNotification((this.viewComponent.constructor as any)['BOOT']);
  }

  protected onScenePause(): void {
    this.sendNotification((this.viewComponent.constructor as any)['PAUSE']);
  }

  protected onSceneResume(): void {
    this.sendNotification((this.viewComponent.constructor as any)['RESUME']);
  }

  protected onSceneSleep(): void {
    this.sendNotification((this.viewComponent.constructor as any)['SLEEP']);
  }

  protected onSceneWake(): void {
    this.sendNotification((this.viewComponent.constructor as any)['WAKE']);
  }

  protected onSceneStart(): void {
    this.sendNotification((this.viewComponent.constructor as any)['START']);
  }

  protected onSceneShutdown(): void {
    this.sendNotification((this.viewComponent.constructor as any)['SHUTDOWN']);
  }

  protected onSceneDestroy(): void {
    this.sendNotification((this.viewComponent.constructor as any)['DESTROY']);
  }
}
