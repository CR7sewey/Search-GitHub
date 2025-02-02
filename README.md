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

## Search Form

```tsx
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Console } from "console";

type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  const { toast } = useToast();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const dataConverted = Object.fromEntries(data);
    if (
      dataConverted[0] === undefined ||
      dataConverted[0].toString().trim() === ""
    ) {
      console.log("UIIII");
      toast({ description: "Please introduce a username..." });
      return;
    }

    setUserName(data.get("searchuser") as string);
  };

  return (
    <form
      className="flex items-center gap-x-2 w-full lg:w-1/3 mb-8"
      onSubmit={handleSearch}
    >
      <Label htmlFor="searchuser" className="sr-only">
        Username
      </Label>

      <Input
        type="search"
        placeholder="github username"
        id="searchuser"
        name="searchuser"
        defaultValue={userName}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
```

## Shadcn Toast

main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import Toaster component
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
```

src/components/form/SearchForm.tsx

```tsx
import { useToast } from "@/hooks/use-toast";

const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  const { toast } = useToast();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === "") {
      toast({
        description: "Please enter a valid username",
      });
      return;
    }
    setUserName(text);
  };

  return <form>...</form>;
};
export default SearchForm;
```

## Graphql

GraphQL is a modern query language and runtime for APIs that allows clients to request specific data they need and nothing more. Unlike traditional REST APIs where you get fixed data from multiple endpoints, GraphQL provides a single endpoint where you can specify exactly what data you want to receive.

- **Schema**: The blueprint that defines all available data types and operations in your API
- **Query**: A request to read or fetch data (similar to GET in REST)
- **Mutation**: A request to create, update, or delete data (similar to POST/PUT/DELETE in REST)
- **Fields**: The individual pieces of data you can request (like user.name or post.title)
- **Arguments**: Parameters you can pass to fields to filter or modify the results (like limit: 10)
- **Types**: The different kinds of data objects available (like User, Post, Comment)
- **Nodes**: Objects in a GraphQL schema that have a unique identifier, typically representing entities in your data model (like a specific user or post)

[Practice API's](https://www.apollographql.com/blog/8-free-to-use-graphql-apis-for-your-projects-and-demos)

## Github GraphQL Explorer

[Github GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)

## Github Personal Access Token

[Github](https://github.com/)

- profile
- settings
- developer settings
- personal access token
- generate new token
- create .env.local file
- add token to .env.local file

.env.local

```
VITE_GITHUB_TOKEN=YOUR_TOKEN_HERE
```

## Apollo Client

Apollo Client is a comprehensive state management library for JavaScript applications that helps you manage both local and remote data with GraphQL. It makes it easy to fetch, cache, and modify application data while automatically handling important concerns like tracking loading and error states. The library integrates especially well with React applications and provides features like automatic caching, optimistic UI updates, and error handling out of the box.

[Apollo Client](https://www.apollographql.com/docs/react/get-started/)

```bash
npm install @apollo/client graphql
```

- src/apolloClient.ts

```ts
// Core Apollo Client imports for GraphQL functionality
// ApolloClient: Main client class for making GraphQL requests
// InMemoryCache: Caching solution for storing query results
// HttpLink: Configures HTTP connection to GraphQL endpoint
// ApolloLink: Enables creation of middleware chain for request/response handling
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// Error handling middleware for Apollo Client
// Provides detailed error information for both GraphQL and network errors
import { onError } from "@apollo/client/link/error";

// GitHub GraphQL API endpoint
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// Configure error handling middleware
// This will intercept and log any GraphQL or network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Handle GraphQL-specific errors (e.g., validation, resolver errors)
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  // Handle network-level errors (e.g., connection issues)
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Configure HTTP connection to GitHub's GraphQL API
// Including authentication token from environment variables
const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // GitHub Personal Access Token
  },
});

// Create the Apollo Link chain
// Order matters: errorLink will run before httpLink
const link = ApolloLink.from([errorLink, httpLink]);

// Initialize Apollo Client with:
// - Configured link chain for network requests
// - In-memory cache for storing query results
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
```

src/main.tsx

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
// Apollo Provider
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>
);
```

## Query and Type

src/queries.ts

```ts
import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      bio
      url
      repositories(first: 100) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          url
          languages(first: 5) {
            edges {
              node {
                name
              }
              size
            }
          }
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      gists {
        totalCount
      }
    }
  }
`;
```

src/types.ts

```ts
export type LanguageEdge = {
  node: {
    name: string;
  };
  size: number;
};

export type Repository = {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
  languages: {
    edges: LanguageEdge[];
  };
};

export type User = {
  name: string;
  avatarUrl: string;
  bio: string;
  url: string;
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
};
export type UserData = {
  user: User;
};
```
