# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Project - Search Github Users

This is a web app that allows you to search for users on Github.

## Technologies Used

- React
- Vite
- Tailwind CSS
- Shadcn UI
- Typescript
- Github API
- Appollo Client

## Setup

- create a new directory

```bash
npm create vite@latest . -- --template react-ts
```

```bash
npm install
```

```bash
npm run dev
```

## Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

App.tsx

```tsx
const App = () => {
  return <h1 className="text-2xl font-bold">Search Github Users</h1>;
};
export default App;
```

- remove App.css
- change title in index.html

```html
<title>Search Github Users</title>
```

## Shadcn UI

tsconfig.json
[DOC]https://ui.shadcn.com/docs/installation/vite

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

tsconfig.app.json

```json
{
  "compilerOptions": {
    // rest of the options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```bash
npm i -D @types/node

```

vite.config.ts

```ts
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- initialize shadcn

```bash
npx shadcn@latest init
```

- add components

```bash
npx shadcn@latest add button card chart input label skeleton toast
```

## Structure

- setup local state in App.tsx
- create src/components/form/SearchForm.tsx
- create src/components/user/UserProfile.tsx
- render both components in App.tsx
- pass userName and setUserName to SearchForm
- pass userName to UserProfile

App.tsx

```tsx
const [userName, setUserName] = useState("quincylarson");
```

src/components/form/SearchForm.tsx

```tsx
type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get("searchuser") as string;
    setUserName(data);
  };
  return (
    <form
      className="grid w-full max-w-sm items-center gap-1.5"
      onSubmit={handleSearch}
    >
      <Label htmlFor="searchuser">Username</Label>
      <div>
        <Input
          type="search"
          placeholder="github username"
          id="searchuser"
          name="searchuser"
          defaultValue={userName}
          required
        />
        <Button>Search</Button>
      </div>
    </form>
  );
};
```

src/components/user/UserProfile.tsx

```tsx
type UserProfileProps = {
  userName: string;
};

const UserProfile = ({ userName }: UserProfileProps) => {
  return <h1 className="text-2xl font-bold">{userName}</h1>;
};
export default UserProfile;
```

src/App.tsx

```tsx
mport { useState } from 'react';
import SearchForm from './components/form/SearchForm';
import UserProfile from './components/user/UserProfile';

const App = () => {
  const [userName, setUserName] = useState('quincylarson');

  return (
    <main className='mx-auto max-w-6xl px-8 py-20'>
      <SearchForm userName={userName} setUserName={setUserName} />
      <UserProfile userName={userName} />
    </main>
  );
};
export default App;
```
