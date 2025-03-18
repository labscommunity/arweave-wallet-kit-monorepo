# Arweave Wallet Kit (Legacy)

This package replaces the legacy `arweave-wallet-kit` by using the new modular version
adding all the strategies known in existence at the time of writing this document.

## Installation

```bash
npm install arweave-wallet-kit
# or
yarn add arweave-wallet-kit
# or
pnpm add arweave-wallet-kit
```

## Usage

```jsx
import { ArweaveWalletKit } from "arweave-wallet-kit";

function App() {
  return (
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "SIGN_TRANSACTION",
          "ACCESS_PUBLIC_KEY",
        ],
        ensurePermissions: true,
        appInfo: {
          name: "Test App",
          logo: "https://arweave.net/tQUcL4wlNj_NED2VjUGUhfCTJ6pDN9P0e3CbnHo3vUE",
        },
      }}
      theme={{
        displayTheme: "light",
      }}
    >
      <YourApp />
    </ArweaveWalletKit>
  );
}
```

## Features

- Simplified API that matches the original Arweave Wallet Kit
- Pre-configured with all available wallet strategies:
  - [Wander](https://wander.app)
  - [Arweave.app](https://arweave.app)
  - [Othent](https://othent.io)
  - [Beacon Wallet](https://beaconwallet.app)
  - Browser-Wallet: Any extension-based Arweave wallet, that injects it's Wander-like API into `window.arweaveWallet`
- Fully compatible with the original Arweave Wallet Kit API

## Configuration

The `ArweaveWalletKit` component accepts the following props:

- `config`: Configuration options for the wallet kit (excluding strategies, which are pre-configured)
- `theme`: Theme configuration for the wallet kit UI

For more details, refer to the [Arweave Wallet Kit documentation](https://docs.arweavekit.com/arweave-wallet-kit/introduction).
