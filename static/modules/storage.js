export function setItem(item, value) {
    localStorage.setItem(item, value);
}

export function getItem(item) {
    return JSON.parse(localStorage.getItem(item)) ?? (item == 'bankBalance' ? setItem(item, 1000000) : 0);
}
