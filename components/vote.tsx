'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Candidate, Election } from '@/constants/data';
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction
} from 'thirdweb/react';
import { client } from '@/lib/thirdweb';
import { sepolia } from 'thirdweb/chains';
import { abi, contract_address } from '@/lib/contract';
import { ethers } from 'ethers';
import { getContract, prepareContractCall } from 'thirdweb';

const Vote = ({ elections }: { elections: Election[] }) => {
  const [selectedElection, setSelectedElection] = useState<Election | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const account = useActiveAccount();
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: contract_address,
    abi: abi
  });

  const { mutate: sendTransaction, isPending } = useSendTransaction();

  useEffect(() => {
    if (account && selectedElection) {
      const fetchHasVoted = async () => {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );
        const contract = new ethers.Contract(contract_address, abi, provider);
        const hasVoted = await contract.hasCastedVote(
          account.address,
          BigInt(selectedElection.id)
        );
        setHasVoted(hasVoted);
      };
      fetchHasVoted();
    }
  }, [account, selectedElection, contract]);

  const handleElectionSelect = (election: Election) => {
    setSelectedElection(election);
  };

  const handleVoteSubmit = async (candidate: Candidate) => {
    if (!account) {
      alert('Connect Wallet!');
      return;
    }

    if (hasVoted) {
      alert('Already voted');
      return;
    }

    setLoading(true);

    try {
      const transaction = prepareContractCall({
        contract: contract,
        method: 'function castVote(uint256,uint256)',
        params: [BigInt(selectedElection!.id), BigInt(candidate.id)]
      });
      await sendTransaction(transaction);
      alert('Vote processed, confirm transaction from wallet.');
    } catch (error) {
      console.error(error);
      alert(`Error: ${String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-4">
        <Heading title="Cast Vote" description="Cast Vote for Country Future" />
        <Separator />

        {!selectedElection ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {elections.map((election) => (
              <div
                key={election.id}
                className="cursor-pointer rounded-lg border p-4 shadow-lg hover:bg-gray-100"
                onClick={() => handleElectionSelect(election)}
              >
                <h3 className="text-xl font-semibold">{election.name}</h3>
                <p>{election.city}</p>
                <p>
                  {election.startTime} - {election.endTime}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xl">
            <Button variant="link" onClick={() => setSelectedElection(null)}>
              Back to Elections
            </Button>
            <Heading
              title={selectedElection.name}
              description={
                selectedElection.city ? `City: ${selectedElection.city}` : ''
              }
            />
            <Separator />
            <div className="space-y-4">
              {selectedElection.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between rounded-lg border p-4 shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{candidate.name}</h3>
                    <p>Party: {candidate.partyName}</p>
                  </div>
                  <Button
                    onClick={() => handleVoteSubmit(candidate)}
                    disabled={loading}
                  >
                    {loading ? 'Voting...' : 'Vote'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;
