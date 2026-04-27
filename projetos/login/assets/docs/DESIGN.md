# Design System: The Editorial Architect

## 1. Overview & Creative North Star: "The Digital Curator"
This design system rejects the "standard app" aesthetic in favor of **The Digital Curator**—a North Star that treats the mobile login experience as a high-end editorial piece rather than a utility. 

To achieve a "trust-focused" environment, we move beyond simple blue boxes. We utilize **intentional asymmetry**, **exaggerated white space**, and **tonal depth**. By layering surfaces and utilizing a sophisticated typographic scale, we create an interface that feels quiet, authoritative, and bespoke. The goal is to make the user feel like they are entering a secure, private vault that is both technologically advanced and human-centric.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep architectural blues (`primary`) and expansive, airy neutrals (`surface`). 

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a login form container should be a `surface-container-lowest` card sitting on a `surface-container-low` background.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following nesting logic to create depth without shadows:
*   **Base Layer:** `surface` (The canvas).
*   **Secondary Sectioning:** `surface-container-low` (Subtle grounding).
*   **Interactive Containers:** `surface-container-lowest` (The "white paper" effect for input areas).
*   **Overlays/Modals:** `surface-container-highest` (Maximum contrast for focus).

### The "Glass & Gradient" Rule
To elevate the "Modern" requirement, main CTAs should not be flat. Use a subtle linear gradient from `primary` (#0040a1) to `primary_container` (#0056d2) at a 135-degree angle. For floating elements or CAPTCHA overlays, apply **Glassmorphism**: use `surface` at 70% opacity with a `20px` backdrop-blur to allow brand colors to bleed through softly.

---

## 3. Typography: The Editorial Scale
We use a dual-typeface system to balance authority with accessibility.

*   **Display & Headlines (Manrope):** This geometric sans-serif provides a "Modern Tech" feel. Use `headline-lg` for welcome messages, utilizing tight letter-spacing (-0.02em) to create an impactful, editorial look.
*   **Body & Labels (Inter):** Chosen for its clinical legibility. Use `body-md` for all form inputs. 
*   **The Signature Shift:** Use `label-md` in `on_surface_variant` (#424654) for input labels, but transform them to all-caps with +0.05em tracking to evoke a premium, architectural blueprint feel.

---

## 4. Elevation & Depth
In this system, "Elevation" is a color property, not a shadow property.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "soft lift" that feels integrated into the architecture of the screen.
*   **Ambient Shadows:** If a floating element (like a CAPTCHA verification) requires a shadow, use a "Tinted Ambient" approach. 
    *   *Value:* `0px 12px 32px`
    *   *Color:* `on_surface` at 6% opacity. Never use pure black.
*   **The "Ghost Border" Fallback:** For input fields, use a "Ghost Border" consisting of the `outline-variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Primary Action (Button)
*   **Styling:** Gradient fill (`primary` to `primary_container`).
*   **Corner Radius:** `full` (9999px) to contrast against the `lg` (1rem) radius of the input cards.
*   **Typography:** `title-sm` in `on_primary`, centered.
*   **State:** On press, shift to `primary_fixed_dim`.

### Input Fields (Text & Password)
*   **Container:** `surface-container-lowest`.
*   **Border:** None (or "Ghost Border" at 15%).
*   **Radius:** `md` (0.75rem).
*   **Interaction:** On focus, the background transitions to `primary_fixed` at 20% opacity with a 1px `primary` bottom-stroke only.

### CAPTCHA-Style Verification (The Secure Module)
*   **Visuals:** A `surface-container-high` module with a `16px` backdrop-blur. 
*   **Layout:** Use asymmetrical placement—position the "Verify" slider slightly off-center to break the "template" feel.
*   **Element:** The slider handle should be `primary`, using the `xl` (1.5rem) corner radius.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines. 
*   **Separation:** Separate content using a `24px` vertical gap (Spacing Scale) or by alternating between `surface-container-low` and `surface-container-lowest`.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use `display-sm` for the initial "Welcome" or "Sign In" header to create an immediate editorial hierarchy.
*   **DO** utilize `tertiary` (#822800) sparingly for high-attention alerts or critical "Forgot Password" links to provide a sophisticated warm contrast to the blue palette.
*   **DO** use `xl` (1.5rem) rounding for the main login card to give a friendly, approachable "Trust" vibe.

### Don’t:
*   **DON'T** use 100% opaque `outline` (#737785) for any element. It breaks the "Digital Curator" softness.
*   **DON'T** use standard "Drop Shadows" from a UI kit. Always use the Tonal Layering or Tinted Ambient Shadow method.
*   **DON'T** crowd the screen. If the login form feels tight, increase the `surface` padding. Space is a luxury brand attribute.