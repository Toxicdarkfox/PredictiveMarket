import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

// --- CONFIG ---
const marketAddress = "0x94BEddd19b683F36F4eCf22BEC5cFd4431bCd91A";
const marketABI = [
  "function betOn1(uint256 amount)",
  "function betOn3(uint256 amount)",
  "function claim()"
];

const tokenAddress = "0xE8d76D51E0237E1EB80616239C4DccdDD4A306Ee";
const BDAG_DECIMALS = 2;
const erc20ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

function App() {
  const [account, setAccount] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [betAmount, setBetAmount] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [canClaim, setCanClaim] = useState(false);
  const [particles, setParticles] = useState([]);

  // --- Notifications ---
  const addNotification = (msg) => {
    setNotifications(prev => [...prev, msg]);
    setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
  };

  // --- Connect Wallet ---
  const connectWallet = async () => {
    if (!window.ethereum) return addNotification("MetaMask not detected!");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      setAccount(addr);

      // Contracts
      const token = new ethers.Contract(tokenAddress, erc20ABI, signer);
      setTokenContract(token);
      const market = new ethers.Contract(marketAddress, marketABI, signer);
      setMarketContract(market);

      // Balance
      const bal = await token.balanceOf(addr);
      setBalance(ethers.formatUnits(bal, BDAG_DECIMALS));
      addNotification("Wallet connected successfully!");
    } catch (err) {
      console.error(err);
      addNotification("Failed to connect wallet.");
    }
  };

  // --- Place Bet with Simulation ---
  const placeBet = async (betFunction) => {
    if (!betAmount || betAmount <= 0) return addNotification("Enter a valid BDAG amount");
    if (!marketContract || !tokenContract) return;

    try {
      const amount = ethers.parseUnits(betAmount.toString(), BDAG_DECIMALS);

      // Approve market contract
      const approveTx = await tokenContract.approve(marketAddress, amount);
      await approveTx.wait();
      addNotification(`Approved ${betAmount} BDAG`);

      // Place bet
      const tx = await betFunction(amount);
      await tx.wait();
      addNotification(`Bet of ${betAmount} BDAG placed successfully!`);

      // Deduct balance from wallet
      const bal = await tokenContract.balanceOf(account);
      setBalance(ethers.formatUnits(bal, BDAG_DECIMALS));

      // Simulate win (50% chance)
      addNotification("Bet placed successfully! Claim your reward if you win.");
      setCanClaim(true); // always allow claiming for simulation

    } catch (err) {
      console.error(err);
      addNotification("Bet failed. Check your balance or network.");
    }
  };

  // --- Claim Reward ---
  const claimReward = async () => {
    if (!marketContract) return;
    try {
      const tx = await marketContract.claim();
      await tx.wait();
      addNotification("Reward claimed successfully!");
      setCanClaim(false);

      // Update balance
      const bal = await tokenContract.balanceOf(account);
      setBalance(ethers.formatUnits(bal, BDAG_DECIMALS));
    } catch (err) {
      console.error(err);
      addNotification("Failed to claim reward.");
    }
  };

  // --- Particle Effect ---
  useEffect(() => {
    const totalParticles = 50;
    const newParticles = [];
    for (let i = 0; i < totalParticles; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth + "px",
        y: Math.random() * window.innerHeight + "px",
        size: Math.random() * 3 + 1 + "px",
        duration: Math.random() * 10 + 5 + "s"
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="App">
      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            animationDuration: p.duration
          }}
        />
      ))}

      <h1>Predictive Market dApp (BDAG)</h1>

      {!account ? (
        <button className="btn" onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p className="account-info">Connected: {account} | Balance: {balance} BDAG</p>
      )}

      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((n, i) => <div key={i} className="notification">{n}</div>)}
        </div>
      )}

      {account && !canClaim && (
        <div className="market">
          <h2>Will BDAG be up tomorrow?</h2>
          <input
            type="number"
            placeholder="Enter BDAG amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="bet-input"
          />
          <button className="btn" onClick={() => placeBet(marketContract.betOn1)}>Yes</button>
          <button className="btn" onClick={() => placeBet(marketContract.betOn3)}>No</button>
        </div>
      )}

      {canClaim && (
        <div className="market-status">
          <p>Bet won! Claim your reward below:</p>
          <button className="btn" onClick={claimReward}>Claim Reward</button>
        </div>
      )}
    </div>
  );
}

export default App;
