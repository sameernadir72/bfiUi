import { Breadcrumbs } from '@/components/breadcrumbs';
import { ElectionForm } from '@/components/forms/election-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Elections', link: '/dashboard/elections' },
  { title: 'Create', link: '/dashboard/election/create' }
];
export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <ElectionForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
}
