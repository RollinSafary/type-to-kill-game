import GameFacade from '../../GameFacade';
import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';

export default class BootSceneMediator extends BaseSceneMediator<BootScene> {
  public static NAME: string = 'BootStateMediator';

  constructor(viewComponent: BootScene) {
    super(BootSceneMediator.NAME, viewComponent);
  }

  public listNotificationInterests(): string[] {
    return [GameFacade.STARTUP];
  }

  public onRegister(): void {
    super.onRegister();
    const bootScene: BootScene = new BootScene();
    GameFacade.game.scene.add(BootScene.NAME, bootScene);
    this.game.scene.start(BootScene.NAME);
    this.setViewComponent(this.game.scene.getScene(
      BootScene.NAME,
    ) as BootScene);
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case GameFacade.STARTUP:
        this.viewComponent.sys.events.on(
          BootScene.LOAD_COMPLETE_EVENT,
          this.onLoadComplete,
          this,
        );
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  private async onLoadComplete(): Promise<void> {
    this.game.scene.remove(BootScene.NAME);
    this.facade.sendNotification(BootScene.LOAD_COMPLETE_NOTIFICATION);
  }
}
