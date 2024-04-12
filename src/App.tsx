import './App.css'
import { ConnectionContext } from "./context/wallet-context/wallet-context.tsx";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Content } from "./content/content.tsx";
import { StreamFlowContextProvider } from "./context/stream-flow-context/stream-flow-context.tsx";

function App() {
    return (
    <ConnectionContext>
      <StreamFlowContextProvider>
        <WalletMultiButton/>
        <Content/>
      </StreamFlowContextProvider>
    </ConnectionContext>
  );
}

export default App
