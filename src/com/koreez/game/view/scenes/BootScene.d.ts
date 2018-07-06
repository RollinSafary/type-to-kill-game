import BaseScene from './BaseScene';
export default class BootScene extends BaseScene {
    static NAME: string;
    static LOAD_COMPLETE_NOTIFICATION: string;
    static LOAD_COMPLETE_EVENT: string;
    constructor();
    preload(): void;
    create(): void;
}
