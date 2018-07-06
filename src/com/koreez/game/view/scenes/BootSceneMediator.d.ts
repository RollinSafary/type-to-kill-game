import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';
export default class BootSceneMediator extends BaseSceneMediator<BootScene> {
    static NAME: string;
    constructor(viewComponent: BootScene);
    listNotificationInterests(): string[];
    onRegister(): void;
    handleNotification(notificationName: string): void;
    private onLoadComplete();
}
