# BookingView

BookingView is a multilingual travel-booking experience for discovering stays, exploring destination deals, and managing an account.

## Getting started

### Requirements

- Node.js 24 or later
- Bun

Install dependencies and start the development server:

```shell
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Configure the required values in `.env`. Environment variables are validated in `src/libs/Env.ts`.

## Available commands

```shell
bun run build-local
bun run lint
bun run check:types
bun run check:deps
bun run check:i18n
bun run test
bun run test:e2e
```

## Localization

Translations are stored in `src/locales`. Update every locale when adding or changing user-facing text.

## License

See [LICENSE](LICENSE).
