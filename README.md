# Obrio Questioannaire

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v22.14.0)
- npm (10.9.2)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mikelangelo64/obrio-questionaire.git obrio-questionaire
```

2. Navigate to the directory:

```bash
cd obrio-questionaire
```

3. Install the required dependencies:

```bash
npm install
```

4. Create **.env** file with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Run in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run in production mode:

### Build the project

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Run server

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> [!IMPORTANT]
> If you run production mode locally all API Route requests will be replaced on static data (`data/staticDataUtils.ts`). You can test API route working in development mode or if you deploy project on the host

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

> [!IMPORTANT]
> Don't forget edit .env variables

> [!TIP]
> You can check the app which is already deployed on Vercel [here](https://vercel.com/)

## Dependencies

#### Core Dependencies:

- Next.js
- React as the UI library
- Redux as the global state manager
- SCSS for styling

#### Dev Dependencies:

- eslint, stylelint, prettier to follow one code style

#### Other Packages:

- [normilize.css](https://necolas.github.io/normalize.css/) - CSS reset
- [clsx](https://www.npmjs.com/package/clsx) - A utility for constructing className strings conditionally
- [react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot) - helper for creating custom UI components
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts
