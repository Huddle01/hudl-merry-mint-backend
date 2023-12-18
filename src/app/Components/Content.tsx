import { useAccount, useConnect } from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { Connected } from "./Connected";

export const Content = () => {
  const { address } = useAccount();
  const { connect, ...rest } = useConnect({
    connector: new InjectedConnector(),
  });

  if (!address) {
    return <button onClick={() => connect()}>Connect</button>;
  }
  return <Connected />;
};
