var WallType = cc.Enum({
   Left: 0,
   Right: 1,
   Top: 2,
   Bottom: 3,
   TitleName: 4,
   Display: 5
});

cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: WallType.Left,
            type: WallType
        },
        
        width: 5
    },

    // use this for initialization
    start: function () {
        // var collider = this.getComponent(cc.BoxCollider);
        // if (!collider) {
        //     return;
        // }
        
        var node = this.node;

        var type = this.type;
        
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        
        var wallWidth = this.width;
        
        if (type === WallType.Left) {
            node.height = height;
            node.width = wallWidth;
            node.x = (-1)*width/2 + 8;
            node.y = 0;
        }
        else if (type === WallType.Right) {
            node.height = height;
            node.width = wallWidth;
            node.x = width/2 - 8;
            node.y = 0;
        }
        else if (type === WallType.Top) {
            node.width = width;
            node.height = wallWidth;
            node.x = 0;
            node.y = height/2 - wallWidth / 2;
        }
        else if (type === WallType.Bottom) {
            node.width = width;
            node.height = wallWidth;
            node.x = 0;
            node.y = (-1)*height/2 + wallWidth / 2;
        }
        else if (type === WallType.TitleName) {
            
            node.height = height / 3;
            node.width = node.height * 1.509;
            node.x = 0;
            node.y = height / 2 - node.height / 2;
        }
        else if (type === WallType.Display) {
            var rate = node.height / node.width;
            if (rate < height / width){
                node.width = width;
                node.height = width * rate;
            }            
        }
        
        //collider.size = node.getContentSize();
    }
});
