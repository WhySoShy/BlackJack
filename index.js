const cards = [];
let hands = [];
let gameState = true; // The game is started
let dealerShownCard = false;

class Cards {
    constructor(symbol, type, value) {
        this.Type = type;
        this.Symbol = symbol;
        this.Value = value;
    }
}
class Hand {
    constructor(user, card) {
        this.User = user;
        this.Card = card;
    }
}
String.prototype.capitalize = function() {return this.charAt(0).toUpperCase() + this.slice(1)};

//#region General usefull functions
async function wait(time) {await new Promise((res) => {setTimeout(res, time)})}
function giveCardImage(user, card) {
    const appendTo = $(`.${user.capitalize()} > section`);

    if (user == 'Dealer' && hands.filter((item) => item.User == 'Dealer').length > 1) 
        $(`<img class="Cards" src="Cards/back@2x.png"/>`).appendTo(appendTo);
    else 
        $(`<img class="Cards" src="Cards/${card.Value.length > 1 ? card.Symbol + 'Ace' : card.Symbol + card.Value }.png" />`).appendTo(appendTo)
}
function newCount() {$('#CardCount').text(`${cards.length}`)}
//#endregion

//#region Start functions
async function createCards() {
    const symbols = ['Club', 'Diamond', 'Heart', 'Spade'];
    const types = [['Two', 2], ['Three', 3], ['Four', 4], ['Five', 5], ['Six', 6], ['Seven', 7], ['Eight', 8], ['Nine', 9],['Ten', 10], ['Jack', 10], ['Queen', 10], ['King', 10], ['Ace', [1,11]]]
    for(let i = 0; i<symbols.length;i++)
        for(let j = 0; j<types.length;j++)
            cards.push(new Cards(symbols[i], types[j][0], types[j][1]))
    newCount();
    shuffle();
    return cards;
}
async function shuffle() {
    for(let i=0;i<cards.length;i++){
		let j = Math.floor(Math.random() * i);
		let temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp; 
	};
}
//#endregion

//#region Play functions
async function drawCard(player = null) {
    const newCard = (user) => {
        let chosenCard = cards.shift();
        hands.push(new Hand(user, chosenCard));
        newCount();
        getCardValues(hands.filter((item) => item.User == user));
        giveCardImage(user, chosenCard);
    }
    if (!gameState)
        return;
    if (player == null) {
        for(let i = 0; i<4;i++) {
            newCard(i % 2 == 0 ? 'Player' : 'Dealer');
        }
        return;
    }
    newCard(player.capitalize())
}
async function Hit() {
    await drawCard('Player');
    if (getCardValues(hands.filter((item) => item.User == 'Player')) > 21){
        Busted();
        return;
    }
}
async function Busted() {
    gameState = false;
    while (getCardValues(hands.filter((item) => item.User == 'Dealer')) <= 17) {
        await drawCard('Dealer');
    }
}

//#endregion

function getCardValues(hand) {
    let newValue = 0;
    let aceCount = 0;
    const calcAceValue = (value, item) => {return newValue + value >= 10 && aceCount < 1? item.Card.Value[1] : item.Card.Value[0] }

    hand
        .sort((a,b) => {
            console.log(a.Card.Type)
            if (a.Card.Type < b.Card.Type)
                return 1;
            else if (a.Card.Type > b.Card.Type)
                return -1;
            else
                return 0;
        })
        .forEach((item) => {
            if (!Array.isArray(item.Card.Value))
                newValue += item.Card.Value;
            else {
                newValue += calcAceValue(item.Card.Value[1], item);
                aceCount++;
            }
        });
    $(`.${hand[0].User.capitalize()} .Value > span`).text(newValue);
    return newValue;
}


createCards();
drawCard();