/**
 * @param {string} priceRules
 *
 * Separating the function helps with division of tasks. Also means that we could inject
 * different parsing functions.
 */
var parsePrices = (priceRules) => {
    const patt = /[^-]+-+\s*\n/; // Pattern to remove up to and including dashes.
    let parts = priceRules.split(patt)[1];
    let prices = parts.split("\n").map((item) => {
        let [name, price, deal] = item.split(",").map((col) => col.trim());

        if (deal) {
            let [i, spec] = deal.split("for").map((d) => d.trim());
            return [name, new ItemPrice(price, i, spec)];
        }

        return [name, new ItemPrice(price)];
    });

    return new Map(prices);
};

/**
 *
 */
class ItemPrice {
    constructor(price, quantity = null, special = null) {
        this.price = price;
        this.quantity = quantity;
        this.special = special;
    }

    handleSpecial(quantity) {
        let total = 0;

        if (this.quantity && this.special) {
            let quot = Math.floor(quantity / this.quantity);
            let rem = quantity % this.quantity;

            total += this.special * quot;
            total += this.price * rem;
        } else {
            total = this.price * quantity;
        }
        return total;
    }
}

/**
 * @class Checkout
 * @param {string} priceRules
 * @property {Map<string, ItemPrice>} priceMap
 */
class Checkout {
    constructor(priceRules, handleParsingPrices = parsePrices) {
        this.priceMap = handleParsingPrices(priceRules);
        this.total = 0;
        this.shopping = new Map();
    }

    scan(items) {
        this.total = 0;
        let list = items.split("");
        list.forEach((item) => {
            let q = this.shopping.get(item) ?? 0;
            this.shopping.set(item, q + 1);
        });

        this.shopping.forEach((quantity, item) => {
            if (this.priceMap.has(item)) {
                this.total += this.priceMap.get(item).handleSpecial(quantity);
            }
        });

        return this.total;
    }
}

export { Checkout };
