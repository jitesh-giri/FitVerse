---
name: High-Performance Minimalist
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffb595'
  on-tertiary: '#571e00'
  tertiary-container: '#ef6719'
  on-tertiary-container: '#4c1a00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb595'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  border-thick: 8px
---

## Brand & Style
The design system embodies a premium, high-performance fitness philosophy. It targets a sophisticated audience that values clarity, discipline, and data-driven progress. The aesthetic is a hybrid of **Modern Minimalism** and **Bold Structuralism**, utilizing heavy architectural lines to frame dynamic fitness content.

The UI should evoke a sense of focus and exclusivity. By leaning into dark mode and high-contrast accents, the system feels less like a generic utility and more like a high-end digital gym. The emotional response is one of controlled energy—powerful yet quiet.

## Colors
The palette is built on a "Deep Night" foundation to ensure maximum contrast for data and imagery. 

- **Primary (Electric Blue):** Reserved for high-priority actions, active states, and structural highlights.
- **Backgrounds:** The base layer is #0A0A0A, with elevated surfaces using #121212 to create subtle depth without relying on shadows.
- **Typography:** Pure White (#FFFFFF) is used for headlines to maintain punch, while a dampened grey is used for secondary body text to reduce eye strain in the dark environment.

## Typography
The typography strategy uses **Montserrat** for headlines to provide a bold, geometric, and authoritative feel. **Inter** is utilized for all functional text to ensure maximum legibility at smaller scales.

- **Headlines:** Always use tight tracking and heavy weights. Large display titles should occasionally use asymmetric placement to break the grid.
- **Body:** Maintain generous line heights for readability.
- **Labels:** Use uppercase with increased letter spacing for category tags and small metadata.

## Layout & Spacing
This design system utilizes a **Fluid Grid** with intentional **Asymmetric Reflow**. While the underlying structure is a 12-column grid, content blocks should frequently offset by one or two columns to create visual interest.

- **Margins:** Desktop utilizes wide 64px margins to create a "gallery" feel.
- **Asymmetry:** In desktop views, stagger image cards and text blocks. For example, a workout title might be left-aligned while the hero image is slightly offset to the right.
- **Padding:** Use a 1.5x scaling factor for internal component padding to maintain a spacious, premium atmosphere.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Structural Framing** rather than traditional shadows. 

1. **Base:** #0A0A0A (Global background).
2. **Surface:** #121212 (Cards, containers).
3. **Overlay:** #1C1C1E (Modals, hover states).

To signify importance, use the **Primary Accent Border** (8px thickness) instead of elevation. A selected or featured item should be framed in Electric Blue, making it physically "pop" from the layout without changing its Z-index.

## Shapes
The shape language is defined by "The Frame." Every significant visual element—including images, video containers, and primary cards—must feature a **Thick Rounded Border** (8px-10px).

- **Standard Radius:** 0.5rem (8px).
- **Large Radius:** 1.5rem (24px) for main content containers.
- **Buttons:** Use a slightly higher roundedness to differentiate interactive elements from static containers.

## Components

### Primary CTAs
Buttons are high-impact. Use a solid Electric Blue background with Bold White text. For "ghost" variants, use an 8px Electric Blue border with no fill.

### Content Cards
Image-heavy cards are the core of the experience. All images must have the 8px border applied. Text should live either directly below the image or on a semi-transparent dark overlay at the bottom of the frame.

### Interactive Inputs
Form fields use a #121212 background with a subtle #1C1C1E border. On focus, the border thickness increases to 4px and changes to Electric Blue.

### Community Chips
Use a low-contrast grey background (#1C1C1E) with white text. When active, chips switch to the Electric Blue background.

### Progress Trackers (AI Metrics)
Utilize thin, glowing lines for data visualization to contrast against the thick, heavy structural borders of the UI. This creates a balance between "System" (borders) and "Data" (content).