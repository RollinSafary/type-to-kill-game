import IGame from './IGame';
export default class Game extends Phaser.Game implements IGame {
    constructor(config: GameConfig);
    resize(): void;
}
export interface IWindow extends Window {
    game: IGame;
}
