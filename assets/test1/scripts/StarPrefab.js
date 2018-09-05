cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: {
            default: null,
            serializable: false
        },
        starAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {

    },


    getPlayerDistance: function () {
        var playerPos = this.game.target.getPosition();
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
        this.game.spawnNewStar();
        if (this.game.target.getComponent('HeroControl1').flagSoundGame == 0) cc.audioEngine.play(this.starAudio, false, 0.5);
        //this.game.gainScore();
        this.node.destroy();
    },

    // called every frame
    update: function (dt) {
        this.node.rotation = this.node.rotation + 5;
        if (this.node.rotation == 360) this.node.rotation = 0;
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
        if (this.game.flagOver == 1) this.node.destroy();

    },
});
