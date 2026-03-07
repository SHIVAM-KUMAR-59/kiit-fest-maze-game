![Banner](./banner.png)

# KIIT Fest Maze Game

> Navigate the unknown. Dodge the danger. Race the clock.

A competitive, browser-based maze game built for KIIT Fest. Navigate fog-covered mazes across 3 levels, avoid hidden bombs, and race the clock to earn stars and top the leaderboard.

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

1. **Navigate the Maze** — Use Arrow Keys / WASD or the on-screen D-Pad to move
2. **Reach the Flag** — Step on the pulsing flag to complete the level and advance
3. **Avoid Bombs** — Red cells hide bombs; one wrong step and the game ends instantly
4. **Fog of War** — Only nearby cells are visible; the rest stay blacked out
5. **Beat the Clock** — Each level has a time limit; finish faster to earn more stars
6. **Earn Stars & Score** — Earn up to ★★★ per level based on speed and moves; stars multiply your final score across all 3 levels

---

## Features

- 3-level fog-of-war maze
- Hidden bomb cells — instant game over on contact
- Per-level time limits with star ratings (★ to ★★★)
- Global leaderboard ranked by total score
- User auth — register, login, play
- Unlimited replays — only your personal best is shown
- Keyboard (Arrow / WASD) + on-screen D-Pad support
- Mobile + desktop compatible

---

## Tech Stack

**Frontend** — Next.js (React 19), Tailwind CSS, Framer Motion  
**Backend** — Node.js, Next.js API Routes  
**Database** — PostgreSQL via Prisma ORM  

---

## Getting Started

```bash
git clone https://github.com/SHIVAM-KUMAR-59/kiit-fest-maze-game.git
cd kiit-fest-maze-game
npm install
```

[⚙️ Setup Environment Variables](#environment-variables)

```bash
npx prisma migrate dev
npm run dev
```

Visit `http://localhost:3000`

---

## Environment Variables

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/maze_game
```

---

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/SHIVAM-KUMAR-59">
        <img src="https://avatars.githubusercontent.com/u/134395567?v=4" width="80px" alt="Name"/><br/>
        <sub><b>Shivam Kumar</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/soxamz">
        <img src="https://avatars.githubusercontent.com/u/93909798?v=4" width="80px" alt="Name"/><br/>
        <sub><b>Sohom Mondal</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/TEJASWI-RAJ0210">
        <img src="https://avatars.githubusercontent.com/u/185408736?v=4" width="80px" alt="Name"/><br/>
        <sub><b>Tejaswi Raj</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sayandwip2004">
        <img src="https://avatars.githubusercontent.com/u/186007047?v=4" width="80px" alt="Name"/><br/>
        <sub><b>Sayandwip Debnath</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/aarx09">
        <img src="https://avatars.githubusercontent.com/u/203227449?v=4" width="80px" alt="Name"/><br/>
        <sub><b>Aaryan Aditya Das</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SwapnanilKayal">
        <img src="https://avatars.githubusercontent.com/u/89159686?v=4" width="80px" alt="Name"/><br/>
        <sub><b>Swapnanil Kayal</b></sub>
      </a>
    </td>
  </tr>
</table>

---
Built with ❤️ for KIIT Fest
