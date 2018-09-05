//var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
        preNumber: 6,
        flagVib: 0,
        counter1: 0
    },

    // use this for initialization
    onLoad: function () {
        //var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[this.preNumber];
        this.countNum = 0 ;
      
        if (this.flagVib==1){
            this.getComponent(cc.Animation).play('prefabAni');
            this.flagVib=0;
        }

        
    },
    update: function (){
        //this.counter1 = this.counter1 + 1;
        
        // if(this.flagVib == 1){
        //     this.node.
        // }


       

    }
    

});
