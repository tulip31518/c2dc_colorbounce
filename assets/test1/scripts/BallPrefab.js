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
    },
    update: function (){
        //if(this.flagCon==0){
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
