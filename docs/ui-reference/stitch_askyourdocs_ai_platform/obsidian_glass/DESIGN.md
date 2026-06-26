---
name: Obsidian Glass
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#ffffff'
  on-tertiary: '#233144'
  tertiary-container: '#d5e3fd'
  on-tertiary-container: '#57657b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  stack-gap-sm: 8px
  stack-gap-md: 16px
  stack-gap-lg: 32px
---

## Brand & Style

The design system is engineered for high-stakes enterprise environments where clarity, speed, and precision are paramount. The brand personality is authoritative yet understated, positioning the AI as a sophisticated tool rather than a novelty. It evokes a sense of "quiet power"—robust technical capability wrapped in a serene, distraction-free interface.

The aesthetic follows a **High-End Glassmorphism** movement. It draws inspiration from modern developer tools and luxury hardware interfaces, utilizing deep charcoal layers, precision-engineered borders, and translucent surfaces. Every element is designed to feel physical, like machined obsidian and etched glass, ensuring that the heavy data processing of an AI SaaS feels lightweight and intuitive.

## Colors

The palette is strictly monochromatic and utilitarian, favoring depth and texture over hue. 

- **Foundational Neutrals:** The base uses "Charcoal Black" for the primary canvas to minimize eye strain. Layered surfaces use "Graphite" and "Slate Gray" to create a clear spatial hierarchy.
- **Accents:** Pure White is reserved for primary actions and critical text. Silver and Blue-Gray are used for secondary information and iconography to maintain a professional, cold-toned atmosphere.
- **Functional Glass:** Borders are not solid colors but low-opacity white strokes, creating a "specular highlight" effect on the edges of containers.

## Typography

This design system employs a tri-font strategy to balance character with technical precision. 

- **Plus Jakarta Sans** provides a modern, slightly geometric feel for headlines, making the interface feel approachable yet premium.
- **Inter** handles the bulk of the body text for maximum legibility in dense document-reading scenarios. 
- **Geist** is used for labels, metadata, and code snippets to inject a "developer-grade" technical aesthetic.

Maintain a tight vertical rhythm. Large display type should use negative letter-spacing to feel "locked in," while small labels should use slight tracking to ensure readability against dark backgrounds.

## Layout & Spacing

The layout philosophy relies on a **Fluid-Fixed Hybrid**. While the chat interface and sidebars scale with the viewport, content containers (like document viewers) adhere to a 12-column grid to maintain professional alignment.

- **The Workspace:** A three-pane layout is standard: a slim navigation rail on the left, a primary chat/input area in the center, and a contextual document/metadata inspector on the right.
- **Negative Space:** Generous padding within cards (minimum 24px) is required to offset the density of AI-generated data.
- **Adaptive Reflow:** On tablet, the right inspector panel collapses into a bottom drawer or a modal overlay. On mobile, the system transitions to a single-column stack, prioritizing the chat input.

## Elevation & Depth

Depth is conveyed through transparency and blur rather than traditional drop shadows.

- **Level 0 (Background):** Deepest layer (#0B0B0F). No blur.
- **Level 1 (Navigation/Sidebars):** Slight transparency (95%) with a 20px backdrop blur. 1px solid border (#FFFFFF at 5% opacity).
- **Level 2 (Main Cards/Chat Bubbles):** High transparency (80%) with 32px backdrop blur. This creates the "liquid glass" look.
- **Level 3 (Popovers/Modals):** Most elevated. Uses a subtle "outer glow"—a 0px 0px 20px white shadow at 3% opacity to simulate light refracting through the edges of thick glass.

## Shapes

The shape language is "Soft-Tech." Standard components use a **0.5rem (8px)** corner radius to feel precise. 

Large containers and chat bubbles utilize **1rem (16px)** to create a more organic, fluid feel that contrasts with the rigid grid. Interactive elements like buttons and input chips utilize the "Rounded-XL" setting (1.5rem) to signify touchability and modern SaaS conventions.

## Components

- **Chat Interface:** Messages appear in glass containers. User prompts are outlined with a 1px silver border; AI responses have a faint white inner-glow (2% opacity) to distinguish the source. The input bar is a floating glass pill with a "Send" icon that glows when active.
- **Glass Cards:** Used for data visualization and document previews. Must have a `backdrop-filter: blur(20px)` and a top-to-bottom subtle gradient stroke to simulate overhead lighting.
- **Premium Data Viz:** Charts use thin, high-contrast white lines. Grids are faint dots rather than solid lines. No fills, only strokes and subtle area gradients (max 10% opacity).
- **Floating Navigation:** The primary app nav is a centered, floating dock at the bottom of the screen or a slim vertical rail on the left, detached from the screen edge by 16px.
- **Status Chips:** Small, monospaced text (Geist) inside capsules with a 1px border. Status indicators (Processing, Done) use a breathing "pulse" animation on a small white dot.