//var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        flagCon: 0
        
    },

    // use this for initialization
    onLoad: function () {
        //var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        //sprite.spriteFrame = this.spriteList[randomIdx];
        //this.node.color  = cc.color.RED;
        this.counter = 0;
        var tem3 = Math.random()*30;
                //ballMonster.size = cc.v2(tem3,tem3);
        this.node.height = tem3;
        this.node.width = tem3;
    },
    update: function (){
        
        this.counter=this.counter+1;
        //cc.log(this.node.height);
        if(parseInt(this.counter/5)*5==this.counter)
        {
            this.node.height = this.node.height-1;
            this.node.width = this.node.width -1;
        }
        if(this.counter>40) {
            this.node.destroy();
            this.counter=0;
        }
        

    }

});
