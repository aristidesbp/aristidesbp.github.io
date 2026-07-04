---
name: Precision Entity Manager
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3d4a41'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6c7a70'
  outline-variant: '#bbcabe'
  surface-tint: '#006c45'
  primary: '#006c45'
  on-primary: '#ffffff'
  primary-container: '#3ecf8e'
  on-primary-container: '#005434'
  inverse-primary: '#51df9c'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#934a23'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffa072'
  on-tertiary-container: '#78350f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#71fcb6'
  primary-fixed-dim: '#51df9c'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#005233'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#76330d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  border-subtle: '#EDEDED'
  text-muted: '#687076'
  surface-card: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 240px
---

## Brand & Style

This design system is engineered for high-stakes entity management and enterprise resource planning. The brand personality is **authoritative, precise, and developer-centric**, mirroring the efficiency of modern cloud infrastructure tools. It prioritizes clarity and functional density over decorative elements, ensuring that complex data remains actionable.

The aesthetic follows a **Modern Corporate** style with a focus on high-contrast information hierarchy. It utilizes a "Utility-First" visual language: clean white surfaces for data entry, slate-toned backgrounds for structural separation, and a vibrant emerald primary color to denote action and success. The interface remains calm and professional, fostering focus during prolonged usage.

## Colors

The palette is anchored by **Emerald Green (#3ECF8E)**, used strategically for primary actions, success states, and progress indicators. To maintain a professional ERP atmosphere, the primary color is used sparingly to prevent visual fatigue.

**Neutral Tones** drive the structural hierarchy:
- **Base Background:** #F8F9FA provides a soft, low-glare canvas.
- **Surface/Cards:** #FFFFFF distinguishes data containers from the background.
- **Typography:** #171717 (Slate Black) is used for maximum legibility in headers, while #687076 handles secondary metadata.
- **Borders:** #EDEDED defines boundaries without creating heavy visual noise, essential for data-dense tables.

## Typography

**Inter** is the sole typeface, chosen for its exceptional legibility in technical interfaces and high x-height. 

### Usage Guidelines:
- **Data Density:** Use `body-sm` (13px) for table rows and secondary sidebars to maximize information visibility.
- **Hierarchy:** Use `title-md` (16px, Medium) for card titles and section headers.
- **Labels:** Small caps or increased letter spacing should be applied to `label-md` for categorical metadata.
- **Monospace:** For ID strings, API keys, or financial figures, utilize a monospace font (JetBrains Mono) at 13px to ensure character alignment and readability.

## Layout & Spacing

The design system utilizes a **4px baseline grid** to ensure mathematical precision in alignment. 

### Grid System:
- **Desktop:** A 12-column fluid grid within a 1440px max-width container. 
- **Sidebar:** A fixed-width left navigation (240px) is standard for ERP navigation, collapsing to an icon-only rail on smaller viewports.
- **Density:** Padding inside data tables is reduced to 8px (vertical) and 12px (horizontal) to accommodate high volumes of entity records.
- **Breakpoints:** 
  - Mobile: < 768px (Single column, 16px margins)
  - Tablet: 768px - 1024px (Fixed sidebar, fluid content)
  - Desktop: > 1024px (Full 12-column layout)

## Elevation & Depth

This design system uses **Tonal Layering** supplemented by **Subtle Shadows** to create a focused workspace.

- **Level 0 (Background):** #F8F9FA. All primary layout scaffolding sits here.
- **Level 1 (Cards/Surfaces):** #FFFFFF with a 1px solid border (#EDEDED). A very soft shadow (0px 1px 3px rgba(0,0,0,0.05)) is used to lift the card slightly.
- **Level 2 (Dropdowns/Modals):** #FFFFFF with a more pronounced shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) to indicate temporary interaction layers that float above the workspace.

Avoid heavy blurs or vibrant glows; depth should feel structural, not decorative.

## Shapes

The shape language is **Soft and Professional**. A standard border radius of **4px (0.25rem)** is applied to buttons, input fields, and small UI components to maintain a clean, organized appearance that still feels modern. 

- **Cards:** Use `rounded-lg` (8px) to provide a clear container definition.
- **Status Badges/Chips:** Use a pill-shape (full radius) to differentiate them from interactive buttons.
- **Selection Indicators:** Active states in sidebars or tabs use a 2px vertical bar with sharp edges on the inner side to emphasize alignment.

## Components

### Buttons
- **Primary:** Background #3ECF8E, Text #171717 (or White if contrast permits), 4px radius. High-gloss or gradients are forbidden.
- **Secondary:** Transparent background, 1px #EDEDED border, Text #171717.
- **Destructive:** Background #EF4444 (Red), Text White.

### Input Fields
- Inputs use a #FFFFFF background with a #EDEDED border. On focus, the border transitions to #3ECF8E with a subtle 2px emerald outer glow (ring).

### Data Tables
- Headers use `label-md` with a #F8F9FA background. 
- Rows feature a 1px bottom border.
- Hover states on rows use a #F8F9FA tint to aid tracking across large data sets.

### Status Chips
- Small, uppercase text. 
- **Success:** Soft green background with dark green text.
- **Pending:** Soft amber background with dark brown text.
- Use a 100px border-radius (pill) to clearly separate them from buttons.

### Entity Cards
- White background, 8px radius, 1px border.
- Grouping of information should use 16px internal padding.