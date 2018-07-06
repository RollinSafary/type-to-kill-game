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
import BaseScene from './BaseScene';
var BootScene = /** @class */ (function (_super) {
    __extends(BootScene, _super);
    function BootScene() {
        return _super.call(this, BootScene.NAME) || this;
    }
    BootScene.prototype.preload = function () {
        this.load.image('red', 'assets/red.png');
        this.load.image('blue', 'assets/blue.png');
        this.load.image('green', 'assets/green.png');
        this.load.image('orange', 'assets/orange.png');
        this.load.image('pink', 'assets/pink.png');
        this.load.image('cyan', 'assets/cyan.png');
    };
    BootScene.prototype.create = function () {
        this.sys.events.emit(BootScene.LOAD_COMPLETE_EVENT);
    };
    BootScene.NAME = 'BootScene';
    BootScene.LOAD_COMPLETE_NOTIFICATION = BootScene.NAME + "LoadCompleteNotification";
    BootScene.LOAD_COMPLETE_EVENT = BootScene.NAME + "LoadCompleteEvent";
    return BootScene;
}(BaseScene));
export default BootScene;
//# sourceMappingURL=BootScene.js.map