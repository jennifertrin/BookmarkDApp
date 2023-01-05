import Dashboard from "../components/Dashboard";
import Signup from "../components/Signup";
import WalletButtons from "../components/WalletButtons";
import { useWallet } from "@wallet01/react";

export default function Home() {
  const { isConnected, address } = useWallet();

  return (
    <div className="flex h-screen w-screen">
      {!isConnected ? (
        <div className="flex flex-row align-middle mx-auto">
          <Signup />
          <WalletButtons />
        </div>
      ) : (
        <Dashboard name={address} />
      )}
    </div>
  );
}
