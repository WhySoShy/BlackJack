// TODO: DONE | Add auto shuffle when the deck contains under 12 cards (After the round is done).
// TODO: DONE | Find out why it removes and gives new card immediatly when not called in stand();
// TODO: DONE (maybe) | Prevent spam clicking.

let cards = [], hands = [];
let dealerShownCard = false, timeForShuffle = false, gameState = false;

class DeckOfCards {
    constructor(symbol, type, value) {
        this.Type = type;
        this.Symbol = symbol;
        this.Value = value;
    }
}
class PlayerHand {
    constructor(user, card) {
        this.User = user;
        this.Card = card;
    }
}
//#region Start/End functions
/**
 * Creates all the cards.
 */
function createCards() {
    const symbols = ['Club', 'Diamond', 'Heart', 'Spade'],
        types = [ ['Two', 2], ['Three', 3], ['Four', 4], ['Five', 5], ['Six', 6], ['Seven', 7] ] //, ['Eight', 8], ['Nine', 9],['Ten', 10],['Jack', 10], ['Queen', 10], ['King', 10], ['Ace', [1,11]]
    for(let i = 0; i<symbols.length;i++)
        for(let j = 0; j<types.length;j++)
            cards.push(new DeckOfCards (symbols[i], types[j][0], types[j][1]))
    newCount();
    shuffle();
}
/**
 * Shuffles the deck of cards from
 */
function shuffle() {
    for(let i=0;i<cards.length;i++){
        let j = Math.floor(Math.random() * i);
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp; 
    };
}
//#endregion
//#region General usefull functions
/**
 * @returns a string uppercased 
 */
String.prototype.capitalize = function() {return this.charAt(0).toUpperCase() + this.slice(1)};

/**
 * Sets a waiting timer 
 */
async function wait(time) {await new Promise((res) => {setTimeout(res, time)})}
/**
 * Adds an image element into the DOM
 * @param {PlayerHand} user 
 * @param {DeckOfCards} card 
 */
function giveCardImage(user, card) {
    const appendTo = $(`.${user.capitalize()} > section`);

    if (user == 'Dealer' && hands.filter((item) => item.User == 'Dealer').length > 1 &&!dealerShownCard) 
        $(`<img class="Cards" style="z-index: 2" id="hidden" src="Cards/back@2x.png"/>`).appendTo(appendTo);
    else 
        $(`<img class="Cards" style="z-index: ${hands.filter((item) => item.User == user.capitalize()).length}" src="Cards/${card.Value.length > 1 || card.Value == 10 && card.Type != 'Ten' ? card.Symbol + card.Type : card.Symbol + card.Value }.png" />`).appendTo(appendTo)
}
/**
 * Changes the amount of remaining cards
 */
function newCount() {$('#CardCount').text(`${cards.length}`)}
//#endregion


//#region Play functions
/**
 * Draws a card to the specified user
 * @param {string} player 
 * @param {boolean} force
 */
async function drawCard(player = null, force = false) {
    const newCard = (user) => {
        let chosenCard = cards.shift();
        hands.push(new PlayerHand(user, chosenCard));
        newCount();
        getCardValues(user);
        giveCardImage(user, chosenCard);
    }
    if (!gameState && !force)
        return;
    if (player == null) {
        for(let i = 0; i<4;i++) 
            newCard(i % 2 == 0 ? 'Player' : 'Dealer');
        
        if(getCardValues('Player') == 21)
            endGame();

        return;
    }
    newCard(player.capitalize())
}
/**
 * Turns the dealers card, whenever you bust or stand.
 */
async function turnDealersCard() {
    const _ = hands.filter((item) => item.User == 'Dealer');
    const dealersHand = _[_.length-1];
    $('#hidden').addClass('Runit');
    const imageReplace = $(`<img 
        class="Cards RunItBack"
        style="z-index: 2"
        src="Cards/${dealersHand.Card.Type == 'Ace' || dealersHand.Card.Value >= 10 && dealersHand.Card.Type != 'Ten'? dealersHand.Card.Symbol + dealersHand.Card.Type : dealersHand.Card.Symbol + dealersHand.Card.Value}.png" />`)

    await setTimeout(() => {
        $('.Dealer-Cards #hidden')
            .replaceWith(imageReplace);
    }, 1050)
    
    
    setTimeout(() => {imageReplace.removeClass('RunItBack')}, 2000)
    await wait (2050)
}
/**
 * Gives you a new card
 */
async function hit() {
    let value = getCardValues('Player');
    if (!gameState)
        return;
    gameState = false;

    if (cards.length > 0 && value < 21) {
        await drawCard('Player', true);
        value = getCardValues('Player');
    }
    if (value == 21 || value > 21) {
        endGame();
        return;
    }
    gameState = true;
}
async function stand() {
    dealerShownCard = true;
    gameState = false;
    await endGame();
}
async function start() {
    $('.StopScreen').css({
        "backdrop-filter": "none",
        "opacity": 0,
        "z-index": -1
    });
    gameState = true;
    await wait(250);
    createCards();
    drawCard();
    
}

async function endGame() {
    await turnDealersCard();
    let dealerValue = getCardValues('Dealer');
    const playerValue = getCardValues('Player');
    
    console.log("asd");

    if (playerValue <= 21) {
        while (dealerValue  < 17) 
        {
            await wait(250);
            await drawCard('Dealer', true);
            dealerValue = getCardValues('Dealer');
            console.log("asd");
        }
        console.log("asd");
        
        if (dealerValue > 21)
            await busted();
        
        if (playerValue > dealerValue )
            console.log("You won");
    }
    else {
        console.log("asd");
        await busted();
    }

    await wait(1000);
    if (cards.length < 12) 
        await createCards();

    hands = [];
    console.log("new cards inc");
    drawCard(null, true); //To get the cards again
}
async function busted() {
    dealerShownCard = false;
    gameState = true;
    await wait(1000);
    $('.Dealer-Cards, .Player-Cards').empty();
    $('.Value span').text('0');
}

//#endregion
function getCardValues(user) {
    let newValue = 0;
    const hand = hands.filter((item) => item.User == user.capitalize());
    let aceCount = hand.filter((item) => item.Card.Type == 'Ace').length;
    const dec = (value) => {aceCount--; return value;}
    const calcAceValue = (item) => {
        return item.Card.Type == 'Ace' ? (
            newValue + 11 > 21 && aceCount > 1 ? (
                dec(item.Card.Value[0])): item.Card.Value[1]
            ) : item.Card.Value
    }

    if (hand[0].User == 'Dealer' && !dealerShownCard && hand.length > 1) {
        newValue = hand[0].Card.Type == 'Ace' ? hand[0].Card.Value[1] : hand[0].Card.Value[0];
        $(`.${hand[0].User.capitalize()} .Value > span`).text(newValue);
        return newValue;
    }

    hand
        .sort((a,b) => {
            if (a.Card.Type < b.Card.Type)
                return 1;
            else if (a.Card.Type > b.Card.Type)
                return -1;
            else
                return 0;
        })
        .forEach((item) => {
            newValue += calcAceValue(item);
            if (newValue > 21 && aceCount > 0)
                newValue -= dec(10);
        });
        

        $(`.${hand[0].User.capitalize()} .Value > span`).text(newValue);
    return newValue;
}


start();