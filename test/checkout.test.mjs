import { calculateTotal } from "../src/checkout.mjs";

const testTotal = (inputs, expected) => {
    let out = calculateTotal();
    if (out === expected) {
        console.log("Success", out);
    } else {
        console.log("Failure", out);
    }
};

testTotal([], 20);
