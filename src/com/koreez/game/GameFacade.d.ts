import { Facade } from '@koreez/pure-mvc';
import IGame from './IGame';
export default class GameFacade extends Facade {
    static NAME: string;
    static STARTUP: string;
    static game: IGame;
    static getInstance(key: string): GameFacade;
    initializeFacade(): void;
    sendNotification(notificationName: string, ...args: any[]): void;
    protected initializeModel(): void;
    protected initializeController(): void;
    protected initializeView(): void;
    private startup();
    private ready();
}
