export function setItem(item, value) {
    localStorage.setItem(item, value);
}

export function getItem(item) {
    return JSON.parse(localStorage.getItem(item)) ?? 0;
}
