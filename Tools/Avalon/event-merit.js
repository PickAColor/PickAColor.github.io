// 1 Total Kills
let totalKills = document.querySelector('[name="kills-goal"]').value;
let killsPerRound = document.querySelector('[name="kills-per-round"').value;

let killMinRounds = totalKills / killsPerRound; // minimum number of rounds
let killMinGames = Math.ceil(killMinRounds / 3); // minimum number of games
let killRemainingRounds = Math.ceil(killMinRounds % 3);
let killRoundsLast = totalKills % killsPerRound; // number of kills left in the last round

// calculates new values
const gamesForKills = (kills, rounds) => {
    killMinRounds = kills / rounds;
    killMinGames = Math.ceil(killMinRounds / 3);
    killRemainingRounds = Math.ceil(killMinRounds) % 3;
    killRoundsLast = kills % rounds;
}

let KillsCalcText = () => {
    if (killRemainingRounds > 0 || killRoundsLast > 0) {
        let output = `(`;
        if (killRemainingRounds) {
            output += `${killMinGames - 1} games + `;
            if (killRemainingRounds == 1) {
                output += `${killRemainingRounds} round`;
            } else {
                output += `${killRemainingRounds} rounds`;
            }
        }
        if (killRemainingRounds > 0 && killRoundsLast) {
            output += ` - `;
        }

        if (killRoundsLast) {
            if (killRoundsLast == 1) {
                output += `${killRoundsLast} kill `;
            } else {
                output += `${killRoundsLast} kills `;
            }
            output += `on the last round)`;
        }
        if (killRoundsLast == 0) {
            output += `)`;
        }
        return output;
    }
    return '';
};

const KILL_CALC = document.querySelector('#kills-inputs');
KILL_CALC.addEventListener('change', (event) => {
    totalKills = parseInt(document.querySelector('[name="kills-goal"]').value);
    killsPerRound = parseInt(document.querySelector('[name="kills-per-round"]').value)

    // updates values
    gamesForKills(totalKills, killsPerRound);

    // updates text
    KILL_GAMES.textContent = `${killMinGames} Games ${KillsCalcText()}`;
})

const KILL_GAMES = document.getElementById('number-of-kill-games');
KILL_GAMES.textContent = `${killMinGames} Games (${killMinGames - 1} games + ${killRemainingRounds} rounds - ${killRoundsLast} kills on the last round)`;



// 2 Playtime
let playtimeGoal = 4;
let playtimeRoundSeconds = 999;
let playtimeRoundsPerGame = 1;
let playtimeGames = 15;
let playtimeLastTime = 584;

const playtime = (goal, seconds, rounds) => {
    // convert goal to seconds
    goal *= 3600;

    // minimum # of games needed
    playtimeGames = Math.ceil(goal / (seconds * rounds));

    // get maximum # on the timer needed to end the game
    playtimeLastTime = seconds - (goal % seconds) - 1;

    PLAYTIME_GAMES.textContent = `${playtimeGames}`;
    PLAYTIME_LAST_TIME.textContent = `${playtimeLastTime}`;
}

const PLAYTIME_VALS = document.querySelector('#playtime-inputs');
PLAYTIME_VALS.addEventListener("change", (event) => {
    playtimeGoal = document.querySelector('[name="playtime-goal"]').value;
    playtimeRoundSeconds = document.querySelector('[name="round-seconds"').value;
    playtimeRoundsPerGame = document.querySelector('[name="rounds"').value;

    playtime(playtimeGoal, playtimeRoundSeconds, playtimeRoundsPerGame);
})


const PLAYTIME_GAMES = document.getElementById('playtime-games');
const PLAYTIME_LAST_TIME = document.getElementById('playtime-last-time');
PLAYTIME_GAMES.textContent = playtimeGames;
PLAYTIME_LAST_TIME.textContent = playtimeLastTime;



// 3 Merit Tracker
let meritGoal = 10000;
let meritProgress = 980;
let meritDaysLeft = 376;
let meritQuest = "Rock Collector";
let meritMax = 3;
let meritQuestNote = `Based on 24 maximum daily rune earnings.`;

let todayDate = new Date(); // today's date
todayDate.setDate(todayDate.getDate() + meritDaysLeft);
let dd = String(todayDate.getDate());
let mm = String(todayDate.getMonth() + 1); // 0 index start
let yyyy = todayDate.getFullYear();

// Updates to end date
const meritQuestDate = (days) => {
    todayDate.setDate(todayDate.getDate() + days); // Update with added days
}

const meritQuestSet = (quest) => {
    switch(quest) {
        case "Rock Collector":
            meritQuest = "Rock Collector";
            meritGoal = 10000;
            meritMax = 24;
            meritQuestNote = `Based on 24 maximum daily rune earnings.`;
            meritDailyLimit();
            break;
            
        case "Master Counter": 
            meritQuest = "Master Counter";
            meritGoal = 10000;
            meritMax = 3;
            meritQuestNote = `Maximum 3 per game. (1 per round)`;
            meritGamesCounter();
            break;

        case "Master Construction Worker":
            meritQuest = "Master Construction Worker";
            meritGoal = 10000;
            meritMax = 3;
            meritQuestNote = `Maximum 3 per game. (1 per round)`;
            meritGamesCounter();
            break;
    }
}

// Rock Collector, any other merit quests that have a daily limit
const meritDailyLimit = () => {
    meritDaysLeft = Math.ceil((meritGoal - meritProgress) / meritMax);
   
    todayDate = new Date(); // reset to today's date

    meritQuestDate(meritDaysLeft);
    dd = String(todayDate.getDate());
    mm = String(todayDate.getMonth() + 1); // 0 index start
    yyyy = todayDate.getFullYear();

    MERIT_FINISH.innerHTML = `Finish in <span id="merit-days">${meritDaysLeft}</span> days (<span id="merit-date">${mm}/${dd}/${yyyy}</span> earliest)`
    MERIT_DAYS.textContent = meritDaysLeft;
    MERIT_DATE.textContent = `${mm}/${dd}/${yyyy}`;
}

// Quests with no daily max limit/progress is made by games played
const meritGamesCounter = () => {
    let meritGames = Math.ceil((meritGoal - meritProgress) / meritMax);
    MERIT_FINISH.innerHTML = `Finish in ${meritGames} Games.`
}

const MERIT_VALS = document.querySelector('#merit-inputs');
MERIT_VALS.addEventListener("change", (event) => {
    meritProgress = document.querySelector('[name="merit-progress"]').value;
    let meritQuestList = document.getElementById('merit-quests-list');
       
    // updates which merit quest to calculate
    meritQuestSet(meritQuestList.options[meritQuestList.selectedIndex].text);
    MERIT_NOTE.textContent = meritQuestNote;
})

const MERIT_FINISH = document.getElementById('merit-finish');
MERIT_FINISH.innerHTML = `Finish in <span id="merit-days">${meritDaysLeft}</span> days (<span id="merit-date">${mm}/${dd}/${yyyy}</span> earliest)`

const MERIT_DAYS = document.getElementById('merit-days');
const MERIT_DATE = document.getElementById('merit-date');
MERIT_DAYS.textContent = meritDaysLeft;
MERIT_DATE.textContent = `${mm}/${dd}/${yyyy}`;

const MERIT_NOTE = document.getElementById('merit-note');
MERIT_NOTE.textContent = meritQuestNote;