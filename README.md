![Banner](/banner.png)

# KIIT Fest Maze Game

> Navigate the unknown. Dodge the danger. Race the clock.

A competitive, browser-based maze game built for KIIT Fest. Navigate fog-covered mazes across 3 levels, avoid hidden bombs, and race the clock to earn stars and top the leaderboard.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?style=flat-square&logo=postgresql)

---

## Contents

- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Contributors](#contributors)

---

## How It Works

| Step | Description |
|------|-------------|
| 1. **Navigate the Maze** | Use `Arrow Keys` / `WASD` or the on-screen D-Pad to move through the maze |
| 2. **Reach the Flag** | Step onto the pulsing flag to complete a level and advance to the next |
| 3. **Avoid Bombs** | Red cells hide bombs — one wrong step ends the game instantly |
| 4. **Fog of War** | Only nearby cells are visible; the rest stay blacked out until explored |
| 5. **Beat the Clock** | Each level has a time limit — finish faster to earn more stars |
| 6. **Earn Stars & Score** | Earn up to ★★★ per level based on speed and moves; stars multiply your final score |

---

## Features

- **Fog of War** — only nearby cells revealed as you explore
- **Hidden Bombs** — instant game over on contact
- **Timed Levels** — per-level time limits with ★ to ★★★ star ratings
- **Global Leaderboard** — ranked by total score across all 3 levels
- **User Auth** — register, login, and track your personal best
- **Unlimited Replays** — only your best run counts
- ⌨**Dual Controls** — keyboard (`Arrow` / `WASD`) + on-screen D-Pad
- **Responsive** — fully playable on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (React 19), Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Next.js API Routes |
| **Database** | PostgreSQL via Prisma ORM |

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database (local or hosted)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/SHIVAM-KUMAR-59/kiit-fest-maze-game.git
cd kiit-fest-maze-game
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```

Fill in your values — see [Environment Variables](#-environment-variables) below.

**4. Run database migrations**
```bash
npx prisma migrate dev
```

**5. Start the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## Environment Variables

Create a `.env` file in the root of the project with the following variables:
```env
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/maze_game
```

> **Note:** Replace `USER`, `PASSWORD`, and `HOST` with your actual PostgreSQL credentials. For local development, `HOST` is typically `localhost`.

---

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/SHIVAM-KUMAR-59">
        <img src="https://avatars.githubusercontent.com/u/134395567?v=4" width="80px" alt="Shivam Kumar"/><br/>
        <sub><b>Shivam Kumar</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/soxamz">
        <img src="https://avatars.githubusercontent.com/u/93909798?v=4" width="80px" alt="Sohom Mondal"/><br/>
        <sub><b>Sohom Mondal</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/TEJASWI-RAJ0210">
        <img src="https://avatars.githubusercontent.com/u/185408736?v=4" width="80px" alt="Tejaswi Raj"/><br/>
        <sub><b>Tejaswi Raj</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sayandwip2004">
        <img src="https://avatars.githubusercontent.com/u/186007047?v=4" width="80px" alt="Sayandwip Debnath"/><br/>
        <sub><b>Sayandwip Debnath</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/aarx09">
        <img src="https://avatars.githubusercontent.com/u/203227449?v=4" width="80px" alt="Aaryan Aditya Das"/><br/>
        <sub><b>Aaryan Aditya Das</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SwapnanilKayal">
        <img src="https://avatars.githubusercontent.com/u/89159686?v=4" width="80px" alt="Swapnanil Kayal"/><br/>
        <sub><b>Swapnanil Kayal</b></sub>
      </a>
    </td>
  </tr>
</table>

---

<div align="center">
  Built with ❤️ for KIIT Fest
</div>