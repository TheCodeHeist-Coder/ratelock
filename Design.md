# Login Page

Build a futuristic cyberpunk-style authentication page using React + TypeScript + Tailwind CSS.

The UI should replicate a high-end AI/security dashboard aesthetic with a split-screen layout inspired by advanced sci-fi operating systems. The interface must be sleek, immersive, minimal, and visually premium.

TECH STACK:
- React
- TypeScript
- Tailwind CSS
- Optional: Framer Motion for animations
- Optional: Lucide React icons
- Vite setup preferred

DESIGN STYLE:
- Dark black background (#050505 or similar)
- Neon green accents (#00ff9c / #00d084)
- Futuristic hacker/cyberpunk visual language
- Soft glowing effects
- Glassmorphism + subtle transparency
- Thin borders with low opacity
- Digital terminal typography
- Smooth transitions and hover states
- High-tech dashboard feel

LAYOUT:
Create a full-screen responsive split layout.

LEFT SECTION (Hero Area):
- Occupies around 60% width on desktop
- Contains:
  - Animated glowing orb/sphere at center
  - Transparent mesh/grid overlays
  - Abstract circuit-line background graphics
  - Floating translucent UI panels/cards
  - Heading:
      "Access the Mesh"
  - Small label above:
      "IDENTITY VERIFICATION"
  - Supporting paragraph describing distributed architecture/network sync
  - Small status cards at bottom:
      - LATENCY: 12ms
      - UPTIME: 99.998%
- Add subtle floating animation to orb
- Add animated glowing pulse around orb
- Add moving gradient overlays or animated particles
- Use blur + backdrop effects for depth

RIGHT SECTION (Login Panel):
- Occupies around 40% width on desktop
- Vertically centered login form
- Include:
  - Logo/title "LIMITLESS"
  - Welcome heading
  - Subtitle:
      "Authentication required for core access."
  - Email input
  - Access token/password input
  - Recover link
  - Checkbox:
      "Maintain active handshake"
  - Large glowing CTA button:
      "INITIATE SESSION"
  - Footer link:
      "Join the Network"

INPUT STYLING:
- Dark transparent inputs
- Thin neon borders
- Green glow on focus
- Smooth transitions
- Monospace/futuristic text
- Icons inside inputs preferred

BUTTON STYLING:
- Bright neon green background
- Black text
- Strong hover glow
- Scale animation on hover
- Active pressed effect
- Full-width button

TYPOGRAPHY:
- Use modern futuristic fonts:
  - Orbitron
  - Space Grotesk
  - JetBrains Mono
- Large bold heading
- Tight letter spacing
- Uppercase labels

ANIMATIONS:
Use Framer Motion optionally:
- Fade-in sections
- Floating orb movement
- Hover animations
- Pulsing glow effects
- Smooth form entrance animation

RESPONSIVENESS:
- Mobile-first responsive design
- On mobile:
  - Stack sections vertically
  - Hero section moves above form
  - Reduce orb size
  - Keep readability high
- Ensure layout works across:
  - Mobile
  - Tablet
  - Desktop
  - Ultrawide screens

ACCESSIBILITY:
- Proper label associations
- Keyboard navigable
- Focus-visible states
- Semantic HTML
- Sufficient contrast ratios

COMPONENT STRUCTURE:
src/
 ├── components/
 │    ├── LoginForm.tsx
 │    ├── HeroSection.tsx
 │    ├── AnimatedOrb.tsx
 │    ├── StatusCard.tsx
 │    ├── BackgroundGrid.tsx
 │    └── NeonButton.tsx
 │
 ├── pages/
 │    └── LoginPage.tsx
 │
 ├── layouts/
 │    └── AuthLayout.tsx
 │
 ├── styles/
 │    └── globals.css
 │
 └── App.tsx

TAILWIND REQUIREMENTS:
- Use utility-first Tailwind classes
- Extend theme with custom neon colors
- Add custom shadows/glows
- Use backdrop-blur utilities
- Use gradients and opacity overlays
- Add custom keyframe animations in tailwind.config.ts

TAILWIND CUSTOM EXTENSIONS:
- neon-green glow shadow
- pulse animation
- floating animation
- cyber grid background
- radial gradient utilities

VISUAL DETAILS:
- Add faint scanline overlay
- Include subtle noise texture
- Use dim green grid lines in background
- Add tiny system labels like:
    "AES-256_GCM"
    "SECURE_NODE_15"
- Use low-opacity borders and separators
- Include glowing divider between left and right sections

EXPECTED OUTPUT:
- Production-quality React + TS code
- Clean reusable components
- Modern folder architecture
- Fully responsive
- Pixel-perfect futuristic login UI
- Highly polished visual experience