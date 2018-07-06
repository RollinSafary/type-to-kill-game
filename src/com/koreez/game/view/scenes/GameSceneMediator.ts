import GameFacade from '../../GameFacade';
import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';
import GameScene from './GameScene';
import SphereView from '../components/SphereView';
import { ALL_COLORS } from '../../constants/Constants';

export default class GameSceneMediator extends BaseSceneMediator<GameScene> {
  public static NAME: string = 'GameSceneMediator';

  constructor(viewComponent: GameScene) {
    super(GameSceneMediator.NAME, viewComponent);
  }

  public listNotificationInterests(): string[] {
    return [BootScene.LOAD_COMPLETE_NOTIFICATION];
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE_NOTIFICATION :
        const gameScene: GameScene = new GameScene();
        GameFacade.game.scene.add(BootScene.NAME, gameScene);
        this.game.scene.start(GameScene.NAME);
        this.setViewComponent(this.game.scene.getScene(
          GameScene.NAME,
        ) as GameScene);
        this.setListeners()


        const sphereDatas:any[] = [];
        const spheresCount: number = 6;
        for(let i:number = 0; i < spheresCount; i++){
          const value: number = Phaser.Math.Between(1, 5);
          const index: number = Phaser.Math.Between(0, ALL_COLORS.length - 1);
          const color: string = ALL_COLORS[index]
          sphereDatas.push({color, value, moveEnabled : true});
      }
        this.viewComponent.createSpheres(sphereDatas);
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  private onSphereSelected(sphere:SphereView):void{
    this.viewComponent.onSelect(sphere)
  }
  private onSphereUnselected(sphere:SphereView):void{
    this.viewComponent.onUnselect(sphere)
  }
  private onSphereKilled(sphere:SphereView):void{
    this.viewComponent.onKilled(sphere)
  }

  private setListeners():void{
    this.viewComponent.events.on('sphereSelected', this.onSphereSelected, this)
    this.viewComponent.events.on('sphereUnselected', this.onSphereUnselected, this)
    this.viewComponent.events.on('sphereKilled', this.onSphereKilled, this)
  }
}
