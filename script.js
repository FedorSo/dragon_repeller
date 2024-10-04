const button1 = document.getElementById("btn1")
const button2 = document.getElementById("btn2")
const button3 = document.getElementById("btn3")

const xpInfo = document.getElementById("info-xp")
const healthInfo = document.getElementById("info-health")
const goldInfo = document.getElementById("info-gold")

const text = document.getElementById("text")

const img = document.getElementById("img")

const infoEnemy = document.getElementById("info-enemy")
const healthEnemyInfo = document.getElementById("info-enemy_health")
const nameEnemyInfo = document.getElementById("info-enemy_name")

const weapons = [
    {name: "stick", power: 5},
    {name: "dagger", power: 30},
    {name: "hammer", power: 60},
    {name: "sword", power: 100}
];

const inventory = [
    {name: "stick", power: 5}
];

const monsters = [
    {name: "slime", level: 2, health: 15, img: ""},
    {name: "fanged beast", level: 8, health: 60, img: ""},
    {name: "dragon", level: 20, health: 300, img: ""}
];

let currentMonster = 0;

console.log(currentMonster);

let gold = 50;
let xp = 0;
let health = 100;

let enemyHealth;

function goToStore() {
    console.log("Store");
    button1.innerText = "Buy 10 health (10 gold)";
    button2.innerText = "Buy weapon (30 gold)"
    button3.innerText = "Go to town square"

    text.innerText = "You enter the store."
    img.src = "images/shop.jpg"

    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goToTown;
}

function goToCave() {
    console.log("Cave");
    button1.innerText = "Fight slime";
    button2.innerText = "Fight fanged beast"
    button3.innerText = "Go to town square"

    text.innerText = "You enter the cave. You see some monsters."
    img.src = "images/cave.jpg"

    button1.onclick = fightSlime;
    button2.onclick = fightFangedBeast;
    button3.onclick = goToTown;
}

function fightSlime() {
    console.log("Slime");

    button1.innerText = "Attack";
    button2.innerText = "Dodge"
    button3.innerText = "Run"

    text.innerText = "You are fighting a monster."
    img.src = "images/slime.jpg"

    infoEnemy.style.display = "flex"

    button1.onclick = attack;
    button2.onclick = dodge;
    button3.onclick = goToTown;

    currentMonster = 0;
    enemyHealth = monsters[currentMonster].health
    healthEnemyInfo.innerText = enemyHealth;
    nameEnemyInfo.innerText = monsters[currentMonster].name
}

function fightFangedBeast() {
    console.log("Fanged beast")

    button1.innerText = "Attack";
    button2.innerText = "Dodge"
    button3.innerText = "Run"

    text.innerText = "You are fighting a monster."
    img.src = "images/knight.jpg"

    infoEnemy.style.display = "flex"

    button1.onclick = attack;
    button2.onclick = dodge;
    button3.onclick = goToTown;

    currentMonster = 1;

    enemyHealth = monsters[currentMonster].health
    healthEnemyInfo.innerText = enemyHealth;
    nameEnemyInfo.innerText = monsters[currentMonster].name
}

function fightDragon() {
    console.log("Dragon");

    button1.innerText = "Attack";
    button2.innerText = "Dodge"
    button3.innerText = "Run"

    text.innerText = "You are fighting a monster."
    img.src = "images/dragon.jpg"

    infoEnemy.style.display = "flex"

    button1.onclick = attack;
    button2.onclick = dodge;
    button3.onclick = goToTown;

    currentMonster = 2;
    enemyHealth = monsters[currentMonster].health
    healthEnemyInfo.innerText = enemyHealth;
    nameEnemyInfo.innerText = monsters[currentMonster].name
}

function goToTown() {
    console.log("Town");
    
    button1.innerText = "Go to store";
    button2.innerText = "Go to cave"
    button3.innerText = "Fight dragon"

    text.innerText = "You are in the town square."
    img.src = "images/town.jpg"

    button1.onclick = goToStore;
    button2.onclick = goToCave;
    button3.onclick = fightDragon;

    infoEnemy.style.display = "none"
}

function buyHealth() {
    console.log("Health");

    goldInfo.innerText = gold;
    healthInfo.innerText = health;

    if (gold >= 10 && health <= 190) {
        health += 10
        gold -= 10
    }
    else if(health === 200) {
        text.innerText = "You can't buy a health. You have the maximum level of health"
    }
    else {
        text.innerText = "You don`t have enough gold to buy more health."
    }

    console.log(gold, health);
    
}

function buyWeapon() {
    console.log("Weapon");
    if (gold >= 30 && inventory.length <= 3) {
        gold -= 30
        inventory.push(weapons[inventory.length])
        console.log(inventory);
        
        text.innerText = `You have bought a new weapon: ${inventory[inventory.length - 1].name}. In your inventory you have:`
    }
    else if(inventory.length >= 3) {
        text.innerText = "You can't buy a weapon. You have the maximum level of weapons"
    }
    else {
        text.innerText = "You don`t have enough gold to buy weapon."
    }

    goldInfo.innerText = gold;
    
}

function attack() {
    text.innerText = `The ${monsters[currentMonster].name} attacks. You are attacked with ${inventory[inventory.length - 1].name}.`

    health -= Math.floor((Math.random() * monsters[currentMonster].level) * 3)
    healthInfo.innerText = health;

    enemyHealth -= Math.floor((Math.random() * inventory[inventory.length - 1].power) + xp)
    healthEnemyInfo.innerText = enemyHealth;

    if (enemyHealth <= 0 && health > 0) {
        win()
        xp += monsters[currentMonster].level
        xpInfo.innerText = xp;
        gold += monsters[currentMonster].level * 6
        goldInfo.innerText = gold;
    }
    else if (health <= 0) {
        defeat()
    }

}

function dodge() {
    console.log("dodge");

    text.innerText = ``
    enemyHealth -= Math.floor((Math.random() * inventory[inventory.length - 1].power) + Math.random() + xp / 2)
    health -= Math.floor((Math.random() * monsters[currentMonster].level) * 3) / 2

    healthInfo.innerText = health;
    healthEnemyInfo.innerText = enemyHealth;

    if (enemyHealth <= 0 && health > 0) {
        win()
        xp += monsters[currentMonster].level
        xpInfo.innerText = xp;
        gold += monsters[currentMonster].level * 6
        goldInfo.innerText = gold;
    }
    else if (health <= 0) {
        defeat()
    }

}


function restart() {
    health = 50
    xp = 0
    gold = 10

    healthInfo.innerText = health;
    goldInfo.innerText = gold;
    xpInfo.innerText = xp;

    while (inventory.length != 1) {
        inventory.pop()
    } 

    button1.innerText = "Go to store";
    button2.innerText = "Go to cave"
    button3.innerText = "Fight dragon"

    text.innerText = "You are in the town square."
    img.src = "images/town.jpg"

    button1.onclick = goToStore;
    button2.onclick = goToCave;
    button3.onclick = fightDragon;

    infoEnemy.style.display = "none"
}

function win() {
    button1.onclick = goToTown;
    button2.onclick = goToTown;
    button3.onclick = goToTown;

    button1.innerText = "Go to town square"
    button2.innerText = "Go to town square"
    button3.innerText = "Go to town square"

    text.innerText = "You've won. Go back to town square"
    img.src = "images/knight_win.jpg"

    infoEnemy.style.display = "none"
}

function defeat() {
    button1.onclick = restart;
    button2.onclick = restart;
    button3.onclick = restart;

    button1.innerText = "Go to town square"
    button2.innerText = "Go to town square"
    button3.innerText = "Go to town square"

    text.innerText = "You've defeat. Go back to town square"
    img.src = "images/knight_defeat.jpg"

    infoEnemy.style.display = "none"
}

button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;