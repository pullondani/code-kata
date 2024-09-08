import { Checkout } from "../src/checkout.mjs";
import { RULES, RULES1 } from "./rules.mjs";

const assert = (result, expected) => {
    if (result === expected) {
        console.log("Passed");
    } else {
        console.log(`Failed, ${result}:${expected}`);
    }
};

const testPriceRules = (pricingRules) => {
    let co = new Checkout(pricingRules);
    assert(!!co.priceMap, true);
};
testPriceRules(RULES, []);

const testScanSingleItem = (checkout) => {
    checkout.scan("A");
    assert(checkout.total, 50);
    checkout.scan("AAA");
    assert(checkout.total, 180);
    checkout.scan("A");
    assert(checkout.total, 230);
    checkout.scan("A");
    assert(checkout.total, 260);

    console.log(checkout.total, checkout.priceMap, checkout.shopping);
};
testScanSingleItem(new Checkout(RULES));

const testScanDifferentItems = (checkout) => {
    checkout.scan("A");
    assert(checkout.total, 50);
    checkout.scan("B");
    assert(checkout.total, 80);
    checkout.scan("AA");
    assert(checkout.total, 160);
    checkout.scan("BBB");
    assert(checkout.total, 220);

    console.log(checkout.total, checkout.priceMap, checkout.shopping);
};
testScanDifferentItems(new Checkout(RULES));

const testScanMultipleCheckouts = () => {
    let checkout = new Checkout(RULES);
    let checkout1 = new Checkout(RULES1);
    checkout.scan("A");
    assert(checkout.total, 50);
    checkout1.scan("B");
    assert(checkout1.total, 30);
    checkout.scan("AA");
    assert(checkout.total, 130);
    checkout1.scan("BBB");
    assert(checkout1.total, 90);

    console.log(checkout.total, checkout1.total);
};
testScanMultipleCheckouts();

const testScanInvalid = () => {
    let checkout = new Checkout(RULES);
    checkout.scan("E");
    assert(checkout.total, 0);
    checkout.scan("B");
    assert(checkout.total, 30);
    checkout.scan("AA");
    assert(checkout.total, 130);
    checkout.scan("BBE");
    assert(checkout.total, 175);

    console.log(checkout.total);
};
testScanInvalid();
