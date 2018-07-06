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
import { delayRunnable, removeRunnable } from '../../utils/Utils';
import BaseScene from './BaseScene';
import SphereView from '../components/SphereView';
import { ALL_COLORS } from '../../constants/Constants';
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, GameScene.NAME) || this;
        _this.spheres = [];
        _this.selectedSpheres = [];
        _this.unSelectedSpheres = [];
        _this.lines = [];
        return _this;
    }
    GameScene.prototype.create = function () {
        this.input.addPointer(9);
        this.graphics = this.add.graphics({
            lineStyle: { width: 2, color: 0xffffff },
            strokeStyle: { width: 2, color: 0xffffff }
        });
    };
    GameScene.prototype.createSpheres = function (sphereDatas) {
        for (var _i = 0, sphereDatas_1 = sphereDatas; _i < sphereDatas_1.length; _i++) {
            var data = sphereDatas_1[_i];
            var sphere = new SphereView(this, data.color, data.value, data.moveEnabled);
            this.add.existing(sphere);
            this.spheres.push(sphere);
        }
    };
    GameScene.prototype.update = function () {
        for (var _i = 0, _a = this.spheres; _i < _a.length; _i++) {
            var sphere = _a[_i];
            sphere.update();
        }
        this.drawLines();
    };
    GameScene.prototype.onSelect = function (sphere) {
        this.selectedSpheres.push(sphere);
    };
    GameScene.prototype.onUnselect = function (sphere) {
        var sphereIndex = this.selectedSpheres.indexOf(sphere);
        if (sphereIndex === -1) {
            return;
        }
        this.selectedSpheres.splice(sphereIndex, 1);
        this.unSelectedSpheres.push(sphere);
        if (this.clearUnSelectedSpheresRunnable) {
            removeRunnable(this.clearUnSelectedSpheresRunnable);
        }
        this.clearUnSelectedSpheresRunnable = delayRunnable(this, 200, this.clearUnSelectedSpheres, this);
        if (this.selectedSpheres.length === 0) {
            this.check();
        }
    };
    GameScene.prototype.onKilled = function (sphere) {
        var sphereIndex = this.spheres.indexOf(sphere);
        this.spheres.splice(sphereIndex, 1);
    };
    GameScene.prototype.clearUnSelectedSpheres = function () {
        this.unSelectedSpheres = [];
    };
    GameScene.prototype.check = function () {
        var selectedSpheres = this.unSelectedSpheres;
        if (selectedSpheres.length === 1) {
            return;
        }
        var color = selectedSpheres[0].frame.texture.key;
        for (var _i = 0, selectedSpheres_1 = selectedSpheres; _i < selectedSpheres_1.length; _i++) {
            var sphere = selectedSpheres_1[_i];
            if (sphere.frame.texture.key !== color) {
                return;
            }
        }
        for (var _a = 0, selectedSpheres_2 = selectedSpheres; _a < selectedSpheres_2.length; _a++) {
            var sphere = selectedSpheres_2[_a];
            var newColor = this.generateColor();
            var index = selectedSpheres.indexOf(sphere);
            if (!newColor) {
                newColor = ALL_COLORS[Phaser.Math.Between(0, ALL_COLORS.length - 1)];
                this.selectedSpheres.splice(index, 1);
            }
            sphere.changeValues(index + 1, newColor);
        }
    };
    GameScene.prototype.generateColor = function () {
        var colorsArray = [];
        for (var _i = 0, _a = this.spheres; _i < _a.length; _i++) {
            var sphere = _a[_i];
            var color = sphere.frame.texture.key;
            if (this.unSelectedSpheres.indexOf(sphere) !== -1 || colorsArray.indexOf(color) !== -1) {
                continue;
            }
            colorsArray.push(color);
        }
        var randomIndex = Phaser.Math.Between(0, colorsArray.length);
        return colorsArray[randomIndex];
    };
    GameScene.prototype.drawLines = function () {
        this.graphics.clear();
        if (this.selectedSpheres.length <= 1) {
            return;
        }
        for (var i = 0; i < this.selectedSpheres.length; i++) {
            var sphere1 = this.selectedSpheres[i];
            var sphere2 = this.selectedSpheres[i + 1] || this.selectedSpheres[0];
            var line = new Phaser.Geom.Line(sphere1.x, sphere1.y, sphere2.x, sphere2.y);
            this.graphics.strokeLineShape(line);
            this.graphics.strokeCircle(sphere1.x, sphere1.y, sphere1.width);
            this.graphics.strokeCircle(sphere2.x, sphere2.y, sphere2.width);
            this.lines.push(line);
        }
    };
    GameScene.NAME = 'GameScene';
    return GameScene;
}(BaseScene));
export default GameScene;
//# sourceMappingURL=GameScene.js.map