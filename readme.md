## Code Kata #09
JavaScript based code challenge that allows users to calculate prices at a checkout. 

Input a list of products, prices and specials with the form of:

> Item  |  Unit Price  |  Special Price
> --------------------------
> A,      50,           3 for 130
> 
> B,      30,           2 for 45
> 
> C,      20
> 
> D,      15

Then it is possible to scan in items that are contained within the shopping list and it will correctly update the price based on the number of units including calculating whether there is a discount due to the quantity.

### Please run the tests using:

```bash
#!/bin/bash
node ./test/checkout.test.mjs
```
