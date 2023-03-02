import { getItem, setItem } from '../modules/storage.js';

const updateBalance = (element, item) => {
    element.text(getItem(item));
}


$(function() {
    updateBalance($('.bank-balance > .balance'), 'bankBalance');
    updateBalance($('.player-balance label > .balance'), 'playerBalance');
})



$('.bank-loan div > button')
    .click(function() {
        let bankValue = getItem('bankBalance'),
            playerValue = getItem('playerBalance');

        bankValue -= $(this).text().split(' ')[1];
        if (bankValue >= 0) {
            playerValue += Number($(this).text().split(' ')[1]);
            setItem('bankBalance', bankValue);
            setItem('playerBalance', playerValue);
            updateBalance($('.bank-balance > .balance'), 'bankBalance');
            updateBalance($('.player-balance label > .balance'), 'playerBalance');
        }
    })