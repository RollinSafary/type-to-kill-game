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
import { Scene } from 'phaser';
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(name) {
        var _this = _super.call(this, name) || this;
        _this.constructor['BOOT'] = name + "BootNotification";
        _this.constructor['PAUSE'] = name + "PauseNotification";
        _this.constructor['RESUME'] = name + "ResumeNotification";
        _this.constructor['SLEEP'] = name + "SleepNotification";
        _this.constructor['WAKE'] = name + "WakeNotification";
        _this.constructor['START'] = name + "StartNotification";
        _this.constructor['SHUTDOWN'] = name + "ShutdownNotification";
        _this.constructor['DESTROY'] = name + "DestroyNotification";
        return _this;
    }
    return BaseScene;
}(Scene));
export default BaseScene;
//# sourceMappingURL=BaseScene.js.map