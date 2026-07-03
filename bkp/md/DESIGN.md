---
name: Ubiquitous Messaging
colors:
  surface: '#fff8f3'
  surface-dim: '#e1d9d1'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ea'
  surface-container: '#f5ece4'
  surface-container-high: '#efe7df'
  surface-container-highest: '#e9e1d9'
  on-surface: '#1e1b16'
  on-surface-variant: '#3f4946'
  inverse-surface: '#34302b'
  inverse-on-surface: '#f8efe7'
  outline: '#6f7976'
  outline-variant: '#bec9c5'
  surface-tint: '#1c695f'
  primary: '#00453d'
  on-primary: '#ffffff'
  primary-container: '#075e54'
  on-primary-container: '#8dd5c8'
  inverse-primary: '#8cd4c7'
  secondary: '#006d2f'
  on-secondary: '#ffffff'
  secondary-container: '#5dfd8a'
  on-secondary-container: '#007232'
  tertiary: '#00415b'
  on-tertiary: '#ffffff'
  tertiary-container: '#005a7b'
  on-tertiary-container: '#80d1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a8f0e3'
  primary-fixed-dim: '#8cd4c7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#66ff8e'
  secondary-fixed-dim: '#3de273'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005322'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7cd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#fff8f3'
  on-background: '#1e1b16'
  surface-variant: '#e9e1d9'
typography:
  header-title:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  header-subtitle:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 16px
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 22px
  message-text:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
  timestamp:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  input-text:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  edge-margin: 16px
  bubble-padding-x: 12px
  bubble-padding-y: 8px
  message-gap: 4px
  cluster-gap: 12px
  header-height: 64px
  footer-min-height: 56px
---

## Brand & Style
The design system is centered on familiarity, efficiency, and reliability. It targets a global audience across all demographics, requiring a UI that feels invisible so the conversation remains the focus.

The style is **Corporate / Modern** with a strong **Mobile-First** emphasis. It prioritizes high legibility and rapid task completion. Visual cues are utilitarian: distinctive green accents signify action and connectivity, while the neutral stone-colored backdrop provides a comfortable, low-glare environment for long-form reading. The emotional response should be one of "effortless utility"—users should feel that the interface is a dependable tool they already know how to use.

## Colors
The palette uses a dominant Teal for primary navigation and structural headers to ground the interface in a professional tone. Light Green is reserved for high-priority actions, notifications, and the "user" side of conversation flows. Light Blue acts as a functional secondary color for links, media previews, and interactive status indicators.

The Chat Background (#E5DDD5) is the bedrock of the experience, providing a warm, non-white canvas that reduces eye strain. For message bubbles, a distinct two-tone logic is applied: the user’s messages use a soft pale green (#DCF8C6), while incoming messages use a pure white (#FFFFFF) to create a clear visual hierarchy of "me vs. them."

## Typography
This design system utilizes a systematic, sans-serif approach for maximum cross-platform compatibility. The type scale is tight and functional. 

- **Hierarchy:** Primary emphasis is placed on the message text (15px/16px) for optimal reading density on mobile devices. 
- **Metadata:** Timestamps and status indicators use a reduced 11px size with slight tracking to distinguish them from the primary message content without drawing excessive focus.
- **Headers:** Navigation headers use a semi-bold 18px treatment for clarity during high-speed scrolling. 
- **Accessibility:** Line heights are kept generous (1.4x) to ensure legibility in dense chat threads.

## Layout & Spacing
The layout follows a **Fluid Mobile-First** model. The primary container is the scrollable message list, which utilizes a safe margin of 16px from the screen edges.

- **Message Threading:** Bubbles are grouped in "clusters." Individual messages within a single sender's burst are separated by a 4px gap. When the sender changes, a larger 12px gap is introduced.
- **Alignment:** User messages are right-aligned with a 15% margin-left to ensure they don't span the full width. Incoming messages are left-aligned with a 15% margin-right.
- **Fixed Elements:** The header and footer input are pinned. The footer expands vertically to accommodate multi-line text input up to a defined maximum height (typically 5 lines) before enabling internal scrolling.

## Elevation & Depth
Depth is handled through **Tonal Layers** rather than heavy shadows. 

- **Level 0 (Background):** The Chat Background (#E5DDD5).
- **Level 1 (Bubbles):** Message bubbles sit on the background with a subtle 1px "soft-touch" shadow (y-offset: 1px, blur: 2px, opacity: 0.1) to suggest they are physical objects resting on the surface.
- **Level 2 (Navigation):** The Header and Footer components use a slightly higher elevation or a subtle border-bottom/top to indicate they sit above the scrollable content.
- **Level 3 (Floating Actions):** Use a primary-colored floating action button (FAB) for "New Chat" with a standard 4px ambient shadow to denote high interactivity.

## Shapes
The shape language is "Soft-Organic." 

- **Message Bubbles:** Use a 8px corner radius. To enhance the directional flow, "anchor" bubbles (the first in a sequence) feature a small triangular tail pointing toward the screen edge. Subsequent bubbles in a cluster have the tail omitted and uniform rounding.
- **Inputs:** The search bar and message input field use high roundedness (Pill-shaped) to distinguish them from the structural content blocks.
- **Avatars:** Strictly circular (50% radius) to contrast with the rectangular nature of message blocks and provide a friendly, human element.

## Components

### Header
A fixed container (64px) using the Primary Teal background. It contains a "Back" chevron, a circular avatar (40px), the user/group name (18px Semi-bold), and a status/subtitle (13px). Action icons (Video, Call, Menu) are placed on the trailing edge.

### Message Bubbles
- **Right (User):** Pale Green (#DCF8C6) background. Text is left-aligned within the bubble. Bottom-right contains the timestamp and "read" receipt (double checkmarks).
- **Left (Receiver):** White (#FFFFFF) background. Includes a sender name in a unique color (for groups) above the message text.

### Footer Input
A horizontally oriented bar containing:
- **Leading:** Attachment icon (clip) or Emoji picker.
- **Center:** A pill-shaped white text area that grows dynamically.
- **Trailing:** A circular button (Primary Green) containing either a Microphone icon (default) or a Send icon (on text entry).

### Lists & Items
Chat list items (main screen) feature a 56px avatar, a 16px margin, and a 1px border-bottom divider that stops short of the avatar. The "unread" count is displayed as a Small Green Circle with white 11px Bold text.

### Chips
Used for date separators (e.g., "TODAY", "YESTERDAY"). These are centered, use a light-grey semi-transparent background, and 12px uppercase bold text with high roundedness.