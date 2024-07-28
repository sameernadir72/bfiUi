'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Election, Candidate } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface ElectionsClientProps {
  data: Candidate[];
}

export const UserClient: React.FC<ElectionsClientProps> = ({ data }) => {
  const router = useRouter();
  console.log(data);
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Election (${data.length})`}
          description="Manage Election "
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/elections/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
