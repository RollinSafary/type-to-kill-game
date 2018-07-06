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
import { Proxy } from '@koreez/pure-mvc';
var GameVOProxy = /** @class */ (function (_super) {
    __extends(GameVOProxy, _super);
    function GameVOProxy(data) {
        return _super.call(this, GameVOProxy.NAME, data) || this;
    }
    Object.defineProperty(GameVOProxy.prototype, "vo", {
        get: function () {
            return this.getData();
        },
        set: function (data) {
            this.setData(data);
        },
        enumerable: true,
        configurable: true
    });
    GameVOProxy.NAME = 'GameVOProxy';
    return GameVOProxy;
}(Proxy));
export default GameVOProxy;
//# sourceMappingURL=GameVOProxy.js.map