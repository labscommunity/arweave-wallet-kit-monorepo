# Arweave Wallet Kit

## Intro

Hooks and Components for unified interaction with Arweave wallets

The Arweave Wallet Kit simplifies interactions between Arweave wallets and dApps, offering a unified API that supports any Arweave wallet. Users can easily interact with apps using their preferred wallet.

The Kit is divided into multiple packages for modularity and extensibility:

- A core package that is foundation for all functionality.
- A set of React hooks and components built on the core package.
- A styles package that complements the React hooks and components.

Support for other frameworks can be developed using the core package.

The support for various wallets is modular as well. It is broken down into “strategies”, with each having its own package.

### Terminology

In Arweave Wallet Kit, a _strategy_ is an implementation of an Arweave wallet within the kit. These strategies allow the user to communicate with all wallets in a standard way and with a common API.

### Supported wallets

The library currently supports the following wallets:

- [Wander.app](https://wander.app)
- [Arweave.app](https://arweave.app)
- [Othent](https://othent.io)
- General Browser Wallets

## Setup

Example Setup for Arweave Wallet Kit in React applications

Arweave Wallet Kit utility is distributed across a few packages for modularity.

The three main packages for using Arweave Wallet Kit with React apps are `@arweave-wallet-kit/core`, `@arweave-wallet-kit/react`, `@arweave-wallet-kit/styles`.
The core and styles package are peer dependencies for the the `react` package.

Alongside these, the strategies for each wallet have their own dedicated packages as well:

- `@arweave-wallet-kit/wander-strategy`
- `@arweave-wallet-kit/browser-wallet-strategy`
- `@arweave-wallet-kit/othent-strategy`
- `@arweave-wallet-kit/webwallet-strategy`

You can configure one or more strategies depending on the wallets you wish to add support for.

> ℹ️ **Note**: Currently, Arweave Wallet Kit works out of the box with ReactJS and Vite applications. Support for NextJS is in the works.

## Installation

Wallet Kit can be installed with any of the popular package managers: `npm`, `yarn`, `pnpm` or `bun`.

A simple example using `pnpm` using all the strategis would be:

```bash
pnpm add @arweave-wallet-kit/core \
         @arweave-wallet-kit/styles \
         @arweave-wallet-kit/react \
         @arweave-wallet-kit/wander-strategy \
         @arweave-wallet-kit/webwallet-strategy \
         @arweave-wallet-kit/othent-strategy \
         @arweave-wallet-kit/browser-wallet-strategy
```

### Setting Up the Provider

To use the library, you need to wrap your application with the Kit Provider. Here's a simple way of using in a React Vite app:

```typescript
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";
import WanderStrategy from "@arweave-wallet-kit/wander-strategy";
import OthentStrategy from "@arweave-wallet-kit/othent-strategy";
import BrowserWalletStrategy from "@arweave-wallet-kit/browser-wallet-strategy";
import WebWalletStrategy from "@arweave-wallet-kit/webwallet-strategy";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "ACCESS_PUBLIC_KEY",
          "SIGN_TRANSACTION",
          "DISPATCH",
        ],
        ensurePermissions: true,
        strategies: [
          new WanderStrategy(),
          new OthentStrategy(),
          new BrowserWalletStrategy(),
          new WebWalletStrategy(),
        ],
      }}
    >
      <App />
    </ArweaveWalletKit>
  </React.StrictMode>
);
```

In the example above, the application is wrapped with the Arweave Wallet Kit Provider, passing it a config object as parameter with the desired wallet strategies and permissions based on the application requirements.

Once the provider is setup, you can either use the Wallet Kit’s functionality through its custom components or hooks.

## Extending functionality or adding a wallet

If your wallet implements the common `arweaveWallet` API that wallets like `Wander` and `Arweave.app` inject by default, the regular `browser-wallet-strategy` should work out of the box.

In order to add another wallet that is not in this list, you need to have a package that implements the abstract class [`Strategy.ts`](https://github.com/labscommunity/arweave-wallet-kit-monorepo/blob/main/packages/wallet-kit-core/src/strategy/Strategy.ts) to interface between the kit and the corresponding wallet.
