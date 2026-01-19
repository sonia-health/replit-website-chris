# Sonia Design System

## About This Document

This document defines the complete visual design system for the Sonia iOS app — an AI-powered therapy companion designed for women aged 35-55. Every color, font, spacing value, and component specification needed to build consistent, cohesive interfaces is documented here.

**How to use this document:**
- When building a new view, screen, or component, reference this document for all styling decisions
- Never hardcode colors, fonts, or spacing values — always use the defined tokens
- The app supports three interchangeable design routes (themes) — all views must work with all three
- When in doubt, refer to the design principles at the end of this document

**Target User Profile:**
- Women aged 35-55
- Often managing family responsibilities, health concerns, or major life transitions
- Values warmth, trust, and emotional safety
- Needs an interface that feels calm, professional, and nurturing — never clinical or cold

---

## Design Routes Overview

The app supports three complete design routes (themes) that can be switched at runtime. Each route defines its own color palette and typography while sharing the same spacing, components, and interaction patterns.

### Route Selection Architecture

```swift
enum DesignRoute: String, CaseIterable {
    case clarity   // Light, airy, colorful accents
    case haven     // Cool, calm, bluish monochrome
    case sunrise   // Warm, nurturing, sunset tones
}

// Usage: Access current theme colors/fonts via a single source
let currentRoute: DesignRoute = .clarity
let primaryColor = DesignTokens.color(for: currentRoute).accent.primary
let headerFont = DesignTokens.typography(for: currentRoute).header
```

### Route Summary

| Aspect | Clarity | Haven | Sunrise |
|--------|---------|-------|---------|
| Mood | Morning light, airy | Evening calm, serene | Golden hour, nurturing |
| Temperature | Neutral-warm | Cool | Warm |
| Accent Strategy | Multi-color (4 distinct) | Monochrome blue (3 shades) | Warm spectrum (coral, amber, gold) |
| Best For | Energizing, optimistic feel | Calming, meditative feel | Comforting, cozy feel |

---

## Typography

### Font Families

All routes use a serif font for display/headers and a sans-serif font for body text. This creates a warm, editorial feel that distinguishes Sonia from clinical healthcare apps.

| Route | Header Font | Body Font | Personality |
|-------|-------------|-----------|-------------|
| Clarity | Libre Baskerville | Source Sans Pro | Elegant, literary, reflective |
| Haven | Manrope | Inter | Professional, calm, trustworthy |
| Sunrise | Nunito | DM Sans | Warm, playful, positive |

**Font Loading (SwiftUI):**
```swift
// Custom fonts must be registered in Info.plist
// Download from Google Fonts (free)

// Clarity theme
.font(.custom("LibreBaskerville-Bold", size: 28))  // Header
.font(.custom("SourceSans3-Regular", size: 15))    // Body

// Haven theme
.font(.custom("Manrope-SemiBold", size: 28))       // Header
.font(.custom("Inter-Regular", size: 15))          // Body

// Sunrise theme
.font(.custom("Nunito-Bold", size: 28))            // Header
.font(.custom("DMSans-Regular", size: 15))         // Body
```

### Type Scale

Use these exact sizes throughout the app. Never use arbitrary font sizes.

| Token | Size (pt) | Weight | Line Height | Usage |
|-------|-----------|--------|-------------|-------|
| `display` | 32 | Semibold (600) | 1.2 | Splash screens, special moments |
| `h1` | 28 | Semibold (600) | 1.25 | Screen titles (e.g., "Journal", "Settings") |
| `h2` | 22 | Semibold (600) | 1.3 | Section headers, card titles |
| `h3` | 18 | Medium (500) | 1.35 | Subsection headers, modal titles |
| `h4` | 16 | Medium (500) | 1.4 | List item titles, emphasized text |
| `body` | 15 | Regular (400) | 1.5 | Primary body text, chat messages |
| `bodySmall` | 14 | Regular (400) | 1.5 | Secondary body text |
| `caption` | 13 | Regular (400) | 1.4 | Helper text, timestamps |
| `label` | 11 | Medium (500) | 1.3 | Uppercase labels, tags |
| `micro` | 10 | Medium (500) | 1.3 | Badges, very small UI elements |

**Header vs Body Font Usage:**
- `display`, `h1`, `h2`, `h3` → Header font (serif)
- `h4`, `body`, `bodySmall`, `caption`, `label`, `micro` → Body font (sans-serif)

### Type Scale (SwiftUI Implementation)

```swift
struct Typography {
    let headerFontName: String
    let bodyFontName: String
    
    func display() -> Font { .custom(headerFontName + "-SemiBold", size: 32) }
    func h1() -> Font { .custom(headerFontName + "-SemiBold", size: 28) }
    func h2() -> Font { .custom(headerFontName + "-SemiBold", size: 22) }
    func h3() -> Font { .custom(headerFontName + "-Medium", size: 18) }
    func h4() -> Font { .custom(bodyFontName + "-Medium", size: 16) }
    func body() -> Font { .custom(bodyFontName + "-Regular", size: 15) }
    func bodySmall() -> Font { .custom(bodyFontName + "-Regular", size: 14) }
    func caption() -> Font { .custom(bodyFontName + "-Regular", size: 13) }
    func label() -> Font { .custom(bodyFontName + "-Medium", size: 11) }
    func micro() -> Font { .custom(bodyFontName + "-Medium", size: 10) }
}
```

### Letter Spacing

| Token | Tracking |
|-------|----------|
| `display`, `h1`, `h2` | -0.02em (slightly tighter) |
| `h3`, `h4`, `body` | 0 (default) |
| `label` | 0.08em (uppercase labels) |

---

## Color System

### Gradient Backgrounds

Each theme uses gradient backgrounds for a more colorful, immersive feel. Gradients apply to main backgrounds and accent cards, while inputs and tab bars remain solid colors.

| Theme | Light Mode Gradient | Dark Mode Gradient |
|-------|--------------------|--------------------|
| **Clarity** | #F0FAFA → #E8F5F5 → #F8F6F2 (turquoise/white) | #1E2828 → #18191D |
| **Haven** | #C6DCF4 → #D8E0FF → #F5F7FA (periwinkle/indigo) | #1A1C38 → #0F1018 |
| **Sunrise** | #FFE8E0 → #FFCABC → #FFF0BC (peachy coral) | #2A2022 → #1A1618 |

**Usage:**
- Main view backgrounds: Use gradient
- Cards/surfaces: Solid or subtle gradient
- Text inputs: Solid color (for readability)
- Tab bar: Solid color

```swift
// Gradient background usage
themeProvider.gradients.background      // Main background gradient
themeProvider.gradients.backgroundSolid // Solid fallback for inputs
themeProvider.gradients.cardAccent      // Subtle gradient for accent cards
```

### 5 Accent Colors Per Theme

Each theme now includes 5 accent colors for a more colorful UI:

| Token | Usage |
|-------|-------|
| `accentPrimary` | CTAs, main features, buttons |
| `accentSecondary` | Secondary actions, cards |
| `accentTertiary` | Tags, badges |
| `accentQuaternary` | Charts, data visualization |
| `accentQuinary` | Calendar highlights, streak flame |

---

### Clarity (Elegant, Literary)

The lightest route with turquoise-tinted backgrounds and colorful accents. Serif typography creates an elegant, reflective mood.

#### Light Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Backgrounds** |
| `background` | #F8F6F2 | 248, 246, 242 | App background |
| `surface` | #FFFFFF | 255, 255, 255 | Cards, sheets, inputs |
| `surfaceElevated` | #FFFFFF | 255, 255, 255 | Modals (with shadow) |
| **Text** |
| `textPrimary` | #2C2A26 | 44, 42, 38 | Headlines, primary content |
| `textSecondary` | #8A867E | 138, 134, 126 | Supporting text, placeholders |
| `textTertiary` | #B5B1A9 | 181, 177, 169 | Disabled text, hints |
| `textInverse` | #FFFFFF | 255, 255, 255 | Text on dark/colored backgrounds |
| **Borders & Dividers** |
| `border` | #E8E5DF | 232, 229, 223 | Input borders, card borders |
| `borderSubtle` | #F0EDE8 | 240, 237, 232 | Dividers, separators |
| **Accents** |
| `accentSky` | #B8C4D4 | 184, 196, 212 | Sessions, primary features |
| `accentSage` | #C5D4C0 | 197, 212, 192 | Wellness, breathing, success states |
| `accentLavender` | #D4C4D0 | 212, 196, 208 | Journal, reflection features |
| `accentSand` | #D4CDB8 | 212, 205, 184 | Neutral accent, warnings |
| **Semantic** |
| `success` | #5AAA72 | 90, 170, 114 | Success messages, positive moods |
| `error` | #D46B6B | 212, 107, 107 | Error messages, destructive actions |
| `warning` | #D9A84E | 217, 168, 78 | Warning messages |
| `info` | #6B8AAA | 107, 138, 170 | Informational messages |
| **Chat** |
| `bubbleAI` | #F0EDE8 | 240, 237, 232 | AI message background |
| `bubbleUser` | #B8C4D4 | 184, 196, 212 | User message background |
| `bubbleUserText` | #2C2A26 | 44, 42, 38 | User message text |

#### Dark Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Backgrounds** |
| `background` | #18191D | 24, 25, 29 | App background (soft blue-dark) |
| `surface` | #222328 | 34, 35, 40 | Cards, sheets |
| `surfaceElevated` | #2A2B32 | 42, 43, 50 | Modals, elevated surfaces |
| **Text** |
| `textPrimary` | #E8E6E2 | 232, 230, 226 | Headlines, primary content |
| `textSecondary` | #9A9892 | 154, 152, 146 | Supporting text |
| `textTertiary` | #6A6862 | 106, 104, 98 | Disabled, hints |
| `textInverse` | #18191D | 24, 25, 29 | Text on light/accent backgrounds |
| **Borders & Dividers** |
| `border` | #333438 | 51, 52, 56 | Borders |
| `borderSubtle` | #28292E | 40, 41, 46 | Subtle dividers |
| **Accents** |
| `accentPrimary` | #C8BED8 | 200, 190, 216 | Primary accent (lavender) |
| `accentSecondary` | #A8C4B8 | 168, 196, 184 | Secondary accent (sage) |
| **Chat** |
| `bubbleAI` | #2A2B32 | 42, 43, 50 | AI message background |
| `bubbleUser` | #C8BED8 | 200, 190, 216 | User message background |
| `bubbleUserText` | #18191D | 24, 25, 29 | User message text |

---

### Haven (Indigo, Periwinkle)

A calming, meditative route with cool indigo and periwinkle tones. The deep indigo (#191793) anchors the design while softer periwinkle (#ADB0FF) and light blue (#C6DCF4) create depth.

#### Light Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Backgrounds** |
| `background` | #F5F7FA | 245, 247, 250 | App background (cool white) |
| `surface` | #FFFFFF | 255, 255, 255 | Cards, sheets |
| `surfaceElevated` | #FFFFFF | 255, 255, 255 | Modals |
| **Text** |
| `textPrimary` | #191793 | 25, 23, 147 | Headlines (deep indigo) |
| `textSecondary` | #5A5AAA | 90, 90, 170 | Supporting text |
| `textTertiary` | #9090C0 | 144, 144, 192 | Disabled, hints |
| `textInverse` | #FFFFFF | 255, 255, 255 | Text on dark backgrounds |
| **Borders & Dividers** |
| `border` | #DCE3EA | 220, 227, 234 | Borders |
| `borderSubtle` | #EBF0F5 | 235, 240, 245 | Dividers |
| **Accents** |
| `accentPrimary` | #191793 | 25, 23, 147 | Deep indigo - CTAs, main features |
| `accentSecondary` | #ADB0FF | 173, 176, 255 | Periwinkle - secondary actions |
| `accentTertiary` | #C6DCF4 | 198, 220, 244 | Light blue - tags, badges |
| `accentQuaternary` | #7A7AE0 | 122, 122, 224 | Mid purple-blue - charts |
| `accentQuinary` | #E8A864 | 232, 168, 100 | Amber - streak, highlights |
| **Semantic** |
| `success` | #4A9A6A | 74, 154, 106 | Success (teal-green) |
| `error` | #C45F6A | 196, 95, 106 | Error (muted red) |
| `warning` | #C4A05A | 196, 160, 90 | Warning (muted gold) |
| `info` | #4A6FA5 | 74, 111, 165 | Info |
| **Chat** |
| `bubbleAI` | #EBF0F5 | 235, 240, 245 | AI message background |
| `bubbleUser` | #191793 | 25, 23, 147 | User message background |
| `bubbleUserText` | #FFFFFF | 255, 255, 255 | User message text |

#### Dark Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Backgrounds** |
| `background` | #0F1018 | 15, 16, 24 | Deep indigo-black |
| `surface` | #171828 | 23, 24, 40 | Cards |
| `surfaceElevated` | #1E2038 | 30, 32, 56 | Modals |
| **Text** |
| `textPrimary` | #E0E4F0 | 224, 228, 240 | Headlines |
| `textSecondary` | #9A9CC0 | 154, 156, 192 | Supporting |
| `textTertiary` | #6A6C90 | 106, 108, 144 | Disabled |
| `textInverse` | #0F1018 | 15, 16, 24 | On light backgrounds |
| **Borders** |
| `border` | #2A2C50 | 42, 44, 80 | Borders |
| `borderSubtle` | #1E2038 | 30, 32, 56 | Subtle |
| **Accents** |
| `accentPrimary` | #ADB0FF | 173, 176, 255 | Periwinkle (brighter for dark) |
| `accentSecondary` | #C6DCF4 | 198, 220, 244 | Light blue |
| `accentTertiary` | #D8E4FF | 216, 228, 255 | Very light blue |
| `accentQuaternary` | #8A8AE8 | 138, 138, 232 | Mid purple-blue |
| `accentQuinary` | #F0B878 | 240, 184, 120 | Amber |
| **Chat** |
| `bubbleAI` | #1E2038 | 30, 32, 56 | AI bubble |
| `bubbleUser` | #ADB0FF | 173, 176, 255 | User bubble |
| `bubbleUserText` | #0F1018 | 15, 16, 24 | User text |

---

### Sunrise (Peachy Coral, Warm Yellow)

The warmest route with peachy coral (#FFCABC) background and light warm yellow (#FFF0BC) as the primary accent. Dark warm brown (#402A2A) provides excellent readability.

#### Light Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Backgrounds** |
| `background` | #FFCABC | 255, 202, 188 | Peachy coral |
| `surface` | #FFF8F5 | 255, 248, 245 | Cards |
| `surfaceElevated` | #FFFFFF | 255, 255, 255 | Modals |
| **Text** |
| `textPrimary` | #402A2A | 64, 42, 42 | Dark warm brown |
| `textSecondary` | #6A4A4A | 106, 74, 74 | Supporting |
| `textTertiary` | #9A7A7A | 154, 122, 122 | Disabled |
| `textInverse` | #FFFFFF | 255, 255, 255 | On dark backgrounds |
| **Borders** |
| `border` | #E8C8C0 | 232, 200, 192 | Borders |
| `borderSubtle` | #F0D8D0 | 240, 216, 208 | Dividers |
| **Accents** |
| `accentPrimary` | #FFF0BC | 255, 240, 188 | Light warm yellow - CTAs |
| `accentSecondary` | #FFD8A8 | 255, 216, 168 | Soft peach |
| `accentTertiary` | #E8A090 | 232, 160, 144 | Coral |
| `accentQuaternary` | #78B8A8 | 120, 184, 168 | Teal (contrast) |
| `accentQuinary` | #D870A0 | 216, 112, 160 | Pink |
| **Semantic** |
| `success` | #6AAA7A | 106, 170, 122 | Success (warm green) |
| `error` | #C45A5A | 196, 90, 90 | Error (warm red) |
| `warning` | #D4A86A | 212, 168, 106 | Warning |
| `info` | #8A9AB0 | 138, 154, 176 | Info (cool contrast) |
| **Chat** |
| `bubbleAI` | #FFF8F5 | 255, 248, 245 | AI bubble |
| `bubbleUser` | #FFF0BC | 255, 240, 188 | User bubble |
| `bubbleUserText` | #402A2A | 64, 42, 42 | User text |

#### Dark Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Backgrounds** |
| `background` | #1A1618 | 26, 22, 24 | Warm coral-charcoal |
| `surface` | #281E20 | 40, 30, 32 | Cards |
| `surfaceElevated` | #322628 | 50, 38, 40 | Modals |
| **Text** |
| `textPrimary` | #F0E8E8 | 240, 232, 232 | Headlines |
| `textSecondary` | #B8A0A0 | 184, 160, 160 | Supporting |
| `textTertiary` | #786868 | 120, 104, 104 | Disabled |
| `textInverse` | #1A1618 | 26, 22, 24 | On light backgrounds |
| **Borders** |
| `border` | #3A2A2C | 58, 42, 44 | Borders |
| `borderSubtle` | #322628 | 50, 38, 40 | Subtle |
| **Accents** |
| `accentPrimary` | #FFF0BC | 255, 240, 188 | Light warm yellow |
| `accentSecondary` | #FFD8B0 | 255, 216, 176 | Soft peach |
| `accentTertiary` | #F0B0A0 | 240, 176, 160 | Coral |
| `accentQuaternary` | #88C8B8 | 136, 200, 184 | Teal |
| `accentQuinary` | #E080B0 | 224, 128, 176 | Pink |
| **Chat** |
| `bubbleAI` | #322628 | 50, 38, 40 | AI bubble |
| `bubbleUser` | #FFF0BC | 255, 240, 188 | User bubble |
| `bubbleUserText` | #402A2A | 64, 42, 42 | User text |

---

## Spacing System

Use a consistent 4px base unit throughout the app. Never use arbitrary spacing values.

| Token | Value | Usage |
|-------|-------|-------|
| `xxs` | 2px | Micro adjustments |
| `xs` | 4px | Icon padding, tight spacing |
| `sm` | 8px | Inline element spacing |
| `md` | 12px | Default element spacing |
| `base` | 16px | Standard padding, gaps |
| `lg` | 20px | Section spacing |
| `xl` | 24px | Card padding |
| `xxl` | 32px | Screen padding (horizontal) |
| `xxxl` | 40px | Major section breaks |
| `huge` | 48px | Screen padding (top with notch) |
| `massive` | 64px | Hero sections |

### Screen Margins

| Context | Horizontal | Top | Bottom |
|---------|------------|-----|--------|
| Standard screen | 16px | 48px (below notch) | 24px (above tab bar) |
| Modal/Sheet | 20px | 24px | 24px |
| Card content | 16px | 16px | 16px |

### Component Spacing

| Context | Value |
|---------|-------|
| Between sections | 32px |
| Between cards in a list | 12px |
| Between form fields | 16px |
| Between buttons (stacked) | 12px |
| Between inline elements | 8px |
| Icon to text | 8px |
| Badge padding | 6px horizontal, 4px vertical |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | No rounding |
| `xs` | 4px | Small badges, tags |
| `sm` | 8px | Input fields, small buttons |
| `md` | 12px | Cards, medium buttons |
| `lg` | 16px | Large cards, journal entries |
| `xl` | 20px | Chat bubbles |
| `xxl` | 24px | Large buttons, pills |
| `full` | 9999px | Circular elements, avatar |

### Component-Specific Radii

| Component | Radius |
|-----------|--------|
| Primary button | 24px (pill) |
| Secondary button | 24px (pill) |
| Text input | 12px |
| Card | 16px |
| Modal/Sheet | 24px (top corners only) |
| Chat bubble | 20px with 6px tail corner |
| Avatar | full (circular) |
| Toggle | full |
| Badge | 20px |
| Tab bar | 0px (flat) |

---

## Shadows & Elevation

Use shadows sparingly. The design favors flat surfaces with subtle borders.

| Token | Value | Usage |
|-------|-------|-------|
| `none` | none | Default, flat surfaces |
| `subtle` | 0 2px 8px rgba(0,0,0,0.04) | Cards (optional) |
| `medium` | 0 4px 16px rgba(0,0,0,0.08) | Elevated cards, dropdowns |
| `strong` | 0 8px 32px rgba(0,0,0,0.12) | Modals, sheets |
| `focus` | 0 0 0 3px [accentPrimary]40 | Focus rings |

**Dark Mode Shadows:**
- Reduce opacity by ~50%
- Shadows should be barely perceptible

---

## Animation

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `instant` | 0ms | No animation |
| `fast` | 100ms | Micro-interactions, toggles |
| `normal` | 200ms | Standard transitions |
| `slow` | 300ms | Page transitions, modals |
| `deliberate` | 400ms | Emphasis animations |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `easeOut` | cubic-bezier(0.0, 0.0, 0.2, 1) | Elements entering (default) |
| `easeIn` | cubic-bezier(0.4, 0.0, 1, 1) | Elements exiting |
| `easeInOut` | cubic-bezier(0.4, 0.0, 0.2, 1) | Elements moving |
| `spring` | SwiftUI .spring(response: 0.3, dampingFraction: 0.7) | Playful interactions |

### Animation Guidelines

- Prefer `easeOut` for most UI transitions
- Use `spring` for drag gestures and playful elements
- Keep animations subtle — this is a therapy app, not a game
- Respect "Reduce Motion" accessibility setting
- Loading states should use gentle pulse, not spinning

---

## Components

### Buttons

All buttons use **24px border radius** (pill shape) across all design routes.

#### Button Types

| Type | Background | Text | Border | Usage |
|------|------------|------|--------|-------|
| Primary | `textPrimary` | `textInverse` | none | Main CTA ("Start Session", "Save") |
| Secondary | transparent | `textPrimary` | 2px `textPrimary` | Alternative actions |
| Tertiary | `surface` or `borderSubtle` | `textPrimary` | none | Cancel, less important actions |
| Destructive | `error` | `textInverse` | none | Delete, destructive actions |
| Ghost | transparent | `textSecondary` | none | Minimal actions |

#### Button Sizes

| Size | Height | Horizontal Padding | Font | Usage |
|------|--------|-------------------|------|-------|
| Large | 56px | 32px | `body` semibold | Primary CTA |
| Medium | 48px | 24px | `bodySmall` semibold | Standard buttons |
| Small | 36px | 16px | `caption` semibold | Compact UI |

#### Button States

| State | Opacity | Additional |
|-------|---------|------------|
| Default | 100% | — |
| Pressed | 90% | Scale 0.98 |
| Disabled | 50% | No interaction |
| Loading | 100% | Show spinner, hide text |

**SwiftUI Implementation:**

```swift
struct PrimaryButton: View {
    let title: String
    let action: () -> Void
    let isLoading: Bool
    let isDisabled: Bool
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .tint(theme.textInverse)
                } else {
                    Text(title)
                        .font(theme.typography.body())
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .frame(height: 56)
            .background(theme.textPrimary)
            .foregroundColor(theme.textInverse)
            .cornerRadius(24)
        }
        .disabled(isDisabled || isLoading)
        .opacity(isDisabled ? 0.5 : 1.0)
    }
}
```

---

### Text Inputs

| Property | Value |
|----------|-------|
| Height | 52px (single line), auto (multiline) |
| Padding | 16px horizontal, 14px vertical |
| Border radius | 12px |
| Border | 1px `border` |
| Background | `surface` |
| Font | `body` |
| Placeholder color | `textTertiary` |

#### Input States

| State | Border | Background |
|-------|--------|------------|
| Default | `border` | `surface` |
| Focused | `textPrimary` (2px) | `surface` |
| Error | `error` | `surface` |
| Disabled | `borderSubtle` | `background` |

---

### Chat Interface

#### Chat Bubbles

```
AI Bubble (left-aligned):
┌─────────────────────────────┐
│  Message text here...        │  ← 12px padding, 16px horizontal
└─────────────────────────────┘
   ↖ 6px corner radius (tail)
   
User Bubble (right-aligned):
┌─────────────────────────────┐
│  Message text here...        │
└─────────────────────────────┘
                               ↗ 6px corner radius (tail)
```

| Property | AI Bubble | User Bubble |
|----------|-----------|-------------|
| Max width | 85% of screen | 85% of screen |
| Padding | 12px vertical, 16px horizontal | 12px vertical, 16px horizontal |
| Border radius | 20px, 20px, 20px, 6px | 20px, 20px, 6px, 20px |
| Background | `bubbleAI` | `bubbleUser` |
| Text color | `textPrimary` | `bubbleUserText` |
| Font | `body` | `body` |
| Spacing between bubbles | 12px | 12px |

#### Chat Input

| Property | Value |
|----------|-------|
| Background | `surface` |
| Border | 1px `border` |
| Border radius | 24px |
| Padding | 12px vertical, 16px horizontal |
| Min height | 48px |
| Max height | 120px (expandable) |
| Send button | 28px circle, `textPrimary` background |

---

### Cards

| Property | Value |
|----------|-------|
| Background | `surface` |
| Border | 1px `border` |
| Border radius | 16px |
| Padding | 16px |
| Shadow | `subtle` (optional) |

#### Card Types

**Standard Card:**
- White/surface background
- Subtle border
- Used for journal entries, settings sections

**Accent Card:**
- Colored background (one of the accent colors)
- No border
- Used for feature highlights on home screen
- Text uses `textPrimary` or `textInverse` depending on contrast

---

### Navigation

#### Tab Bar

| Property | Value |
|----------|-------|
| Height | 49px + safe area |
| Background | `surface` |
| Border top | 1px `borderSubtle` |
| Icon size | 24px |
| Label font | `micro` |
| Spacing (icon to label) | 4px |

| State | Icon | Label |
|-------|------|-------|
| Inactive | `textTertiary` | `textTertiary` |
| Active | `textPrimary` | `textPrimary` |

**Tab Items:**
1. Chat (bubble.left icon) - Main conversation with Sonia
2. Journal (book icon) - Journal entries feed
3. Profile (person.crop.circle icon) - User stats, mood chart, calendar
4. Settings (gearshape icon) - App preferences and theme selection

#### Navigation Bar

| Property | Value |
|----------|-------|
| Height | 44px + safe area |
| Background | `background` (transparent blend) |
| Title | `h3`, centered |
| Back button | 36px touch target, `textPrimary` |
| Action buttons | 36px touch target |

---

### Sheets & Modals

#### Bottom Sheet

| Property | Value |
|----------|-------|
| Background | `surface` |
| Border radius | 24px (top corners only) |
| Handle | 36px × 5px, `borderSubtle`, centered, 8px from top |
| Padding | 24px horizontal, 24px bottom |
| Overlay | #000000 at 30% opacity |

**Snap Points:**
- Small: 25% of screen
- Medium: 50% of screen
- Large: 90% of screen

#### Full Screen Modal

| Property | Value |
|----------|-------|
| Background | `background` |
| Close button | Top right, 44px touch target |
| Padding | Standard screen margins |

---

### Lists

#### List Item

| Property | Value |
|----------|-------|
| Min height | 52px |
| Padding | 16px horizontal, 14px vertical |
| Divider | 1px `borderSubtle`, inset 16px from left |

**List Item Anatomy:**
```
┌────────────────────────────────────────────────┐
│  [Icon]  Title                        [Chevron] │
│          Subtitle (optional)                    │
└────────────────────────────────────────────────┘
```

---

### Selection Controls

#### Toggle/Switch

| Property | Value |
|----------|-------|
| Width | 51px |
| Height | 31px |
| Border radius | full |
| Knob size | 27px |
| Track (off) | `border` |
| Track (on) | `textPrimary` |
| Knob | white with subtle shadow |

#### Radio Button

| Property | Value |
|----------|-------|
| Size | 24px |
| Border | 2px |
| Border (unselected) | `border` |
| Border (selected) | `textPrimary` |
| Fill (selected) | 12px circle, `textPrimary` |

#### Checkbox

| Property | Value |
|----------|-------|
| Size | 24px |
| Border radius | 6px |
| Border (unselected) | 2px `border` |
| Background (selected) | `textPrimary` |
| Checkmark | white, 2px stroke |

---

### Feedback & Status

#### Toast/Snackbar

| Property | Value |
|----------|-------|
| Background | `surface` (light), `surfaceElevated` (dark) |
| Border radius | 12px |
| Padding | 16px |
| Shadow | `medium` |
| Position | Bottom, 24px from tab bar |
| Duration | 3 seconds |
| Max width | Screen width - 32px |

#### Loading States

**Full Screen:**
- Centered spinner (native SwiftUI)
- Optional message below in `caption` font
- Background: `background` at 100% opacity

**Inline:**
- Small spinner
- Size: 20px
- Color: `textSecondary`

#### Empty States

- Centered illustration or icon (64px)
- Title: `h3`
- Description: `body`, `textSecondary`
- Optional CTA button

---

### Journal Entry Card

```
┌────────────────────────────────────────────────┐
│  Today, 9:32 AM                    ← caption   │
│  Morning reflection                ← h4        │
│  Feeling grateful for the quiet    ← body,     │
│  morning. The kids got ready...      secondary │
│                                                │
│  [😊 Peaceful]                     ← badge     │
└────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `surface` |
| Border | 1px `border` |
| Border radius | 16px |
| Padding | 16px |
| Date font | `caption`, `textSecondary` |
| Title font | `h4` |
| Preview font | `body`, `textSecondary` |
| Preview lines | 2-3 max (truncated) |
| Mood badge | `label`, rounded pill, accent color background |

---

## Icons

### Icon Library

Use SF Symbols (Apple's native icon set) for consistency and accessibility.

### Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `xs` | 16px | Inline with small text |
| `sm` | 20px | Standard inline |
| `md` | 24px | Tab bar, list items |
| `lg` | 28px | Headers, emphasis |
| `xl` | 32px | Feature icons |
| `xxl` | 48px | Empty states |

### Icon Style

- Use **regular** weight for inactive states
- Use **semibold/fill** for active/selected states
- Color: inherit from text color tokens

### Common Icons

| Function | SF Symbol |
|----------|-----------|
| Home | `house` / `house.fill` |
| Sessions/Chat | `bubble.left` / `bubble.left.fill` |
| Journal | `book` / `book.fill` |
| Settings | `gearshape` / `gearshape.fill` |
| Back | `chevron.left` |
| Close | `xmark` |
| Add | `plus` |
| Send | `arrow.up` |
| Microphone | `mic` / `mic.fill` |
| More | `ellipsis` |
| Check | `checkmark` |
| Error | `exclamationmark.circle` |
| Success | `checkmark.circle` |

---

## Accessibility

### Minimum Requirements

1. **Touch Targets:** Minimum 44×44pt for all interactive elements
2. **Contrast Ratios:**
   - Normal text: 4.5:1 minimum
   - Large text (18pt+): 3:1 minimum
   - UI components: 3:1 minimum
3. **Dynamic Type:** Support iOS dynamic type scaling
4. **VoiceOver:** All elements must have appropriate labels
5. **Reduce Motion:** Respect the accessibility setting

### Color Contrast Verification

All color combinations in this document have been verified for WCAG AA compliance. When creating new combinations, verify at: https://webaim.org/resources/contrastchecker/

### Focus States

All interactive elements must show a visible focus ring when navigated via keyboard or switch control:
- Ring: 3px offset, `accentPrimary` at 40% opacity

---

## Design Principles

### 1. Calm Over Clever

The app should feel like a quiet room, not a busy marketplace. Avoid:
- Excessive animations
- Bright, attention-grabbing colors
- Dense information layouts
- Gamification elements

### 2. Warmth Through Typography

The serif header fonts bring warmth and humanity. Use them intentionally:
- Headlines should feel like a gentle greeting
- Body text should be highly readable
- Never sacrifice legibility for style

### 3. Soft Edges, Soft Colors

Everything should feel touchable and safe:
- Generous border radius on interactive elements
- Muted color palette, even for accents
- Shadows are subtle or absent
- White space is generous

### 4. Consistency Builds Trust

For a therapy app, predictability is a feature:
- Same button styles everywhere
- Same spacing patterns
- Same navigation patterns
- No surprises

### 5. Accessibility Is Not Optional

Our users may be experiencing stress, anxiety, or other challenges that affect focus:
- Large touch targets
- High contrast text
- Clear visual hierarchy
- Support all accessibility features

### 6. Content First

The user's thoughts and feelings are the content. The UI should recede:
- Minimal chrome
- Focus on text and input areas
- Avoid decorative elements
- Let the conversation be the hero

---

## Implementation Checklist

When building a new screen, verify:

- [ ] Uses only defined spacing tokens
- [ ] Uses only defined color tokens
- [ ] Uses only defined typography scale
- [ ] Works in all three design routes (Clarity, Haven, Sunrise)
- [ ] Works in both light and dark mode
- [ ] Touch targets are minimum 44pt
- [ ] Supports dynamic type
- [ ] Has appropriate VoiceOver labels
- [ ] Respects "Reduce Motion" setting
- [ ] Has proper safe area handling
- [ ] Loading and empty states are designed
- [ ] Error states are handled gracefully

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial design system |

---

## Appendix: SwiftUI Theme Implementation

```swift
// MARK: - Design Route Enum
enum DesignRoute: String, CaseIterable {
    case clarity
    case haven
    case sunrise
}

// MARK: - Color Scheme
enum AppColorScheme {
    case light
    case dark
}

// MARK: - Theme Protocol
protocol Theme {
    var route: DesignRoute { get }
    var colorScheme: AppColorScheme { get }
    
    // Colors
    var background: Color { get }
    var surface: Color { get }
    var surfaceElevated: Color { get }
    var textPrimary: Color { get }
    var textSecondary: Color { get }
    var textTertiary: Color { get }
    var textInverse: Color { get }
    var border: Color { get }
    var borderSubtle: Color { get }
    var bubbleAI: Color { get }
    var bubbleUser: Color { get }
    var bubbleUserText: Color { get }
    var success: Color { get }
    var error: Color { get }
    var warning: Color { get }
    
    // Accent colors (vary by route)
    var accentPrimary: Color { get }
    var accentSecondary: Color { get }
    var accentTertiary: Color { get }
    
    // Typography
    var typography: Typography { get }
}

// MARK: - Typography
struct Typography {
    let headerFontName: String
    let bodyFontName: String
    
    func display() -> Font { .custom(headerFontName, size: 32).weight(.semibold) }
    func h1() -> Font { .custom(headerFontName, size: 28).weight(.semibold) }
    func h2() -> Font { .custom(headerFontName, size: 22).weight(.semibold) }
    func h3() -> Font { .custom(headerFontName, size: 18).weight(.medium) }
    func h4() -> Font { .custom(bodyFontName, size: 16).weight(.medium) }
    func body() -> Font { .custom(bodyFontName, size: 15) }
    func bodySmall() -> Font { .custom(bodyFontName, size: 14) }
    func caption() -> Font { .custom(bodyFontName, size: 13) }
    func label() -> Font { .custom(bodyFontName, size: 11).weight(.medium) }
    func micro() -> Font { .custom(bodyFontName, size: 10).weight(.medium) }
}

// MARK: - Spacing
enum Spacing {
    static let xxs: CGFloat = 2
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let base: CGFloat = 16
    static let lg: CGFloat = 20
    static let xl: CGFloat = 24
    static let xxl: CGFloat = 32
    static let xxxl: CGFloat = 40
    static let huge: CGFloat = 48
    static let massive: CGFloat = 64
}

// MARK: - Border Radius
enum BorderRadius {
    static let none: CGFloat = 0
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let lg: CGFloat = 16
    static let xl: CGFloat = 20
    static let xxl: CGFloat = 24
    static let full: CGFloat = 9999
}

// MARK: - Animation
enum AppAnimation {
    static let fast = Animation.easeOut(duration: 0.1)
    static let normal = Animation.easeOut(duration: 0.2)
    static let slow = Animation.easeOut(duration: 0.3)
    static let spring = Animation.spring(response: 0.3, dampingFraction: 0.7)
}

// MARK: - Theme Provider
class ThemeProvider: ObservableObject {
    @Published var route: DesignRoute = .clarity
    @Published var colorScheme: AppColorScheme = .light
    
    var current: Theme {
        // Return appropriate theme based on route and color scheme
        // Implementation would return ClarityLight, ClarityDark, HavenLight, etc.
    }
}

// MARK: - Usage in Views
struct ExampleView: View {
    @EnvironmentObject var themeProvider: ThemeProvider
    
    var theme: Theme { themeProvider.current }
    
    var body: some View {
        VStack(spacing: Spacing.base) {
            Text("Welcome")
                .font(theme.typography.h1())
                .foregroundColor(theme.textPrimary)
            
            Text("How are you feeling?")
                .font(theme.typography.body())
                .foregroundColor(theme.textSecondary)
        }
        .padding(Spacing.xl)
        .background(theme.background)
    }
}
```

---

*This document is the single source of truth for all visual design decisions in the Sonia iOS app. When in doubt, refer here. When something isn't defined, add it here before implementing.*