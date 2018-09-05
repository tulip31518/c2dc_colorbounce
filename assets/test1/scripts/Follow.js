cc.Class({

    extends: cc.Component,

    properties: {

        target: {
            default: null,
            type: cc.Node
        },

        wallLeft: {
            default: null,
            type: cc.Node
        },
        
        wallRight: {
            default: null,
            type: cc.Node
        },

        wallBottom: {
            default: null,
            type: cc.Node
        },

        wallTop: {
            default: null,
            type: cc.Node
        },

        flagUpdate: 1,
        
        wallPrefab: {
            default:null,
            type: cc.Prefab
        },

        ballPrefab: {
            default:null,
            type: cc.Prefab
        },

        starPrefab: {
            default:null,
            type: cc.Prefab
        },

        ballPrefab1: {
            default:null,
            type: cc.Prefab
        },

        rootFolder: {
            default: null,
            type: cc.Node
        },
        
        rootFolderOver: {
            default: null,
            type: cc.Node
        },

        posFolder1: {
            default: null,
            type: cc.Node
        },

        posFolder2: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        countLeft: 0,

        countRight: 0,

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },

        backAudio: {
            default: null,
            type: cc.AudioClip
        },

        wrongAudio: {
            default: null,
            type: cc.AudioClip
        },

        outAudio: {
            default: null,
            type: cc.AudioClip
        },

        player: {
            default: null,
            type: cc.Node
        },

        ballPos: {
            default:[],
            type: [cc.Integer]
        }, 

        score: -1,

        shadowNode: {
            default:null,
            type: cc.Node
        },

        btnManager: {
            default: null,
            type: cc.Node
        },

        camera: cc.Camera,
        mainColor : 0,
        display: cc.Sprite,
        btnBack: cc.Button,
        audioBtn: cc.Button,
        audio1Btn: cc.Button,
        playBtn: cc.Button,
        callBtn: cc.Button,
    },

    spawnNewStar: function() {
        
        var newStar = cc.instantiate(this.starPrefab);
        newStar.parent = this.rootFolderOver;
        newStar.position = this.getNewStarPosition();

        //this.node.addChild(newStar);
        //newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('StarPrefab').game = this;
        
        
    },

    getNewStarPosition: function () {
        var randX = 0;
        var randY = parseInt((Math.random() - 0.5) * this.node.height / 2);
        
        return cc.v2(randX, randY);
    },

    onLoad: function () {       
        
        
        this.smallChipColor = {};
        this.flagUpdate = 1;        
        this.flagOver = 0;
        this.rightPos = -1;
        this.leftPos = -1;
        this.count1 = 0;
        this.flagFirst = 0;
        this.flagStart = 1;
        this.flagColl = 0;
        this.score = -1;
        this.countLeft = 0;
        this.countRight = 0;
        
        
        this.wallColor = {};        
        var i;
        for(i = 0;i<2;i++){
            this.wallColor[i] = {};
        }         

        
        
        this.numRight = 3;
        this.numLeft = 3;

        //this.btnBack.node.active = false;
        this.updateScene();     
    },

    start () {
        this._isShow = false;
        this.display.node.active = this._isShow;

        var width = cc.winSize.width;
        var height = cc.winSize.height;

        this.btnBack.node.x = (width / 2 - width / 6) * (-1) + 10;
        this.btnBack.node.y = (height / 2 - height / 10.6) * (-1);

       
        this.btnBack.node.active = false;
        this.tex = new cc.Texture2D();
    },

    _messageSharecanvas (type, text) {
        // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
        let openDataContext = wx.getOpenDataContext();
        console.log('type = ' + type);
        console.log('text = ' + text);
        openDataContext.postMessage({
            type: type || 'friends',
            text: text,
        });
    },

    gainScore: function () {
        this.score += 1;
        this.scoreDisplay.string = this.score.toString();
        if (this.target.getComponent('HeroControl1').flagSoundGame == 0)  cc.audioEngine.play(this.scoreAudio, false, 0.5);
    },

    gameOver: function () {

        var i = 0;
        var col = this.mainColor;

        this.camera.getComponent(cc.Animation).play('cameraAni');

        for(i = 0; i<60; i++){
            var ballMonster = cc.instantiate(this.ballPrefab1);
            ballMonster.parent = this.rootFolderOver;
            var tem3 = (Math.random()-0.5)*100;
            var tem4 =(Math.random()-0.5)*100;
            ballMonster.color = this.target.getComponent('HeroControl1').colorList[col];
            ballMonster.position = cc.v2(this.target.position.x+tem3,this.target.position.y + tem4);//.x + tem3;
            
            
        } 
        
        if (this.target.getComponent('HeroControl1').flagSoundGame == 0) cc.audioEngine.play(this.wrongAudio, false, 0.5);
        
      
        this.target.color = this.target.getComponent('HeroControl1').colorList[col];               
        
        this.target.getComponent('HeroControl1').speed.x = 0;
        this.target.getComponent('HeroControl1').speed.y = 0;
        this.target.getComponent('HeroControl1').gravity = 0;
        this.target.getComponent('HeroControl1').drag = 0;
        this.target.getComponent('HeroControl1').jumpSpeed = 0;
        this.ballPos = [0,0];
        
        //this.player.pauseAllActions();            
        //cc.director.loadScene('platform');  
          
        //cc.Animation.stopAll();   
        
        //this.onDisplay();        
    },

    onDisplay: function(){

        var i,j;
        var n;
        this.rootFolder.removeAllChildren(true);
        var unitChip; 
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        for(i = 0; i < 32; i++){
    
            var monster = cc.instantiate(this.wallPrefab);
            monster.getComponent('MonsterPrefab1').preNumber = i;
            unitChip = 32 / this.numRight;
            if(this.ballPos[0] != 0 && i >= (this.ballPos[0] - 1) * unitChip && i < this.ballPos[0] * unitChip){
                monster.getComponent('MonsterPrefab1').flagVib = 1;
            }
            else monster.getComponent('MonsterPrefab1').flagVib = 0;
            
            n = this.smallChipColor[i];
            monster.color = this.target.getComponent('HeroControl1').colorList[n];
            monster.parent = this.rootFolder;
            
            monster.height = height;
            monster.position = cc.v2(width/2 - 16,this.posFolder1.position.y);
        } 
        for(i = 32; i < 64; i++){
            unitChip = 32 / this.numLeft;
    
            var monster = cc.instantiate(this.wallPrefab);
            monster.getComponent('MonsterPrefab1').preNumber = i;

            if(this.ballPos[1] != 0 && i - 32 >= (this.ballPos[1] - 1) * unitChip && i - 32 < this.ballPos[1] * unitChip){
                monster.getComponent('MonsterPrefab1').flagVib = 1;
            }
            else monster.getComponent('MonsterPrefab1').flagVib = 0;

            n = this.smallChipColor[i];
            monster.color = this.target.getComponent('HeroControl1').colorList[n];
            monster.parent = this.rootFolder;
            monster.height = height;
            monster.position = cc.v2((-1)*width/2 + 16,this.posFolder2.position.y);

        }

        if(this.flagOver != 1)  this.gainScore();
                
    },

    update: function (dt) {
        //cc.audioEngine.pauseAll();
        //this.player.stopAllActions();
        var alpha = 0;
        var distance = 0;
            
        if(this.flagOver == 0){
            var col = this.mainColor;
            this.target.color = this.target.getComponent('HeroControl1').colorList[col];
            this.count1 = this.count1+1;
            if (this.count1 > 4){
                var ballMonster = cc.instantiate(this.ballPrefab);    
                ballMonster.parent = this.rootFolder;
                ballMonster.position = cc.v2(this.target.position.x + 15,this.target.position.y + 15);
                
                ballMonster.color = this.target.getComponent('HeroControl1').colorList[col];
                this.count1 = 0;
            }
            // alpha = Math.atan(this.target.position.y / this.target.position.x);
            // distance = Math.sqrt(Math.pow(this.target.position.x,2),Math.pow(this.target.position.y,2));
           
            this.shadowNode.position = cc.v2(this.target.position.x + 2, this.target.position.y - 2);

        }
        else{
            this.flagFirst = this.flagFirst + 1;
            var col = this.mainColor;
            this.target.color = this.target.getComponent('HeroControl1').colorList[col];
            if (this.flagFirst > 20 && this.flagFirst < 30) {
                //cc.audioEngine.stopAll();
                //cc.director.loadScene('platform');
                this.flagFirst = 40;

                this._messageSharecanvas('updateMaxScore', '' + this.score);

                this.share();

                this.btnManager.getComponent('ButtonCtrl').btnShow();
            }
        }

        this._updaetSubDomainCanvas();
        
    },

    share(){
       cc.loader.loadRes("texture/share",function(err,data){
            wx.shareAppMessage({
                title: "Enjoy Color Bounce",
                imageUrl: data.url,
                success(res){
                    console.log(res)
                },
                fail(res){
                    console.log(res)
                }
            })
        });
    },


    // _messageSharecanvas (type, text) {
    //     // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
    //     let openDataContext = wx.getOpenDataContext();
    //     console.log('type = ' + type);
    //     console.log('text = ' + text);
    //     openDataContext.postMessage({
    //         type: type || 'friends',
    //         text: text,
    //     });
    // },
    
    updateScene : function (){

        var chipNum = {};
        chipNum[0] = this.target.getComponent('HeroControl1').num0;
        chipNum[1] = this.target.getComponent('HeroControl1').num1;
        this.numRight = chipNum[0];
        this.numLeft = chipNum[1];
        var i = 0;
        var j = 0;
        var k = 0;

        var colX = this.target.getComponent('HeroControl1').collisionX;
        this.ballPos = this.target.getComponent('HeroControl1').partNum;   

        if(colX == -1){
            tem1 = this.ballPos[1] - 1;
            if(this.wallColor[1][tem1] == this.mainColor){                
                this.countLeft = this.countLeft+1;                
                this.leftPos = tem1;    
                if(this.countLeft > 2){
                    this.target.getComponent('HeroControl1').num1 = this.target.getComponent('HeroControl1').num1 + 1;
                    this.countLeft = 0;
                    this.flagUpdate = 1;
                }            
            }
            else {
                this.flagOver = 1;
                this.countLeft = 0;
                this.gameOver();
                return;
            }
        }   
        if(colX == 1){
            tem1 = this.ballPos[0] - 1;
            if(this.wallColor[0][tem1] == this.mainColor){
                this.countRight = this.countRight + 1;
                this.rightPos = tem1;
                if(this.countRight > 2){
                    this.target.getComponent('HeroControl1').num0 = this.target.getComponent('HeroControl1').num0 + 1;
                    this.countRight = 0;
                    this.flagUpdate = 1;
                }
            }
            else {
                this.flagOver = 1;
                this.countRight = 0;
                this.gameOver();
                return;
            }
        }
        
        this.wallColor = {};
        
        for(i = 0; i < 2; i++){
            this.wallColor[i] = {};
            this.temp = {};
    
            for(j = 0; j < chipNum[i]; j++){
                
                this.wallColor[i][j] = parseInt(Math.random() * chipNum[i]);
                if(this.wallColor[i][j] == chipNum[i]) this.wallColor[i][j] = chipNum[i] - 1;
    
                if(j > 0){
                    while(1){                        
                        if(this.wallColor[i][j-1] != this.wallColor[i][j]) break;                          
                        if (this.wallColor[i][j] == 0) this.wallColor[i][j] = chipNum[i]-1;
                        else this.wallColor[i][j] = this.wallColor[i][j] - 1;
                    }
                }
            }
        }

        j = 0;
        var unit = 32/chipNum[0];
        for (i = 0; i < 32; i++){
            if(i >= j * unit && i < (j + 1) * unit) this.smallChipColor[i] = this.wallColor[0][j];
            else if(j < chipNum[0] - 1){
                j++;
                this.smallChipColor[i] = this.wallColor[0][j];
            }
            else {
                this.smallChipColor[i] = this.wallColor[0][chipNum[0] - 1];
            }
        }
        j = 0;
        unit = 32/chipNum[1];
        for (i = 32;i<64;i++){
            if(i-32 >= j*unit && i-32<(j+1)*unit) this.smallChipColor[i] = this.wallColor[1][j];
            else if(j<chipNum[1]-1){
                j++;
                this.smallChipColor[i] = this.wallColor[1][j];
            }
            else this.smallChipColor[i] = this.wallColor[1][chipNum[1]-1];
        }
        this.onDisplay();
    
        var res1;
        var tem1;
        if(this.flagStart == 1){
            this.flagStart = 0;           
            res1 = Math.round(Math.random()*(chipNum[0] - 1));            
            this.mainColor = this.wallColor[0][res1];
        }
        else{
            if(colX == -1){
            
                res1 = Math.round(Math.random()*(chipNum[0] - 1));
                this.mainColor = this.wallColor[0][res1];
            }
            if(colX == 1){                
                res1 = Math.round(Math.random()*(chipNum[1] - 1));
                this.mainColor = this.wallColor[1][res1];
            }
        }
                      

    },

    onClickLobbyBack () {
        this._isShow = false;
        this.btnBack.node.active = false;
        this.display.node.active = this._isShow;
        this.audio1Btn.node.active = true;
        this.audioBtn.node.active = true;
        this.playBtn.node.active = true;
        this.callBtn.node.active = true;
    },

    onClickRanking () {

        //this.callBtn.getComponent(cc.Animation).play("playButtonAni");

        this.callBtn.getComponent(cc.Animation).play("playButtonAni"),
        this.callBtn.node.runAction(cc.sequence(
            cc.delayTime(0.5),
            cc.callFunc(this.callback_result_in.bind(this))
        ));
        
        
        

        // this.btnPlay.node.active = false;
        // this.btnInvite.node.active = false;
        // this.btnRank.node.active = false;
        // this.btnBack.node.active = false;
        // this._disableButtons();
    },
    callback_result_in (){
        this._isShow = true;
        // 发消息给子域
        this._messageSharecanvas();
        
        this.display.node.active = this._isShow;
        this.btnBack.node.active = true;
        this.audio1Btn.node.active = false;
        this.audioBtn.node.active = false;
        this.playBtn.node.active = false;
        this.callBtn.node.active = false;
    },

    _updaetSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    //update () {
        //this._updaetSubDomainCanvas();
    //},

});
