# Design System: Editorial Clinical Precision

## 1. Overview & Creative North Star: "The Empathetic Architect"
In the world of psychopedagogy, clarity is more than a preference—it is a clinical requirement. This design system departs from the cluttered, "spreadsheet-style" ERPs of the past to embrace **The Empathetic Architect**. 

Our Creative North Star focuses on a high-end editorial layout that prioritizes cognitive ease. We achieve this by breaking the traditional grid: using intentional asymmetry, generous white space, and **Tonal Layering** instead of rigid lines. The result is a system that feels "quiet," allowing practitioners to focus on patient progress rather than navigating a complex interface.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a professional clinical blue, but refined through Material Design 3 logic to ensure depth and accessibility.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using `1px solid borders` to define sections or cards. Boundary definition must be achieved through:
1.  **Background Shifts:** Placing a `surface-container-lowest` card on a `surface-container-low` background.
2.  **Negative Space:** Using the Spacing Scale (specifically `8` to `12`) to create visual breathing room.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, high-quality paper sheets. 
*   **Base:** `surface` (#f8f9fa) is the canvas.
*   **Primary Containers:** `surface-container-low` (#f3f4f5) for large sidebar or navigation areas.
*   **Active Workspaces:** `surface-container-lowest` (#ffffff) for the main content cards where the psychopedagogist writes reports.

### The "Glass & Signature Texture" Rule
To elevate the experience from "generic software" to "premium tool":
*   **Glassmorphism:** Use `surface` colors at 80% opacity with a `backdrop-blur: 20px` for floating navigation bars or modals.
*   **Signature Gradient:** For primary Action Buttons or high-level dashboard summaries, use a subtle linear gradient from `primary` (#005baf) to `primary_container` (#0074db) at a 135-degree angle. This adds "soul" and a tactile, modern polish.

---

## 3. Typography: The Editorial Voice
We use **Inter** exclusively, but we treat it with editorial intent. The contrast between `display` and `body` scales creates an authoritative yet approachable hierarchy.

*   **Display & Headlines:** Use `display-sm` (2.25rem) for dashboard greetings or patient names. This large scale provides an immediate focal point, reducing cognitive load.
*   **Body Text:** `body-md` (0.875rem) is the workhorse. It must always use `on_surface_variant` (#414753) for long-form clinical notes to reduce eye strain compared to pure black.
*   **Labels:** `label-md` (0.75rem) should be used sparingly for metadata, always in ALL CAPS with a letter-spacing of `0.05rem` to maintain a professional, architectural feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows and borders create "visual noise." We utilize **Tonal Layering** to convey hierarchy.

*   **The Layering Principle:** Depth is achieved by stacking. A patient file card (`surface-container-lowest`) sits on a workspace background (`surface-container-low`). The contrast is subtle (roughly 2-3%), which is more sophisticated than a heavy shadow.
*   **Ambient Shadows:** If an element must float (e.g., a critical "Save" fab), use an ultra-diffused shadow: `box-shadow: 0 12px 32px rgba(0, 91, 175, 0.06)`. Note the use of the `primary` color tint in the shadow instead of grey.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use `outline_variant` at **20% opacity**. It should feel like a suggestion of a line, not a wall.

---

## 5. Components

### Buttons
*   **Primary:** Gradient from `primary` to `primary_container`. Border-radius: `lg` (0.5rem). Text: `on_primary` (White).
*   **Secondary:** No background. `Ghost Border` (outline-variant @ 20%). Text: `primary`.
*   **Tertiary:** Text only. For low-emphasis actions like "Cancel."

### Input Fields (Clinical Entry)
*   **Style:** `surface_container_highest` background with a bottom-only `Ghost Border`. This mimics a professional medical form.
*   **States:** On focus, the bottom border transitions to 2px `primary`, and the background shifts to `surface_container_lowest`.

### Cards & Patient Lists
*   **Strict Rule:** No dividers. Separate list items using `spacing-4` vertical gaps.
*   **Selection:** Instead of a checkbox, use a subtle background color shift to `secondary_container` (#b2cdfd) with a 4px left-accent bar in `primary`.

### Specialized Psychopedagogy Components
*   **The Session Timeline:** A vertical track using `surface_variant` with floating `surface-container-lowest` nodes representing clinical sessions.
*   **Observation Chips:** Using `tertiary_container` (#bc5700) for "Attention Required" flags—the warm orange provides high-contrast "warning" without the alarmism of red.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `display-sm` for page titles to create an editorial feel.
*   **Do** use `surface-container-lowest` for the main area where the user inputs data.
*   **Do** prioritize `Material Symbols Outlined` with a `weight: 300` for a light, clinical aesthetic.
*   **Do** ensure Dark Mode uses `surface_dim` (#d9dadb) for text to prevent "neon" vibration against the dark background.

### Don't:
*   **Don't** use `1px solid` dividers between list items; let white space do the work.
*   **Don't** use pure black (#000000) for text; use `on_surface` (#191c1d) to maintain the premium, soft-clinical tone.
*   **Don't** use high-intensity shadows. If it looks "heavy," the opacity is too high.
*   **Don't** crowd the interface. If a screen feels full, increase the padding using the `spacing-10` token.