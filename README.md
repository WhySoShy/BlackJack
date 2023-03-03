# Blackjack
#### Made by **Emil Kvandal**

## Latest release
[Beta release](https://github.com/WhySoShy/BlackJack/releases/tag/v0.2.0-beta)

## Intro
This was a school project where we had to create our own bank, i have chosen to implement a simpel bank that saves the data in localstorage with blackjack to it.

## How to run
You first need to download [``node.js``](https://nodejs.org/en/)
Go into the directory where you have saved the cloned repo, and enter
``node app.js``.

## Information & tech

| Extensions |
| ---------- |
| [Sass compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) |

| Packages |
| ------------ |
| [JQuery](https://jquery.com/download) |
| [Express](https://www.npmjs.com/package/express) |

## Changelog
#### [Version 0.0.0](https://github.com/WhySoShy/BlackJack/releases/tag/v0.0.0)
```
This is the start of my project.
```
#### [Version 0.1.0](https://github.com/WhySoShy/BlackJack/releases/tag/v0.1.0)
```
Started on the basic game logic.
The dealers card will not be exposed at the start.
Summaryes for most of the functions has been made.
Ace will adapt to either 1 or 11.
```
#### [Version 0.2.0-beta](https://github.com/WhySoShy/BlackJack/releases/tag/v0.2.0-beta)
```
There have been added a bank, that contains 100000$ and you can then loan from the bank if needed, 
and if the bank have enough money.

You can for example enter http://127.0.0.1:5500/Game instead of http://127.0.0.1:5500/Blackjack.html

Service message for when you win or loose.

Better game logic.
New game layout.
```

## Function descriptions
- [createCards()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L31) 
```
Creates all the cards from 2 arrays [Symbol & Types]
```
- [shuffle()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L43)
```
Shuffles all the cards, and is being called from CreateCards()
```
- [String.capitalize()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L56) 
```
Used to capitalize the first letter in a word
```
- [wait()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L61) 
```
An asynchronous function that creates a promise and waits for that promise.
```
- [giveCardImage()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L67) 
```
Expects 2 parameters [user String & cards Object], it adds the wanted image to the DOM.
```
- [newCount()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L78) 
```
Used to update how many cards are remaining.
```
- [sendServiceMessage()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L85) 
```
Expects 2 parameters [tx1 String, txt2 String & color String] it shows wether you won, lost or are equal to the dealer.
```
- [drawCard()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L114) 
```
Expects 2 parameters [player String & force Boolean] it deals the cards, based on the game state. 
If the game has just started it will deal 4 cards instead of 1.
```
- [turnDealersCard()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L141)
```
Replaces the dealers hidden card, with a revealed card.
```
- [start()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L190)
```
Starts the game, and calls drawCard() and gives 4 cards.
```
- [endGame()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L201)
```
Calls sendServiceMessage(), adds the money they won or doesn't add anything if they lost.
```
- [getCardValues()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L251)
```
Expects 1 parameter [user String], it calculates the value of the players hand.
using the .sort() method it will sort so aces will be counted as last, and then be able to set them either to 1 or 11.
```
- [updateBalanceUI()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L307) 
```
Updates the balance in the UI
```

## Listener descriptions
- [$('.Layout-Buttons div > :nth-child(1)').click()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L162)
```
If pressed the user will hit, and pull another card to the hand, 
if over 21 the player will bust and the dealer will show their card.
```
- [$('.Layout-Buttons div > :nth-child(2)').click()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L181)
```
If pressed the user will stand, and the dealer will pull his cards.
```
- [$('.bet-btn').click()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L288)
```
Adds the clicked amount to the bet.
```
- [$('.start-btn').click()](https://github.com/WhySoShy/BlackJack/blob/1bbe7011e2a751842db6048e84c463b92f6c88a8/static/script/blackjack.js#L297)
```
Starts the game if gameState is false.
```

## Tags
* [v0.0.0](https://github.com/WhySoShy/BlackJack/releases/tag/v0.0.0)
* [v0.1.0](https://github.com/WhySoShy/BlackJack/releases/tag/v0.1.0)
* [v0.2.0-beta](https://github.com/WhySoShy/BlackJack/releases/tag/v0.2.0-beta)

## Lincense
[MIT License](https://github.com/WhySoShy/BlackJack/blob/main/LICENSE)

