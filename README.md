# AI Sol Agent

AI Sol Agent is an advanced Web3 chatbot template that enables natural language interactions with the Solana blockchain. Built with Next.js and integrated with LangChain and OpenAI, this template allows developers to create sophisticated blockchain applications with conversational AI capabilities.

## Features

- **Natural Language Processing:** Interact with Solana blockchain using simple English commands
- **Wallet Integration:** Secure wallet management with private key handling
- **Token Operations:** Create and manage tokens with simple chat commands
- **NFT Creation:** Mint NFTs directly through conversation
- **Balance Checking:** Query SOL balances and token information
- **Transaction Management:** Send SOL and monitor transactions
- **Real-time Updates:** Live transaction status and balance updates
- **Modern UI/UX:** Sleek interface with responsive design and animations

## Technologies Used

- **Frontend:** Next.js, React.js, TailwindCSS, Framer Motion
- **Blockchain Integration:** @solana/web3.js, solana-agent-kit
- **AI/ML:** LangChain, OpenAI
- **Styling:** TailwindCSS, Tailwind Forms
- **Development:** TypeScript, ESLint
- **Utilities:** bs58 for Base58 encoding/decoding

## Use Cases

- **DeFi Applications:** Manage Solana tokens and transactions through chat
- **NFT Platforms:** Create and manage NFT collections conversationally
- **Wallet Management:** Monitor and manage Solana wallets using natural language
- **Blockchain Education:** Learn Solana operations through interactive chat
- **Token Creation:** Launch new tokens with simple commands

## Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ai-sol-agent.git
    ```

2. Navigate to the project directory:
    ```bash
    cd ai-sol-agent
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a `.env` file in the root directory and add:
    ```env
    OPENAI_API_KEY=your_openai_api_key
    RPC_URL=your_solana_rpc_url
    SOLANA_PRIVATE_KEY=your_private_key_array
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000`

## Features in Detail

### 1. Wallet Operations
- Show wallet address
- Check SOL balance
- View transaction history

### 2. Token Management
- Create new tokens
- Check token balances
- Transfer tokens

### 3. NFT Operations
- Mint new NFTs
- View NFT collections
- Transfer NFTs

### 4. Transaction Handling
- Send SOL
- Monitor transaction status
- View transaction details

## How to Use

1. **Connect Wallet:** Input your Solana private key when prompted
2. **Start Chatting:** Use natural language to interact with the blockchain
3. **Create Tokens:** Type commands like "Create a new token" with parameters
4. **Mint NFTs:** Use "Mint NFT" command with metadata
5. **Send Transactions:** Simply type "Send X SOL to [address]"
6. **Check Balances:** Ask "What's my SOL balance?"

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue in the GitHub repository.

## Acknowledgments

- Solana Foundation for blockchain infrastructure
- OpenAI for language model support
- LangChain for AI integration capabilities
