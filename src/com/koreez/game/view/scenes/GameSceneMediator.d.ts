import BaseSceneMediator from './BaseSceneMediator';
import GameScene from './GameScene';
export default class GameSceneMediator extends BaseSceneMediator<GameScene> {
    static NAME: string;
    constructor(viewComponent: GameScene);
    listNotificationInterests(): string[];
    handleNotification(notificationName: string): void;
    private onSphereSelected(sphere);
    private onSphereUnselected(sphere);
    private onSphereKilled(sphere);
    private setListeners();
}
