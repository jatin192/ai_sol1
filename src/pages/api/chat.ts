import { NextApiRequest, NextApiResponse } from 'next';
import { SolanaAgent } from '@/services/solanaAgent';

// Create a map to store agent instances for different private keys
const agentInstances = new Map<string, SolanaAgent>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const privateKeyBase58 = req.headers['x-private-key'] as string;

    if (!privateKeyBase58) {
      return res.status(400).json({ message: 'Private key is required' });
    }

    // Get or create agent instance for this private key
    let agent = agentInstances.get(privateKeyBase58);
    if (!agent) {
      agent = new SolanaAgent();
      await agent.initialize(privateKeyBase58); // Pass base58 private key directly
      agentInstances.set(privateKeyBase58, agent);
    }

    const response = await agent.processMessage(message);
    return res.status(200).json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}
