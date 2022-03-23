import { useState } from 'react';
import './App.css';
import {
  Container,
  Button,
  Center,
  Input,
  Text,
  Accordion,
  Group,
} from '@mantine/core';

import { ethers } from "ethers";

// const PROVIDER_URL = process.env.REACT_APP_PROVIDER_URL;
const ETHER_SCAN_API = process.env.REACT_APP_ETHER_SCAN_API;
const contractAddress = "0xB41C7d4a75D58a5Ae88533D76999a106916D20eb";
const contractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "holder",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

function App() {

  const [account, setAccount] = useState("undefined");

  async function connectEthers() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    const [account] = await provider.send("eth_requestAccounts", []);

    setAccount(account);
  }
  // eslint-disable-next-line
  async function connectMetamask() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account);
      setAccount(account);
    }
  }
  async function getBalance() {
    // const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const provider = new ethers.providers.EtherscanProvider("rinkeby", ETHER_SCAN_API);
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    // console.log(await provider.getBlockNumber());
    console.log((await contract.balanceOf(account)).toString());
  }

  return (
    <div className="App">
    <Center>
      <Container>
      { ( account === "undefined" )?
        ( <Group direction="column" grow>
          <Button
          variant="gradient" gradient={{ from: 'orange', to: 'red' }}
          onClick={connectEthers}>Connect Metamask</Button>
        </Group>
      ):(
      <Group direction="column" grow>
        <Text>Connected Account: {account}</Text>
        <Button variant="outline"
          color="red"
         onClick={() => setAccount("undefined")}>Disconnect</Button>
      </Group>
    )}
      </Container>
    </Center>

    {( account !== "undefined" ) &&
      ( <Accordion>
        <Accordion.Item label="Balance">
        <Group direction="column" grow>
          <Input placeholder="address"/>
          <Button variant="outline" onClick={getBalance}>Get balance</Button>
          </Group>
        </Accordion.Item>
        <Accordion.Item label="Transfer">
        <Group direction="column" grow>
          <Input placeholder="address ex.: 0x00112233445566778899aabbccddeeff"/>
          <Input placeholder="amount"/>
          <Button variant="outline">Send</Button>
        </Group>
        </Accordion.Item>
      </Accordion> )
    }
    </div>
  );
}

export default App;
