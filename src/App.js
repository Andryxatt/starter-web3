import React, { useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";

export default function App() {
  const [greeting, addGreeting] = React.useState("");
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      fetchGreetings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGreetings = async () => {
    let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      provider
    );

    const greeting = await contract.greet();
    addGreeting(greeting);
    console.log(greeting);
    
  };
  
  useEffect(() => {
    connectWallet();
  }, []);

  return <div>
      <h2>{greeting}</h2>
  </div>;
}
