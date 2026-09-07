# Dragons of Mugloar

Bigbank FE home assignment


## Running it

Node 22.12 or newer.

```sh
npm install
npm run dev
```

Then open http://localhost:5173

## Commands

- `npm run dev` — run it locally
- `npm run build` — build into `dist/`
- `npm test` — run the tests
- `npm run lint` — check the code

## Functionality

- Start a new game
- Show the quests on the message board, with reward, odds and turns left
- Attempt to solve quests
- Buy items from the shop
- Show lives, gold, score, level and turn, updated after every turn
- Check your reputation with factions
- Show a final score and a "play again" button when you run out of lives

## How it is put together

- React, TypeScript and Vite. UI component library [8bitcn](https://www.8bitcn.com/).
- static website, uses public Dragons of Mugloar API for game logic.
- The game API is the only source for lives, gold and score. Those numbers are
  never worked out in the app, only copied from whatever the API last said.
- Game uses `mergeResponse` in `src/mugloar.ts` because there is no GET endpoint to get all stats, 
  nor any single endpoint returns all stats.

## Known missing functionality / TODO

- **Some quests are not readable and solvable.** Their id is also scrambled and thus it's not possible to solve them. 
  Decoding them is understood but not built.
- **The shop is only loaded once per game.** I ran the api multiple times and it seems that the item list doesn't change.
  For optimization, the shop list is fetched at the start of the game.
- **Refreshing the page starts a new game.** Nothing is saved anywhere. The
  browser asks you to confirm before you lose a game in progress.
