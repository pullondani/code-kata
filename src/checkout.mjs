const calculateTotal = () => {
    return 20;
};

/**
 * @param {string} priceRules
 * @param {Checkout} checkout
 *
 * Separating the function helps with division of tasks. Also means that we could inject
 * different parsing functions and the class doesn't care.
 */
var parsePrices = (priceRules, checkout) => {
    const patt = /[^-]+-+\s*\n/; // Pattern to remove up to and including dashes.
    let parts = priceRules.split(patt)[1];
    let prices = parts.split("\n").map((item) => {
        let [name, price, deal] = item.split(",").map((col) => col.trim());
        return [name, new ItemPrice(price, deal)];
    });

    return new Map(prices);
};

class ItemPrice {
    constructor(price, deal = null) {
        this.price = price;
        this.deal = deal;
    }
}
class Checkout {
    constructor(priceRules) {
        this.prices = parsePrices(priceRules, this);
    }
}

export { calculateTotal, Checkout };
