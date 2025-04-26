import { type PropsWithChildren } from "react";

import { ArweaveWalletKit as OriginalArweaveWalletKit } from "@arweave-wallet-kit/react";
import { type Config, defaultConfig } from "@arweave-wallet-kit/core/config";
import { type ThemeConfig } from "@arweave-wallet-kit/core/theme";

import WanderStrategy from "@arweave-wallet-kit/wander-strategy";
import WebWalletStrategy from "@arweave-wallet-kit/webwallet-strategy";
import OthentStrategy from "@arweave-wallet-kit/othent-strategy";
import BrowserWalletStrategy from "@arweave-wallet-kit/browser-wallet-strategy";
// import BeaconWallet from "@vela-ventures/aosync-strategy";
import { Strategy } from "@arweave-wallet-kit/core/strategy";

// Define the default strategies that will always be used
const defaultStrategies = [
  new WanderStrategy(),
  new WebWalletStrategy(),
  new OthentStrategy(),
  new BrowserWalletStrategy(),
  // This does not need to be a default strategy. Commenting it out because its breaking the build due to type errors.
  // new BeaconWallet(),
];

// Define the props for the legacy ArweaveWalletKit
interface ArweaveWalletKitProps {
  theme?: Partial<ThemeConfig>;
  config?: Config;
}

// Create the legacy ArweaveWalletKit component that uses fixed strategies
export function ArweaveWalletKit({
  children,
  theme,
  config,
}: PropsWithChildren<ArweaveWalletKitProps>) {
  // Merge the provided config with the default config and fixed strategies
  const mergedConfig: Config = {
    ...defaultConfig,
    ...config,
    strategies: defaultStrategies,
  };

  return (
    <OriginalArweaveWalletKit theme={theme} config={mergedConfig}>
      {children}
    </OriginalArweaveWalletKit>
  );
}

// Re-export the ArweaveWalletKit as default
export default ArweaveWalletKit;
