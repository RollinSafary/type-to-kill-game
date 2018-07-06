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
import { Mediator } from '@koreez/pure-mvc';
import GameFacade from '../../GameFacade';
var BaseSceneMediator = /** @class */ (function (_super) {
    __extends(BaseSceneMediator, _super);
    function BaseSceneMediator(name, viewComponent) {
        var _this = _super.call(this, name, viewComponent) || this;
        _this.game = GameFacade.game;
        if (_this.viewComponent) {
            _this.registerEvents();
        }
        return _this;
    }
    BaseSceneMediator.prototype.setViewComponent = function (viewComponent) {
        _super.prototype.setViewComponent.call(this, viewComponent);
        this.registerEvents();
    };
    BaseSceneMediator.prototype.registerEvents = function () {
        this.viewComponent.sys.events.on('boot', this.onSceneBoot, this);
        this.viewComponent.sys.events.on('pause', this.onScenePause, this);
        this.viewComponent.sys.events.on('resume', this.onSceneResume, this);
        this.viewComponent.sys.events.on('sleep', this.onSceneSleep, this);
        this.viewComponent.sys.events.on('wake', this.onSceneWake, this);
        this.viewComponent.sys.events.on('start', this.onSceneStart, this);
        this.viewComponent.sys.events.on('shutdown', this.onSceneShutdown, this);
        this.viewComponent.sys.events.on('destroy', this.onSceneDestroy, this);
    };
    BaseSceneMediator.prototype.onSceneBoot = function () {
        this.sendNotification(this.viewComponent.constructor['BOOT']);
    };
    BaseSceneMediator.prototype.onScenePause = function () {
        this.sendNotification(this.viewComponent.constructor['PAUSE']);
    };
    BaseSceneMediator.prototype.onSceneResume = function () {
        this.sendNotification(this.viewComponent.constructor['RESUME']);
    };
    BaseSceneMediator.prototype.onSceneSleep = function () {
        this.sendNotification(this.viewComponent.constructor['SLEEP']);
    };
    BaseSceneMediator.prototype.onSceneWake = function () {
        this.sendNotification(this.viewComponent.constructor['WAKE']);
    };
    BaseSceneMediator.prototype.onSceneStart = function () {
        this.sendNotification(this.viewComponent.constructor['START']);
    };
    BaseSceneMediator.prototype.onSceneShutdown = function () {
        this.sendNotification(this.viewComponent.constructor['SHUTDOWN']);
    };
    BaseSceneMediator.prototype.onSceneDestroy = function () {
        this.sendNotification(this.viewComponent.constructor['DESTROY']);
    };
    return BaseSceneMediator;
}(Mediator));
export default BaseSceneMediator;
//# sourceMappingURL=BaseSceneMediator.js.map