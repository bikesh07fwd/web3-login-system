import { useState } from "react";
import { ethers } from "ethers";

export default function Login() {
  const [wallet, setWallet] = useState(null);

  async function loginWithWallet() {
    if (!window.ethereum) return alert("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const message = `Sign in to Web3 Login as ${address}`;
    const signature = await signer.signMessage(message);

    // Send to backend
    const res = await fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, message, signature }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setWallet(address);
    } else {
      alert("Login failed");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("walletAddress");
    setWallet(null);
  }

  return (
    <div className="p-6">
      <button
        className="bg-black text-white px-4 py-2 rounded mr-7"
        onClick={loginWithWallet}
      >
        Login with Wallet
      </button>
      {wallet && <p>Logged in as: {wallet}</p>}

      <button onClick={logout}>Logout</button>
    </div>
  );
}
