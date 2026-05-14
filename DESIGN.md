# Amazon-Style E-Commerce: Order Management System

## Direction
Extended design system for order management and tracking. Maintains clean, minimalist e-commerce interface with white background, orange accent, and introduces color-coded status semantics (green=delivered/active, orange=processing, grey=pending, red=cancelled). Order detail pages emphasize visual status timeline and delivery information. Admin panel uses utilitarian table design with minimal borders and compact spacing.

## Palette — Order Status Semantics
| Token | OKLCH | Purpose |
|-------|-------|----------|
| Success | 0.66 0.19 142 | Delivered, completed states (green) |
| Warning | 0.78 0.18 61.59 | Out for delivery, urgent states (orange-warm) |
| Status Delivered | 0.66 0.19 142 | Order arrived |
| Status Out-for-Delivery | 0.78 0.18 61.59 | In transit |
| Status Shipped/Packed/Confirmed | 0.714 0.24 61.59 | Processing (orange accent) |
| Status Placed | 0.5 0 0 | Pending initial confirmation (dark grey) |
| Status Cancelled/Returned | 0.55 0.22 25 | Terminal states (red destructive) |

## Typography — Order Management
| Layer | Font | Use |
|-------|------|-----|
| Display | Fraunces | Section headers (My Orders, Order Details, Admin Panel) |
| Body | GeneralSans | Order list items, address, payment info, timeline labels |
| Mono | JetBrainsMono | Order ID, tracking number, price/amount |

## Component Patterns — Order UI
| Component | Design |
|-----------|--------|
| Status Badge | 8px padding, 4px radius, semantic color bg/text, 12px font |
| Timeline Step | Dot (10px, 2px border) + connecting line (2px, 8px height) |
| Timeline Dot Completed | Accent orange, solid |
| Timeline Dot Current | Success green, 2px ring (success/30 opacity) |
| Timeline Dot Pending | Border grey, unfilled |
| Order Card | White bg, subtle shadow, 1.5rem padding, 1rem gaps |
| Admin Table | White bg, border-bottom on rows, 0.5rem row padding, compact |

## Structural Zones — Order Pages
| Zone | Background | Treatment |
|------|------------|----------|
| Order List Header | white | Filter tabs (All, Active, Completed, Cancelled), search input |
| Order Cards | white | Card-based grid (1 col mobile, 2 col tablet, responsive), gap 1.5rem |
| Order Detail Header | white | Order ID, status badge, date |
| Order Summary | card (1.0 L) | Items list with images, quantities, prices, subtotal/tax/total |
| Status Timeline | white | Horizontal timeline (mobile: vertical stacked), 8px between steps |
| Delivery Address | card (1.0 L) | Bordered section, address block |
| Admin Table | white | Sticky header, zebra rows optional, search bar above |
| Admin Bulk Actions | muted (0.92 L) | Floating toolbar with status dropdown, apply button |

## Motion & Interaction
- Status badge hover: slight scale, shadow lift
- Timeline dot on current step: ring glow animation (pulse subtle)
- Card hover: shadow-md, -4px translate Y
- Button transitions: bg and shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Status update dropdown: instant change on select, toast notification (in-app, no email)

## Constraints — Order Management
- No dark mode override (inherit from root; light-optimized)
- Status badges use semantic color tokens (success, warning, destructive)
- Timeline uses only circle dots and connecting lines (no icons)
- Order ID displayed in monospace for scannability
- Admin panel: functional, minimal decoration, high information density
- Buttons: Orange for primary CTAs (View Details, Track Order, Update Status), grey for secondary (Cancel, Return)

## Signature Detail — Order Status Timeline
Horizontal linear timeline (mobile: stacked vertical) showing order journey. Current step highlighted in green with subtle ring glow. Completed steps in orange accent. Pending steps in light grey. No decoration—pure informational clarity. Matches Amazon's visual pattern for order transparency.
