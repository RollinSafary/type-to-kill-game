import { Scene, Time } from 'phaser';

export const delayRunnable: (
  scene: Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  ...args: any[]
) => Time.TimerEvent = (
  scene: Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  ...args: any[]
) => {
  return _addRunnable(scene, delay, runnable, context, false, ...args);
};

export const loopRunnable: (
  scene: Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  ...args: any[]
) => Time.TimerEvent = (
  scene: Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  ...args: any[]
) => {
  return _addRunnable(scene, delay, runnable, context, true, ...args);
};

const _addRunnable: (
  scene: Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  loop: boolean,
  ...args: any[]
) => Time.TimerEvent = (
  scene: Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  loop: boolean = false,
  ...args: any[]
) => {
  return scene.time.addEvent({
    delay,
    callback: runnable,
    callbackScope: context,
    loop,
    args,
  });
};

export const removeRunnable: (runnable: Time.TimerEvent) => void = (
  runnable: Time.TimerEvent,
) => {
  runnable.destroy();
};
