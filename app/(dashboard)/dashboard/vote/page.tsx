import React from 'react';
import Vote from '../../../../components/vote';
import { ethers } from 'ethers';
import { abi, contract_address } from '@/lib/contract';
import { Candidate, Election } from '@/constants/data';

const page = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const contract = new ethers.Contract(contract_address, abi, provider);
  const totalElectionsCreated = Number(await contract.totalElections());
  const elections: Election[] = await Promise.all(
    Array.from({ length: totalElectionsCreated }, (_, i) => i + 1).map(
      async (electionId) => {
        const election: any = await contract.electionDetails(electionId);
        const electionFixed: Election = {
          ...election,
          name: election.name,
          id: Number(election.id),
          startTime: new Date(
            Number(election.startTime) * 1000
          ).toLocaleDateString(),
          endTime: new Date(
            Number(election.startTime) * 1000
          ).toLocaleDateString()
        };
        const candidates = election.candidates.map((can: Candidate) => {
          return {
            id: Number(can.id),
            name: can.name,
            partyName: can.partyName,
            votes: Number(can.votes)
          };
        });
        electionFixed.candidates = candidates;
        return electionFixed;
      }
    )
  );
  console.log(elections);

  return (
    <div>
      <Vote elections={elections} />
    </div>
  );
};

export default page;
