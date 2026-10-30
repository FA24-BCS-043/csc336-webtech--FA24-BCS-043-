# Web Technologies (CSC336) - Lab Mid Term, FA26 BCS A

- **Name:** Hassan Mustafa
- **Roll number:** FA24-BCS-043
- **N** = 43
- **BP** = 600 + 43 = 643px
- **H** = (43 x 7) mod 360 = 301, so the accent colour is `hsl(301, 70%, 45%)`
- **K** = (43 mod 3) + 3 = 4 (4 categories + "All" = 5 radio buttons)
- Sticky offset = (43 mod 40) + 70 = 73px
- Premium limit = 43 x 100 = Rs. 4,300

## Files changed

- `index.html`
- `product.html`
- `style.css`
- `script.js` (new file)

## Task 1 - CSS-only category filter

- **index.html:** added `product-item` and a `data-category` (audio, computer, mobile, gaming) to each of the 8 product cards. Added 5 hidden radio buttons (All, Audio, Computer, Mobile, Gaming) with "All" checked, and turned my existing "Shop by Category" links into labels for these radios, plus a new "All" button.
- **style.css:** `body:has(#cat-x:checked) .product-item:not([data-category="x"]) { display: none; }` hides the cards that do not match. `display: none` removes them from the layout, so the grid closes up with no gaps. The label of the checked radio gets the accent colour `hsl(301, 70%, 45%)`.
- **Why:** `:checked` with `:has()` lets CSS react to the selected radio, so no JavaScript is needed.

## Task 2 - Product page grid with sticky details box

- **product.html:** split the page into three blocks: image, details (name, price, quantity, Add to Cart) and a long description.
- **style.css:** `.product-layout` is a CSS Grid with `grid-template-areas`. Below 643px it is one column (image, details, description). From 643px it is `"image details"` over `"description description"`. `.product-details` gets `position: sticky; top: 73px; align-self: start;` inside the 643px media query.
- **Why:** a sticky grid item can only move inside its own grid area, so the image row is made tall and `align-self: start` stops the box stretching to fill the row. The description is long so the page scrolls and the sticky box can be seen working.

## Task 3 - Live search, price sort, Premium label

- **script.js (new):**
  - The existing navbar search box (id `productSearch`) filters the cards by name as the user types, not case-sensitive. A card is shown only if it matches both the search and the selected category.
  - "No products found" is shown when no card matches both, and hidden again when cards match.
  - "Sort by price" reads each price from the card and moves the existing cards with `appendChild`, alternating lowest to highest and highest to lowest.
  - "Reset order" puts the cards back in their original order.
  - Cards priced above Rs. 4,300 get a "Premium" label added by the script on page load.
- **index.html:** gave the existing navbar search input and form ids, added the sort and reset buttons, the "No products found" message and the script link.
- **style.css:** styles for the buttons, the message, the Premium label and the class that hides cards matched out by the search.

## AI tools used

- Claude (Anthropic)
