cc.Class({
    extends: cc.Component,

    properties: {
    

        animation: {
            default: null,
            type: cc.Animation
        }
    },

    onEnable: function () {
        var animation = this.animation;

        animation.on('play',      this.onPlay,        this);
        animation.on('stop',      this.onStop,        this);
        animation.on('lastframe', this.onLastFrame,   this);
        animation.on('finished',  this.onFinished,    this);
        animation.on('pause',     this.onPause,       this);
        animation.on('resume',    this.onResume,      this);
    },

    onDisable: function () {
        var animation = this.animation;

        animation.off('play',      this.onPlay,        this);
        animation.off('stop',      this.onStop,        this);
        animation.off('lastframe', this.onLastFrame,   this);
        animation.off('finished',  this.onFinished,    this);
        animation.off('pause',     this.onPause,       this);
        animation.off('resume',    this.onResume,      this);
    },

    view: function () {
        this.animation.play();
    },

    

});
