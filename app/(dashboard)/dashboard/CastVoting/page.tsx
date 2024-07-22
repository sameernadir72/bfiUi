'use client';
import { CastForm } from '@/components/forms/cast-form';
import { Button } from '@/components/ui/button';

import { Heading } from '@/components/ui/heading';


const page = () => {
  return (
    <div>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between">
          <Heading
            title={`Cast Vote`}
            description="Cast Vote for Country Future"
          />
        </div>
        <CastForm initialData={null} key={null} />
        
        <Button className="ml-auto flex justify-end" type="submit">
          Submit Vote
        </Button>
      </div>
    </div>
  );
};

export default page;
