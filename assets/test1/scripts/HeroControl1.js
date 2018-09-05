
cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(200, 10000),
        gravity: -2100,
        drag: 1000,
        direction: 1,
        direction1: 1,
        jumpSpeed: 1600,
        num0: 3,
        num1: 3,
        colorList: {
            default: [],
            type: [cc.Color]     // type can also defined as an array to imporve readability
        },
        partNum: {
            default: [],
            type: [cc.Integer]
        },
        gameRoot: {
            default: null,
            type: cc.Node
        },
        bottomNode: {
            default: null,
            type: cc.Node
        },
        topNode: {
            default: null,
            type: cc.Node
        },
        floorAudio: {
            default: null,
            type: cc.AudioClip
        },
        flagPlay: 0,
        flagSoundGame: 0,
        camera: cc.Camera


    },

    onLoad: function () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
        
        this.gameRoot.on(cc.Node.EventType.TOUCH_START, function () {
            this.speed.y = this.jumpSpeed;    
            this.direction1 = 1;
            this.flag_bottom = 0;
            //this.gameRoot.maincamera.shake(0.05, 500);
        }, this);

        this.collisionX = 0;
        this.collisionY = 0;

        //this.flagSoundGame = 0;

        this.prePosition = cc.v2();
        this.preStep = cc.v2();

        this.touchingNumber = 0;

        this.flag_bottom = 0;

        this.speed.y = this.jumpSpeed;    
        this.direction1 = 1;
        this.flag_bottom = 0;
        this.direction = 1;
        this.starFirst = 1;

        this.firstPos = this.node.position;
        //cc.log('pos'+this.firstPos);

        

       
    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
    },
    
    onKeyPressed: function (event) {
        let keyCode = event.keyCode;
        switch(keyCode) {
            // case cc.macro.KEY.a:
            // case cc.macro.KEY.left:
            //     this.direction = -1;
            //     break;
            // case cc.macro.KEY.d:
            // case cc.macro.KEY.right:
            //     this.direction = 1;
            //     break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:                
                this.speed.y = this.jumpSpeed;    
                this.direction1 = 1;
                this.flag_bottom = 0;                
                break;
        }
    },
    
    onKeyReleased: function (event) {
        // let keyCode = event.keyCode;
        // switch(keyCode) {
        //     case cc.macro.KEY.z:
        //         this.camera.getComponent(cc.Animation).play('cameraAni');
        //     case cc.macro.KEY.left:
        //     case cc.macro.KEY.d:
        //     case cc.macro.KEY.right:
        //     break;
        // }
    },
    
    onCollisionEnter: function (other, self) {
        //this.node.color = cc.Color.BLUE;

        this.touchingNumber++;
        
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();

        var i = 0;
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x = otherPreAabb.xMax - this.node.parent.x;
                this.collisionX = -1;                        
                    
                this.colPointY = this.node.y;     //collision point              

                for(i = this.num1; i > 0; i--){
                    if (this.colPointY + this.gameRoot.height * 1/2<this.gameRoot.height * i/this.num1) {
                        this.partNum[1] = i;
                        this.partNum[0] = 0;
                        
                    }
                }
                
                this.gameRoot.getComponent('Follow').updateScene();
                
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                this.collisionX = 1;

                   
                this.colPointY = this.node.y;     //collision point

                for(i = this.num1; i > 0; i--){
                    if (this.colPointY + this.gameRoot.height * 1 / 2<this.gameRoot.height * i / this.num0) {
                        this.partNum[0] = i;
                        this.partNum[1] = 0;
                    }
                }
                
                this.gameRoot.getComponent('Follow').updateScene(); 
               
            }
           
            this.speed.x = (this.speed.x) * (-1);
            this.direction = (this.direction) * (-1);
            other.touchingX = true;

            return;
        }
        
        // 3rd step
        // forward y-axis, check whether collision on y-axis
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.collisionY = -1;
                
                ///
                cc.log('flag='+this.flagSoundGame);
                if (this.flagSoundGame == 0) cc.audioEngine.play(this.floorAudio, false, 0.5);
                this.bottomNode.getComponent(cc.Animation).play("BottomAni");                
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                this.collisionY = 1;

                if (this.flagSoundGame == 0) cc.audioEngine.play(this.floorAudio, false, 0.5);
                this.topNode.getComponent(cc.Animation).play("TopAni");                
                
            }            
                       
            this.speed.y = (this.speed.y) * (-1);
            this.direction1 = (this.direction1) * (-1);
            
            other.touchingY = true;
            
        }    
                
    },
    
    onCollisionStay: function (other, self) {
        
    },
    
    onCollisionExit: function (other) {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            
        }
    },
    
    update: function (dt) {
        if(this.flagPlay == 0) return;
        if(this.starFirst == 1){
            this.gameRoot.getComponent('Follow').spawnNewStar();
            this.starFirst = 0;
        }
       
        if (this.direction === 0) {
            if (this.speed.x > 0) {
                this.speed.x -= this.drag * dt;
                if (this.speed.x <= 0) this.speed.x = 0;
            }
            else if (this.speed.x < 0) {
                this.speed.x += this.drag * dt;
                if (this.speed.x >= 0) this.speed.x = 0;
            }
        }
        else {
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            var maxSpeedTem = this.maxSpeed.x * cc.winSize.width / cc.winSize.height / 0.5625;
            if (Math.abs(this.speed.x) > maxSpeedTem) {
                this.speed.x = this.speed.x > 0 ? maxSpeedTem : -maxSpeedTem;
            }
        }

        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }

        

        if (this.direction1 === 0) {
            if (this.speed.y > 0) {
                this.speed.y += this.gravity * dt - 8;
                if (this.speed.y <= 0) this.speed.y = 0;
            }
            else if (this.speed.y < 0) {
                this.speed.y += this.gravity * dt;
                if (this.speed.y >= 0) this.speed.y = 0;
            }
        }
        else {
            if (this.speed.y > 0) {
                this.speed.y += this.gravity * dt - 4;
                if (this.speed.y <= 0) this.speed.y = 0;
            }
            else if (this.speed.y <= 0) {
                this.speed.y += this.gravity * dt;
                if (this.speed.y >= 0) this.speed.y = 0;
            }
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }

        if (this.speed.y * this.collisionY > 0) {
            this.speed.y = 0;
        }
        
        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;

        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;
        
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;

        
    },
});
