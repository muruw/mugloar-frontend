# Dragons of Mugloar

Bigbank FE home assignment

Live version of this site:
https://dragonsofmugloar.pages.dev/


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
- Decoded the encrypted quests, so they can be read and solved
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
- Encrypted quests are decoded in `getMessages`, so the rest of the app only
  ever sees plain ones.

## Encrypted quests

Some quests appear to be encrypted. But they have a `encrypted` field.

`encrypted` field: `1` is base64, `2` is rot13.

Because quest id-s are also encrypted, then clicking solve would throw an error because
the id that is passed to API, is just a scrambled text and API doesn't know what to do with it.

## Known missing functionality / TODO

- **The shop is only loaded once per game.** I ran the api multiple times and it seems that the item list doesn't change.
  For optimization, the shop list is fetched at the start of the game.
- **Refreshing the page starts a new game.** The
  browser asks you to confirm before you lose a game in progress.
