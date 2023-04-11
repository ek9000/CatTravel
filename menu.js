var sin_movement=0;

var Menu = {

	preload:function()
	{
		juego.stage.backgroundColor = '#19F';
		juego.load.image ('boton','img/boton.png');
		juego.load.image ('boton_stats','img/boton_stats.png');
		juego.load.image ('boton_store','img/boton_store.png');
		juego.load.image('logo','img/logo.png');
		juego.load.image('bg_edificios','img/edificios.png');
		juego.load.image('bg_cielo','img/bg.png');

	},
	create:function()
	{
		



		cielo=juego.add.sprite(0,-2000+juego.height,'bg_cielo');
		bg = juego.add.image(0,juego.height-64,'bg_edificios');
		var boton = this.add.button(juego.width/2,juego.height/2+40,'boton',this.Iniciar,this);
		var boton_stats = this.add.button(juego.width/2-30,juego.height/2+100,'boton_stats',null,this);
		var boton_store = this.add.button(juego.width/2+30,juego.height/2+100,'boton_store',null,this);
		logo= juego.add.image(juego.width/2,juego.height/2-50,'logo');

		logo.anchor.setTo(0.5);
		boton.anchor.setTo(0.5);
		boton_stats.anchor.setTo(0.5);
		boton_store.anchor.setTo(0.5);
		
		//responsive

		juego.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
		//juego.scale.minWidth=240;
		//juego.scale.minHeight=320;

		juego.scale.pageAlignHorizontally=true;
		//juego.scale.setScreenSize(true);

		//
		juego.add.tween(logo).to({angle:2},500)
							 .to({angle:0},500)
							 .to({angle:-2},500)
							 .to({angle:0},500)

							 .loop()
							 .start();

	},
	update:function()
	{
		if(sin_movement<19)
      	{
      	sin_movement+=0.08;
      	}
      	else
      	{
      		sin_movement=0.08;
      	}
		
		logo.y=Math.sin(sin_movement)*2+juego.height/2-50;
	},
	Iniciar:function()
	{
		juego.state.start('Juego');
		sin_movement=0;
	}
};
