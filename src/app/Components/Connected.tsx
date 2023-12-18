import {
  LocksmithService,
  LocksmithServiceConfiguration,
} from "@unlock-protocol/unlock-js";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useWalletClient } from "wagmi";
import { List } from "./List";

export const Connected = () => {
  const [token, setToken] = useState("");
  const { address } = useAccount();
  const { data: walletClient, isError, isLoading } = useWalletClient();

  const auth = async () => {
    if (!walletClient) {
      return;
    }
    const service = new LocksmithService();
    const siwe = LocksmithService.createSiweMessage({
      domain: "unlock-protocol.com",
      uri: "https://unlock-protocol.com",
      address,
      chainId: 13,
      version: "1",
    });

    // Get message text to be signed
    const message = siwe.prepareMessage();
    const signature = await walletClient.signMessage({
      message,
      account: address,
    });
    const loginResponse = await service.login({
      message,
      signature,
    });
    const { accessToken } = loginResponse.data;
    setToken(accessToken);
  };

  if (!token) {
    return <button onClick={() => auth()}>Authenticate with Locksmith</button>;
  }
  return <List token={token} />;
};
