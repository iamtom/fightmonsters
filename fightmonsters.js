$(document).ready(function() {

//Objects and variables
var player = {
	name: "Blank",
	lvl: 1,
	maxhp: 0,
	hp: 0,
	str: 0,
	def: 0,
	spd: 0,
	exp: 0
};

var areas = {

	outWitchesCave: {
		name: "Outside the Witches Cave",
		minLvl: 1,
		maxLvl: 2
	},
	inWitchesCave1: {
		name: "Witches Cave Room 1",
		minLvl: 3,
		maxLvl: 4
	},
	inCave2: {
		name: "Witches Cave Room 2",
		minLvl: 5,
		maxLvl: 6
	},
	bossWitchesCave: {
		name: "Witches Lair",
		boss: bossNina
	}
};

var prevArea;
var currentArea;
var nextArea;
	
var monsters = {

	crow: {
		name: "Crow",
		id: 0,
		lvl: 1,
		hp: 2,
		str: 2,
		def: 2,
		spd: 7,
		exp: 5
	},
	gnome: {
		name: "Gnome",
		id: 1,
		lvl: 1,
		hp: 3,
		str: 1,
		def: 4,
		spd: 9,
		exp: 3
	},
	goblin: {
		name: "Goblin",
		id: 2,
		lvl: 2,
		hp: 8,
		str: 4,
		def: 4,
		spd: 5,
		exp: 10
	},
	babyhawk: {
		name: "Baby Hawk",
		id: 3,
		lvl: 2,
		hp: 6,
		str: 4,
		def: 1,
		spd: 10,
		exp: 12
	},
	babywolf: {
		name: "Baby Wolf",
		id: 4,
		lvl: 3,
		hp: 6,
		str: 6,
		def: 3,
		spd: 10,
		exp: 15
	},
	rockman: {
		name: "Rock Man",
		id: 5,
		lvl: 4,
		hp: 10,
		str: 5,
		def: 10,
		spd: 1,
		exp: 13
	},
	cobra: {
		name: "Cobra",
		id: 6,
		lvl: 5,
		hp: 18,
		str: 7,
		def: 10,
		spd: 10,
		exp: 20
	},
	wolf: {
		name: "Wolf",
		id: 7,
		lvl: 6,
		hp: 22,
		str: 10,
		def: 10,
		spd: 15,
		exp: 22
	}
};

var bossNina = {
	name: "Nina the Evil Witch",
	hp: 100,
	str: 20,
	def: 15,
	spd: 10,
	exp: 50,
	fireBall: function() {
		var damage = 5;
		canvas_context.fillText("Nina the Evil Witch casts a fireball at you! You take " + damage + " damage!", x, y);
		y += 15;
		player.hp -= damage;
	},
	witchesCurse: function() {
		var damage = Math.floor(player.hp * 0.1);
		canvas_context.fillText("Nina the Evil Witch casts a curse on you, sucking the life from your soul!", x, y);
		y += 15;
		canvas_context.fillText("You take " + damage + "damage!", x, y);
		y += 15;
		canvas_context.fillText("Nina the Evil Witch restores " + damage + " HP!", x, y);
		y += 15;
		player.hp -= damage;
		bossNina.hp += damage;
	},
	//Randomly choose which attack to use.
	chooseAttack: function() {
		if (Math.floor(getRandomInt(1, 4)) < 2) {
			bossNina.witchesCurse();
		} else {
			bossNina.fireBall();
		}
	}
};

//Functions:
function getRandomInt(min, max) {
	return Math.random() * (max-min) + min;
}

function rollChar() {
	player.maxhp = Math.floor(getRandomInt(15,20));
	player.hp = player.maxhp;
	player.str = Math.floor(getRandomInt(7,10));
	player.def = Math.floor(getRandomInt(7,10));
	player.spd = Math.floor(getRandomInt(8,12));
	player.exp = 0;
	player.lvl = 1;
}

function damageCalc(a) { //a is attacker, d is defender. Want to make this formula more complex later and use the defenders defence stat
	var damage = a.str;
	return damage;
}
	
function cloneMonster(o) { //o = object, c = object copy
	var c = {};
	// there's got to be a better way to do this...
	c.name = o.name;
	c.id = o.id;
	c.lvl = o.lvl;
	c.hp = o.hp;
	c.str = o.str;
	c.def = o.def;
	c.spd = o.spd;
	c.exp = o.exp;
	
	return c;
}

function levelCheck() {
	function boostStats() {
		player.maxhp = Math.floor(player.maxhp * 1.25); 
		player.str = Math.floor(player.str * 1.25);
		player.def = Math.floor(player.def * 1.25);
		player.spd = Math.floor(player.spd * 1.25);
		player.hp = player.maxhp;
	}

	if (player.exp >= 20 && player.lvl < 2) {
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 2!", x, y); 
		boostStats();
		player.lvl = 2;
	} else if (player.exp >= 45 && player.lvl < 3) {
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 3!", x, y);		
		boostStats();
		player.lvl = 3;
	} else if (player.exp >= 75 && player.lvl < 4){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 4!", x, y);
		boostStats();
		player.lvl = 4;
	} else if (player.exp >= 110 && player.lvl < 5){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 5!", x, y); 
		boostStats();
		player.lvl = 5;
	} else if (player.exp >= 150 && player.lvl < 6){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 6!", x, y); 
		boostStats();
		player.lvl = 6;
	} else if (player.exp >= 200 && player.lvl < 7){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 7!", x, y); 
		boostStats();
		player.lvl = 7;
	} else if (player.exp >= 300 && player.lvl < 8){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 8!", x, y); 
		boostStats();
		player.lvl = 8;
	} else if (player.exp >= 450 && player.lvl < 9){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 9!", x, y); 
		boostStats();
		player.lvl = 9;
	} else if (player.exp >= 600 && player.lvl < 10){
		canvas_context.fillStyle = "white";
		canvas_context.fillText("You leveled up to level 10!", x, y); 
		boostStats();
		player.lvl = 10;
	}
}


function randomBattle(minLvl, maxLvl) { //minLvl and maxLvl: minimum and maximum level of monster you want to spawn.
	drawMainUI();
	canvas_context.fillStyle = "white";
	canvas_context.font = "12px Courier";
	x = 200;
	y = 50;
	
	var textCounter = 0;
	var possibleMons = []; //possible monsters
	//generate a random level from minLvl - maxLvl
	var level = Math.round(getRandomInt(minLvl, maxLvl)); 
	console.log("Level is " + level);
	
	//any monsters that match the level chosen earlier are added to possibleMons array
	for (var key in monsters) {
		if (monsters[key].lvl === level) {
			possibleMons.push(monsters[key]); 
			console.log(possibleMons);
		}
	}
	var chosenMon = possibleMons[Math.floor(Math.random() * possibleMons.length)]; //randomly choose one monster from the possibleMons
	var clone = cloneMonster(chosenMon); //clone the chosenMon so we don't end up editing the original
	console.log(clone);
	console.log(clone.name);	
	console.log("Clone HP:" + clone.hp);
	canvas_context.fillText("A wild " + clone.name + " appeared!", x, y);
	textCounter += 1;
	y += 15;
	console.log("PLAYER:");
	console.log(player);	
	console.log("CLONE:");
	console.log(clone);
	
	//Fighting

	while (player.hp && clone.hp > 0) {
		if (player.spd > clone.spd) {
			console.log(player.hp, clone.hp);
			
			//Player attacks:
			canvas_context.fillText("Your speed stat is higher than the enemy " + clone.name + "'s!" , x, y);
			y += 15;
			canvas_context.fillText("You attack first!", x, y);
			y += 15;
			clone.hp -= damageCalc(player);
			canvas_context.fillText("You did " + damageCalc(player) + " damage!", x, y);
			y += 15;
				if (clone.hp <= 0) {
					break;
				}
			canvas_context.fillText("The " + clone.name + " has " + clone.hp + " HP left!", x, y);
			y += 15;
			
			//monster attacks:
			canvas_context.fillText("The " + clone.name + " attacked!", x, y);
			y += 15;
			player.hp -= damageCalc(clone);	
			canvas_context.fillText("The " + clone.name + " did " + damageCalc(clone) + " damage!", x, y);
			y += 15;
				if (player.hp <= 0) {
					break;
				}	
			canvas_context.fillText("You have " + player.hp + " HP left!", x, y);
			y += 15;
				
			console.log(player.hp, clone.hp);	
		} else if (player.spd <= clone.spd) {
			console.log(player.hp, clone.hp);	
			
			//Monster attacks:
			canvas_context.fillText("Your speed stat is lower than the enemy " + clone.name + "'s!", x, y) 
			y += 15;
			canvas_context.fillText("The " + clone.name + " attacks first!", x, y);
			y += 15;
			player.hp -= damageCalc(clone);	
			canvas_context.fillText("The " + clone.name + " hit you for " + damageCalc(clone) + " damage!", x, y);
			y += 15;
				if (player.hp <= 0) {
					break;
				}	
				
			//Player attacks
			canvas_context.fillText("You attack the " + clone.name + "!", x, y);
			y += 15;
			clone.hp -= damageCalc(player);	
			canvas_context.fillText("You strike back for " + damageCalc(player) + " damage!", x, y);
			y += 15;
				if (clone.hp <= 0) {
					break;
				}		
			canvas_context.fillText("The " + clone.name + " has " + clone.hp + " HP left!", x, y);
			y += 15;
			canvas_context.fillText("You have " + player.hp + " HP left!", x, y);
			y += 15;
			
			console.log(player.hp, clone.hp);			
		}
	}
	if (player.hp > 0) {
		canvas_context.fillText(player.name + " won the battle!", x, y);
		y += 15;
		player.exp += clone.exp;
		canvas_context.fillText("You gained " + clone.exp + " EXP!", x, y);
		y += 15;
		levelCheck();
		reDrawStats();
	} else {
		gameOverScreen();
	}
	
	console.log("EXP " + player.exp);
	console.log("LVL " + player.lvl);
	console.log(player.hp, clone.hp);	
	
	//clone = undefined;
}

function bossBattleNina() {
	drawMainUI();	
	x = 200;
	y = 50;

	
	//Intro
	canvas_context.fillStyle = "white";
	canvas_context.font = "bold 12px Courier";
	canvas_context.fillText(bossNina.name + ": Who dares enter my lair?!", x, y);
	y += 15;
	canvas_context.fillText("It is I, " + player.name + "! Here to slay the evil witch!", x, y);
	y += 15;
	canvas_context.fillText(bossNina.name + ": Then prepare to be annihilated!", x ,y);
	y += 15;
	canvas_context.strokeRect(x, y, 400, 1);
	y += 15;
	canvas_context.font = "12px Courier";
	
	//Fight
	do {
		//Boss attacks
		bossNina.chooseAttack();
		canvas_context.fillText("You have " + player.hp + " HP left!", x, y);	
		y += 15;
		console.log("P:" + player.hp + " " + "B:" + bossNina.hp);
		if (player.hp <= 0) {
			break;
		}
		//Player attacks
		bossNina.hp -=damageCalc(player);			
		canvas_context.fillText("You hit Nina the Evil Witch for " + damageCalc(player) + " damage!", x, y);
		y += 15;
		console.log("P:" + player.hp + " " + "B:" + bossNina.hp);
		if (bossNina.hp <= 0) {
			break;
		}

	} while (player.hp && bossNina.hp > 0);
	
	if (player.hp > 0) {
		reDrawStats();
		canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
		canvas_context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
		canvas_context.fillStyle = "white";
		canvas_context.font = "80px Courier";
		canvas_context.fillText("YOU WIN", 100, 200);
		canvas_context.font = "20px Courier";	
		canvas_context.fillText("Well done. You have rid the world of the evil witch!", 10, 250);
		canvas_context.fillText("Turn back now, there is nothing left to do...", 50, 280);
		document.getElementById('bossbtn').style.display = 'none';
		document.getElementById('fightlvl1_2').style.display = 'none';
		document.getElementById('fightlvl3_4').style.display = 'none';
		document.getElementById('fightlvl5_6').style.display = 'none';
		console.log("P WINS");
		player.exp += bossNina.exp;
	} else {
		reDrawStats();
		canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
		canvas_context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
		canvas_context.fillStyle = "white";
		canvas_context.font = "80px Courier";
		canvas_context.fillText("GAME OVER", 100, 200);
		canvas_context.font = "20px Courier";	
		canvas_context.fillText("Nina the Evil Witch: HAHAHA!", 130, 250);
		canvas_context.fillText("No one can ever defeat me!!", 130, 280);
		document.getElementById('bossbtn').style.display = 'none';
		document.getElementById('fightlvl1_2').style.display = 'none';
		document.getElementById('fightlvl3_4').style.display = 'none';
		document.getElementById('fightlvl5_6').style.display = 'none';
	}	
}

function drawMainUI() {
	canvas_context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	//draw UI
	//box around stats
	canvas_context.strokeStyle = "white";
	canvas_context.strokeRect(0, 30, 190, 185);	
	
	//screen box
	canvas_context.strokeRect(190, 30, 450, 350);
	
	//line under player name
	canvas_context.beginPath();
	canvas_context.moveTo(0, 30);
	canvas_context.lineTo(640, 30);
	canvas_context.closePath();
	canvas_context.stroke();
	
	
	canvas_context.fillStyle = "white";	
	canvas_context.font = "20px Courier";

	canvas_context.fillText("Player: " + player.name, 5, 20);
	canvas_context.fillText("Level: " + player.lvl, 5, 50);	
	canvas_context.fillText("Health: " + player.hp, 5, 80);
	canvas_context.fillText("Strength: " + player.str, 5, 110);
	canvas_context.fillText("Defence: " + player.def, 5, 140);
	canvas_context.fillText("Speed: " + player.spd, 5, 170);
	canvas_context.fillText("Exp: " + player.exp, 5, 200);
	
	document.getElementById('bossbtn').style.display = 'block';
	document.getElementById('fightlvl1_2').style.display = 'block';
	document.getElementById('fightlvl3_4').style.display = 'block';
	document.getElementById('fightlvl5_6').style.display = 'block';
}

function reDrawStats() {
	//clear and redraw the rectangle
	canvas_context.strokeStyle = "white";
	canvas_context.clearRect(0, 30, 190, 185);
	canvas_context.strokeRect(0, 30, 190, 185);		
	
	//draw the stats
	canvas_context.fillStyle = "white";	
	canvas_context.font = "20px Courier";
	
	canvas_context.fillText("Player: " + player.name, 5, 20);
	canvas_context.fillText("Level: " + player.lvl, 5, 50);	
	canvas_context.fillText("Health: " + player.hp, 5, 80);
	canvas_context.fillText("Strength: " + player.str, 5, 110);
	canvas_context.fillText("Defence: " + player.def, 5, 140);
	canvas_context.fillText("Speed: " + player.spd, 5, 170);
	canvas_context.fillText("Exp: " + player.exp, 5, 200);
}

function gameOverScreen() {
	/* canvas_context.clearRect(0, 0, gameCanvas.width, gameCanvas.height); */
	reDrawStats();
	canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
	canvas_context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
	canvas_context.fillStyle = "white";
	canvas_context.font = "80px Courier";
	canvas_context.fillText("GAME OVER", 100, 200);
	canvas_context.font = "20px Courier";	
	canvas_context.fillText("You were killed!", 220, 250);
	document.getElementById('bossbtn').style.display = 'none';
	document.getElementById('fightlvl1_2').style.display = 'none';
	document.getElementById('fightlvl3_4').style.display = 'none';
	document.getElementById('fightlvl5_6').style.display = 'none';
}


//GAME

	//ready the canvas
	var canvas = document.getElementById('gameCanvas');
	var canvas_context = gameCanvas.getContext("2d");
	
	drawMainUI();

	
	alert("Welcome! What is your name?");
	player.name = prompt("Enter your name");
	rollChar();

	drawMainUI();
	

	
	
	$('#fightlvl1_2').click(function() {
		randomBattle(1,2)
	});
	
	$('#fightlvl3_4').click(function() {
		randomBattle(3,4);
	});
	
	$('#fightlvl5_6').click(function() {
		randomBattle(5,6);
	});
	
	$('#bossbtn').click(function() {
		bossBattleNina();
	});
	
	$('#healbtn').click(function() {
		player.hp = player.maxhp;
	});

	//want to populate the list of stats with the stat values in the variables
});

