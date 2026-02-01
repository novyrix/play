# Valentine's Day 2026 Proposal App 💕

A romantic, interactive web experience designed to capture your girlfriend's heart on Valentine's Day 2026. Built with Next.js, TypeScript, and crafted with love by **Spira**.

**Author:** spira@novyrix.com  
**Organization:** Novyrix  
**Repository:** https://github.com/novyrix/play.git  
**Live URL:** https://play.novyrix.com

## 🌟 Features

### 8-Phase Interactive Journey
1. **Landing Page** - Simple terms acceptance
2. **Question Phase** - YES/NO buttons with mobile shake animation
3. **Rejection Page** - Guilt-trip persuasion after 3 NO attempts
4. **Identity Preloader** - "YESSS! But are you HER?"
5. **Identity Verification** - Quiz with afro music, chocolate, fashion questions + fake fingerprint scanner
6. **Wrong Identity Rejection** - "Naaaah, you are not the one!"
7. **Date Builder** - Dinner and beverage selection
8. **Music Phase** - Ed Sheeran's "Photograph" with dancing GIF

### Technical Highlights
- 🎨 Romantic fonts: Great Vibes, Pacifico, Poppins
- 📱 Mobile-first design (100vh pages)
- 📳 Viewport shake + vibration on NO button
- 🎉 Confetti celebration
- 🎵 Spotify music integration
- 💝 Identity verification quiz
- 🔒 Fingerprint scanner simulation

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

Open [http://localhost:3000](http://localhost:3000) to see the magic! ✨

## 🗄️ Database Setup

This project uses **Neon PostgreSQL**. The database credentials are configured in `.env.local`:

```bash
DATABASE_URL=postgresql://neondb_owner:npg_CoUPZS8i4wtR@ep-bitter-hall-ah4izwgx-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 🌐 Production Deployment

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set custom domain: **play.novyrix.com**
3. Add environment variables from `.env.local`
4. Deploy! 🚀

### Environment Variables
Make sure to add these to your deployment platform:
- `DATABASE_URL`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`

## 📦 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Neon PostgreSQL
- **Animations**: canvas-confetti, custom CSS
- **Fonts**: Google Fonts (Great Vibes, Pacifico, Poppins)

## 🎯 Project Structure

```
play/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles
│   └── animations.css      # Custom animations
├── components/
│   ├── ValentineProposal.tsx   # Main 8-phase component
│   ├── RomanticPreloader.tsx   # Loading screen
│   └── ui/                     # shadcn/ui components
├── .env.local              # Database credentials
└── README.md
```

## 💖 Author

**Spira** - [spira@novyrix.com](mailto:spira@novyrix.com)

Crafted with ❤️ for Valentine's Day 2026

## 📄 License

This project is personal and proprietary. Built with love for a special someone. 💕

---

**Repository**: [github.com/novyrix/play](https://github.com/novyrix/play)  
**Production**: [play.novyrix.com](https://play.novyrix.com)

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

