import { Facade } from '@koreez/pure-mvc';
import { gameConfig } from './constants/GameConfig';
import GameFacade from './GameFacade';
import IGame from './IGame';

export default class Game extends Phaser.Game implements IGame {
  constructor(config: GameConfig) {
    super(config);
    window.onresize = this.resize.bind(this);
    GameFacade.game = this;
    Facade.getInstance = GameFacade.getInstance;
    Facade.getInstance(GameFacade.NAME);
    this.resize();
  }

  public resize(): void {
    // const { width, height }: GameConfig = this.config;
    const width: number = (this.config as GameConfig).width as number;
    const height: number = (this.config as GameConfig).height as number;
    const scale: number = Math.min(
      window.innerHeight / height,
      window.innerWidth / width,
    );
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = width * scale + 'px';
    this.canvas.style.height = height * scale + 'px';
    this.canvas.style.left = (window.innerWidth - width * scale) * 0.5 + 'px';
    this.canvas.style.top = (window.innerHeight - height * scale) * 0.5 + 'px';
    if (this.context) {
      this.context.rect(0, 0, width, height);
      this.context.fillStyle = 'red';
      this.context.fill();
    }
    super.resize(gameConfig.width as number, gameConfig.height as number);
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    (window as IWindow).game = new Game(gameConfig);
  }
};

export interface IWindow extends Window {
  game: IGame;
}
