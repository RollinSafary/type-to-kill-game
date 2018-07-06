var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Facade } from '@koreez/pure-mvc';
import { gameConfig } from './constants/GameConfig';
import GameFacade from './GameFacade';
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        var _this = _super.call(this, config) || this;
        window.onresize = _this.resize.bind(_this);
        GameFacade.game = _this;
        Facade.getInstance = GameFacade.getInstance;
        Facade.getInstance(GameFacade.NAME);
        _this.resize();
        return _this;
    }
    Game.prototype.resize = function () {
        // const { width, height }: GameConfig = this.config;
        var width = this.config.width;
        var height = this.config.height;
        var scale = Math.min(window.innerHeight / height, window.innerWidth / width);
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
        _super.prototype.resize.call(this, gameConfig.width, gameConfig.height);
    };
    return Game;
}(Phaser.Game));
export default Game;
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        window.game = new Game(gameConfig);
    }
};
//# sourceMappingURL=Game.js.map