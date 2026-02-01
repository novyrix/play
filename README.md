# Be Mine - Valentine's Day 2026 💕

A highly interactive, slightly chaotic, and undeniably charming Valentine's Day proposal web application built with Next.js.

**Author:** spira@novyrix.com  
**Organization:** Novyrix  
**Repository:** https://github.com/novyrix/play.git

## 🎯 Project Overview

Project "Be Mine" is designed to secure a "Yes" for Valentine's Day 2026 through an engaging digital interface featuring:

- **Unclickable "No" Button**: Uses clever JavaScript to make the "No" button jump away when approached
- **Dynamic Compliment Engine**: Generates new romantic compliments on demand
- **Interactive Date Builder**: A fun, low-pressure scheduling tool for planning the perfect date
- **Celebration Effects**: Confetti animation when she says "Yes!"
- **GIF Integration**: Strategic placement of charming GIFs throughout the experience

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: canvas-confetti & react-confetti
- **Package Manager**: npm

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/novyrix/play.git

# Navigate to the project
cd play

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Features

### Phase 1: Landing Page
- Official-looking header: "Official Proposal for Collaborative Romantic Engagement"
- Terms & Conditions checkbox with the agreement: "I agree to be showered with affection and snacks"
- Nervous cat GIF to set the cute tone

### Phase 2: The Question
- Large, pulsing "YES" button
- Elusive "No" button that moves away on hover
- Dynamic compliment generator that shows a new romantic message on each click
- Puss in Boots eyes GIF for maximum charm

### Phase 3: Date Builder
- **Dinner Protocol Options**:
  - 🍷 Fancy & Overpriced
  - 🌮 Tacos & Sweatpants
  - 👨‍🍳 I'll Cook (God help us)

- **Beverage Tier Options**:
  - 🍷 Wine
  - 💧 Sparkling Water
  - 🧃 A very specific juice box

- Happy dance GIF celebration

### Phase 4: Success Modal
- Confetti explosion animation
- Celebration GIF from The Office
- Summary of the date plan
- "Mission Accomplished" message

## 🎭 GIF Placement Strategy

| Event | GIF Theme | Purpose |
|-------|-----------|---------|
| Page Load | Nervous cat | Sets cute, anticipatory tone |
| Question Page | Puss in Boots eyes | Maximum charm factor |
| Hovering "Yes" | (Positive vibes) | Positive reinforcement |
| Hovering "No" | (Moves away!) | Adds to unclickable joke |
| Date Builder | Happy dance (Carlton) | Celebrates the "Yes" |
| Success Modal | Office celebration | Peak "Mission Accomplished" |

## 📁 Project Structure

```
play/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   └── dialog.tsx
│   └── ValentineProposal.tsx  # Main interactive component
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── package.json
```

## 🎯 Key Implementation Details

### Unclickable "No" Button Logic
```typescript
const moveNoButton = () => {
  const container = containerRef.current.getBoundingClientRect();
  const newX = Math.random() * (container.width - buttonWidth);
  const newY = Math.random() * (container.height - buttonHeight);
  setNoButtonPosition({ x: newX, y: newY });
};
```

### Confetti Celebration
Uses `canvas-confetti` library to create a 5-second confetti explosion from multiple angles when the date is confirmed.

### Compliment Engine
Rotates through 15+ pre-written romantic compliments, ensuring variety and genuine sentiment.

## 🎨 Styling Philosophy

- **Color Palette**: Pink and red gradients for Valentine's theme
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Design**: Mobile-friendly layout
- **Playful UI**: Large buttons, emoji usage, and animated elements

## 📝 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎉 Success Criteria

- ✅ 100% conversion rate (impossible to click "No")
- ✅ High engagement through interactive elements
- ✅ Emotional connection via compliments
- ✅ Clear date planning outcome
- ✅ Memorable celebration experience

## 💝 Version History

- **v1.01**: Initial release with all core features
  - Landing page with terms acceptance
  - Interactive question phase
  - Date builder form
  - Success modal with confetti
  - GIF integration throughout

## 🙏 Acknowledgments

Built with love (and a bit of JavaScript trickery) for Valentine's Day 2026.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

*Made with ❤️ by Novyrix*

