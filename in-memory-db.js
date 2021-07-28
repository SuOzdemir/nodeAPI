const items = [];

function ekle(item) {
    items.push(item);
}

function guncelle(item) {
    const index = items.findIndex(val => val.id === item.id);
    if (index >= 0) {
        items[index] = item;
    }
}

function sil(item) {
    const index = items.findIndex(val => val.id === item.id);
    if (index >= 0) {
        items.splice(index, 1);
    }
}

function getItem(id) {
    const index = items.findIndex(val => val.id === id);
    if (index >= 0) {
        return items[index];
    }
    return null;
}

function getItems() {
    return items;
}

module.exports = {
    ekle,
    guncelle,
    sil,
    getItem,
    getItems
};
