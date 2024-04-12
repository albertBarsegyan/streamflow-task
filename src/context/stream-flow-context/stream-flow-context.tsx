import { createContext, PropsWithChildren, useContext } from "react";
import {
  getBN,
  StreamflowSolana,
  ICreateStreamData
} from "@streamflow/stream";
import { BN } from "@streamflow/stream/solana";

const solanaClient = new StreamflowSolana.SolanaStreamClient(
  "https://api.mainnet-beta.solana.com"
);

const StreamFlowContext = createContext({
  solanaClient:solanaClient,
  createStream: ()=> {}
})

const createStreamParams: ICreateStreamData = {
  recipient: "4ih00075bKjVg000000tLdk4w42NyG3Mv0000dc0M00", // Recipient address.
  tokenId: "DNw99999M7e24g99999999WJirKeZ5fQc6KY999999gK", // Token mint address.
  start: 1643363040, // Timestamp (in seconds) when the stream/token vesting starts.
  amount: getBN(100, 9), // depositing 100 tokens with 9 decimals mint.
  period: 1, // Time step (period) in seconds per which the unlocking occurs.
  cliff: 1643363160, // Vesting contract "cliff" timestamp in seconds.
  cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
  amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
  name: "Transfer to Jane Doe.", // The stream name or subject.
  canTopup: false, // setting to FALSE will effectively create a vesting contract.
  cancelableBySender: true, // Whether or not sender can cancel the stream.
  cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
  transferableBySender: true, // Whether or not sender can transfer the stream.
  transferableByRecipient: false, // Whether or not recipient can transfer the stream.
  automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
  withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
  partner: undefined, //  (optional) Partner's wallet address (string | null).
};
export function StreamFlowContextProvider({children}:PropsWithChildren) {


  const createStream = async ({wallet}:{wallet:any})=> {
    try {
      const transactionData = await solanaClient.create(createStreamParams, {sender:wallet,isNative:false}); // second argument differ depending on a chain
      console.log({transactionData})
      return transactionData
    } catch (exception) {
     alert('error when create transaction')
    }
  }

  return (
    <StreamFlowContext.Provider value={{solanaClient,createStream}}>
      {children}
    </StreamFlowContext.Provider>
  );
}

export const useStreamFlow = () => useContext(StreamFlowContext)
