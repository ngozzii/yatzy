import { Dice } from './dice.js';

export function calculateScore (categoryScores, allDice){
    const soloCounts = calculateSolos(allDice, categoryScores);
    calculatePairs(soloCounts, categoryScores);
    calculateThreeFourkind(soloCounts, categoryScores);
    calculateSmallStraight(allDice, categoryScores);
    calculateLargeStraight(allDice, categoryScores);
    calculateFullHouse(categoryScores.get("threeKind"), categoryScores.get("onePair"), categoryScores);
    calculateChance(allDice, categoryScores);
    calculateYatzy(soloCounts, categoryScores);

}

export function initializeCategories(categoryScores, categoryFinal, finalScores) {
    categoryScores.set("ones", 0);
    categoryScores.set("twos", 0);
    categoryScores.set("threes", 0);
    categoryScores.set("fours", 0);
    categoryScores.set("fives", 0);
    categoryScores.set("sixes", 0);
    categoryScores.set("onePair", 0);
    categoryScores.set("twoPair", 0);
    categoryScores.set("threeKind", 0);
    categoryScores.set("fourKind", 0);
    categoryScores.set("smallStraight", 0);
    categoryScores.set("largeStraight", 0);
    categoryScores.set("fullHouse", 0);
    categoryScores.set("chance", 0);
    categoryScores.set("yatzy", 0);
    categoryScores.set("total", 0);

    categoryFinal.set("ones", false);
    categoryFinal.set("twos", false);
    categoryFinal.set("threes", false);
    categoryFinal.set("fours", false);
    categoryFinal.set("fives", false);
    categoryFinal.set("sixes", false);
    categoryFinal.set("onePair", false);
    categoryFinal.set("twoPair", false);
    categoryFinal.set("threeKind", false);
    categoryFinal.set("fourKind", false);
    categoryFinal.set("smallStraight", false);
    categoryFinal.set("largeStraight", false);
    categoryFinal.set("fullHouse", false);
    categoryFinal.set("chance", false);
    categoryFinal.set("yatzy", false);
    categoryFinal.set("total", false);

    finalScores.set("ones", 0);
    finalScores.set("twos", 0);
    finalScores.set("threes", 0);
    finalScores.set("fours", 0);
    finalScores.set("fives", 0);
    finalScores.set("sixes", 0);
    finalScores.set("onePair", 0);
    finalScores.set("twoPair", 0);
    finalScores.set("threeKind", 0);
    finalScores.set("fourKind", 0);
    finalScores.set("smallStraight", 0);
    finalScores.set("largeStraight", 0);
    finalScores.set("fullHouse", 0);
    finalScores.set("chance", 0);
    finalScores.set("yatzy", 0);
    finalScores.set("total", 0);


}

export function countNumber(arr, num) {
    let instance = 0;
    arr.forEach((element) => {
        if (element.value === num) {
            instance++;
        }
    });
    return instance;
}

export function calculateSolos(allDice, categoryScores) {
    const numStrings= ["ones", "twos", "threes", "fours", "fives", "sixes"]
    const soloCounts = [];
    for (let num = 1; num <= 6; num++) {
        const count = countNumber(allDice, num);
        categoryScores.set(numStrings[num-1], count * num);
        soloCounts.push(count);
    }
    return soloCounts;
}

export function calculatePairs(soloCounts, categoryScores) {
    let onePairScore = 0;
    let twoPairScore = 0;
    let pairsCount = 0;

    for (let num = 0; num < 6; num++) {
        if (soloCounts[num] == 2) {
            pairsCount++;
            onePairScore = (num + 1) * 2;
            if (pairsCount > 0) {
                twoPairScore += onePairScore;
            }
        }
    }

    categoryScores.set("onePair", onePairScore);
    categoryScores.set("twoPair", twoPairScore);
}

export function calculateThreeFourkind(soloCounts, categoryScores) {
    let threeKind = 0;
    let fourKind = 0;

    for (let num = 1; num <= 6; num++) {
        if (soloCounts[num-1] = 3) {
            threeKind = num * 3;
        }
        if (soloCounts[num-1] >= 4) {
            fourKind = (num + 1) * 4;
        }
    }

    categoryScores.set("threeKind", threeKind);
    categoryScores.set("fourKind", fourKind);
}

export function calculateSmallStraight(allDice, categoryScores) {
    let smallStraightScore = 0;
    if (
        allDice.some((element) => element.value === 1) &&
        allDice.some((element) => element.value === 2) &&
        allDice.some((element) => element.value === 3) &&
        allDice.some((element) => element.value === 4) &&
        allDice.some((element) => element.value === 5)
    ) {
        smallStraightScore = 15;
    }

    categoryScores.set("smallStraight", smallStraightScore);
}

export function calculateLargeStraight(allDice, categoryScores) {
    let largeStraightScore = 0;
    if (
        allDice.some((element) => element.value === 2) &&
        allDice.some((element) => element.value === 3) &&
        allDice.some((element) => element.value === 4) &&
        allDice.some((element) => element.value === 5) &&
        allDice.some((element) => element.value === 6)
    ) {
        largeStraightScore = 20;
    }

    categoryScores.set("largeStraight", largeStraightScore);
}

export function calculateFullHouse(threeKind, onePair, categoryScores) {
    let fullHouseScore = 0;
    if (threeKind > 0 && onePair > 0) {
        fullHouseScore = threeKind + onePair;
    }
    categoryScores.set("fullHouse", fullHouseScore);
}

export function calculateChance(allDice, categoryScores) {
    let chanceScore = 0;
    allDice.forEach((element) => {
        chanceScore += element.value;
    });
    categoryScores.set("chance", chanceScore);
}

export function calculateYatzy(soloCounts, categoryScores) {
    let yatzyScore = 0;
    if (soloCounts.some((count) => count >= 5)) {
        yatzyScore = 50;
    }
    categoryScores.set("yatzy", yatzyScore);
}

