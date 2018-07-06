import { Scene, Time } from 'phaser';
export declare const delayRunnable: (scene: Scene, delay: number, runnable: (...args: any[]) => any, context: any, ...args: any[]) => Time.TimerEvent;
export declare const loopRunnable: (scene: Scene, delay: number, runnable: (...args: any[]) => any, context: any, ...args: any[]) => Time.TimerEvent;
export declare const removeRunnable: (runnable: Time.TimerEvent) => void;
