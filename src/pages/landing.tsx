import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
const demoMessages = [
  { role: 'user', content: 'What can you help me with?' },
  { role: 'assistant', content: 'I can help you with:\n• Managing Solana wallet\n• Creating NFT collections\n• Checking token prices\n• Executing trades\n• Monitoring DeFi positions' },
  { role: 'user', content: 'Show my SOL balance' },
  { role: 'assistant', content: 'Your current SOL balance is 145.32 SOL ($23,251.20)' },
  { role: 'user', content: 'Create an NFT collection' },
  { role: 'assistant', content: 'I can help you create an NFT collection. Please provide:\n• Collection Name\n• Symbol\n• Total Supply' },
  { role: 'user', content: 'Check latest SOL price' },
  { role: 'assistant', content: 'Current SOL Price:\n$160.25 (+5.8% 24h)\nVolume: $2.1B' }
];

const features = [
  {
    title: 'AI-Powered Solana Assistant',
    description: 'Experience the future of blockchain interaction with our advanced AI that understands natural language. Execute complex Solana operations through simple conversations.',
    icon: (
      <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
        <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    title: 'Seamless NFT Creation Suite',
    description: 'Launch your NFT collection in minutes, not hours. Our AI handles the technical complexities while you focus on creativity and strategy.',
    icon: (
      <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6v18h18V6M3 12h18M9 18v-6M15 18v-6M3 6l9-4 9 4 9-4 9 4 9 4 9-4 9 4 9-4 9 4"/>
      </svg>
    )
  },
  {
    title: 'Real-Time DeFi Intelligence',
    description: 'Stay ahead with instant market insights, portfolio analytics, and smart DeFi recommendations powered by AI.',
    icon: (
      <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20M2 12h4l3-3 4 6 3-3 6 6"/>
      </svg>
    )
  }
];

export default function Landing() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      setIsTyping(true);
      let text = demoMessages[currentMessageIndex].content;
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setCurrentText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
          }, 1000);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl transform rotate-45"></div>
                <div className="absolute inset-0.5 bg-dark rounded-xl transform rotate-45"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 rounded-xl blur-lg"></div>
                <svg className="relative w-10 h-10 text-white p-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                AI Sol Agent
                </h1>
                <span className="text-sm text-slate-400">AI Assistant</span>
              </div>
            </div>

            {/* Launch App Button */}
            <button 
              onClick={() => router.push('/chat')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10 animate-grid-move"
             style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 mix-blend-overlay"></div>
        <div className="absolute w-[800px] h-[800px] -top-[400px] -right-[400px] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-[300px] -left-[300px] bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-3xl animate-float-slow-reverse"></div>
        
        {/* Floating Particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${Math.random() * 5}s`,
                '--duration': `${10 + Math.random() * 10}s`,
                '--position-x': `${Math.random() * 100}vw`,
                '--position-y': `${Math.random() * 100}vh`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center relative">
          <div className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary animate-gradient-x">
                    Your AI Companion
                  </span>
                  <span className="block text-white mt-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    for Solana
                  </span>
                </h1>
                <p className="text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Experience the power of AI-driven blockchain interaction. Build, trade, and manage your Solana assets through natural conversations.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <button
                    onClick={() => router.push('/chat')}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                  >
                    Launch App
                  </button>
                  <button className="px-8 py-4 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/5 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Chat Demo */}
              <div className="relative animate-float">
                <div className="flex-1 max-w-xl mx-auto perspective-1000">
                  <div className="chat-demo fixed-chat-window bg-dark-secondary rounded-2xl shadow-2xl transform-style-3d rotate-x-12 hover:rotate-x-0 transition-transform duration-500">
                    {/* Chat Header */}
                    <div className="chat-header p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-secondary/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-white/80 font-medium">Solana AI Assistant</span>
                        <div className="w-8"></div>
                      </div>
                    </div>

                    {/* Chat Messages Container */}
                    <div className="chat-messages-container h-[400px] overflow-y-auto p-4 space-y-4">
                      {demoMessages.slice(0, currentMessageIndex + 1).map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} transform-style-3d`}
                        >
                          <div
                            className={`message-bubble max-w-[80%] p-4 rounded-2xl transform translate-z-12 hover:translate-z-24 transition-transform duration-300
                              ${message.role === 'user' 
                                ? 'bg-primary/20 text-white ml-auto message-user' 
                                : 'bg-secondary/20 text-white message-assistant'
                              }`}
                          >
                            {message.role === 'assistant' && (
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-secondary/30 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                  </svg>
                                </div>
                                <span className="text-xs text-white/60">AI Assistant</span>
                              </div>
                            )}
                            <p className="whitespace-pre-wrap">
                              {index === currentMessageIndex && isTyping 
                                ? currentText 
                                : message.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex items-center gap-2 p-2 bg-dark-secondary/50 rounded-full w-fit">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary/50 animate-typing-dot"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/50 animate-typing-dot" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary/50 animate-typing-dot" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="chat-input-container p-4 border-t border-white/10 bg-gradient-to-r from-dark-secondary to-dark-secondary/80">
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2 border border-white/10">
                        <input 
                          type="text" 
                          placeholder="Type your message..." 
                          className="flex-1 bg-transparent text-white/80 placeholder-white/40 outline-none text-sm"
                          disabled
                        />
                        <button className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <h2 className="text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
              How It Works
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8 relative">
                {/* Connection line in background */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 hidden lg:block"></div>
                
                {/* Step 1 */}
                <div className="relative group">
                  <div className="bg-dark-secondary/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-all duration-300">
                      <div className="w-16 h-16 rounded-2xl bg-dark-secondary/80 flex items-center justify-center backdrop-blur-xl">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Connect Wallet</h3>
                      <p className="text-gray-400 leading-relaxed">Securely connect your Solana wallet with military-grade encryption. Your keys, your control.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="bg-dark-secondary/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                      <div className="w-16 h-16 rounded-2xl bg-dark-secondary/80 flex items-center justify-center backdrop-blur-xl">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Chat Naturally</h3>
                      <p className="text-gray-400 leading-relaxed">Talk to your AI assistant like a friend. No complex commands, just natural conversation.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="bg-dark-secondary/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-all duration-300">
                      <div className="w-16 h-16 rounded-2xl bg-dark-secondary/80 flex items-center justify-center backdrop-blur-xl">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Execute Actions</h3>
                      <p className="text-gray-400 leading-relaxed">Your AI handles complex blockchain operations instantly. From NFTs to swaps, it's all automated.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Command Center Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-secondary/30 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <h2 className="text-5xl font-bold text-center mb-20">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                Your All-in-One
              </span>
              <span className="block text-white mt-2">Solana Command Center</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* NFT Creation */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-dark-secondary/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 mb-6">
                    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">NFT Creation</h3>
                  <p className="text-gray-400">Launch NFT collections through chat. Skip OpenSea, forget complex marketplaces.</p>
                </div>
              </div>

              {/* Token Management */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-dark-secondary/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 mb-6">
                    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Token Management</h3>
                  <p className="text-gray-400">Manage tokens with simple commands. Your entire wallet at your fingertips.</p>
                </div>
              </div>

              {/* Price Tracking */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-dark-secondary/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 mb-6">
                    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Price Tracking</h3>
                  <p className="text-gray-400">Real-time market data in your chat. No more tab switching for prices.</p>
                </div>
              </div>

              {/* Token Swaps */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-dark-secondary/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 mb-6">
                    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Token Swaps</h3>
                  <p className="text-gray-400">Swap tokens directly through chat. Forget complex DEX interfaces.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </main>
    </div>
  );
}
