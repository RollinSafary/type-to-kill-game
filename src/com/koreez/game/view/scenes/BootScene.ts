import BaseScene from './BaseScene';

export default class BootScene extends BaseScene {
  public static NAME: string = 'BootScene';
  public static LOAD_COMPLETE_NOTIFICATION: string = `${
    BootScene.NAME
  }LoadCompleteNotification`;
  public static LOAD_COMPLETE_EVENT: string = `${
    BootScene.NAME
  }LoadCompleteEvent`;

  constructor() {
    super(BootScene.NAME);
  }

  public preload(): void {
    this.load.image('red', 'assets/red.png');
    this.load.image('blue', 'assets/blue.png');
    this.load.image('green', 'assets/green.png');
    this.load.image('orange', 'assets/orange.png');
    this.load.image('pink', 'assets/pink.png');
    this.load.image('cyan', 'assets/cyan.png');
  }

  public create(): void {
    this.sys.events.emit(BootScene.LOAD_COMPLETE_EVENT);
  }
}
