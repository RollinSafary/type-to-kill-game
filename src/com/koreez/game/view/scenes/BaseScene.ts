import { Scene } from 'phaser';

export default class BaseScene extends Scene {
  constructor(name: string) {
    super(name);
    (this.constructor as any)['BOOT'] = `${name}BootNotification`;
    (this.constructor as any)['PAUSE'] = `${name}PauseNotification`;
    (this.constructor as any)['RESUME'] = `${name}ResumeNotification`;
    (this.constructor as any)['SLEEP'] = `${name}SleepNotification`;
    (this.constructor as any)['WAKE'] = `${name}WakeNotification`;
    (this.constructor as any)['START'] = `${name}StartNotification`;
    (this.constructor as any)['SHUTDOWN'] = `${name}ShutdownNotification`;
    (this.constructor as any)['DESTROY'] = `${name}DestroyNotification`;
  }
}
