import { ethereumWagmiConfig } from "./utils/ethereum";
import { WagmiStrategy, WagmiStrategyOptions } from "./WagmiStrategy";

export * from "./utils/ethereum";

export class EthereumStrategy extends WagmiStrategy {
  constructor() {
    super({
      id: "ethereum",
      name: "Ethereum",
      description: "Any Ethereum browser wallet",
      theme: "0,0,0",
      logo: "4M9wYB5x1e-opn-cPEoLDt1pHP-tKMRpJ56uVGTUeog",
      wagmiConfig: ethereumWagmiConfig,
    });
  }
}

export type { WagmiStrategyOptions };
export default WagmiStrategy;
