function runFightMonsters() {

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
		id: 4,
		lvl: 4,
		hp: 10,
		str: 5,
		def: 10,
		spd: 1,
		exp: 13
	}
};

var bossNina = {
	name: "Nina the Evil Witch",
	hp: 150,
	str: 20,
	def: 15,
	spd: 10,
	exp: 50,
	fireBall: function() {
		var damage = 5;
		alert("Nina the Evil Witch casts a fireball at you! You take " + damage + " damage!");
		player.hp -= damage;
	},
	witchesCurse: function() {
		var damage = Math.floor(player.hp * 0.1);
		alert("Nina the Evil Witch casts a curse on you, sucking the life from your soul!");
		alert("You take " + damage + "damage!");
		alert("Nina the Evil Witch restores " + damage + " HP!");
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
		if (player.exp >= 20 && player.lvl < 2) {
			alert("You leveled up to level 2!");
				player.maxhp = Math.floor(player.maxhp * 1.2); //could put some of this in a function/method
				player.str = Math.floor(player.str * 1.2);
				player.def = Math.floor(player.def * 1.2);
				player.spd = Math.floor(player.spd * 1.2);
				player.hp = player.maxhp;
				player.lvl = 2;
		} else if (player.exp >= 45 && player.lvl < 3) {
			alert("You leveled up to level 3!");
				player.maxhp = Math.floor(player.maxhp * 1.2);
				player.str = Math.floor(player.str * 1.2);
				player.def = Math.floor(player.def * 1.2);				
				player.spd = Math.floor(player.spd * 1.2);
				player.hp = player.maxhp;				
				player.lvl = 3;
		} else if (player.exp >= 75 && player.lvl < 4){
			alert("You leveled up to level 4!");
				player.maxhp = Math.floor(player.maxhp * 1.2);
				player.str = Math.floor(player.str * 1.2);
				player.def = Math.floor(player.def * 1.2);				
				player.spd = Math.floor(player.spd * 1.2);
				player.hp = player.maxhp;
				player.lvl = 4;
		}
}

function randomBattle(minLvl, maxLvl) { //minLvl and maxLvl: minimum and maximum level of monster you want to spawn.
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
	alert("A wild " + clone.name + " appeared!");
	console.log("PLAYER:");
	console.log(player);	
	console.log("CLONE:");
	console.log(clone);
	console.log("TEST"); //sometimes crashes just after printing TEST. Not sure why. Something to do with the while loop below?
	//Fighting
	while (player.hp && clone.hp > 0) {
		if (player.spd > clone.spd) {
			console.log(player.hp, clone.hp);
			
			//Player attacks:
			alert("Your speed stat is higher than the enemy " + clone.name + "'s! You attack first!");
			clone.hp -= damageCalc(player);
			alert("You did " + damageCalc(player) + " damage!");
				if (clone.hp <= 0) {
					break;
				}
			alert("The " + clone.name + " has " + clone.hp + " HP left!");
			
			//monster attacks:
			alert("The " + clone.name + " attacked!");
			player.hp -= damageCalc(clone);	
			alert("The " + clone.name + " did " + damageCalc(clone) + " damage!");
				if (player.hp <= 0) {
					break;
				}	
			alert("You have " + player.hp + " HP left!");
				
			console.log(player.hp, clone.hp);	
		} else if (player.spd <= clone.spd) {
			console.log(player.hp, clone.hp);	
			
			//Monster attacks:
			alert("Your speed stat is lower than the enemy " + clone.name + "'s! The " + clone.name + " attacks first!");
			player.hp -= damageCalc(clone);	
			alert("The " + clone.name + " hit you for " + damageCalc(clone) + " damage!");
				if (player.hp <= 0) {
					break;
				}	
				
			//Player attacks
			alert("You attack the " + clone.name + "!");
			clone.hp -= damageCalc(player);	
			alert("You strike back for " + damageCalc(player) + " damage!");
				if (clone.hp <= 0) {
					break;
				}		
			alert("The " + clone.name + " has " + clone.hp + " HP left!");
			alert("You have " + player.hp + " HP left!");
			
			console.log(player.hp, clone.hp);			
		}
	}	
	if (player.hp > 0) {
		alert(player.name + " won the battle!");
		player.exp += clone.exp;
		alert("You gained " + clone.exp + " EXP!");
		levelCheck();
	} else {
		alert("Game over... you died!");
	}
	
	console.log("EXP " + player.exp);
	console.log("LVL " + player.lvl);
	console.log(player.hp, clone.hp);	
	
	//clone = undefined;
}

function bossBattleNina() {
	alert(bossNina.name + ": 'Who dares enter my lair?!'");
	alert("It is I, " + player.name + "! Here to slay the evil witch!");
	alert(bossNina.name + ": Then prepare to be annihilated!");
	
	do {
		//Boss attacks
		bossNina.chooseAttack();
		alert("You have " + player.hp + " left!");	
		console.log("P:" + player.hp + " " + "B:" + bossNina.hp);
		if (player.hp <= 0) {
			break;
		}
		//Player attacks
		bossNina.hp -=damageCalc(player);			
		alert("You hit Nina the Evil Witch for " + damageCalc(player) + " damage!");
		console.log("P:" + player.hp + " " + "B:" + bossNina.hp);
		if (bossNina.hp <= 0) {
			break;
		}

	} while (player.hp && bossNina.hp > 0);
	
	if (player.hp > 0) {
		console.log("P WINS");
		alert("Well done. You have rid the world of the evil witch! Turn back now, there is nothing left to do...");
		player.exp += bossNina.exp;
		alert("You gained " + bossNina.exp + " EXP!");
	} else {
		alert("P LOSES");
		alert("Nina the Evil Witch: HAHAHA! No one can ever defeat me!!");
		alert("You are dead. GAME OVER!");
	}	
}

//GAME
alert("Welcome! What is your name?");
player.name = prompt("Enter your name");
rollChar();
alert("Your stats are:- Health: " + player.maxhp + ", Strength: " + player.str + ", Speed: " + player.spd);
randomBattle(1,2);
console.log("maxhp" + player.maxhp + "hp" + player.hp);
randomBattle(1,2);
console.log("maxhp" + player.maxhp + "hp" + player.hp);
randomBattle(3,4);
console.log("maxhp" + player.maxhp + "hp" + player.hp);
randomBattle(1,2); 
console.log("maxhp" + player.maxhp + "hp" + player.hp);
randomBattle(1,2);
console.log("maxhp" + player.maxhp + "hp" + player.hp);
randomBattle(3,4);
console.log("maxhp" + player.maxhp + "hp" + player.hp);
bossBattleNina();
alert("WOO");

}