import Web3 from "web3";
import Web3Modal from "web3modal";
// react
import { useState } from 'react';
// ui
import { Button } from "@mantine/core";

function component(){
  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });
  // const provider = await web3Modal.connect();
  // const web3 = new Web3(provider);
  const [provider, setProvider] = useState("");

  return (
    <Button variant="default">Connect wallet</Button>
  );
}

export default component;
