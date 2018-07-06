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
import BootSceneMediator from './view/scenes/BootSceneMediator';
import GameSceneMediator from './view/scenes/GameSceneMediator';
import StartupCommand from './controller/StartupCommand';
var consoleArgs = [
    "",
    "background: " + '#c8c8ff',
    "background: " + '#9696ff',
    "color: " + '#ffffff' + "; background: " + '#0000ff' + ";",
    "background: " + '#9696ff',
    "background: " + '#c8c8ff',
];
var GameFacade = /** @class */ (function (_super) {
    __extends(GameFacade, _super);
    function GameFacade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameFacade.getInstance = function (key) {
        if (!Facade.instanceMap[key]) {
            var instance = new GameFacade(key);
            Facade.instanceMap[key] = instance;
        }
        return Facade.instanceMap[key];
    };
    GameFacade.prototype.initializeFacade = function () {
        GameFacade.game.events.once('ready', this.ready, this);
    };
    GameFacade.prototype.sendNotification = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        consoleArgs[0] = "%c %c %c " + notificationName + (args.length > 0 ? ' | ' + args : '') + " %c %c ";
        console.log.apply(console, consoleArgs);
        _super.prototype.sendNotification.apply(this, [notificationName].concat(args));
    };
    GameFacade.prototype.initializeModel = function () {
        _super.prototype.initializeModel.call(this);
    };
    GameFacade.prototype.initializeController = function () {
        _super.prototype.initializeController.call(this);
        this.registerCommand(GameFacade.STARTUP, StartupCommand);
    };
    GameFacade.prototype.initializeView = function () {
        _super.prototype.initializeView.call(this);
        this.registerMediator(new BootSceneMediator(null));
        this.registerMediator(new GameSceneMediator(null));
    };
    GameFacade.prototype.startup = function () {
        this.sendNotification(GameFacade.STARTUP);
    };
    GameFacade.prototype.ready = function () {
        _super.prototype.initializeFacade.call(this);
        this.startup();
    };
    GameFacade.NAME = 'GameFacade';
    GameFacade.STARTUP = GameFacade.NAME + "StartUp";
    return GameFacade;
}(Facade));
export default GameFacade;
//# sourceMappingURL=GameFacade.js.map