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
import { SimpleCommand } from '@koreez/pure-mvc';
var StartupCommand = /** @class */ (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartupCommand.prototype.execute = function (notificationName) {
        notificationName;
    };
    return StartupCommand;
}(SimpleCommand));
export default StartupCommand;
//# sourceMappingURL=StartupCommand.js.map