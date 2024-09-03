import { calculateTotal, Checkout } from "../src/checkout.mjs";
import { RULES } from "./rules.mjs";

const assert = (result, expected) => {
    if (expected === result) {
        console.log("Success", result);
    } else {
        console.log(`Failure, ${result} : ${expected}`);
    }
};

const testTotal = (inputs, expected) => {
    let out = calculateTotal(inputs);
    assert(out, expected);
};
testTotal([], 20);

const testPriceRules = (pricingRules) => {
    let co = new Checkout(pricingRules);
    assert(!!co.prices, true);
};
testPriceRules(RULES, []);

const testScanItems = (checkout, item) => {
    checkout.scan(item);
    assert(!!checkout.items[0], true);
};
// testScanItems(new Checkout(RULES), "A");
