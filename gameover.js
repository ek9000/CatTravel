var Game_Over={

preload:function()
{
	juego.stage.backgroundColor = '#FFF';
	juego.load.image('restart','img/restart.png');
},
create:function()
{
	var restart= this.add.button(juego.width/2,juego.height/2,'restart',this.reset,this);
	restart.anchor.setTo(0.5);
	restart.scale.setTo(0.5,0.5);

	
},
reset:function()
{

	juego.state.start('Menu');
}


};