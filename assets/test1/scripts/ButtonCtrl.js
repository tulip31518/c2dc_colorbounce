//const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
        buttonPlay: {
            default: null,
            type: cc.Button
        },
        buttonChall: {
            default: null,
            type: cc.Button
        },
        buttonAudio: {
            default: null,
            type: cc.Button
        },
        buttonAudio1: {
            default: null,
            type: cc.Button
        },
        
        labelMaxScore: {
            default: null,
            type: cc.Label
        },
        backAudio: {
            default: null,
            type: cc.AudioClip
        },
        labelCur: {
            default: null,
            type: cc.Label
        },
        titleNode: {
            default: null,
            type: cc.Node
        },
        targetNode: {
            default: null,
            type: cc.Node
        },
        shadowNode: {
            default: null,
            type: cc.Node
        },
        gameNode: {
            default: null,
            type: cc.Node
        },
        playState: 0,
        
    },
    onLoad: function() {
        cc.audioEngine.play(this.backAudio, true, 0.5);

        //cc.log('posi'+this.buttonPlay.node.position);
        this.flagSound = 0;

        this.posPlay = this.buttonPlay.node.position.y;
        this.posAudio = this.buttonAudio.node.position.y;
        this.posAudio1 = this.buttonAudio1.node.position.y;
        this.posChall = this.buttonChall.node.position.y;
        this.posTitle = this.titleNode.position.y;
        
        this.buttonPlay.getComponent(cc.Animation).stop("playButtonAni");


    },

    onBtnPlayClicked: function() {
        this.buttonPlay.getComponent(cc.Animation).play("playButtonAni");
        
        this.lobbyAppearAction = cc.moveBy(0.1, cc.v2(0, 480));
        this.buttonPlay.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));
        this.buttonAudio.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));
        this.buttonAudio1.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));
        this.buttonChall.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));
        this.titleNode.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));


        //cc.log("dfg="+this.titleNode.runAction(cc.sequence(cc.fadeOut(0.7), cc.delayTime(0.1))));
        this.playState = 1;
        cc.delayTime(0.3);
        this.targetNode.getComponent('HeroControl1').flagPlay = 1;

        this.gameNode.getComponent('Follow').flagFirst = 0;
        this.targetNode.getComponent('HeroControl1').num0 = 3;
        this.targetNode.getComponent('HeroControl1').num1 = 3;
        this.targetNode.getComponent('HeroControl1').onLoad();
        this.gameNode.getComponent('Follow').onLoad();

        this.targetNode.getComponent('HeroControl1').direction = 1;
        
        this.targetNode.getComponent('HeroControl1').gravity = -2100;
        this.targetNode.getComponent('HeroControl1').drag = 1000;
        this.targetNode.getComponent('HeroControl1').jumpSpeed = 1000;
        this.targetNode.getComponent('HeroControl1').speed.y = this.targetNode.getComponent('HeroControl1').jumpSpeed;
        
    },

    btnShow: function() {
        
        //cc.log("asdad"+this.buttonPlay.node.position.x);
        this.lobbyAppearAction = cc.moveTo(0.1, cc.v2(0, this.posPlay));
        this.buttonPlay.node.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(0, this.posPlay)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));
        this.lobbyAppearAction = cc.moveTo(0.1, cc.v2(0, this.posAudio1));
        if (this.flagSound == 1) this.buttonAudio.node.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(0, this.posAudio1)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));
        if (this.flagSound == 0) this.buttonAudio1.node.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(0, this.posAudio1)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));
        this.lobbyAppearAction = cc.moveTo(0.1, cc.v2(0, this.posChall));
        this.buttonChall.node.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(0, this.posChall)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));
       
        this.lobbyAppearAction = cc.moveTo(0.1, cc.v2(0, this.posTitle));
        this.titleNode.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(0, this.posTitle)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));

        //cc.log("dfg="+this.titleNode.runAction(cc.sequence(cc.fadeOut(0.7), cc.delayTime(0.1))));
        this.playState = 0;
        cc.delayTime(0.3);
        this.targetNode.getComponent('HeroControl1').flagPlay = 0;
        this.targetNode.position = this.targetNode.getComponent('HeroControl1').firstPos;
        this.shadowNode.position = cc.v2(this.targetNode.position.x + 2, this.targetNode.position.y - 2);

    },

    

    

    


    


    onBtnAudioClicked: function() {
        this.buttonAudio1.getComponent(cc.Animation).play("playButtonAni");
        cc.audioEngine.resumeAll();

        this.lobbyAppearAction = cc.moveBy(0.1, cc.v2(0, 480));
        this.buttonAudio.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));

        this.lobbyAppearAction = cc.moveTo(0.1, cc.v2(0, this.posAudio1));
        this.buttonAudio1.node.runAction(cc.sequence(cc.moveTo(0.01, cc.v2(0, this.posAudio1)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));

        this.flagSound = 0;
        this.targetNode.getComponent('HeroControl1').flagSoundGame = 0;
   
    },
    onBtnAudioClicked1: function() {
        this.buttonAudio.getComponent(cc.Animation).play("playButtonAni");
        cc.audioEngine.pauseAll();

        this.lobbyAppearAction = cc.moveBy(0.1, cc.v2(0, 480));
        this.buttonAudio1.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.delayTime(0.05), cc.moveBy(0.1, cc.v2(0, 480)), this.lobbyAppearAction));

        this.lobbyAppearAction = cc.moveTo(0.1, cc.v2(0, this.posAudio1));
        this.buttonAudio.node.runAction(cc.sequence(cc.moveTo(0.01, cc.v2(0, this.posAudio1)), this.lobbyAppearAction, cc.fadeIn(0.3), cc.delayTime(0.05)));

        this.flagSound = 1;
        
        this.targetNode.getComponent('HeroControl1').flagSoundGame = 1;
        cc.log('flag1111='+this.targetNode.getComponent('HeroControl1').flagSoundGame);
                

            
      
    }
});
