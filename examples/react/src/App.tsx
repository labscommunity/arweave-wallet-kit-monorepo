import {
  useConnection,
  useActiveAddress,
  useApi,
} from "@arweave-wallet-kit/react";

import "./App.css";
import { useEffect, useState } from "react";
import Arweave from "arweave";
import { spawn } from "@permaweb/aoconnect";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

function App() {
  const [balance, setBalance] = useState(0);
  const { connect, connected, disconnect } = useConnection();
  const activeAddress = useActiveAddress();
  const strat = useApi();

  useEffect(() => {
    if (activeAddress) {
      arweave.wallets.getBalance(activeAddress).then((balance) => {
        setBalance(+balance);
      });
    }
  }, [activeAddress]);

  if (connected && activeAddress) {
    return (
      <div className="min-h-screen w-screen bg-slate-50 font-['Inter'] flex items-center justify-center">
        <div
          id="second-frame"
          className="flex items-center justify-center min-h-screen p-4"
        >
          <div className="w-full max-w-md p-8 rounded-2xl shadow-xl glass-effect">
            <div className="text-center">
              <i className="bi bi-check-circle-fill text-5xl text-green-500 mb-8"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-4">
                Wallet Connected
              </h2>
              <p className="text-gray-600 mb-6">
                Your wallet has been successfully connected to our platform.
              </p>
              <div className="space-y-4 mb-6 w-full">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-semibold">
                    Address
                  </p>
                  <p className="font-mono text-sm break-all bg-gray-50 p-2 rounded-lg">
                    {activeAddress}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 font-semibold">
                    Balance
                  </p>
                  <p className="font-semibold text-lg">
                    {balance ? (balance / 10 ** 12).toFixed(2) : "0.00"} AR
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={disconnect}
                  className="py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Disconnect
                </button>
                <button
                  onClick={async () => {
                    const processId = await spawn({
                      module: "pb4fCvdJqwT-_bn38ERMdqnOF4weRMjoJ6bY6yfl4a8",
                      scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
                      signer: (await strat?.createDataItemSigner()) as any,
                    });
                    alert("spawned process with id " + processId);
                  }}
                >
                  spawn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-slate-50 font-['Inter'] flex items-center justify-center">
      <div className="flex items-center justify-center p-4 h-full w-full">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl gradient-bg">
          <div className="text-center">
            <i className="bi bi-wallet2 text-5xl text-white mb-4"></i>
            <h1 className="text-2xl font-bold text-white mb-6">
              Connect Your Wallet
            </h1>
            <button
              onClick={connected ? disconnect : connect}
              className="w-full py-3 px-6 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
