---
name: Fresh Harvest Narrative
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
  on-surface-variant: '#3e4943'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6e7a73'
  outline-variant: '#bdc9c1'
  surface-tint: '#006c4e'
  primary: '#005d42'
  on-primary: '#ffffff'
  primary-container: '#047857'
  on-primary-container: '#9ffdd3'
  inverse-primary: '#7bd8b1'
  secondary: '#2b6954'
  on-secondary: '#ffffff'
  secondary-container: '#adedd3'
  on-secondary-container: '#306d58'
  tertiary: '#45554f'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d6d67'
  on-tertiary-container: '#ddeee6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#97f5cc'
  primary-fixed-dim: '#7bd8b1'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#00513a'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#d5e6df'
  tertiary-fixed-dim: '#bacac3'
  on-tertiary-fixed: '#101e1a'
  on-tertiary-fixed-variant: '#3b4a44'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for a premium, modern grocery e-commerce experience. The brand personality is rooted in freshness, reliability, and health-conscious living. It targets busy urban professionals and families who value quality and efficiency. 

The design style is **Corporate / Modern** with a slight lean towards **Minimalism**. It uses heavy whitespace to evoke a sense of cleanliness and hygiene—critical for food-related platforms. The interface is intentionally "quiet" to allow the vibrant colors of fresh produce photography to stand out as the hero of the experience. The emotional response should be one of calm, organized abundance and trust in the quality of the service.

## Colors

This design system utilizes a monochromatic green foundation to reinforce the "fresh" and "organic" brand pillars.

*   **Primary (Verde Esmeralda):** Used for primary actions, success states, and brand-critical touchpoints.
*   **Secondary (Verde Floresta):** Reserved for deep-level navigation, footer backgrounds, and high-contrast text to ensure authority.
*   **Tertiary (Verde Menta Suave):** Used as a subtle background tint for section headers or promotional banners to break up pure white layouts.
*   **Neutral (Cinza Gelo):** A sophisticated range of light grays for borders, inactive states, and background surfaces to keep the UI clean and professional.

## Typography

The design system employs **Plus Jakarta Sans** across all levels. This typeface offers a contemporary, approachable aesthetic with high legibility, essential for scanning long lists of grocery items.

For e-commerce specificity, a `price-lg` role is defined to give monetary values high visual weight. Headlines use a slightly tighter letter spacing to maintain a structured, professional look. Body copy remains airy with a 1.5x line height to ensure comfortable reading on both desktop and mobile devices.

## Layout & Spacing

The layout follows a **Fluid Grid** system based on an 8px base unit. 

*   **Desktop:** 12-column grid with 24px gutters. Content is capped at a 1280px max-width to prevent scanning fatigue.
*   **Mobile:** 4-column grid with 16px side margins. 
*   **Rhythm:** Vertical spacing between product categories should be generous (64px+) to create a clean, non-cluttered "supermarket aisle" feel. Use the `base` unit (8px) for internal component spacing (e.g., 8px between product image and title).

## Elevation & Depth

To maintain a "clean and professional" look, depth is achieved through **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows.

*   **Product Cards:** Use a 1px border in a very light gray (#E5E7EB). On hover, transition to a subtle ambient shadow (0px 4px 20px rgba(0,0,0,0.05)) to suggest interactivity.
*   **Modals & Menus:** Utilize a slightly more pronounced shadow to lift the element above the page content.
*   **Surface Hierarchy:** Backgrounds are primarily white (#FFFFFF), with secondary information zones (like sidebars or filters) using the Tertiary Verde Menta Suave or a light Neutral gray.

## Shapes

The design system adopts a **Rounded** (Level 2) shape language. This softens the "corporate" edge, making the grocery experience feel more welcoming and "organic."

*   **Standard (8px):** Applied to product cards, input fields, and category thumbnails.
*   **Large (16px):** Applied to promotional banners and "Quick View" modals.
*   **Pill:** Exclusively used for "Add to Cart" buttons and status badges (e.g., "Em Promoção") to provide high visual contrast against the more structured rectangular elements.

## Components

### Buttons
*   **Primary (Add to Cart):** High-vibrancy Verde Esmeralda background with White text. Use a pill-shape for maximum tap target visibility.
*   **Secondary:** Ghost style (outline) with Primary green border and text for "View Details" actions.

### Product Cards
Must feature a high-quality product image on a pure white background. The price is styled using the `price-lg` token and positioned at the bottom-left, with a "+" icon button in Primary color at the bottom-right for instant adding.

### Inputs & Search
The search bar is the primary navigation tool. It should be wide, with a 1px neutral border, containing a search icon in Verde Floresta and placeholder text in a light gray.

### Chips & Badges
Use for categories (e.g., "Hortifruti", "Laticínios"). These should have a Verde Menta Suave background and Verde Floresta text to remain legible but secondary to the main products.

### Navigation
A sticky top-bar featuring a clean logo, a prominent search field, and a dedicated "Carrinho" icon with a numeric badge for item count. Use Verde Floresta for the main navigation links to ensure a high-contrast, professional feel.