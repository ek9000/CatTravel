var dir=0;
var turn;
var accel=0;
var line;
var cantap=true;
var puntos=0;
var alive=true;
var globo;
var speed=1;
var boxes;
var colliders;
var txtpuntos;
var txtmaxpuntos;
var timer;
var cont=0;
var boton;
var obj_coins;
var coin=0;
var sin_movement=0;
var timer_on=false;
var gaccel=0;
var maxpuntos=0;
var dead_flag=false;
var particulas;
//sounds
var wosh,coinfx,plop,levelfx,bgm;

var Juego={

preload:function()
{
	juego.stage.backgroundColor = '#19F';
	juego.load.spritesheet('cat','img/cat.png',64,64);
	juego.load.image('coin_vfx','img/coin_particle.png');
	juego.load.image('globo','img/globo.png');
	juego.load.image('tap','img/tap.png');
	juego.load.image('nube','img/nube.png');
	juego.load.image('nube2','img/nube2.png');
	juego.load.image('bg_edificios','img/edificios.png');
	juego.load.image ('boton','img/restart.png');
	juego.load.image ('home','img/boton_home.png');
	juego.load.image('box','img/box2.png');
	juego.load.image('collider','img/box.png');
	juego.load.image('bg_cielo','img/bg.png');
	juego.load.image('coin','img/coin.png');
	juego.load.image('coin_game','img/coinIngame.png');
	juego.load.image('spikes','img/spikes.png');
	juego.load.audio('snd_wosh',['snd/wosh.wav','snd/wosh.mp3']);
	juego.load.audio('snd_coin',['snd/coin.wav','snd/coin.mp3']);
	juego.load.audio('snd_plop',['snd/plop.wav','snd/plop.mp3']);
	juego.load.audio('snd_level',['snd/level.wav','snd/level.mp3']);
	juego.load.audio('snd_bgm',['snd/bgm.wav','snd/bgm.mp3']);


},
create:function()
{
	juego.physics.startSystem(Phaser.Physics.ARCADE);
	cielo=juego.add.sprite(0,-2000+juego.height,'bg_cielo');
	wosh = juego.add.audio('snd_wosh');
	wosh.volume=0.1;
	wosh.loop=false;
	coinfx = juego.add.audio('snd_coin');
	coinfx.volume=0.2;
	coinfx.loop=false;
    plop = juego.add.audio('snd_plop');
	plop.volume=0.3;
	plop.loop=false;
	levelfx = juego.add.audio('snd_level');
	levelfx.volume=0.3;
	levelfx.loop=false;
	bgm = juego.add.audio('snd_bgm');
	bgm.volume=0.4;
	bgm.loop=true;
	bgm.play();
	//nube=juego.add.sprite(0,100,'nube');
	//nube2=juego.add.sprite(210,200,'nube2');
	bg1=juego.add.sprite(0,juego.height-64,'bg_edificios');
	spikes=juego.add.tileSprite(0,0,240,480,'spikes');
	 cat = juego.add.sprite(juego.width/2,juego.height*0.8, 'cat');
	this.globo = juego.add.sprite(juego.width/2, juego.height*0.8-30, 'globo');
	juego.physics.arcade.enable(this.globo);
	juego.physics.arcade.enable(cat);
	juego.physics.arcade.enable(bg1);
	juego.physics.arcade.enable(cielo);
	 tap = juego.add.sprite(juego.width/2,juego.height/2-15,'tap');
	
	this.boxes = juego.add.group();
	this.boxes.enableBody=true;
	this.boxes.createMultiple(20, 'box');

	this.colliders = juego.add.group();
	this.colliders.enableBody=true;
	this.colliders.createMultiple(20, 'collider');

	this.obj_coins = juego.add.group();
	this.obj_coins.enableBody=true;
	this.obj_coins.createMultiple(20,'coin_game');

	
	
     cat.frame = 0;
     cat.anchor.setTo(0.5, 0.3);
     cat.scale.setTo(-1,1);
     cat.animations.add('blink', [0,1,2,1], 20, true);
     cat.animations.play('blink');
     this.globo.anchor.setTo(0.5, 1);
     tap.anchor.setTo(0.5,0.5);
     
    
    turn=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	turn.onDown.add(this.Turn,this);

	line = new Phaser.Line(cat.x,cat.y,this.globo.x,this.globo.y);
	 coin_metter=juego.add.sprite(0,juego.height-16,'coin');
	
	txtpuntos = juego.add.text(juego.width/2, 48, "O", {font: "48px Arcade", fill: "#FFF"});
	txtcoins = juego.add.text(16, juego.height-16, coin, {font: "14px Arcade", fill: "#FFF"});
	
	txtpuntos.anchor.setTo(0.5,0.5);
	txtpuntos.setShadow(4, 4, '#000', 0);
	txtmaxpuntos=juego.add.text(-70,juego.height/2+48,"BEST: "+maxpuntos,{font: "24px Arcade", fill: "#FFF"});
	txtpuntos.color="#FFF";
	txtmaxpuntos.setShadow(2, 2, '#000', 0);
	txtcoins.setShadow(1.5, 1.5, '#000', 0);
	txtmaxpuntos.anchor.setTo(0.5,0.5);
	
	//timer
	
	//reiniciar
	boton = this.add.button(-110,juego.height/2,'boton',this.reset,this);
	boton.anchor.setTo(0.5,0.5);
	home = this.add.button(-30,juego.height/2,'home',this.backHome,this);
	home.anchor.setTo(0.5,0.5);

	//tap for celphone
	juego.input.onTap.add(this.Turn,this);

	//get the max score
	if(parseInt(localStorage.getItem('maxscore'))!=null && parseInt(localStorage.getItem('maxscore'))>maxpuntos)
	{
	maxpuntos = parseInt(localStorage.getItem('maxscore'));
	}

	juego.physics.startSystem(Phaser.Physics.ARCADE);
   	juego.stage.backgroundColor = 0x114799;
    particulas = juego.add.emitter(0, 0, 100);
    
    particulas.makeParticles('coin_vfx');

  	particulas.gravity = 200;
   	
	
},
update:function()
{
	//posicion del globo
	this.globo.x=cat.x+accel*13*dir;
	//prueba para usar el mouse
	if(this.game.input.mousePointer.isDown)
	{
		if(cantap)
		{
		this.Turn();
		cantap=false;
		}
	}
	else if(this.game.input.mousePointer.isUp)
	{
		cantap=true;
	}

	if(cat.x+0.7*dir-8>cat.width/2&&cat.x+0.7*dir<juego.width-8+cat.width/2)
	{
		//movimiento y hacia donde mira
		
		cat.x+=accel*dir*1.3/speed;
		if(dir!=0)
		{
		cat.scale.setTo(-dir,1);}
	}
	else
	{
		if(!dead_flag && alive){
		this.touchbox();
		dead_flag=true;
		}

	}
	//aceleracion del gatito
	if(accel<1/speed)
	{
		accel+=0.02/speed;
	}
	//angulo del gatito y el globo
	cat.angle=15*accel*dir;
	this.globo.angle=10*accel*dir;

	line.fromSprite(cat,this.globo,false);


	//comienza el gato a subir
	if(dir!=0)
	{
		tap.destroy();
		
		sin_movement=0;
		if(alive)
		{ 
	 	 spikes.tilePosition.y+=0.83/speed;
	 	 bg1.body.velocity.y=10;
		//nube.y+=0.02;
		//nube2.y+=0.02;
		if(cielo.y<0)
			{
			cielo.body.velocity.y=5;
			}
			else
			{
			cielo.body.velocity.y=0;
			}
		}
		else
		{
			 bg1.body.velocity.y=0;
		}
		if(!timer_on)
		{
			timer=juego.time.events.add(Phaser.Timer.SECOND*3,this.addrowboxes,this);
			timer_on=true;
		}

	
		
	}
	
	//paredes
	juego.physics.arcade.overlap(this.globo,this.boxes,this.touchbox);


	juego.physics.arcade.overlap(cat,this.colliders,this.gainpoints);

	juego.physics.arcade.overlap(cat,this.obj_coins,this.gaincoins);
	juego.physics.arcade.overlap(this.globo,this.obj_coins,this.gaincoins);

	//muerte
	if(!alive)
	{

		cantap=false;
		gaccel+=0.2;
		this.boxes.forEachAlive(function(t){
            t.body.velocity.y = 0;
        }, this);
        this.colliders.forEachAlive(function(t){
            t.body.velocity.y = 0;
        }, this);

        this.obj_coins.forEachAlive(function(t){
            t.body.velocity.y = 0;
        }, this);

        this.globo.destroy();
        cielo.body.velocity.y=0;
        cat.angle=5*gaccel*-dir;
        cat.y+=gaccel;
        //boton de reset
        if(boton.x<juego.width/2-40)
        {
        	boton.x+=10;
        	home.x+=10;
        	txtmaxpuntos.x+=10;
        }
         boton.y=juego.height/2;
         home.y=juego.height/2;
       
         txtmaxpuntos.text="BEST: "+maxpuntos;
         txtcoins.text=coin;
         

	}
	
      
      if(dir==0)
      {
      	txtpuntos.text=0;
      	txtmaxpuntos.text=0;
      	txtcoins.text=coin;
      	
      	if(sin_movement<19)
      	{
      	sin_movement+=0.08;
      	}
      	else
      	{
      		sin_movement=0.08;
      	}
		cat.y=Math.sin(sin_movement)*2+(juego.height*0.8);
      }
     //aumentar la dificultad
     speed=1/(101/(100-puntos+1));
     //console.log(speed);

    bg1.checkWorldBounds=true;
	bg1.outOfBoundsKill=true;

 	cat.checkWorldBounds=true;
	cat.outOfBoundsKill=true;

	this.killobj(cat);
	this.killobj(this.obj_coins);
	


},
Turn:function()
{
	wosh.play();
	if(dir>0&&alive)
	{
		dir=-1;
	}else
	{
		dir=1;
	}
	accel=0;
},
render:function()
{
	if(alive){
	juego.context.strokeStyle = 'rgb(0,0,0)';
    juego.context.beginPath();
    juego.context.lineTo(cat.x, cat.y-5);
    juego.context.lineTo(this.globo.x, this.globo.y);
    juego.context.stroke();
    juego.context.closePath();}
},
addonebox:function(x,y)
{
	
	var box = this.boxes.getFirstDead();
	//this.boxes.add(box);
	//juego.physics.arcade.enable(box);
	if(box!=null){
	box.reset(x, y);
	box.body.velocity.y=+50/speed;
	

	box.checkWorldBounds=true;
	box.outOfBoundsKill=true;
	this.killobj(box);}

},
addonecol:function(x,y)
{
	
	var col = this.colliders.getFirstDead();
	//this.boxes.add(box);
	//juego.physics.arcade.enable(box);
	if(col!=null)
	{
	
	col.reset(x, y);
	col.body.velocity.y=+50/speed;
	col.checkWorldBounds=true;
	col.outOfBoundsKill=true;
	col.alpha=0;}

},
addonecoin:function(x,y)
{
	
	var coin = this.obj_coins.getFirstDead();
	//this.boxes.add(box);
	//juego.physics.arcade.enable(box);
	if(coin!=null){
	coin.reset(x, y);
	coin.body.velocity.y=+50/speed;
	//coin.checkWorldBounds=true;
	//coin.outOfBoundsKill=true;
}

},
addrowboxes:function()
{

timer=juego.time.events.add(Phaser.Timer.SECOND*4*speed,this.addrowboxes,this);

var hueco=Math.floor(Math.random()*5)+1;
var coin_pos=Math.floor(Math.random()*5)+1;

for(var i=0;i<8;i++)
{
	if(i==coin_pos&&i!=hueco-1&&i!=hueco&&i!=hueco+1)
	{
		this.addonecoin(i*32,-48-(16*i));
	}
	if(i!=hueco-1&&i!=hueco&&i!=hueco+1)
	{
		this.addonebox(i*32,-32);
	}
	else if(i==hueco)
	{
		this.addonecol(i*32,-32);
	}
	
}
},
touchbox:function()
{
alive=false;
plop.play();
bgm.stop();
juego.time.events.remove(timer);

        

},
reset:function()
{
	juego.state.start('Juego');
	alive=true;
	gaccel=0;
	puntos=0;
	accel=0;
	dir=0;
	timer_on=false;
	speed=1;
	cont=0;
	dead_flag=false;
},
gainpoints:function(obj,col)
{
	
	col.kill();
	levelfx.play();
	puntos+=1;
	//console.log(speed);
	if(puntos>maxpuntos)
		{
		maxpuntos=puntos;
		localStorage.setItem('maxscore', maxpuntos.toString());
		}
	txtpuntos.text=puntos;

},
gaincoins:function(obj,col){
	particulas.x=col.x;
	particulas.y=col.y;
particulas.start(true, 2000, null, 10);
col.kill();
coin+=1;
coinfx.play();
txtcoins.text=coin;
},


killobj:function(obja)
{
	if(obja.y>juego.height)
	{
	obja.kill();
	}
},

backHome:function()
{
	juego.state.start('Menu');
	alive=true;
	gaccel=0;
	puntos=0;
	accel=0;
	dir=0;
	timer_on=false;
	speed=1;
	cont=0;
	dead_flag=false;
}
};