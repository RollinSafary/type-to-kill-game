export var delayRunnable = function (scene, delay, runnable, context) {
    var args = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args[_i - 4] = arguments[_i];
    }
    return _addRunnable.apply(void 0, [scene, delay, runnable, context, false].concat(args));
};
export var loopRunnable = function (scene, delay, runnable, context) {
    var args = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args[_i - 4] = arguments[_i];
    }
    return _addRunnable.apply(void 0, [scene, delay, runnable, context, true].concat(args));
};
var _addRunnable = function (scene, delay, runnable, context, loop) {
    if (loop === void 0) { loop = false; }
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
    return scene.time.addEvent({
        delay: delay,
        callback: runnable,
        callbackScope: context,
        loop: loop,
        args: args,
    });
};
export var removeRunnable = function (runnable) {
    runnable.destroy();
};
//# sourceMappingURL=Utils.js.map