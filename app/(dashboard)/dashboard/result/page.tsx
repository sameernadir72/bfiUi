import { Breadcrumbs } from '@/components/breadcrumbs';
import { ElectionResult } from '@/components/ElectionResult';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Candidate, Election } from '@/constants/data';
import { abi, contract_address } from '@/lib/contract';
import { ethers } from 'ethers';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Result', link: '/dashboard/result' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
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
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Elections Result`} description="" />
        </div>
        <Separator />
        <ElectionResult results={elections} />
      </div>
    </>
  );
}
