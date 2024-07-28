import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserClient } from '@/components/tables/user-tables/client';
import { Candidate, Election } from '@/constants/data';
import { abi, contract_address } from '@/lib/contract';
import { ethers } from 'ethers';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Elections', link: '/dashboard/elections' }
];

export default async function page() {
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
          startTime: new Date(Number(election.startTime) * 1000).toISOString(), // Number(elec.startTime),
          endTime: new Date(Number(election.endTime) * 1000).toISOString() // Number(election.endTime)
        };
        const candidates = election.candidates.map((can: Candidate) => {
          return {
            ...can,
            id: Number(can.id),
            votes: Number(can.votes)
          };
        });
        electionFixed.candidates = candidates;
        return electionFixed;
      }
    )
  );

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={elections} />
      </div>
    </>
  );
}
