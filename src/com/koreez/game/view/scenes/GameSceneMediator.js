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
import GameFacade from '../../GameFacade';
import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';
import GameScene from './GameScene';
import { ALL_COLORS } from '../../constants/Constants';
var GameSceneMediator = /** @class */ (function (_super) {
    __extends(GameSceneMediator, _super);
    function GameSceneMediator(viewComponent) {
        return _super.call(this, GameSceneMediator.NAME, viewComponent) || this;
    }
    GameSceneMediator.prototype.listNotificationInterests = function () {
        return [BootScene.LOAD_COMPLETE_NOTIFICATION];
    };
    GameSceneMediator.prototype.handleNotification = function (notificationName) {
        switch (notificationName) {
            case BootScene.LOAD_COMPLETE_NOTIFICATION:
                var gameScene = new GameScene();
                GameFacade.game.scene.add(BootScene.NAME, gameScene);
                this.game.scene.start(GameScene.NAME);
                this.setViewComponent(this.game.scene.getScene(GameScene.NAME));
                this.setListeners();
                var sphereDatas = [];
                var spheresCount = 6;
                for (var i = 0; i < spheresCount; i++) {
                    var value = Phaser.Math.Between(1, 5);
                    var index = Phaser.Math.Between(0, ALL_COLORS.length - 1);
                    var color = ALL_COLORS[index];
                    sphereDatas.push({ color: color, value: value, moveEnabled: true });
                }
                this.viewComponent.createSpheres(sphereDatas);
                break;
            default:
                console.warn(notificationName + " is unhandled!");
                break;
        }
    };
    GameSceneMediator.prototype.onSphereSelected = function (sphere) {
        this.viewComponent.onSelect(sphere);
    };
    GameSceneMediator.prototype.onSphereUnselected = function (sphere) {
        this.viewComponent.onUnselect(sphere);
    };
    GameSceneMediator.prototype.onSphereKilled = function (sphere) {
        this.viewComponent.onKilled(sphere);
    };
    GameSceneMediator.prototype.setListeners = function () {
        this.viewComponent.events.on('sphereSelected', this.onSphereSelected, this);
        this.viewComponent.events.on('sphereUnselected', this.onSphereUnselected, this);
        this.viewComponent.events.on('sphereKilled', this.onSphereKilled, this);
    };
    GameSceneMediator.NAME = 'GameSceneMediator';
    return GameSceneMediator;
}(BaseSceneMediator));
export default GameSceneMediator;
//# sourceMappingURL=GameSceneMediator.js.map