import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import NetworkBadge from './NetworkBadge';
import bs58 from 'bs58';
import { HiKey } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

interface PrivateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (privateKey: string) => void;
}

const EXAMPLE_QUERIES = [
  'Show wallet address',
  'SOL balance',
  'SOL price',
  'Create NFT',
  'Stake SOL',
  'Send SOL',
  'Create Token'
];

const QUERY_TEMPLATES: { [key: string]: string } = {
  'Create NFT': `Please mint me an new  NFT  collection
Token Name: Meta_School
Token Symbol: Meta
Metadata URI: https://scarlet-fancy-minnow-617.mypinata.cloud/ipfs/bafkreif43sp62yuy3sznrvqesk23tfnhpdck4npqowdwrhrzhsrgf5ao2e`,
  'Send SOL': `Send 0.0001 SOL to wallet address: YOUR_WALLET_ADDRESS`,
  'Stake SOL': `Please stake 5 SOL to validator address: YOUR_VALIDATOR_ADDRESS`,
  'Create Token': `Create a fungible token with:
Name: Metaschool
Symbol: Meta
Total Supply: 1000000`
};

const PrivateKeyModal = ({ isOpen, onClose, onSubmit }: PrivateKeyModalProps) => {
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      // Validate if it's a valid base58 private key
      const decoded = bs58.decode(privateKey);
      if (decoded.length !== 64) {
        setError('Invalid private key length. Please provide a valid Solana private key.');
        return;
      }
      
      // Convert to array format
      const privateKeyArray = Array.from(decoded);
      onSubmit(JSON.stringify(privateKeyArray));
      onClose();
    } catch (err) {
      setError('Invalid private key format. Please provide a valid base58 encoded private key.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <HiKey className="w-8 h-8 text-blue-500" />
          </motion.div>
          <h2 className="text-xl font-semibold">Enter Your Private Key</h2>
        </div>
        <p className="text-slate-400 text-sm mb-4">
          Please enter your Solana private key in base58 format (from Phantom or other wallets).
          Your key will be stored securely in the app state.
        </p>
        <textarea
          value={privateKey}
          onChange={(e) => {
            setPrivateKey(e.target.value);
            setError('');
          }}
          placeholder="Enter your private key here..."
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 focus:outline-none min-h-[80px] resize-none mb-2"
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Connect
          </button>
        </div>
      </motion.div>
    </div>
  );
};

interface ResponseData {
  status: string;
  balance?: number;
  wallet?: string;
  token?: string;
  tokenId?: string;
  priceInUSDC?: string;
  mintAddress?: string;
  message?: string;
  decimals?: number;
}

const parseResponse = (content: string): { 
  jsonData: ResponseData | null;
  cleanText: string;
} => {
  try {
    // Extract JSON data if present
    const jsonMatch = content.match(/\{[^}]+\}/);
    const jsonData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    // Clean the text content
    let cleanText = content
      .replace(/\{[^}]+\}/g, '') // Remove JSON
      .replace(/^(Error:|Failed:|Unable to:)\s*/i, '') // Remove error prefixes
      .replace(/^(I will use|Let me use|I'll use|Let's use)[^.]+(to|and)[^.]+\./i, '') // Remove process text
      .replace(/^(Let's proceed with|I will proceed to|Let me proceed)[^.]+\./i, '') // Remove procedural text
      .replace(/\s+/g, ' ') // Clean up spaces
      .trim();

    return { jsonData, cleanText };
  } catch (error) {
    console.error('Error parsing response:', error);
    return { jsonData: null, cleanText: content.trim() };
  }
};

const formatNumber = (num: number | string, decimals: number = 2): string => {
  const value = typeof num === 'string' ? parseFloat(num) : num;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

const ExplorerLink = ({ type, address }: { type: 'address' | 'tx'; address: string }) => {
  const network = 'devnet' as const;
  const baseUrl = `https://explorer.solana.com/${type}/${address}`;
  const url = `${baseUrl}?cluster=${network}`;
  
  const tooltipText = type === 'tx' ? 'View Transaction' : 'View on Explorer';
  const icon = type === 'tx' ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-md text-sm transition-colors"
      title={tooltipText}
    >
      {icon}
      <span className="hidden sm:inline">{tooltipText}</span>
    </a>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5M8 16l-3 3 3 3" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      )}
    </button>
  );
};

const BalanceDisplay = ({ balance, wallet }: { balance: number; wallet: string }) => {
  const [usdValue, setUsdValue] = useState<string>("0");

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: 'SOL price' }),
        });
        const data = await response.json();
        if (data.status === 'success' && data.priceInUSDC) {
          const price = parseFloat(data.priceInUSDC);
          const value = (balance * price).toFixed(2);
          setUsdValue(value);
        }
      } catch (error) {
        console.error('Error fetching SOL price:', error);
      }
    };

    fetchSolPrice();
  }, [balance]);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl font-bold text-white">{formatNumber(balance, 4)}</span>
        <span className="text-lg text-slate-400">SOL</span>
      </div>
      <div className="text-sm text-slate-400 mb-2">Wallet Address</div>
      <div className="flex items-center justify-between">
        <div className="font-mono text-sm text-white">{wallet}</div>
        <div className="flex items-center gap-2">
          <CopyButton text={wallet} />
          <ExplorerLink type="address" address={wallet} />
        </div>
      </div>
    </div>
  );
};

const PriceDisplay = ({ price, tokenId }: { price: string; tokenId: string }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <span className="text-3xl font-bold text-white">${formatNumber(price, 2)}</span>
        <div className="text-sm text-slate-400 mt-1">per SOL</div>
      </div>
      <div className="flex items-center gap-2">
        <ExplorerLink type="address" address={tokenId} />
      </div>
    </div>
  </div>
);

const TokenCreationCard = ({ name, symbol, supply, mintAddress }: {
  name: string;
  symbol: string;
  supply: string;
  mintAddress: string;
}) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-800/50 rounded-lg p-4">
        <div className="text-sm text-slate-400 mb-1">Name</div>
        <div className="font-medium text-white">{name}</div>
      </div>
      <div className="bg-slate-800/50 rounded-lg p-4">
        <div className="text-sm text-slate-400 mb-1">Symbol</div>
        <div className="font-medium text-white">{symbol}</div>
      </div>
      <div className="bg-slate-800/50 rounded-lg p-4">
        <div className="text-sm text-slate-400 mb-1">Total Supply</div>
        <div className="font-medium text-white">
          {parseInt(supply).toLocaleString()}
        </div>
      </div>
    </div>
    <div className="bg-slate-800/50 rounded-lg p-4">
      <div className="text-sm text-slate-400 mb-2">Mint Address</div>
      <div className="flex items-center justify-between">
        <div className="font-mono text-sm text-white">{mintAddress}</div>
        <div className="flex items-center gap-2">
          <CopyButton text={mintAddress} />
          <ExplorerLink type="address" address={mintAddress} />
        </div>
      </div>
    </div>
  </div>
);

const formatMessage = (content: string, privateKey: string | null) => {
  try {
    const { jsonData, cleanText } = parseResponse(content);

    // Handle token creation response
    if (cleanText.includes('token') && cleanText.includes('successfully deployed')) {
      const mintAddress = jsonData?.mintAddress || cleanText.match(/address is ([a-zA-Z0-9]+)/)?.[1];
      const nameMatch = cleanText.match(/token "([^"]+)"/);
      const symbolMatch = cleanText.match(/symbol "([^"]+)"/);
      const supplyMatch = cleanText.match(/supply of ([\d,]+)/);

      if (mintAddress && nameMatch && symbolMatch && supplyMatch) {
        return (
          <TokenCreationCard
            name={nameMatch[1]}
            symbol={symbolMatch[1]}
            supply={supplyMatch[1].replace(/,/g, '')}
            mintAddress={mintAddress}
          />
        );
      }
    }

    // Handle SOL balance response
    if (jsonData?.balance && jsonData?.wallet) {
      return <BalanceDisplay balance={jsonData.balance} wallet={jsonData.wallet} />;
    }

    // Handle SOL price response
    if (jsonData?.priceInUSDC && jsonData?.tokenId) {
      return <PriceDisplay price={jsonData.priceInUSDC} tokenId={jsonData.tokenId} />;
    }

    // Handle transaction response
    if (cleanText.toLowerCase().includes('transaction') || cleanText.toLowerCase().includes('signature')) {
      return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="text-slate-200 mb-4">
            <AddressText text={cleanText} />
          </div>
        </div>
      );
    }

    // Handle wallet address response
    if (cleanText.toLowerCase().includes('wallet address')) {
      // Extract address using a more specific regex that looks for exactly 32-44 character addresses
      // and handles cases where text might be attached to the address
      const addressMatch = cleanText.match(/([1-9A-HJ-NP-Za-km-z]{32,44})(?:Your|[^1-9A-HJ-NP-Za-km-z]|$)/);
      const address = addressMatch?.[1];
      
      if (address) {
        return (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="text-sm text-slate-400 mb-2">Wallet Address</div>
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm text-white">{address}</div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <CopyButton text={address} />
                <ExplorerLink type="address" address={address} />
              </div>
            </div>
            <div className="text-sm text-slate-400">
              Use this address to receive tokens and NFTs on Solana
            </div>
          </div>
        );
      }
    }

    // Handle error responses
    if (jsonData?.status === 'error') {
      return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300">
          {jsonData.message || 'An error occurred. Please try again.'}
        </div>
      );
    }

    // Default text message formatting with address detection
    return (
      <div className="text-slate-200 leading-relaxed">
        <AddressText text={cleanText} />
      </div>
    );
  } catch (error) {
    console.error('Error formatting message:', error);
    return (
      <div className="text-slate-200">
        <AddressText text={content.replace(/\{[^}]+\}/g, '').trim()} />
      </div>
    );
  }
};

const AddressText = ({ text }: { text: string }) => {
  // Helper function to normalize base58 strings by removing whitespace
  const normalizeBase58 = (str: string) => {
    return str.replace(/\s+/g, '');
  };

  // Helper function to truncate address display
  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // First clean up the text while preserving important whitespace
  let cleanedText = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/\*\*/g, '') // Remove markdown bold syntax
    .replace(/\s*\.\s*$/g, ''); // Remove trailing periods with spaces

  // Find and extract the complete transaction ID - handle both JSON and text format
  let transactionId = null;
  
  // Try to parse JSON first
  try {
    const jsonMatch = text.match(/\{[^}]+\}/);
    if (jsonMatch) {
      const jsonData = JSON.parse(jsonMatch[0]);
      if (jsonData.transaction) {
        transactionId = normalizeBase58(jsonData.transaction);
      }
    }
  } catch (e) {
    // If JSON parsing fails, try text-based extraction
  }

  // If no transaction ID found in JSON, try text-based extraction
  if (!transactionId) {
    const txMatch = cleanedText.match(/Transaction(?:\s+ID)?:?\s*([\s1-9A-HJ-NP-Za-km-z]{88,176})/i);
    if (txMatch) {
      transactionId = normalizeBase58(txMatch[1]);
    }
  }

  if (transactionId) {
    // Remove the transaction ID and related text from the content
    cleanedText = cleanedText
      .replace(new RegExp(transactionId.split('').join('\\s*'), 'g'), '') // Remove full transaction ID with possible spaces
      .replace(/\s*Transaction(?:\s+ID)?:?\s*\.?\s*$/i, '') // Remove trailing "Transaction:" text and optional period
      .replace(/\s+/g, ' ') // Clean up extra whitespace
      .trim();

    // Add the transaction section
    const transactionSection = (
      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
        <div className="text-sm text-slate-400 mb-2">Transaction ID</div>
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm text-white overflow-hidden text-ellipsis">
            {truncateAddress(transactionId)}
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <CopyButton text={transactionId} />
            <ExplorerLink type="tx" address={transactionId} />
          </div>
        </div>
      </div>
    );

    // Now handle the remaining text with addresses
    const addressRegex = /([1-9A-HJ-NP-Za-km-z]{32,44})/g;
    const parts = cleanedText.split(addressRegex);

    return (
      <div>
        <span className="whitespace-pre-wrap">
          {parts.map((part, i) => {
            if (part.match(addressRegex)) {
              return (
                <span key={i} className="inline-flex items-center gap-1">
                  <span className="font-mono">{truncateAddress(part)}</span>
                  <span className="inline-flex gap-1">
                    <CopyButton text={part} />
                    <ExplorerLink type="address" address={part} />
                  </span>
                </span>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
        {transactionSection}
      </div>
    );
  }

  // If no transaction ID, just handle addresses
  const addressRegex = /([1-9A-HJ-NP-Za-km-z]{32,44})/g;
  const parts = cleanedText.split(addressRegex);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.match(addressRegex)) {
          return (
            <span key={i} className="inline-flex items-center gap-1">
              <span className="font-mono">{truncateAddress(part)}</span>
              <span className="inline-flex gap-1">
                <CopyButton text={part} />
                <ExplorerLink type="address" address={part} />
              </span>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const formatTextWithMarkdown = (text: string) => {
  // First, handle the numbered lists
  if (/^\d+\.\s/.test(text)) {
    const number = text.match(/^\d+/)[0];
    const content = text.replace(/^\d+\.\s/, '');
    return (
      <div className="flex items-start space-x-2">
        <span className="text-blue-400 font-medium min-w-[1.5rem]">{number}.</span>
        <span className="flex-1">{formatBoldText(content)}</span>
      </div>
    );
  }
  
  return formatBoldText(text);
};

const formatBoldText = (text: string) => {
  // First split by newlines to preserve line breaks
  return text.split('\n').map((line, lineIndex) => {
    // Split each line by bold markers
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    
    const formattedLine = parts.map((part, partIndex) => {
      // Check if this part is bold (surrounded by **)
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and wrap in bold styling
        const boldText = part.slice(2, -2);
        return (
          <span 
            key={`${lineIndex}-${partIndex}`} 
            className="font-semibold text-blue-300"
          >
            {boldText}
          </span>
        );
      }
      // Return regular text if not empty
      return part ? <span key={`${lineIndex}-${partIndex}`}>{part}</span> : null;
    });

    // Return the line with proper spacing
    return (
      <Fragment key={lineIndex}>
        {formattedLine}
        {lineIndex < text.split('\n').length - 1 && <br />}
      </Fragment>
    );
  });
};

const cleanErrorMessages = (content: string) => {
  if (typeof content !== 'string') return content;
  
  // Remove various forms of error messages
  return content
    // Remove JSON error messages
    .replace(/\{"status":"error"[^}]+\}/g, '')
    // Remove error prefixes
    .replace(/^(Error:|Failed:|Unable to:)\s*/i, '')
    // Remove "I will use X to" phrases
    .replace(/^(I will use|Let me use|I'll use|Let's use)[^.]+(to|and)[^.]+\./i, '')
    // Remove "Let's proceed with" phrases
    .replace(/^(Let's proceed with|I will proceed to|Let me proceed)[^.]+\./i, '')
    // Clean up any double spaces or newlines
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

interface TokenData {
  status: string;
  message: string;
  mintAddress: string;
  decimals: number;
}

const parseTokenData = (content: string): TokenData | null => {
  try {
    // Try to extract JSON data
    const jsonMatch = content.match(/\{[^}]+\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch {
    return null;
  }
};

export default function Chat() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [showPrivateKeyModal, setShowPrivateKeyModal] = useState(false);
  const [solPrice, setSolPrice] = useState<string>("0");

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    if (!privateKey) {
      setShowPrivateKeyModal(true);
      return;
    }

    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Parse the private key array and convert to base58
      const privateKeyArray = JSON.parse(privateKey);
      const privateKeyUint8 = new Uint8Array(privateKeyArray);
      const privateKeyBase58 = bs58.encode(privateKeyUint8);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Private-Key': privateKeyBase58
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setIsTyping(false);

      // Handle API response
      if (data.status === 'error') {
        // Show user-friendly error message
        const errorMessage: Message = { 
          role: 'agent', 
          content: "I apologize, but I'm having trouble processing your request at the moment. Please try again later." 
        };
        setMessages(prev => [...prev, errorMessage]);
        console.error('API Error:', data); // Log the error for debugging
      } else {
        // Clean and format the response
        const cleanContent = cleanErrorMessages(data.response);
        
        // Only show the message if there's actual content after cleaning
        if (cleanContent.trim()) {
          const agentMessage: Message = { role: 'agent', content: cleanContent };
          setMessages(prev => [...prev, agentMessage]);
        } else {
          // If no content after cleaning, show a fallback message
          const fallbackMessage: Message = { 
            role: 'agent', 
            content: "I apologize, but I couldn't process your request properly. Please try asking your question again." 
          };
          setMessages(prev => [...prev, fallbackMessage]);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);
      const errorMessage: Message = { 
        role: 'agent', 
        content: 'I apologize, but I encountered an unexpected error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query: string) => {
    // If there's a template for this query, use it, otherwise use the query as is
    const message = QUERY_TEMPLATES[query] || query;
    setInput(message);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8">
      {/* Main Chat Container */}
      <div className="max-w-6xl mx-auto glass-effect rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <header className="glass-effect border-b border-white/10 flex-shrink-0">
          {/* Top Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/')}
                className="icon-button p-2 hover:bg-white/5 rounded-lg"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7M12 5l-7 7 7 7m0 0h2a2 2 0 002 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
              <NetworkBadge network="devnet" />
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowPrivateKeyModal(true)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[48px] ${
                  privateKey 
                    ? 'gradient-border text-green-400' 
                    : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  {privateKey ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Connected
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Connect Wallet
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 p-4">
            {EXAMPLE_QUERIES.map((query, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(query)}
                className="icon-button px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm whitespace-nowrap flex-shrink-0"
              >
                {query}
              </button>
            ))}
          </div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-3xl mx-auto p-4 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 animate-fade-scale">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Welcome to Solana Agent
                </h1>
                <p className="text-slate-400 text-center max-w-md mb-8">
                  Your AI-powered assistant for managing Solana transactions, tokens, and more. How can I help you today?
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {[
                    { icon: '💰', title: 'Check Balance', query: 'SOL balance' },
                    { icon: '📈', title: 'SOL Price', query: 'SOL price' },
                    { icon: '🪙', title: 'Create Token', query: 'Create Token' },
                    { icon: '🖼️', title: 'Mint NFT', query: 'Create NFT' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(item.query)}
                      className="flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <span className="text-2xl mb-2">{item.icon}</span>
                      <span className="text-sm text-slate-300">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-slide-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message.role === 'agent' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mr-3 mt-1">
                      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`message-card max-w-[85%] break-words ${
                      message.role === 'user'
                        ? 'gradient-border text-blue-50'
                        : 'bg-slate-800/50 border border-white/10'
                    } rounded-2xl px-4 py-3 shadow-lg`}
                    style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      hyphens: 'auto',
                      maxWidth: 'min(85%, 800px)'
                    }}
                  >
                    {message.role === 'agent' ? (
                      formatMessage(message.content, privateKey)
                    ) : (
                      <div className="text-slate-200 whitespace-pre-wrap">{message.content}</div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center ml-3 mt-1">
                      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start animate-slide-up">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="bg-slate-800/50 rounded-2xl px-4 py-3 shadow-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500/50 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-blue-500/50 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-blue-500/50 rounded-full typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-white/10 glass-effect p-4">
          <div className="max-w-3xl mx-auto flex gap-4 items-start">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 min-h-[48px] max-h-32 resize-none transition-colors duration-200"
                style={{ overflowY: 'hidden' }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-slate-400">
                Press Enter ↵ to send
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className={`icon-button h-12 px-4 rounded-xl transition-all duration-200 flex items-center justify-center min-w-[48px] ${
                isLoading || !input.trim()
                  ? 'bg-white/5 text-slate-400'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Private Key Modal */}
      <PrivateKeyModal
        isOpen={showPrivateKeyModal}
        onClose={() => setShowPrivateKeyModal(false)}
        onSubmit={setPrivateKey}
      />
    </div>
  );
};
