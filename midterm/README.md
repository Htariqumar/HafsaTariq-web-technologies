# Midterm Exam: Upgrade Your E-commerce Navigation, Checkout and Cart

**Student Name:** Hafsa Tariq  
**Roll Number:** FA24-BCS-038  

---

### Personal Numbers
* **N (Last two digits of Roll No):** `38`
* **Breakpoint (BP = 600 + N):** `638px`
* **Accent Hue (H = (38 × 7) mod 360):** `266`  
  * **Accent Colour:** `hsl(266, 70%, 45%)`
* **K ((38 mod 3) + 3):** `5`
* **Item Add Limit ((38 mod 4) + 2):** `4` items per product
* **Delivery Date Range:** `2026-10-29` to `2026-12-06` (max 38 days)

---

### Implementation Summary
- **Task 1 - Mega-Menu:**
  - BP = 638px.
  - Above BP (>= 638px): Desktop hover and keyboard focus (`:focus-within`) on "Shop by Category" reveals a 5-column grid mega-panel with 5 items each, positioned above all content without layout shift.
  - Below BP (< 638px): Hamburger menu contains an accessible accordion built using HTML5 `<details>` and `<summary>` elements, closed by default and individually toggleable.
- **Task 2 - Checkout Form:**
  - `midterm/checkout.html` linked from cart icon.
  - Semantic `<fieldset>` and `<legend>` for Contact and Delivery.
  - Strict HTML5 validation with regex `pattern="03[0-9]{2}-[0-9]{7}"` and date `min`/`max`.
  - Responsive CSS Grid: side-by-side with left-aligned labels above 638px; single column below 638px.
  - Interactive validation styling with `:user-invalid` / `:not(:placeholder-shown):invalid`.
- **Task 3 - JavaScript Cart Badge and Mini-Cart:**
  - Plain JavaScript (`midterm/script.js`) linked to `index.html`.
  - Reads product name and price directly from card elements.
  - Dynamic cart badge counter updated in real-time.
  - Mini-cart dropdown with individual items, "Remove" buttons, and total computed via `Array.prototype.reduce()`.
  - Item limit enforced at exactly 4 items per product; buttons transition to disabled "Limit reached" state until removed.
