import { Mediator } from '@koreez/pure-mvc';
import IGame from '../../IGame';
import BaseScene from './BaseScene';
export default abstract class BaseSceneMediator<T extends BaseScene> extends Mediator<T> {
    protected game: IGame;
    constructor(name: string, viewComponent: T);
    setViewComponent(viewComponent: T): void;
    protected registerEvents(): void;
    protected onSceneBoot(): void;
    protected onScenePause(): void;
    protected onSceneResume(): void;
    protected onSceneSleep(): void;
    protected onSceneWake(): void;
    protected onSceneStart(): void;
    protected onSceneShutdown(): void;
    protected onSceneDestroy(): void;
}
