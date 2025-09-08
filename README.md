BDAG Predictive Market dApp 

A simple decentralized application (dApp) built with React and Ethers.js, allowing users to predict whether the BDAG token will go up tomorrow. Users can place bets using their BDAG tokens, and winners can claim rewards. 

This project includes wallet connection, bet placement, balance deduction, and claim rewards functionality, with a simulation for bet outcomes. 

 

Features 

    Connect Wallet: Connect to MetaMask and display your BDAG balance. 

    Place Bets: Bet a specific amount of BDAG on a yes/no outcome. 

    Instant Balance Deduction: Deducts the bet amount immediately from your balance. 

    Claim Rewards: Claim rewards if your bet wins. 

    Notifications: Real-time notifications for wallet connection, bet placement, and claim events. 

    Simulation: Randomly determines bet outcome for demo purposes. 

 

Tech Stack 

    React – Frontend framework 

    Ethers.js – Interact with Ethereum blockchain and BDAG token 

    MetaMask – Wallet provider 

    CSS – Styling the UI 

  

Installation 

    Clone the repository: 

git clone https://github.com/yourusername/bdag-predictive-dapp.git 
cd bdag-predictive-dapp 
  

    Install dependencies: 

npm install 
  

    Start the development server: 

npm start 
  

    Open http://localhost:3000 in your browser. 

 

Configuration 

    Market Contract: 

    Address: 0x94BEddd19b683F36F4eCf22BEC5cFd4431bCd91A 

    ABI: Included in App.js 

    BDAG Token Contract:0xE8d76D51E0237E1EB80616239C4DccdDD4A306Ee 

 

Usage 

    Open the dApp and click Connect Wallet. 

    Enter the amount of BDAG you want to bet. 

    Click Yes or No to place your bet. 

    If you win, a Claim Reward button will appear. 

    Click Claim Reward to receive your winnings. 

 

Notes 

    The bet outcome is currently simulated for demo purposes. 

    The balance deduction occurs immediately after placing a bet for UX purposes. 

    Ensure MetaMask is connected to the correct network supporting BDAG tokens. 

 

License 

This project is licensed under the MIT License. 

 

Author 

CYBERNETIC BOTS – hamzamarke2020@gmail.com 

 
