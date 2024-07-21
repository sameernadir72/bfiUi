import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import partyLogo from '@/public/PTI-Flag-01.png';
import Image from 'next/image';

const page = () => {
  //   const breadcrumbItems = [
  //     { title: 'Dashboard', link: '/dashboard' }
  // ];
  return (
    <div>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between">
          <Heading
            title={`Cast Vote`}
            description="Cast Vote for Country Future"
          />
        </div>
        <ProductForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={null}
          key={null}
        />
        <Card className="w-[30] max-w-sm">
          <CardContent>
            <>
              <div className="flex justify-end p-3">
                <Checkbox />
              </div>
              <div className="flex justify-end">
                <Image src={partyLogo} alt="partylogo" />
              </div>
            </>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
