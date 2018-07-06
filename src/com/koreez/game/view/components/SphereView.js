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
import { GameObjects } from 'phaser';
import { gameConfig } from '../../constants/GameConfig';
var SphereView = /** @class */ (function (_super) {
    __extends(SphereView, _super);
    function SphereView(scene, key, value, moveEnabled) {
        var _this = _super.call(this, scene, 0, 0, key) || this;
        _this.value = value;
        _this.moveEnabled = moveEnabled;
        _this.depth = 2 * value;
        _this.createText();
        _this.setValues();
        _this.setListeners();
        return _this;
    }
    SphereView.prototype.update = function () {
        if (!this.moveEnabled) {
            return;
        }
        if (this.x >= this.endX || this.x <= this.startX) {
            this.xMultiplier *= -1;
        }
        if (this.y >= this.endY || this.y <= this.startY) {
            this.yMultiplier *= -1;
        }
        this.x += this.xSpeed / 10 * this.xMultiplier;
        this.y += this.ySpeed / 10 * this.yMultiplier;
        if (this.text) {
            this.text.x = this.x;
            this.text.y = this.y;
        }
    };
    SphereView.prototype.enableMove = function () {
        this.moveEnabled = true;
    };
    SphereView.prototype.disableMove = function () {
        this.moveEnabled = false;
    };
    SphereView.prototype.changeValues = function (value, color) {
        var _this = this;
        this.number -= value;
        this.depth = this.number;
        this.text.depth = this.number + 1;
        if (this.number <= 0) {
            this.killSphere();
            return;
        }
        this.setTexture(color);
        this.updateText();
        this.scene.tweens.killTweensOf([this, this.text]);
        this.scene.tweens.add({
            targets: [this, this.text],
            duration: 100,
            scaleX: 1.5,
            scaleY: 1.5,
            onComplete: function () {
                _this.scene.tweens.add({
                    targets: [_this, _this.text],
                    duration: 100,
                    scaleX: 1,
                    scaleY: 1,
                });
            }
        });
    };
    SphereView.prototype.preDestroy = function () {
        this.text.destroy();
    };
    SphereView.prototype.setListeners = function () {
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.scene.input.on('dragstart', this.onDragStart, this);
        this.scene.input.on('dragend', this.onDragEnd, this);
        this.scene.input.on('drag', this.onDrag, this);
    };
    SphereView.prototype.onDragStart = function (pointer, target) {
        var _this = this;
        if (target !== this) {
            return;
        }
        this.activePointer = pointer;
        this.scene.tweens.killTweensOf(this);
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            scaleX: 1.3,
            scaleY: 1.3,
            onStart: function () {
                _this.moveEnabled = false;
            },
            onComplete: function () {
                _this.scene.events.emit('sphereSelected', _this);
            }
        });
    };
    SphereView.prototype.onDrag = function (pointer, target) {
        if (target !== this || this.activePointer !== pointer) {
            return;
        }
        // this.x = dragX
        // this.x = dragY
    };
    SphereView.prototype.onDragEnd = function (pointer, target) {
        var _this = this;
        if (target !== this || this.activePointer !== pointer) {
            return;
        }
        this.scene.tweens.killTweensOf(this);
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            scaleX: 1,
            scaleY: 1,
            onStart: function () {
                _this.moveEnabled = true;
                _this.scene.events.emit('sphereUnselected', _this);
            }
        });
    };
    SphereView.prototype.createText = function () {
        this.text = this.scene.add.text(this.x, this.y, this.value + '', {
            fontSize: "32px",
            fontFamily: "Arial",
            color: "#ffffff",
            align: "center"
        });
        this.text.depth = this.depth + 1;
        this.text.setOrigin(0.5, 0.5);
    };
    SphereView.prototype.updateText = function () {
        this.text.setText(this.number + '');
    };
    SphereView.prototype.killSphere = function () {
        var _this = this;
        this.scene.tweens.killTweensOf(this);
        this.scene.tweens.add({
            targets: [this, this.text],
            duration: 400,
            scaleX: 0,
            scaleY: 0,
            onStart: function () {
                _this.scene.events.emit('sphereKilled', _this);
            },
            onComplete: function () {
                _this.destroy();
            }
        });
    };
    SphereView.prototype.setValues = function () {
        var temp = Math.random() * 0.05;
        this.ySpeed = 30 + temp * 600;
        this.xSpeed = 20 + temp * 400;
        this.xMultiplier = Math.random() * 10 > 5 ? 1 : -1;
        this.yMultiplier = Math.random() * 10 > 5 ? 1 : -1;
        var distance = this.width * 1.3 / 2;
        this.startX = distance;
        this.endX = gameConfig.width - distance;
        this.startY = distance;
        this.endY = gameConfig.height - distance;
        this.updatePosition();
    };
    SphereView.prototype.updatePosition = function () {
        this.x = Phaser.Math.Between(this.startX, this.endX);
        this.y = Phaser.Math.Between(this.startY, this.endY);
    };
    Object.defineProperty(SphereView.prototype, "number", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    return SphereView;
}(GameObjects.Sprite));
export default SphereView;
//# sourceMappingURL=SphereView.js.map