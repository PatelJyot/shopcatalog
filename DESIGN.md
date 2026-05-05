# Amazon-Style E-Commerce Product Catalog

## Direction
Clean, minimalist e-commerce interface with white background and orange accent. Amazon-inspired efficiency focused on product discovery and purchasing. No decoration—every visual element serves information hierarchy or functionality.

## Palette
| Token | OKLCH | Purpose |
|-------|-------|----------|
| Primary | 0.2 0 0 | Text, navigation, structure |
| Accent (Orange) | 0.714 0.24 61.59 | CTA buttons, highlights, links |
| Background | 0.99 0 0 | Page background, clean canvas |
| Card | 1.0 0 0 | Product cards, modals |
| Muted | 0.92 0 0 | Borders, dividers, subtle UI |
| Destructive | 0.55 0.22 25 | Stock warnings, sale badges |

## Typography
| Layer | Font | Use |
|-------|------|-----|
| Display | Fraunces | Hero section, page titles |
| Body | GeneralSans | Navigation, product titles, description, UI text |
| Mono | JetBrainsMono | Product SKU, technical product info |

## Elevation & Depth
- **Header**: White bg, border-bottom (0.88 L grey)
- **Cards**: White bg, subtle shadow-sm on rest, shadow-md on hover
- **Footer**: Muted bg (0.92 L), border-top
- **Hover states**: Lift 4px, shadow deepens

## Structural Zones
| Zone | Background | Treatment |
|------|------------|----------|
| Header | white | Border-bottom, navigation |
| Hero | white | Full-width with product image |
| Featured Grid | white | 4-column responsive, card-based |
| Footer | muted-50 | Border-top, light |

## Spacing & Rhythm
- Gutters: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)
- Card padding: 1rem
- Gap between products: 1.5rem
- Typography scale: 12px, 14px, 16px, 18px, 24px, 32px

## Component Patterns
- **Product Card**: Image, title, price, rating (stars), add-to-cart button
- **CTA Buttons**: Orange background, white text, 4px border-radius, hover shadow
- **Price Display**: Black primary text, strikethrough on sale price
- **Rating**: Star icon + count (right-aligned)
- **Grid**: 1 col (mobile), 2 col (tablet sm), 3 col (tablet lg), 4 col (desktop)

## Motion
- Smooth transitions (0.3s cubic-bezier(0.4, 0, 0.2, 1)) on hover
- Button: bg and shadow change
- Card: opacity fade-in on load

## Constraints
- No dark mode (light-only aesthetic)
- No gradients, no blur effects
- Orange used only on CTA and active states
- Max content width: 1400px
- No animations beyond hover/focus transitions

## Signature Detail
Orange accent color appears only on interactive elements (buttons, links, active navigation). Product cards rely on typography hierarchy and subtle shadow for depth—the accent pops through CTAs only, drawing attention to purchase actions without visual noise.
