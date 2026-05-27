# Feature section in landing page
Create a modern futuristic dashboard section using React and Tailwind CSS.

Requirements:
- Build a responsive asymmetric grid layout with 5 cards.
- Use a dark cyberpunk-inspired UI with subtle green neon accents.
- Background should be nearly black (#0B0F0E) with soft gradients and glow effects.
- Cards should have rounded corners (rounded-2xl), subtle borders, backdrop blur, and hover animations.
- Layout (CSS Grid):
  - Card 1 (Latency): Spans 2 columns, 1 row (top-left).
  - Card 2 (Global Mesh): Spans 1 column, 2 rows (right side).
  - Card 3 (Smart Proxy): Spans 1 column, 1 row (middle-left).
  - Card 4 (Adaptive Throttling): Spans 1 column, 1 row (middle-center).
  - Card 5 (Terminal): Spans 2 columns, 1 row (bottom-left/center).
- Use CSS grid with responsive Tailwind classes:
  - Desktop (lg): `grid-cols-3 grid-rows-2`
  - Tablet (md): `grid-cols-2`
  - Mobile: `grid-cols-1`

Card Styling:
- Background: `bg-[#0B0F0E]/80` with `backdrop-blur-xl`.
- Border: `border border-white/10 hover:border-neon-green/30`.
- Add soft radial glow effects behind cards using absolute positioned divs.
- Use smooth hover transitions: `transition-all duration-500 hover:-translate-y-1`.

Card Content & Specifics:
1. **Latency Card** (Large horizontal)
   - Big "10ms" text with `glow-text` and `text-neon-green`.
   - Title: “10ms Latency P99”
   - Subtitle: "Ultra-low latency at the edge."
   - Visual: Small spark/zap icon and a "LIVE" indicator.

2. **Global Mesh Card** (Tall vertical)
   - Title: "Global Mesh"
   - Visual: A mini globe or mesh network visualization.
   - Status: "42 Nodes Online" with a pulsing green dot.

3. **Smart Proxy Card** (Square)
   - Title: "Smart Proxy"
   - Icon: Shield.
   - Visual: Small status indicators (e.g., L3/L4/L7 protected).

4. **Adaptive Throttling Card** (Square)
   - Title: "Adaptive Throttling"
   - Visual: A horizontal progress bar (80% full) with neon green fill.
   - Labels: "NORMAL" vs "SURGE".

5. **Terminal Status Card** (Wide horizontal)
   - Title: "System Health"
   - Visual: Terminal-style mini panel with monospace font.
   - Content: `> ratelock status --check` followed by success messages.

Technical Requirements:
- Use React functional components.
- Use Tailwind CSS utility classes.
- Use `motion/react` for animations.
- Use `lucide-react` or `react-icons/fi`.
- Create a reusable `FeatureCard` component that supports `className` for grid spans.
- Ensure the section is wrapped in a `container` with proper padding.
