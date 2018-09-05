
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.audioEngine.play(this.backAudio, false, 0.5);
    },

    start () {

    },

    // update (dt) {},
});
