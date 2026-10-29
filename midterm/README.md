# Midterm Exam: Upgrade Your E-commerce Navigation, Checkout and Cart

**Student Name:** Hafsa Tariq  
**Roll Number:** FA24-BCS-038  

---

### Personal Numbers
* **N (Last two digits of Roll No):** `38`
* **Breakpoint (BP = 600 + N):** `638px`
* **Accent Hue (H = (38 × 7) mod 360):** `266`  
  * **Accent Colour:** `hsl(266, 70%, 45%)`
* **K ((38 mod 3) + 3):** `5` columns / link groups
* **Item Add Limit ((38 mod 4) + 2):** `4` items per product
* **Delivery Date Range:** `2026-10-29` to `2026-12-06` (min: exam date, max: exam date + 38 days)

---

### Files Changed / Added
* `midterm/index.html` (Added mega-menu navigation, mini-cart panel, cart badge, and linked `script.js`)
* `midterm/product.html` (Updated mega-menu navigation and cart icon link to `checkout.html`)
* `midterm/checkout.html` (Created new semantic checkout page with HTML5 form validation and responsive grid)
* `midterm/script.js` (Created plain JavaScript logic for cart state, limit reached enforcement, reduce() total, badge, and mini-cart UI)
* `midterm/src/input.css` (Added CSS styles for mega-menu, responsive breakpoint at 638px, checkout form grid, validation states, and mini-cart)
* `midterm/dist/output.css` (Compiled Tailwind CSS bundle)
* `midterm/README.md` (Personal numbers, changes explanation, AI disclosure)

---

### Task Breakdown: What Was Changed & Why

#### Task 1 - Mega-Menu in Navbar
- **What was changed:** Added a "Shop by Category" navigation item containing K=5 columns with 5 links each using semantic `<details>` and `<summary>` tags inside `<nav>`. Added responsive CSS rules at BP = 638px.
- **Why:** On screens ≥ 638px, desktop users can hover or use Tab keyboard navigation (`:focus-within`) to access a non-shifting floating mega-panel above page content. On mobile screens (< 638px), it transforms into an accessible accordion inside the hamburger drawer without requiring JavaScript.

#### Task 2 - Checkout Form with HTML5 Validation Only
- **What was changed:** Created `midterm/checkout.html` with two semantic fieldsets ("Contact" and "Delivery"), `<label for="...">` associations, HTML5 attributes (`required`, `pattern="03[0-9]{2}-[0-9]{7}"`, `min`, `max`), and pure CSS styling (`:user-invalid`).
- **Why:** To ensure strict native browser form validation without JavaScript, guaranteeing phone number format and delivery date boundaries (within N=38 days), while providing a responsive two-column grid layout at ≥ 638px and single column on mobile.

#### Task 3 - JavaScript: Working Cart Badge and Mini-Cart
- **What was changed:** Created `midterm/script.js` without any external library. Read product name and price directly from card DOM, pushed to a cart array, toggled a dropdown mini-cart, calculated order total using `Array.prototype.reduce()`, and capped additions at (38 mod 4) + 2 = 4 items.
- **Why:** Gives the user instant interactive feedback when shopping, updating badge counts and line items in real time, while preventing over-ordering by disabling buttons and switching text to "Limit reached" once the quota is hit.

---

### AI Tools Used
* **Antigravity IDE (Gemini 2.5 Pro)** - Used for pair-programming assistance, Tailwind styling verification, responsive layout testing, and DOM interaction script creation.
