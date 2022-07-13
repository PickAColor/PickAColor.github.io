let spenderGoal = 200000;
let itemPrice = 2500;
let itemResellPrice = 1375;
let itemPurchasesNeeded = Math.ceil(spenderGoal / itemPrice);

// Calculates/Returns the amount of carats needed to complete Spenders
const minCaratsNeeded = (a, b, c) => {
    if (itemPurchasesNeeded > 1) {
       return a + (c - 1) * (a - b);
    }
}

let caratsNeeded = minCaratsNeeded(itemPrice, itemResellPrice, itemPurchasesNeeded);


const CALC_VALS = document.querySelector('#spenders-inputs');

CALC_VALS.addEventListener("change", (event) => {
    // Updates the values that will be calculated
    //parseInt to make sure all typeof values is number
    spenderGoal = parseInt(document.querySelector('[name="spenderGoal"]').value);
    itemPrice = parseInt(document.querySelector('[name="itemPrice"]').value);
    itemResellPrice = parseInt(document.querySelector('[name="itemResellPrice"]').value);
    itemPurchasesNeeded = parseInt(Math.ceil(spenderGoal / itemPrice));
    
    // Updates caratsNeeded
    caratsNeeded = minCaratsNeeded(itemPrice, itemResellPrice, itemPurchasesNeeded);

    // Updates #spenders-result
    CARATS_NEEDED_OUTPUT.textContent = `${caratsNeeded}`;
    NUM_ITEM_PURCHASES.textContent = `${itemPurchasesNeeded}`;
    NUM_ITEM_GIFTED.textContent = `${Math.ceil(caratsNeeded / itemResellPrice)}`;
    NUM_ITEM_GIFTED_CARATS.textContent = parseInt(NUM_ITEM_GIFTED.textContent) * itemPrice;
});


// Writes results
const CARATS_NEEDED_OUTPUT = document.getElementById('carats-needed');
CARATS_NEEDED_OUTPUT.textContent = caratsNeeded;

const NUM_ITEM_PURCHASES = document.getElementById('numItemPurchases');
NUM_ITEM_PURCHASES.textContent = itemPurchasesNeeded;

const NUM_ITEM_GIFTED = document.getElementById('numItemGifted');
NUM_ITEM_GIFTED.textContent = Math.ceil(caratsNeeded/itemResellPrice);

const NUM_ITEM_GIFTED_CARATS = document.getElementById('numItemGifted-carats');
NUM_ITEM_GIFTED_CARATS.textContent = parseInt(NUM_ITEM_GIFTED.textContent) * itemPrice;