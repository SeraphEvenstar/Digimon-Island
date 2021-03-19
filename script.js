'use strict';

// document.getElementById('hpBarPlayer').style.width = '50rem';

// > Digivolve > fix being able to go into Rize before Devimon fight
// > Devimon fight sometimes doesn't allow an attack to even go through and only he attacks

// Music Testing Area
let audio;
function bgFileIsland() {
  audio = new Audio('musicFileIsland.mp3');
  audio.play();
}
function bgPause() {
  if (pause === false) {
    audio.pause();
  }
}
function bgBattle() {
  audio = new Audio('musicBattle.mp3');
  audio.play();
  if (pause === true) {
    bgPause();
  }
}
function bgDigivolution() {
  audio = new Audio('musicDigivolve.mp3');
  audio.play();
  if (pause === true) {
    bgPause();
  }
}
function bgDevimon() {
  audio = new Audio('musicDevimon.mp3');
  audio.play();
  if (pause === true) {
    bgPause();
  }
}

// Music Testing Area Done

////Try this link for HP bar https://codepen.io/dwidomski/pen/KBzuo

let introText = 0;
let justTrained = false;
let random = 0;
let partnerSelection = 0;
let day = 0;
let hunger = 0;
let talkingAllowed = true;
let awaitingInput = false;
let decisionTop = 0;
let decisionMiddle = 0;
let decisionBottom = 0;
let allowBtnDecisionBottom = false;
let partner;
let subMenu = 0;
let gamePlayStart;
let trainingPoints = 0;
let digivolutionPoints = 0;
let statsCheck;
let statBoost = 0;
let championHPMP = 50;
let championATKDEFSPD = 50;
let championDP = 150;
let ultimateHPMP = 80;
let ultimateATKDEFSPD = 80;
let ultimateDP = 500;
// Digivolve to Champion all stats + 5, HP/MP 100% recovery
// Digivolve to Ultimate all stats + 10, HP/MP 100% recovery
let devimonBattleDigivolution = false;
let devimonBattle = false;
let devimonBattleDialogue = 0;
let devimonDefeated = false;
let championLevelOn = false;
let ultimateLevelOn = false;
let digivolutionBattle = 1;

let battleDialogueQueue = 0;
let battleScene = false;
let pause = false;

// Digimon Stats

let playerHP,
  playerMaxHP,
  playerMP,
  playerMaxMP,
  playerDEF,
  playerATK,
  playerSPD,
  playerAction,
  enemyHP,
  enemyMaxHP,
  enemyMP,
  enemyMaxMP,
  enemyDEF,
  enemyATK,
  enemySPD,
  enemyName,
  enemySkillName,
  firstAttacker,
  playerAttacksNPC,
  npcAttacksPlayer,
  damageCalc,
  mpCalc,
  actions,
  hpBarNPCValue,
  hpBarPlayerValue,
  mpBarNPCValue,
  mpBarPlayerValue,
  dpFromBattle;

const pauseBtn = document.querySelector('.pause');
const btn = document.querySelector('.btn');
const btnDevimon = document.querySelector('.btnDevimon');
const challengeDevimon = document.querySelector('.challengeDevimon');
const btnBattle = document.querySelector('.btnBattle');
const btnTrain = document.querySelector('.btnTrain');
const btnFood = document.querySelector('.btnFood');
const btnSleep = document.querySelector('.btnSleep');
const btnHP = document.querySelector('.btnHP');
const btnMP = document.querySelector('.btnMP');
const btnDEF = document.querySelector('.btnDEF');
const btnATK = document.querySelector('.btnATK');
const btnSPD = document.querySelector('.btnSPD');
const trainMenu = document.querySelector('.trainMenu');
const trainingPointsDisplay = document.querySelector('.tp');
const digivolutionPointsDisplay = document.querySelector('.dp');
const bottomDisplay = document.querySelector('.bottomDisplay');

const music = document.getElementById('music');
const background = document.getElementById('background');
const nightOverlay = document.getElementById('nightOverlay');
const foodOverlay = document.getElementById('foodOverlay');
const imageRight = document.getElementById('imageRight');
const imageMiddle = document.getElementById('imageMiddle');

const menuTop = document.querySelector('.menuTop');
const decisions = document.querySelector('.decisions');
const dialogue = document.querySelector('.dialoguebox');
const battleDialogueBox = document.querySelector('.battleDialogueBox');

const btnDecisionTop = document.querySelector('.btnDecisionTop');
const btnDecisionMiddle = document.querySelector('.btnDecisionMiddle');
const btnDecisionBottom = document.querySelector('.btnDecisionBottom');
const talkerName = document.querySelector('.talkerName');

const battleStats = document.querySelector('.battleStats');
const battleCommands = document.querySelector('.battleCommands');
const battle1 = document.querySelector('.battle1');
const battle2 = document.querySelector('.battle2');
const battle3 = document.querySelector('.battle3');
const battle4 = document.querySelector('.battle4');

const playerBoxName = document.getElementById('playerBattleName');
const npcBoxName = document.getElementById('npcBattleName');
const playerBattleBoxName = document.querySelector('.playerBattleBoxName');
const npcBattleBoxName = document.querySelector('.npcBattleBoxName');

const hpBarNPC = document.getElementById('hpBarNPC');
const hpBlackBarNPC = document.getElementById('hpBlackBarNPC');
const hpBarDevimon = document.getElementById('hpBarDevimon');
const hpBlackBarDevimon = document.getElementById('hpBlackBarDevimon');

const mpBarNPC = document.getElementById('mpBarNPC');
const mpBlackBarNPC = document.getElementById('mpBlackBarNPC');

const mpBarPlayer = document.getElementById('mpBarPlayer');

const hpBarPlayer = document.getElementById('hpBarPlayer');
const playerBattleBox = document.querySelector('.playerBattleBox');
const npcBattleBox = document.querySelector('.npcBattleBox');
const playerHPTextValue = document.querySelector('.playerHPTextValue');
const npcHPTextValue = document.querySelector('.npcHPTextValue');
const playerMPTextValue = document.querySelector('.playerMPTextValue');
const npcMPTextValue = document.querySelector('.npcMPTextValue');

// Functions

// function gameMusic(src) {
//   if (battleScene === false) {
//     myMusic.load();
//     mySound = new sound('bounce.mp3');
//     myMusic = new sound('musicFileIsland.mp3');
//     myMusic.play();
//   } else {
//     myMusic.load();

//     mySound = new sound('bounce.mp3');
//     myMusic = new sound('musicBattle.mp3');
//     myMusic.play();
//   }
// }

const battleBoxToggle = function () {
  battleStats.classList.toggle('hidden');
  npcBattleBox.classList.toggle('hidden');
  playerBattleBox.classList.toggle('hidden');
  playerBattleBoxName.classList.toggle('hidden');
  decisions.classList.add('hidden');
  playerBoxName.classList.toggle('hidden');
  playerHPTextValue.classList.toggle('hidden');
  playerMPTextValue.classList.toggle('hidden');
  npcBoxName.classList.toggle('hidden');
  npcBattleBoxName.classList.toggle('hidden');
  npcHPTextValue.classList.toggle('hidden');
  npcMPTextValue.classList.toggle('hidden');
  hpBarDevimon.classList.add('hidden');
  hpBlackBarDevimon.classList.add('hidden');

  if (devimonBattle === true) {
    hpBlackBarNPC.classList.toggle('hidden');
    hpBarNPC.classList.toggle('hidden');
    mpBlackBarNPC.classList.toggle('hidden');
    mpBarNPC.classList.toggle('hidden');
    hpBarDevimon.classList.remove('hidden');
    hpBlackBarDevimon.classList.remove('hidden');
  }

  battleCommands.classList.toggle('hidden');
  battle1.classList.toggle('hidden');
  battle2.classList.toggle('hidden');
  battle3.classList.toggle('hidden');

  battleDialogueBox.classList.add('hidden');
  playerHPTextValue.textContent = `${playerHP}`;
  playerMPTextValue.textContent = `${playerMP}`;
};

const battlePowerCheck = function () {
  if (devimonBattle === true) {
    return;
  }
  allowBtnDecisionBottom = true;
  statsCheck = 0;
  statsCheck = playerMaxHP + playerMaxMP + playerATK + playerDEF + playerSPD;
  if (statsCheck <= 90) {
    random = Math.trunc(Math.random() * 2) + 1;
    if (random === 1) {
      enemyName = 'Goburimon';
    }
    if (random === 2) {
      enemyName = 'Lopmon';
    }
    return;
  }
  // Adds Monodramon & Lunamon
  if (statsCheck > 90 && championLevelOn !== true) {
    random = Math.trunc(Math.random() * 2) + 1;
    if (random === 1) {
      enemyName = 'Lunamon';
    }
    if (random === 2) {
      enemyName = 'Monodramon';
    }
    return;
  }
  // Adds Wizardmon & Drimogemon
  if (statsCheck > 120 && statsCheck <= 140 && championLevelOn === true) {
    random = Math.trunc(Math.random() * 2) + 1;
    if (random === 1) {
      enemyName = 'Wizardmon';
    }
    if (random === 2) {
      enemyName = 'Drimogemon';
    }
    return;
  }
  // Adds Exveemon & Airdramon
  if (statsCheck > 140 && championLevelOn === true) {
    random = Math.trunc(Math.random() * 4) + 1;
    if (random === 1) {
      enemyName = 'Wizardmon';
    }
    if (random === 2) {
      enemyName = 'Drimogemon';
    }
    if (random === 3) {
      enemyName = 'Exveemon';
    }
    if (random === 4) {
      enemyName = 'Airdramon';
    }
    return;
  }
};

const battleRandomizer = function () {
  menuTop.classList.add('hidden');
  playerBoxName.textContent = `${partner}`;
  battlePowerCheck();
  if (enemyName === 'Goburimon') {
    goburimon();
    background.src = `BattleBackground1.png`;
    return;
  }
  if (enemyName === 'Lopmon') {
    lopmon();
    background.src = `BattleBackground1.png`;
    return;
  }
  if (enemyName === 'Lunamon') {
    lunamon();
    background.src = `BattleBackground2.png`;
    return;
  }
  if (enemyName === 'Monodramon') {
    monodramon();
    background.src = `BattleBackground2.png`;
    return;
  }
  if (enemyName === 'Wizardmon') {
    wizardmon();
    background.src = `BattleBackground2.png`;
    return;
  }
  if (enemyName === 'Drimogemon') {
    drimogemon();
    background.src = `BattleBackground2.png`;
    return;
  }
  if (enemyName === 'Exveemon') {
    exveemon();
    background.src = `BattleBackground3.png`;
    return;
  }
  if (enemyName === 'Airdramon') {
    aidramon();
    background.src = `BattleBackground3.png`;
    return;
  }
  if (enemyName === 'Devimon') {
    devimon();
    background.src = `BattleBackground3.png`;
    return;
  }
};

// Quick Test Functions

// const skipIntro = function () {
//   bgFileIsland();
//   partnerSelection = 5;
//   introText = 13;
// };
// skipIntro();

const cheat = function () {
  playerHP = 95;
  playerMaxHP = 95;
  playerMP = 50;
  playerMaxMP = 50;
  playerATK = 45;
  playerDEF = 35;
  playerSPD = 35;
  digivolutionPoints = 1500;
  console.log(`Stats enhanced!`);
};

// Button Style Functions

const btnActiveRemove = function () {
  decisions.classList.add('hidden');
  btnBattle.classList.add('inactiveBtn');
  btnBattle.classList.remove('textShadow');
  btnTrain.classList.add('inactiveBtn');
  btnTrain.classList.remove('textShadow');
  btnFood.classList.add('inactiveBtn');
  btnFood.classList.remove('textShadow');
  btnSleep.classList.add('inactiveBtn');
  btnSleep.classList.remove('textShadow');
};

const btnActiveAdd = function () {
  btnBattle.classList.remove('inactiveBtn');
  btnBattle.classList.add('textShadow');

  btnTrain.classList.remove('inactiveBtn');
  btnTrain.classList.add('textShadow');

  btnFood.classList.remove('inactiveBtn');
  btnFood.classList.add('textShadow');

  btnSleep.classList.remove('inactiveBtn');
  btnSleep.classList.add('textShadow');
};

const trainMenuActiveToggle = function () {
  trainMenu.classList.toggle('hidden');
};

const btnBattleActive = function () {
  btnBattle.classList.remove('inactiveBtn');
  btnBattle.classList.add('textShadow');
};

const btnTrainActive = function () {
  btnTrain.classList.remove('inactiveBtn');
  btnTrain.classList.add('textShadow');
};
const btnFoodActive = function () {
  btnFood.classList.remove('inactiveBtn');
  btnFood.classList.add('textShadow');
};

const btnSleepActive = function () {
  btnSleep.classList.remove('inactiveBtn');
  btnSleep.classList.add('textShadow');
};

// Moving Digimon Around Functions

const partnerMiddle = function () {
  document.querySelector('#imageMiddle').style.left = '40%';
  document.querySelector('#imageMiddle').style.top = '40rem';

  imageRight.classList.add('hidden');
  if (partnerSelection >= 1) {
    document.getElementById('imageMiddle').src = 'Agumon.gif';
    document.querySelector('#imageMiddle').style.width = '40rem';
    playerBattleBoxName.textContent = `Agumon`;
    battle2.textContent = `Pepper Breath`;
    partner = 'Agumon';
  } else {
    document.getElementById('imageMiddle').src = 'Betamon.gif';
    document.querySelector('#imageMiddle').style.width = '55rem';
    playerBattleBoxName.textContent = `Betamon`;
    battle2.textContent = `Electric Shock`;
    partner = 'Betamon';
  }
};
const twoDigimonOnScreen = function () {
  if (
    partner === 'RizeGreymon' ||
    partner === 'MegaSeadramon' ||
    partner === 'GeoGreymon' ||
    partner === 'Seadramon'
  ) {
  } else {
    document.querySelector('#imageMiddle').style.left = '25%';
  }
  document.querySelector('#imageRight').style.top = '40rem';
  imageRight.classList.remove('hidden');
};

//////////

const removeFocus = function () {
  btnHP.blur();
  btnMP.blur();
  btnDEF.blur();
  btnATK.blur();
  btnSPD.blur();
  btnFood.blur();
  btnSleep.blur();
  btnBattle.blur();
  btnDecisionTop.blur();
  btnDecisionMiddle.blur();
  btnDecisionBottom.blur();
  battle1.blur();
  battle2.blur();
  battle3.blur();
  btnDevimon.blur();
  pauseBtn.blur();
};

const decisionButtonsToggle = function () {
  decisions.classList.toggle('hidden');
  if (allowBtnDecisionBottom !== true) {
    btnDecisionBottom.classList.add('hidden');
  } else {
    btnDecisionBottom.classList.add('hidden');
  }
};

const decisionButtonsOn = function () {
  decisions.classList.remove('hidden');
};

const textBoxNext = function () {
  introText++;
};

const decisionBtnTop = function () {
  decisionTop++;
  partnerSelection++;
  awaitingInput = false;
  decisions.classList.add(`hidden`);
  removeFocus();
  if (battleScene === true) {
    battleFunctionContinue();
    return;
  }
  if (introText === 7) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `Ah! Interesting, interesting!`;
  }
  if (introText === 8) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I would rather tan myself! My beard gets too wet in the water and weighs me down!`;
  }
  if (introText === 9) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I love sleep too much to wake up before the sun rises!`;
  }

  if (introText === 10) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I would say I eat more than I can handle most of the time myself!`;
  }

  if (introText === 11) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I'm more of a neutral colour kind of Digimon but then again Babamon gets to choose everything around the house...`;
  }
  if (introText === 43) {
    menuTop.classList.add('hidden');
    dialogue.textContent = `Zzz`;
    nightOverlay.classList.remove('hidden');
    trainMenu.classList.add('hidden');
  }
};

const decisionBtnMiddle = function () {
  decisionMiddle++;
  partnerSelection--;
  awaitingInput = false;
  decisions.classList.add(`hidden`);
  removeFocus();
  if (battleScene === true) {
    returnToDigimonIsland();
    return;
  }
  if (introText === 7) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `Ah! Interesting, interesting!`;
  }
  if (introText === 8) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I would rather tan myself! My beard gets too wet in the water and weighs me down!`;
  }
  if (introText === 9) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I love sleep too much to wake up before the sun rises!`;
  }

  if (introText === 10) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I would say I eat more than I can handle most of the time myself!`;
  }

  if (introText === 11) {
    document.querySelector(
      '.dialoguebox'
    ).textContent = `I'm more of a neutral colour kind of Digimon but then again Babamon gets to choose everything around the house...`;
  }
  if (introText === 43) {
    dialogue.classList.add('hidden');
    btnActiveAdd();
    introText = 38;
  }
};

const decisionBtnBottom = function () {
  decisionBottom++;
};

/////////////////////
// Enemy Digimon Functions

const goburimon = function () {
  if (statsCheck > 65 && statsCheck < 85) {
    statBoost = 4;
  } else {
    statBoost = 0;
  }
  enemyHP = 14 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyMaxHP = enemyHP;
  enemyMP = 6 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyMaxMP = enemyMP;
  enemyDEF = 8 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyATK = 5 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemySPD = 4 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  dpFromBattle = 10 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyName = 'Goburimon';
  npcBoxName.textContent = `${enemyName}`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  document.getElementById('imageRight').src = 'Goburimon.gif';
  document.querySelector('#imageRight').style.width = '55rem';
  twoDigimonOnScreen();
};

const lopmon = function () {
  if (statsCheck > 65 && statsCheck < 85) {
    statBoost = 4;
  } else {
    statBoost = 0;
  }
  enemyHP = 15 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyMaxHP = enemyHP;
  enemyMP = 11 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyMaxMP = enemyMP;
  enemyDEF = 6 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyATK = 5 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemySPD = 10 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  dpFromBattle = 12 + (Math.trunc(Math.random() * 2) + 1) + statBoost;
  enemyName = 'Lopmon';
  npcBoxName.textContent = `${enemyName}`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  document.getElementById('imageRight').src = 'Lopmon.gif';
  document.querySelector('#imageRight').style.width = '55rem';
  twoDigimonOnScreen();
};

const lunamon = function () {
  enemyHP = 29 + (Math.trunc(Math.random() * 4) + 1);
  enemyMaxHP = enemyHP;
  enemyMP = 12 + (Math.trunc(Math.random() * 4) + 1);
  enemyMaxMP = enemyMP;
  enemyDEF = 11 + (Math.trunc(Math.random() * 4) + 1);
  enemyATK = 13 + (Math.trunc(Math.random() * 4) + 1);
  enemySPD = 18 + (Math.trunc(Math.random() * 4) + 1);
  dpFromBattle = 16 + (Math.trunc(Math.random() * 6) + 1);
  enemyName = 'Lunamon';
  npcBoxName.textContent = `Lunamon`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  document.getElementById('imageRight').src = 'Lunamon.gif';
  document.querySelector('#imageRight').style.width = '55rem';
  twoDigimonOnScreen();
};

const monodramon = function () {
  enemyHP = 32 + (Math.trunc(Math.random() * 4) + 1);
  enemyMaxHP = enemyHP;
  enemyMP = 18 + (Math.trunc(Math.random() * 4) + 1);
  enemyMaxMP = enemyMP;
  enemyDEF = 16 + (Math.trunc(Math.random() * 4) + 1);
  enemyATK = 16 + (Math.trunc(Math.random() * 4) + 1);
  enemySPD = 12 + (Math.trunc(Math.random() * 4) + 1);
  dpFromBattle = 20 + (Math.trunc(Math.random() * 6) + 1);
  enemyName = 'Monodramon';
  npcBoxName.textContent = `Monodramon`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  document.getElementById('imageRight').src = 'Monodramon.gif';
  document.querySelector('#imageRight').style.width = '55rem';
  twoDigimonOnScreen();
};

const wizardmon = function () {
  enemyHP = 50 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxHP = enemyHP;
  enemyMP = 50 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxMP = enemyMP;
  enemyDEF = 22 + (Math.trunc(Math.random() * 5) + 1);
  enemyATK = 22 + (Math.trunc(Math.random() * 5) + 1);
  enemySPD = 23 + (Math.trunc(Math.random() * 5) + 1);
  dpFromBattle = 25 + (Math.trunc(Math.random() * 10) + 1);
  enemyName = 'Wizardmon';
  npcBoxName.textContent = `Wizardmon`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  document.getElementById('imageRight').src = 'Wizardmon.gif';
  document.querySelector('#imageRight').style.width = '55rem';
  twoDigimonOnScreen();
};

const drimogemon = function () {
  enemyHP = 60 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxHP = enemyHP;
  enemyMP = 30 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxMP = enemyMP;
  enemyDEF = 30 + (Math.trunc(Math.random() * 5) + 1);
  enemyATK = 25 + (Math.trunc(Math.random() * 5) + 1);
  enemySPD = 28 + (Math.trunc(Math.random() * 5) + 1);
  dpFromBattle = 35 + (Math.trunc(Math.random() * 10) + 1);
  enemyName = 'Drimogemon';
  npcBoxName.textContent = `Drimogemon`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  twoDigimonOnScreen();
  document.getElementById('imageRight').src = 'Drimogemon.gif';
  document.querySelector('#imageRight').style.width = '65rem';
};

const exveemon = function () {
  enemyHP = 99 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxHP = enemyHP;
  enemyMP = 74 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxMP = enemyMP;
  enemyDEF = 35 + (Math.trunc(Math.random() * 5) + 1);
  enemyATK = 28 + (Math.trunc(Math.random() * 5) + 1);
  enemySPD = 50 + (Math.trunc(Math.random() * 5) + 1);
  dpFromBattle = 50 + (Math.trunc(Math.random() * 10) + 1);
  enemyName = 'Exveemon';
  npcBoxName.textContent = `${enemyName}`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  twoDigimonOnScreen();
  document.getElementById('imageRight').src = 'Exveemon.gif';
  document.querySelector('#imageRight').style.width = '94rem';
  document.querySelector('#imageRight').style.top = '20rem';
};

const aidramon = function () {
  enemyHP = 70 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxHP = enemyHP;
  enemyMP = 80 + (Math.trunc(Math.random() * 5) + 1);
  enemyMaxMP = enemyMP;
  enemyDEF = 35 + (Math.trunc(Math.random() * 4) + 1);
  enemyATK = 25 + (Math.trunc(Math.random() * 4) + 1);
  enemySPD = 35 + (Math.trunc(Math.random() * 4) + 1);
  dpFromBattle = 40 + (Math.trunc(Math.random() * 10) + 1);
  enemyName = 'Aidramon';
  npcBoxName.textContent = `${enemyName}`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  twoDigimonOnScreen();
  document.getElementById('imageRight').src = 'Airdramon.gif';
  document.querySelector('#imageRight').style.width = '90rem';
  document.querySelector('#imageRight').style.top = '15rem';
};

const devimon = function () {
  enemyHP = 450;
  enemyMaxHP = enemyHP;
  enemyMP = 250;
  enemyMaxMP = enemyMP;
  enemyDEF = 55;
  enemyATK = 35;
  enemySPD = 35;
  dpFromBattle = 300;
  enemyName = 'Devimon';
  npcBoxName.textContent = `Devimon`;
  npcHPTextValue.textContent = `${enemyHP}`;
  npcMPTextValue.textContent = `${enemyMP}`;
  twoDigimonOnScreen();
  document.getElementById('imageRight').src = 'Devimon.gif';
  document.querySelector('#imageRight').style.width = '68rem';
  document.querySelector('#imageRight').style.top = '6rem';
};

const battleFunctionDevimonEvent = function () {};

const battleFunctionFirstAttacker = function () {
  firstAttacker = 0;
  // Bypasses SPD stats all together sometimes 1/3 chance. Means you can also attack first even on super fast enemies sometimes!
  random = Math.trunc(Math.random() * 3) + 1;
  if (random === 3) {
    random = Math.trunc(Math.random() * 2) + 1;
    if (random === 1) {
      firstAttacker = 1;
    } else {
      firstAttacker = 2;
    }
    return;
  }
  if (playerSPD > enemySPD) {
    firstAttacker = 1;
  }
  if (playerSPD < enemySPD) {
    firstAttacker = 2;
  }
  if (playerSPD === enemySPD) {
    random = Math.trunc(Math.random() * 2) + 1;
    if (random === 1) {
      firstAttacker = 1;
    } else {
      firstAttacker = 2;
    }
  }
};

const battleFunctionPlayerActionDamageCalc = function () {
  if (playerAction === 'Attack') {
    playerAttacksNPC = Math.trunc(playerATK - enemyDEF / 1.7);
    if (playerAttacksNPC < 0) {
      playerAttacksNPC = 1;
    }
  }
  if (playerAction === 'Skill') {
    playerAttacksNPC = Math.trunc(playerATK * 1.5 - enemyDEF / 1.7);
    if (playerAttacksNPC < 0) {
      playerAttacksNPC = 1;
    }
  }
};

const mpCalculationPlayerRookie = function () {
  mpCalc = 4 / playerMP;
  mpCalc = 1 - mpCalc;
  mpCalc = Math.trunc(mpBarPlayerValue * mpCalc);
  playerMP -= 4;
  mpBarPlayerValue = mpCalc;
  mpBarPlayer.style.width = `${mpCalc}rem`;
  playerMPTextValue.textContent = `${playerMP}`;
  return;
};

const mpCalculationPlayerChampion = function () {
  mpCalc = 10 / playerMP;
  mpCalc = 1 - mpCalc;
  mpCalc = Math.trunc(mpBarPlayerValue * mpCalc);
  playerMP -= 10;
  mpBarPlayerValue = mpCalc;
  mpBarPlayer.style.width = `${mpCalc}rem`;
  playerMPTextValue.textContent = `${playerMP}`;
  return;
};

const mpCalculationPlayerUltimate = function () {
  mpCalc = 15 / playerMP;
  mpCalc = 1 - mpCalc;
  mpCalc = Math.trunc(mpBarPlayerValue * mpCalc);
  playerMP -= 15;
  mpBarPlayerValue = mpCalc;
  mpBarPlayer.style.width = `${mpCalc}rem`;
  playerMPTextValue.textContent = `${playerMP}`;
  return;
};

const mpCalculationNPCRookie = function () {
  mpCalc = 4 / enemyMP;
  mpCalc = 1 - mpCalc;
  mpCalc = Math.trunc(mpBarNPCValue * mpCalc);
  enemyMP -= 4;
  mpBarNPCValue = mpCalc;
  mpBarNPC.style.width = `${mpCalc}rem`;
  npcMPTextValue.textContent = `${enemyMP}`;
  return;
};

const mpCalculationNPCChampion = function () {
  mpCalc = 10 / enemyMP;
  mpCalc = 1 - mpCalc;
  mpCalc = Math.trunc(mpBarNPCValue * mpCalc);
  enemyMP -= 10;
  mpBarNPCValue = mpCalc;
  mpBarNPC.style.width = `${mpCalc}rem`;
  npcMPTextValue.textContent = `${enemyMP}`;
  return;
};

const battleFunctionsNPCActionSelection = function () {
  random = Math.trunc(Math.random() * 2) + 1;
  if (
    enemyName === 'Goburimon' ||
    enemyName === 'Lopmon' ||
    enemyName === 'Monodramon' ||
    enemyName === 'Lunamon'
  ) {
    if (enemyMP < 4) {
      random = 1;
    }
  }
  if (
    enemyName === 'Wizardmon' ||
    enemyName === 'Drimogemon' ||
    enemyName === 'Exveemon' ||
    enemyName === 'Aidramon' ||
    enemyName === 'Devimon'
  ) {
    if (enemyMP < 10) {
      random = 1;
    }
  }
  // This is for a regular attack random === 1
  if (random === 1) {
    npcAttacksPlayer = Math.trunc(enemyATK - playerDEF / 1.7);
    if (npcAttacksPlayer <= 0) {
      npcAttacksPlayer = 1;
    }
    battleDialogueBox.textContent = `${enemyName} attacks! ${partner} takes ${npcAttacksPlayer} damage!`;
    return;
  }
  // Here is the skill selection based off of the name of the enemy
  if (random === 2) {
    npcAttacksPlayer = Math.trunc(enemyATK * 1.5 - playerDEF / 1.7);
    if (npcAttacksPlayer <= 0) {
      npcAttacksPlayer = 1;
    }
    if (enemyName === 'Goburimon') {
      battleDialogueBox.textContent = `${enemyName} uses Goblin Strike! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCRookie();
      return;
    }
    if (enemyName === 'Lopmon') {
      battleDialogueBox.textContent = `${enemyName} uses Blazing Ice! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCRookie();

      return;
    }
    if (enemyName === 'Monodramon') {
      battleDialogueBox.textContent = `${enemyName} uses Knuckle Beater! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCRookie();
      return;
    }
    if (enemyName === 'Lunamon') {
      battleDialogueBox.textContent = `${enemyName} uses Tearing Shot! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCRookie();
      return;
    }
    if (enemyName === 'Wizardmon') {
      battleDialogueBox.textContent = `${enemyName} uses Thunder Cloud! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCChampion();
      return;
    }
    if (enemyName === 'Drimogemon') {
      battleDialogueBox.textContent = `${enemyName} uses Drill Spin! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCChampion();
      return;
    }
    if (enemyName === 'Exveemon') {
      battleDialogueBox.textContent = `${enemyName} uses Vee Laser! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCChampion();
      return;
    }
    if (enemyName === 'Aidramon') {
      battleDialogueBox.textContent = `${enemyName} uses Spinning Needle! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCChampion();
      return;
    }
    if (enemyName === 'Devimon') {
      battleDialogueBox.textContent = `${enemyName} uses Death Claw! ${partner} takes ${npcAttacksPlayer} damage!`;
      mpCalculationNPCChampion();
      return;
    }
  }
};

const battleFunctionPerformAction = function () {
  awaitingInput = true;
};

const battleFunctionAddDamage = function () {
  battleDialogueBox.classList.remove('hidden');
  if (firstAttacker === 1 && actions < 2 && playerHP > 0) {
    battleFunctionPlayerActionDamageCalc();
    if (playerAction === 'Skill') {
      if (partner === 'Agumon') {
        battleDialogueBox.textContent = `Take this! Pepper Breath! ${enemyName} takes ${playerAttacksNPC} damage!`;
      }
      if (partner === 'Betamon') {
        battleDialogueBox.textContent = `Take this! Electric Shock! ${enemyName} takes ${playerAttacksNPC} damage!`;
      }
      if (partner === 'GeoGreymon') {
        battleDialogueBox.textContent = `You're going down! Mega Burst! ${enemyName} takes ${playerAttacksNPC} damage!`;
      }
      if (partner === 'Seadramon') {
        battleDialogueBox.textContent = `You're going down! Ice Blast! ${enemyName} takes ${playerAttacksNPC} damage!`;
      }
      if (partner === 'RizeGreymon') {
        battleDialogueBox.textContent = `End of the line ${enemyName}! Trident Revolver! ${enemyName} takes ${playerAttacksNPC} damage!`;
      }
      if (partner === 'MegaSeadramon') {
        battleDialogueBox.textContent = `End of the line ${enemyName}! Lightning Javelin! ${enemyName} takes ${playerAttacksNPC} damage!`;
      }
      if (partner === 'Agumon' || partner === 'Betamon') {
        mpCalculationPlayerRookie();
      }
      if (partner === 'GeoGreymon' || partner === 'Seadramon') {
        mpCalculationPlayerChampion();
      }
      if (partner === 'RizeGreymon' || partner === 'MegaSeadramon') {
        mpCalculationPlayerUltimate();
      }
    }
    if (playerAction === 'Attack') {
      battleDialogueBox.textContent = `${partner} attacks! ${enemyName} takes ${playerAttacksNPC} damage!`;
    }
    damageCalc = playerAttacksNPC / enemyHP;
    damageCalc = 1 - damageCalc;
    damageCalc = Math.trunc(hpBarNPCValue * damageCalc);
    hpBarNPCValue = damageCalc;
    enemyHP -= playerAttacksNPC;
    if (enemyHP <= 0) {
      enemyHP = 0;
      if (devimonBattle === true) {
        hpBarDevimon.style.width = `0rem`;
      } else {
        hpBarNPC.style.width = `0rem`;
        npcHPTextValue.textContent = `${enemyHP}`;
      }
    } else if (enemyHP > 0) {
      if (devimonBattle === true) {
        hpBarDevimon.style.width = `${damageCalc}rem`;
      } else {
        hpBarNPC.style.width = `${damageCalc}rem`;
        npcHPTextValue.textContent = `${enemyHP}`;
      }
    }
    firstAttacker = 2;
    actions++;
    return;
  }
  if (firstAttacker === 2 && actions < 2) {
    battleFunctionsNPCActionSelection();
    damageCalc = npcAttacksPlayer / playerHP;
    damageCalc = 1 - damageCalc;
    damageCalc = Math.trunc(hpBarPlayerValue * damageCalc);
    hpBarPlayerValue = damageCalc;
    playerHP -= npcAttacksPlayer;
    if (playerHP <= 0) {
      playerHP = 0;
      hpBarPlayer.style.width = '0rem';
      playerHPTextValue.textContent = `${playerHP}`;
    } else if (playerHP > 0) {
      hpBarPlayer.style.width = `${damageCalc}rem`;
      playerHPTextValue.textContent = `${playerHP}`;
    }
    firstAttacker = 1;
    actions++;
    return;
  }
  if (actions === 2) {
    battleDialogueBox.classList.add('hidden');
    awaitingInput = false;
    actions = 0;
    if (
      devimonBattle === true &&
      enemyHP <= 250 &&
      devimonBattleDialogue < 100
    ) {
      battleDialogueBox.classList.remove('hidden');
      awaitingInput = true;
      devimonBattleDialogue = 11;
      actions = 20;
    }
  }
};

const battleFunctionPlayerHasDied = function () {
  dpFromBattle = 5 + (Math.trunc(Math.random() * 15) + 1);
  battleDialogueBox.textContent = `${partner} has fainted! ${partner} has lost ${dpFromBattle} DP! Returning to Digimon Island.`;
  actions = 3;
  digivolutionPoints -= dpFromBattle;
  if (digivolutionPoints < 0) {
    digivolutionPoints = 0;
  }
  digivolutionPointsDisplay.textContent = `${digivolutionPoints}`;
};

const battleFunctionEnemyHasDied = function () {
  battleDialogueBox.textContent = `${enemyName} has fainted! ${partner} has earned ${dpFromBattle}DP!`;
  digivolutionPoints += dpFromBattle;
  digivolutionPointsDisplay.textContent = `${digivolutionPoints}`;
  actions = 4;
};

const deDigivolution = function () {
  if (partner === 'Agumon' || partner === 'Betamon') {
    return;
  }
  if (partner === 'RizeGreymon' || partner === 'MegaSeadramon') {
    statBoost = 30;
  }
  if (partner === 'GeoGreymon' || partner === 'Seadramon') {
    statBoost = 10;
  }
  playerHP = playerMaxHP;
  playerMP = playerMaxMP;
  playerHP -= statBoost;
  playerMaxHP -= statBoost;
  playerMP -= statBoost;
  playerMaxMP -= statBoost;
  if (partner === 'RizeGreymon' || partner === 'MegaSeadramon') {
    statBoost = 15;
  }
  if (partner === 'GeoGreymon' || partner === 'Seadramon') {
    statBoost = 5;
  }
  playerATK -= statBoost;
  playerDEF -= statBoost;
  playerSPD -= statBoost;
  if (partner === 'Seadramon' || partner === 'MegaSeadramon') {
    partner = 'Betamon';
    partnerSelection = 0;
  }
  if (partner === 'GeoGreymon' || partner === 'RizeGreymon') {
    partner = 'Agumon';
    partnerSelection = 5;
  }
};

const returnToDigimonIsland = function () {
  bgPause();
  bgFileIsland();
  deDigivolution();
  if (devimonBattle === true) {
    challengeDevimon.classList.remove('hidden');
    npcBattleBox.classList.remove('hidden');
    npcHPTextValue.classList.remove('hidden');
    npcMPTextValue.classList.remove('hidden');
    hpBlackBarNPC.classList.remove('hidden');
    hpBarNPC.classList.remove('hidden');
    mpBlackBarNPC.classList.remove('hidden');
    mpBarNPC.classList.remove('hidden');
    devimonBattle = false;
    devimonBattleDialogue = 0;
    decisionButtonsToggle();
  }
  if (partnerSelection >= 1) {
    document.getElementById('imageMiddle').src = 'Agumon.gif';
    document.querySelector('#imageMiddle').style.width = '40rem';
    playerBattleBoxName.textContent = `Agumon`;
    battle2.textContent = `Pepper Breath`;
    partner = 'Agumon';
  } else {
    document.getElementById('imageMiddle').src = 'Betamon.gif';
    document.querySelector('#imageMiddle').style.width = '55rem';
    playerBattleBoxName.textContent = `Betamon`;
    battle2.textContent = `Electric Shock`;
    partner = 'Betamon';
  }

  menuTop.classList.remove('hidden');
  battleDialogueBox.classList.add('hidden');
  background.src = `Background1.png`;
  hpBarNPC.style.width = `50rem`;
  mpBarNPC.style.width = `50rem`;
  hpBarPlayer.style.width = `50rem`;
  mpBarPlayer.style.width = `50rem`;
  document.querySelector('#imageMiddle').style.top = '40rem';

  battleBoxToggle();
  partnerMiddle();
  awaitingInput = false;
  battleScene = false;
  actions = 0;
  firstAttacker = 0;
  playerHP = playerMaxHP;
  playerMP = playerMaxMP;

  if (championLevelOn === true && introText === 90 && introText !== 100) {
    dialogue.classList.remove('hidden');
    talkingAllowed = true;
    awaitingInput = false;
    talkerName.textContent = `${partner}`;
    talkerName.classList.remove('hidden');
    dialogue.textContent = `That was a blast! I finally was able to Digivolve thanks to you!`;
  }
};
const battleFunctionContinue = function () {
  hpBarNPCValue = 50;
  mpBarNPCValue = 50;
  hpBarNPC.style.width = `50rem`;
  mpBarNPC.style.width = `50rem`;
  awaitingInput = false;
  actions = 0;

  battleDialogueBox.classList.add('hidden');
  removeFocus();
  battleRandomizer();
};
const battleFunctionFinishBattle = function () {
  if (devimonBattle === true) {
    returnToDigimonIsland();
    devimonDefeated = true;
    if (introText !== 200) {
      introText = 101;
      talkingAllowed = true;
    }
    return;
  }
  battleDialogueBox.textContent = `Return to Digimon Island or continue?`;
  document.querySelector('.btnDecisionTop').textContent = `Continue.`;
  document.querySelector(
    '.btnDecisionMiddle'
  ).textContent = `Return to Digimon Island.`;
  decisionButtonsToggle();
};

pauseBtn.addEventListener('click', function () {
  removeFocus();
  if (pause === true) {
    pause = false;
    audio.play();
  } else {
    pause = true;
    bgPause();
  }
});

battle1.addEventListener('click', function () {
  removeFocus();
  if (talkingAllowed === true) {
    return;
  }
  if (actions === 2) {
    actions = 0;
    awaitingInput = false;
  }
  if (awaitingInput === false) {
    playerAction = 'Attack';
    battleFunctionFirstAttacker();
    battleFunctionPerformAction();
    battleFunctionAddDamage();
  }
});

battle2.addEventListener('click', function () {
  removeFocus();
  if (talkingAllowed === true) {
    return;
  }
  if (partner === 'Agumon' || partner === 'Betamon') {
    if (playerMP < 4) {
      return;
    }
  }
  if (partner === 'GeoGreymon' || partner === 'Seadramon') {
    if (playerMP < 10) {
      return;
    }
  }
  if (partner === 'RizeGreymon' || partner === 'MegaSeadramon') {
    if (playerMP < 15) {
      return;
    }
  }

  if (actions === 2) {
    actions = 0;
    awaitingInput = false;
  }
  if (awaitingInput === false) {
    playerAction = 'Skill';
    battleFunctionFirstAttacker();
    battleFunctionPerformAction();
    battleFunctionAddDamage();
  }
});

battle3.addEventListener('click', function () {
  if (awaitingInput === true) {
    return;
  }
  removeFocus();
  championLevelOn = true;
  if (ultimateLevelOn === false) {
    introText = 90;
    battle3.classList.add('hidden');
  }
  if (devimonBattleDialogue === 100) {
    battle3.classList.remove('hidden');
    introText = 100;
  }
  if (partner === 'GeoGreymon') {
    document.getElementById('imageMiddle').src = 'Rizegreymon.gif';
    partner = 'RizeGreymon';
    playerBattleBoxName.textContent = `${partner}`;
    battle2.textContent = `Trident Revolver`;
    document.querySelector('#imageMiddle').style.width = '124rem';
    document.querySelector('#imageMiddle').style.left = '13%';
    document.querySelector('#imageMiddle').style.top = '-19rem';
    ultimateLevelOn = true;
    battle3.classList.add('hidden');
  }
  if (partner === 'Agumon') {
    document.getElementById('imageMiddle').src = 'Geogreymon.gif';
    partner = 'GeoGreymon';
    playerBattleBoxName.textContent = `${partner}`;
    battle2.textContent = `Mega Burst`;
    document.querySelector('#imageMiddle').style.width = '74rem';
    document.querySelector('#imageMiddle').style.left = '24%';
    document.querySelector('#imageMiddle').style.top = '22rem';
  }
  if (partner === 'Seadramon') {
    document.getElementById('imageMiddle').src = 'MegaSeadramon.gif';
    partner = 'MegaSeadramon';
    playerBattleBoxName.textContent = `${partner}`;
    battle2.textContent = `Lightning Javelin`;
    document.querySelector('#imageMiddle').style.width = '99rem';
    document.querySelector('#imageMiddle').style.left = '15%';
    document.querySelector('#imageMiddle').style.top = '14rem';
    ultimateLevelOn = true;
    battle3.classList.add('hidden');
  }
  if (partner === 'Betamon') {
    document.getElementById('imageMiddle').src = 'Seadramon.gif';
    partner = 'Seadramon';
    playerBattleBoxName.textContent = `${partner}`;
    battle2.textContent = `Ice Blast`;
    document.querySelector('#imageMiddle').style.width = '66rem';
    document.querySelector('#imageMiddle').style.left = '16%';
    document.querySelector('#imageMiddle').style.top = '22rem';
  }

  if (partner === 'RizeGreymon' || partner === 'MegaSeadramon') {
    statBoost = 20;
  } else {
    statBoost = 10;
  }
  playerHP = playerMaxHP;
  playerMP = playerMaxMP;
  playerHP += statBoost;
  playerMaxHP += statBoost;
  playerMP += statBoost;
  playerMaxMP += statBoost;
  if (partner === 'RizeGreymon' || partner === 'MegaSeadramon') {
    statBoost = 10;
  } else {
    statBoost = 5;
  }
  playerATK += statBoost;
  playerDEF += statBoost;
  playerSPD += statBoost;
  hpBarPlayer.style.width = `50rem`;
  mpBarPlayer.style.width = `50rem`;
  hpBarPlayerValue = 50;
  mpBarPlayerValue = 50;
  playerMPTextValue.textContent = `${playerMP}`;
  playerHPTextValue.textContent = `${playerHP}`;
});

btnDevimon.addEventListener('click', function () {
  removeFocus();
  if (talkingAllowed === true) {
    return;
  }
  bgPause();
  bgDevimon();
  challengeDevimon.classList.add('hidden');
  enemyName = 'Devimon';
  devimonBattle = true;
  battleScene = true;
  actions = 0;
  hpBarDevimon.style.width = `150rem`;
  hpBarNPCValue = 150;
  mpBarNPCValue = 50;
  hpBarPlayerValue = 50;
  mpBarPlayerValue = 50;
  if (partner === 'Agumon') {
    battle2.textContent = `Pepper Breath`;
  }
  if (partner === 'Betamon') {
    battle2.textContent = `Electric Shock`;
  }
  battleBoxToggle();
  battleRandomizer();
  battle3.classList.add('hidden');
  statsCheck = playerATK + playerDEF + playerSPD;
  if (statsCheck >= championATKDEFSPD) {
    statsCheck = playerHP + playerMP;
    if (statsCheck >= championHPMP) {
      statsCheck = digivolutionPoints;
      if (statsCheck >= championDP) {
        battle3.classList.remove('hidden');
      }
    }
  }
  npcBattleBox.classList.add('hidden');
  npcHPTextValue.classList.add('hidden');
  npcMPTextValue.classList.add('hidden');
  hpBlackBarNPC.classList.add('hidden');
  hpBarNPC.classList.add('hidden');
  mpBlackBarNPC.classList.add('hidden');
  mpBarNPC.classList.add('hidden');
  devimonBattleDialogue = 1;
  awaitingInput = true;
  battleDialogueBox.classList.remove('hidden');
  battleDialogueBox.textContent = `Devimon: ${partner}... how dare you disgrace us Digimon by bringing a human here!`;
});
///////////////// Devimon Battle Event Dialogues
////////////////
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'Enter' &&
    battleScene === true &&
    awaitingInput === true &&
    devimonBattleDialogue > 0
  ) {
    devimonBattleDialogue++;
    if (devimonBattleDialogue === 2) {
      battleDialogueBox.textContent = `You have resisted me for the last time! Embrace the darkness!`;
    }
    if (devimonBattleDialogue === 3) {
      battleDialogueBox.textContent = `${partner}: This is it pal! Let's save the Digital World and take him out!`;
    }
    if (devimonBattleDialogue === 4) {
      battleDialogueBox.textContent = ``;
      battleDialogueBox.classList.add('hidden');
      devimonBattleDialogue = 0;
      awaitingInput = false;
    }
    if (devimonBattleDialogue === 12) {
      battleDialogueBox.classList.remove('hidden');
      battleDialogueBox.textContent = `Devimon: Pathetic! I am the perfect Digimon! You do not stand a chance against me!`;
    }
    if (devimonBattleDialogue === 13) {
      battleDialogueBox.textContent = `Give up now and I may spare your life. But I cannot say the same for your human pet.`;
    }
    if (devimonBattleDialogue === 14) {
      battleDialogueBox.textContent = `${partner}: I won't give up on you partner and I know you won't give up on me!`;
    }
    if (devimonBattleDialogue === 15 && digivolutionPoints < 500) {
      battleDialogueBox.classList.add('hidden');
      awaitingInput = false;
      devimonBattleDialogue = 100;
      actions = 0;
      return;
    }
    if (devimonBattleDialogue === 15 && digivolutionPoints >= 500) {
      bgPause();
      bgDigivolution();
      battleDialogueBox.textContent = `I know we can do this together! We have to keep going even if our bodies can't move!`;
    }
    if (devimonBattleDialogue === 16 && digivolutionPoints >= 500) {
      battleDialogueBox.textContent = `We've come so far. Believe in me partner and I can win!`;
    }
    if (devimonBattleDialogue === 17 && digivolutionPoints >= 500) {
      battleDialogueBox.textContent = `I feel... I feel that strange power again! Let's use it to defeat Devimon!`;
    }
    if (devimonBattleDialogue === 18 && digivolutionPoints >= 500) {
      battleDialogueBox.textContent = `Devimon: No... this is not real! The light of Digivolution?!`;
    }
    if (devimonBattleDialogue === 19 && digivolutionPoints >= 500) {
      battleDialogueBox.textContent = `How can a human help unlock the power of Digivolution?! Mark my words I will destroy you!`;
    }
    if (devimonBattleDialogue === 20 && digivolutionPoints >= 500) {
      battleDialogueBox.classList.add('hidden');
      battle3.classList.remove('hidden');
      awaitingInput = false;
      devimonBattleDialogue = 100;
      actions = 0;
    }
  }
});

//////////////////////// Battle Dialogue skip
///////////////////////
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && battleScene === true && awaitingInput === true) {
    if (championLevelOn === false) {
      statsCheck = playerMaxHP + playerMaxMP;
      if (statsCheck >= championHPMP) {
        statsCheck = playerATK + playerDEF + playerSPD;
        if (statsCheck >= championATKDEFSPD) {
          if (
            (digivolutionPoints >= championDP) &
            (battleDialogueQueue !== 1)
          ) {
            awaitingInput = false;
            battleDialogueQueue = 1;
            battleDialogueBox.classList.add('hidden');
            return;
          }
        }
      }
    }
    if (playerHP > 0 && enemyHP > 0 && firstAttacker !== 0) {
      battleFunctionAddDamage();
      return;
    }
    if (playerHP === 0) {
      if (actions !== 3) {
        battleFunctionPlayerHasDied();
      }
      if (actions === 3 && playerHP === 0) {
        returnToDigimonIsland();
      }
    }
    if (enemyHP === 0 && playerHP > 0 && actions !== 4) {
      console.log(enemyHP);
      battleFunctionEnemyHasDied();
    }
    if (actions === 4 && enemyHP === 0) {
      battleFunctionFinishBattle();
    }
  }
});

///////////////
// Button Clicks

btnDecisionTop.addEventListener('click', decisionBtnTop);

btnDecisionMiddle.addEventListener('click', decisionBtnMiddle);

btnSleep.addEventListener('click', function () {
  if (awaitingInput === true || talkingAllowed === true) {
    removeFocus();
    return;
  }
  foodOverlay.classList.add('hidden');
  trainMenu.classList.add('hidden');
  btnActiveRemove();
  btnSleepActive();
  introText = 43;
  justTrained = true;
  talkingAllowed = true;
  awaitingInput = true;
  allowBtnDecisionBottom = false;
  dialogue.classList.remove('hidden');
  talkerName.classList.add('hidden');
  dialogue.textContent = `Are you sure you want to end the day and go to sleep?`;
  document.querySelector('.btnDecisionTop').textContent = `Yes.`;
  document.querySelector('.btnDecisionMiddle').textContent = `No.`;
  decisionButtonsToggle();
  removeFocus();
});

btnFood.addEventListener('click', function () {
  if (awaitingInput === true || talkingAllowed === true) {
    removeFocus();
    return;
  }
  if (awaitingInput === false) {
    trainMenu.classList.add('hidden');
    btnActiveRemove();
    btnFoodActive();
    if (hunger !== 2) {
      introText = 39;
      justTrained = true;
      talkingAllowed = true;
      removeFocus();
      dialogue.classList.remove('hidden');
      talkerName.classList.remove('hidden');
      foodOverlay.classList.remove('hidden');

      talkerName.textContent = `${partner}`;
      random = Math.trunc(Math.random() * 2) + 1;
      if (random === 1) {
        dialogue.textContent = `Mhmm! Don't mind if I do! Thanks partner!`;
      } else {
        dialogue.textContent = `Steak! My favourite!`;
      }
      random = Math.trunc(Math.random() * 2) + 1;
      // This part dictates if your digimon is full or half full
      if (random === 1) {
        hunger++;
      } else {
        hunger = 2;
      }
      // This section determines what the food effect actually becomes
      random = Math.trunc(Math.random() * 4) + 1;
      if (random === 3) {
        introText = 40;
        // This outcome will give TP+1
      } else if (random === 4) {
        introText = 41;
        // This outcome will give DP+20
      }
      removeFocus();
      btnActiveAdd();
    } else {
      introText = 39;
      justTrained = true;
      talkingAllowed = true;
      removeFocus();
      btnActiveAdd();
      dialogue.classList.remove('hidden');
      talkerName.classList.remove('hidden');
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `I am stuffed! I can't eat another bite.`;
    }
  }
});

btnTrain.addEventListener('click', function () {
  if (awaitingInput === true || talkingAllowed === true) {
    removeFocus();
    return;
  }
  if (awaitingInput === false) {
    if (gamePlayStart === true) {
      // When TP is <= 2 and hunger hasn't been taken care of, Agumon will want to eat. When he heats hunger becomes 2 for the day or 1 (2 if he gets full, 1 if he still wants more)
      if (subMenu === 0) {
        // this shows the sub menu
        subMenu++;
        dialogue.classList.add('hidden');
        talkerName.classList.add('hidden');
        foodOverlay.classList.add('hidden');

        btnActiveRemove();
        btnTrainActive();
        trainMenuActiveToggle();
        btnHP.textContent = `HP ➡ ${playerMaxHP}`;
        btnMP.textContent = `MP ➡ ${playerMaxMP}`;
        btnATK.textContent = `ATK ➡ ${playerATK}`;
        btnDEF.textContent = `DEF ➡ ${playerDEF}`;
        btnSPD.textContent = `SPD ➡ ${playerSPD}`;
      } else {
        subMenu--;
        talkerName.classList.add('hidden');
        dialogue.classList.add('hidden');
        justTrained = false;
        talkingAllowed = false;
        introText = 38;
        trainMenuActiveToggle();
        btnActiveRemove();
        btnActiveAdd();
      }
    }
  }
});

btnHP.addEventListener('click', function () {
  if ((trainingPoints === 2) & (hunger !== 2)) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    removeFocus();
    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    talkerName.textContent = `${partner}`;
    justTrained = true;
    if (hunger <= 1) {
      dialogue.textContent = `All this training has made me hungry. I need food to keep my energy up!`;
    } else {
      dialogue.textContent = `Partner, I'm still hungry... a growing 'mon has got to eat!`;
    }
    return;
  }
  if (
    trainingPoints > 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    trainingPoints--;
    introText = 39;
    justTrained = true;
    talkingAllowed = true;

    random = Math.trunc(Math.random() * 8) + 1;
    if (random === 1) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `Perfect! ${partner}'s training was a great success! HP has increased by 6!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerMaxHP += 6;
      btnHP.textContent = `HP ➡ ${playerMaxHP}`;
    }
    if (random === 2) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training didn't go that well... HP has increased by 2!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerMaxHP += 2;
      btnHP.textContent = `HP ➡ ${playerMaxHP}`;
    }
    if (random >= 3) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training was a success! HP has increased by 4!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerMaxHP += 4;
      btnHP.textContent = `HP ➡ ${playerMaxHP}`;
    }
    playerHP = playerMaxHP;
  } else if (
    trainingPoints === 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    dialogue.textContent = `I know you want to beat Devimon but I am too exhausted to train again, partner!`;
  }
});

btnMP.addEventListener('click', function () {
  if ((trainingPoints === 2) & (hunger !== 2)) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    removeFocus();

    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    talkerName.textContent = `${partner}`;
    justTrained = true;
    if (hunger <= 1) {
      dialogue.textContent = `All this training has made me hungry. I need food to keep my energy up!`;
    } else {
      dialogue.textContent = `Partner, I'm still hungry... a growing 'mon has got to eat!`;
    }
    return;
  }
  if (
    trainingPoints > 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    trainingPoints--;
    introText = 39;
    justTrained = true;
    talkingAllowed = true;

    random = Math.trunc(Math.random() * 8) + 1;
    if (random === 1) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `Perfect! ${partner}'s training was a great success! MP has increased by 6!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerMaxMP += 6;
      btnMP.textContent = `MP ➡ ${playerMaxMP}`;
    }
    if (random === 2) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training didn't go that well... MP has increased by 2!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerMaxMP += 2;
      btnMP.textContent = `MP ➡ ${playerMaxMP}`;
    }
    if (random >= 3) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training was a success! MP has increased by 4!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerMaxMP += 4;
      btnMP.textContent = `MP ➡ ${playerMaxMP}`;
    }
    playerMP = playerMaxMP;
  } else if (
    trainingPoints === 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    dialogue.textContent = `I know you want to beat Devimon but I am too exhausted to train again, partner!`;
  }
});

btnDEF.addEventListener('click', function () {
  if ((trainingPoints === 2) & (hunger !== 2)) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    removeFocus();

    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    talkerName.textContent = `${partner}`;
    justTrained = true;
    if (hunger <= 1) {
      dialogue.textContent = `All this training has made me hungry. I need food to keep my energy up!`;
    } else {
      dialogue.textContent = `Partner, I'm still hungry... a growing 'mon has got to eat!`;
    }
    return;
  }
  if (
    trainingPoints > 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    trainingPoints--;
    introText = 39;
    justTrained = true;
    talkingAllowed = true;

    random = Math.trunc(Math.random() * 8) + 1;
    if (random === 1) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `Perfect! ${partner}'s training was a great success! DEF has increased by 4!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerDEF += 4;
      btnDEF.textContent = `DEF ➡ ${playerDEF}`;
    }
    if (random === 2) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training didn't go that well... DEF has increased by 1!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerDEF += 1;
      btnDEF.textContent = `DEF ➡ ${playerDEF}`;
    }
    if (random >= 3) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training was a success! DEF has increased by 2!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerDEF += 2;
      btnDEF.textContent = `DEF ➡ ${playerDEF}`;
    }
  } else if (
    trainingPoints === 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    dialogue.textContent = `I know you want to beat Devimon but I am too exhausted to train again, partner!`;
  }
});

btnATK.addEventListener('click', function () {
  if ((trainingPoints === 2) & (hunger !== 2)) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    removeFocus();

    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    talkerName.textContent = `${partner}`;
    justTrained = true;
    if (hunger <= 1) {
      dialogue.textContent = `All this training has made me hungry. I need food to keep my energy up!`;
    } else {
      dialogue.textContent = `Partner, I'm still hungry... a growing 'mon has got to eat!`;
    }
    return;
  }
  if (
    trainingPoints > 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    trainingPoints--;
    introText = 39;
    justTrained = true;
    talkingAllowed = true;

    random = Math.trunc(Math.random() * 8) + 1;
    if (random === 1) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `Perfect! ${partner}'s training was a great success! ATK has increased by 4!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerATK += 4;
      btnATK.textContent = `ATK ➡ ${playerATK}`;
    }
    if (random === 2) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training didn't go that well... ATK has increased by 1!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerATK += 1;
      btnATK.textContent = `ATK ➡ ${playerATK}`;
    }
    if (random >= 3) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training was a success! ATK has increased by 2!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerATK += 2;
      btnATK.textContent = `ATK ➡ ${playerATK}`;
    }
  } else if (
    trainingPoints === 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    dialogue.textContent = `I know you want to beat Devimon but I am too exhausted to train again, partner!`;
  }
});

btnSPD.addEventListener('click', function () {
  if ((trainingPoints === 2) & (hunger !== 2)) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    removeFocus();

    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    talkerName.textContent = `${partner}`;
    justTrained = true;
    if (hunger <= 1) {
      dialogue.textContent = `All this training has made me hungry. I need food to keep my energy up!`;
    } else {
      dialogue.textContent = `Partner, I'm still hungry... a growing 'mon has got to eat!`;
    }
    return;
  }
  if (
    trainingPoints > 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    trainingPoints--;
    introText = 39;
    justTrained = true;
    talkingAllowed = true;

    random = Math.trunc(Math.random() * 8) + 1;
    if (random === 1) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `Perfect! ${partner}'s training was a great success! SPD has increased by 4!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerSPD += 4;
      btnSPD.textContent = `SPD ➡ ${playerSPD}`;
    }
    if (random === 2) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training didn't go that well... SPD has increased by 1!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerSPD += 1;
      btnSPD.textContent = `SPD ➡ ${playerSPD}`;
    }
    if (random !== 1 && random !== 2) {
      dialogue.classList.remove('hidden');
      dialogue.textContent = `${partner}'s training was a success! SPD has increased by 2!`;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      playerSPD += 2;
      btnSPD.textContent = `SPD ➡ ${playerSPD}`;
    }
  } else if (
    trainingPoints === 0 &&
    gamePlayStart === true &&
    introText !== 39 &&
    justTrained !== true
  ) {
    introText = 39;
    justTrained = true;
    talkingAllowed = true;
    dialogue.classList.remove('hidden');
    talkerName.classList.remove('hidden');
    dialogue.textContent = `I know you want to beat Devimon but I am too exhausted to train again, partner!`;
  }
});
//////////////////
//////////////////
// Battle!
//////////////////
//////////////////
btnBattle.addEventListener('click', function () {
  // Initialize battle scene

  if (awaitingInput === true || talkingAllowed === true) {
    removeFocus();
    return;
  }
  bgPause();
  bgBattle();
  battleScene = true;
  actions = 0;
  hpBarNPCValue = 50;
  mpBarNPCValue = 50;
  hpBarPlayerValue = 50;
  mpBarPlayerValue = 50;
  if (partner === 'Agumon') {
    battle2.textContent = `Pepper Breath`;
  }
  if (partner === 'Betamon') {
    battle2.textContent = `Electric Shock`;
  }
  battleBoxToggle();
  battleRandomizer();
  battle3.classList.add('hidden');
  statsCheck = playerATK + playerDEF + playerSPD;
  if (statsCheck >= championATKDEFSPD) {
    statsCheck = playerHP + playerMP;
    if (statsCheck >= championHPMP) {
      statsCheck = digivolutionPoints;
      if (statsCheck >= championDP) {
        battle3.classList.remove('hidden');
      }
    }
  }
  if (championLevelOn === false) {
    statsCheck = playerMaxHP + playerMaxMP;
    if (statsCheck >= championHPMP) {
      statsCheck = playerATK + playerDEF + playerSPD;
      if (statsCheck >= championATKDEFSPD) {
        if (digivolutionPoints >= championDP) {
          battleDialogueBox.classList.remove('hidden');
          battleDialogueBox.textContent = `Partner, I feel a strange power flowing through me! I think I can finally Digivolve!`;
          battleDialogueQueue = 0;
          awaitingInput = true;
        }
      }
    }
  }
});

// Initialize Values
const startingConditions = function () {
  // menuTop.classList.add('hidden');

  imageRight.classList.add('hidden');
  challengeDevimon.classList.add('hidden');
  battleDialogueBox.classList.add('hidden');
  nightOverlay.classList.add('hidden');
  foodOverlay.classList.add('hidden');
  // nightOverlay.src = ``;
  battleStats.classList.add('hidden');
  npcBattleBox.classList.add('hidden');
  playerBattleBox.classList.add('hidden');
  npcBattleBoxName.classList.add('hidden');
  playerBattleBoxName.classList.add('hidden');

  battleCommands.classList.add('hidden');
  battle1.classList.add('hidden');
  battle2.classList.add('hidden');
  battle3.classList.add('hidden');

  npcBoxName.classList.add('hidden');
  playerBoxName.classList.add('hidden');
  npcHPTextValue.classList.add('hidden');
  playerHPTextValue.classList.add('hidden');
  npcMPTextValue.classList.add('hidden');
  playerMPTextValue.classList.add('hidden');

  decisions.classList.add('hidden');
  bottomDisplay.classList.add('hidden');

  // btnDecisionTop.add('hidden');
  // btnDecisionMiddle.add('hidden');
  // btnDecisionBottom.add('hidden');
  btnBattle.classList.add('textShadow');
  btnBattle.classList.add('btn');

  btnTrain.classList.add('textShadow');
  btnFood.classList.add('textShadow');
  btnSleep.classList.add('textShadow');

  talkerName.classList.add('textShadow');
  trainMenuActiveToggle();
};
startingConditions();
//

document.addEventListener('keydown', function (e) {
  //what happens when you press a key is a new object is created in the console! The object has all the information about the key that is pressed which is as you may remember a property in the object. So here we are asking for the 'key' property. But of course you can ask for other things too!
  //basically... if the model does NOT contain the class hidden then execute the function
  console.log(e.key);
  if (e.key === 'Enter' && talkingAllowed && awaitingInput !== true) {
    textBoxNext();

    if (introText === 1) {
      bgFileIsland();
      document.querySelector(
        '.dialoguebox'
      ).textContent = `My name is Jijimon and welcome to the Digital World!`;
    }
    if (introText === 2) {
      document.querySelector(
        '.dialoguebox'
      ).textContent = `This world is full of us creatures known as Digimon. It is a world of beauty and wonder that I'm sure you won't find back at home!`;
    }
    if (introText === 3) {
      document.querySelector(
        '.dialoguebox'
      ).textContent = `However, you've come at a very bad time. Darkness is spreading through the Digital World and Digimon who once called each other friend, are now bitter enemies!`;
    }
    if (introText === 4) {
      document.querySelector(
        '.dialoguebox'
      ).textContent = `We think this is because of one Digimon whose name itself is evil! His name is Devimon.`;
    }
    if (introText === 5) {
      document.querySelector(
        '.dialoguebox'
      ).textContent = `We believe that Devimon is somehow turning good Digimon into bad ones and we need you to stop him! Don't you worry though, you are not in this alone!`;
    }
    if (introText === 6) {
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Luckily there are two Digimon who have volunteered to help you out on this quest. But first we must see which Digimon you would work best with!`;
    }
    if (introText === 7) {
      awaitingInput = true;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Now, would you say that you are the courageous type who doesn't need much help from others? Or, would you say that you do the best with friends around?`;
      document.querySelector(
        '.btnDecisionTop'
      ).textContent = `I'm more the Courageous type.`;
      document.querySelector(
        '.btnDecisionMiddle'
      ).textContent = `I prefer the help of my friends.`;
      decisionButtonsToggle();
    }
    if (introText === 8) {
      awaitingInput = true;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Next, do you prefer to tan on the sand when you're at a beach or do you prefer to swim?`;
      document.querySelector(
        '.btnDecisionTop'
      ).textContent = `I prefer tanning.`;
      document.querySelector(
        '.btnDecisionMiddle'
      ).textContent = `I love going in the water.`;
      decisionButtonsToggle();
    }
    if (introText === 9) {
      awaitingInput = true;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Would you rather wake up early or in the afternoon?`;
      document.querySelector(
        '.btnDecisionTop'
      ).textContent = `I like my sleep too much.`;
      document.querySelector(
        '.btnDecisionMiddle'
      ).textContent = `I wake up when the birds do.`;
      decisionButtonsToggle();
    }
    if (introText === 10) {
      awaitingInput = true;

      document.querySelector(
        '.dialoguebox'
      ).textContent = `When you see food, are you the one who will most likely eat more than you should? Or do you eat in moderation and finish when full?`;
      document.querySelector(
        '.btnDecisionTop'
      ).textContent = `My eyes are bigger than my stomach.`;
      document.querySelector(
        '.btnDecisionMiddle'
      ).textContent = `I only eat until I'm full.`;
      decisionButtonsToggle();
    }
    if (introText === 11) {
      awaitingInput = true;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Final question, and this one is more of a personal question, if you had to colour your room, would it be yellow or green? `;
      document.querySelector('.btnDecisionTop').textContent = `Yellow.`;
      document.querySelector('.btnDecisionMiddle').textContent = `Green.`;
      decisionButtonsToggle();
    }

    if (introText === 12) {
      document.querySelector(
        '.dialoguebox'
      ).textContent = `That concludes my test. The partner I believe you are best suited for is...`;
    }
    if (introText === 13) {
      document.querySelector('.dialoguebox').textContent = `... ... ... ...`;
    }
    if (introText === 14) {
      document.querySelector('.dialoguebox').textContent = `Come on out ${
        partnerSelection >= 1 ? `Agumon!` : `Betamon!`
      }`;
    }
    if (introText === 15) {
      twoDigimonOnScreen();
      if (partnerSelection >= 1) {
        document.getElementById('imageRight').src = 'Agumon.gif';
        document.querySelector('#imageRight').style.width = '40rem';
        document.querySelector('#imageRight').style.top = '40rem';
        document.querySelector('#imageMiddle').style.top = '40rem';

        partner = 'Agumon';
        playerHP = 14;
        playerMaxHP = 14;
        playerMP = 10;
        playerMaxMP = 10;
        playerDEF = 6;
        playerATK = 7;
        playerSPD = 6;
      } else {
        document.getElementById('imageRight').src = 'Betamon.gif';
        document.querySelector('#imageMiddle').style.top = '40rem';

        partner = 'Betamon';
        playerHP = 12;
        playerMaxHP = 12;
        playerMP = 14;
        playerMaxMP = 14;
        playerDEF = 7;
        playerATK = 5;
        playerSPD = 5;
      }
      talkerName.textContent = `${partner}`;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `The name's ${partner}! Pleasure to meet ya!`;
    }
    if (introText === 16) {
      talkerName.textContent = `Jijimon`;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Wonderful! I am certain you both will get along just fine! You two have a long road ahead of you and lots of work to do before you are ready to face Devimon. It is time you started your training!`;
    }
    if (introText === 17) {
      talkerName.textContent = `${partner}`;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `That's right partner! I will need your help to get stronger so that we can save the Digital World together!`;
    }
    if (introText === 18) {
      talkerName.textContent = `Jijimon`;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `Just remember that ${partner} needs rest too. You must know when it is time to train and when it is time to call it a day.`;
    }
    if (introText === 19) {
      talkerName.textContent = `${partner}`;
      document.querySelector(
        '.dialoguebox'
      ).textContent = `And also when it's time to eat! Don't worry Jijimon I'll put my partner through the ropes.`;
    }
    if (introText === 20) {
      talkerName.textContent = `Jijimon`;
      dialogue.textContent = `I'll leave you guys to it! Goodluck you two! The fate of our world depends on you.`;
    }
    if (introText === 21) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `Alright let's get down to business!`;
      imageRight.classList.add('hidden');
      partnerMiddle();
    }
    if (introText === 22) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `In order to make our way to Devimon we will first need to beat up a few other bad guys along the way. I guess they aren't really bad guys... Just that they are being controlled by Devimon somehow so we can just make it a little beating!`;
    }
    if (introText === 23) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `To do that you can select the "Battle" option up top. When we win a battle I gain Digivolution Points(DP) which help me digivole! We can use the digivole option in battle to give me a boost and help us win!`;
      bottomDisplay.classList.remove('hidden');
      trainingPoints += 4;
      digivolutionPoints = 0;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      digivolutionPointsDisplay.textContent = `${digivolutionPoints}`;
      btnActiveRemove();
      btnBattleActive();
      // btnBattle.classList.add('inactiveBtn');
    }
    if (introText === 24) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `It's important to know that digivolving takes lots of energy and I can only do it once per day so use this wisely partner!`;
    }
    if (introText === 24) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `In order to be able to digivole I will need enough DP and be strong enough in order to do it.`;
    }
    if (introText === 26) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `How do I get stronger? By training of course! The "Train" option will open up a few different ways for me to become the best 'mon ever!`;
      btnActiveRemove();
      btnTrainActive();
    }
    if (introText === 27) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `We will need to work on my health(HP), mana(MP), attack(ATK), defense(DEF), and speed(SPD) so that I can take on Devimon eventually.`;
    }
    if (introText === 28) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `Remember that I'm no Andromon who could go on forever! I can only train up to 4 times per day for now.`;
    }
    if (introText === 29) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `Training uses up training points(TP) which also can get replenished by using the "Food" option or "Sleep" option. A 'mon has got to eat and sleep!`;
      btnActiveRemove();
      btnFoodActive();
      btnSleepActive();
    }
    if (introText === 30) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `That should be it for now. So what shall we do next partner?`;
      btnActiveAdd();
    }
    if (introText === 31) {
      talkerName.classList.add('hidden');
      dialogue.classList.add('hidden');
      gamePlayStart = true;
      talkingAllowed = false;
      trainingPoints = 4;
    }

    // Removes training dialogue
    if (introText === 40 && justTrained === true) {
      talkerName.classList.add('hidden');
      dialogue.classList.add('hidden');
      foodOverlay.classList.add('hidden');
      if (trainingPoints <= 2 && hunger !== 2) {
      } else {
        justTrained = false;
      }
      talkingAllowed = false;
      introText = 38;
      removeFocus();
    }
    if (introText === 41 && justTrained === true) {
      talkerName.classList.add('hidden');
      dialogue.textContent = `${partner}'s meal was delicious and full of energy! TP has been restored by 2!`;
      introText = 39;
      trainingPoints++;
      trainingPoints++;
      trainingPointsDisplay.textContent = `${trainingPoints}`;
      removeFocus();
      btnActiveAdd();
    }
    if (introText === 42 && justTrained === true) {
      talkerName.classList.add('hidden');
      dialogue.textContent = `The food made ${partner} feel stronger! DP has increased by 25!`;
      introText = 39;
      digivolutionPoints += 25;
      digivolutionPointsDisplay.textContent = `${digivolutionPoints}`;
      removeFocus();
      btnActiveAdd();
    }
    if (introText === 44) {
      dialogue.textContent = `Zzz... zzz`;
    }
    if (introText === 45) {
      dialogue.textContent = `...zzz ... zzz`;
    }
    if (introText === 46) {
      dialogue.textContent = `... ...`;
    }
    if (introText === 47) {
      talkerName.classList.remove('hidden');
      nightOverlay.classList.add('hidden');
      menuTop.classList.remove('hidden');
      btnActiveAdd();
      random = Math.trunc(Math.random() * 4) + 1;
      if (random >= 2) {
        dialogue.textContent = `That was a good sleep! I hope you got some rest as well because we have lots of work to do!`;
        introText = 39;
        trainingPoints = 4;
        hunger = 0;
        trainingPointsDisplay.textContent = `${trainingPoints}`;
      } else {
        dialogue.textContent = `Wow! Best sleep I have ever had! I feel extra strong today and fully energized!`;
        introText = 39;
        trainingPoints = 6;
        hunger = 0;
        trainingPointsDisplay.textContent = `${trainingPoints}`;
      }
    }

    if (introText === 91) {
      talkerName.classList.remove('hidden');
      dialogue.textContent = `We can finally go down and challenge Devimon. We might be able to take him now but it might not hurt to train a bit more you know?`;
      challengeDevimon.classList.remove('hidden');
    }
    if (introText === 92) {
      dialogue.textContent = `I am excited to push further and save the Digital World together!`;
    }
    if (introText === 93) {
      talkerName.classList.add('hidden');
      dialogue.classList.add('hidden');
      dialogue.textContent = ``;
      talkingAllowed = false;
      awaitingInput = false;
      introText = 100;
    }
    if (introText === 102) {
      talkerName.classList.remove('hidden');
      dialogue.classList.remove('hidden');
      dialogue.textContent = `We did it! We saved the digital world! I knew that we could do it together!`;
    }
    if (introText === 103) {
      talkerName.classList.remove('hidden');
      dialogue.classList.remove('hidden');
      twoDigimonOnScreen();
      document.querySelector('#imageRight').style.width = '55rem';
      document.getElementById('imageRight').src = 'Jijimon.gif';
      dialogue.textContent = `We did it! We saved the digital world! I knew that we could do it together!`;
    }
    if (introText === 104) {
      talkerName.textContent = `Jijimon`;
      dialogue.textContent = `I think it's safe to say that we all thank you from the bottom of our hearts. Our world is safe once again thanks to you.`;
    }
    if (introText === 105) {
      talkerName.textContent = `Jijimon`;
      dialogue.textContent = `I hope that one day we can call on you again if our world is in trouble once more. Don't worry it doesn't happen that often! Hahaha!`;
    }
    if (introText === 106) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `You've made me into the strongest 'mon out there. I couldn't have done it without ya! But if you're down to stay and train some more, I would be 100% down to do just that!`;
    }
    if (introText === 107) {
      talkerName.textContent = `You`;
      dialogue.textContent = `I've got your back ${partner}!`;
    }
    if (introText === 108) {
      talkerName.textContent = `${partner}`;
      dialogue.textContent = `Alright! Let's work on getting even stronger! Never know when bad guys are gonna come to try to ruin our day!`;
    }
    if (introText === 109) {
      talkerName.classList.add('hidden');
      dialogue.classList.add('hidden');
      dialogue.textContent = ``;
      talkingAllowed = false;
      awaitingInput = false;
      introText = 200;
      partnerMiddle();
    }
  }
});

document.addEventListener('click', decisionBtnTop());
