'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import partyLogo from '@/public/PTI-Flag-01.png';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const page = () => {
  //   const breadcrumbItems = [
  //     { title: 'Dashboard', link: '/dashboard' }
  // ];
  const formSchema = z.object({
    electioOption: z.string().min(1, { message: 'City is Required' })
  });

  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  return (
    <div>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between">
          <Heading
            title={`Cast Vote`}
            description="Cast Vote for Country Future"
          />
        </div>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="gap-8 md:grid md:grid-cols-3">
              <FormField
                control={form.control}
                name="electioOption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Election</FormLabel>
                    <Select
                      // disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a Election"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {/* {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))} */}
                      </SelectContent>
                    </Select>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <Card className="w-[30] max-w-sm">
          <CardHeader>
            <CardTitle>Candidate Name </CardTitle>
          </CardHeader>
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
        <Button className="ml-auto flex justify-end" type="submit">
          Submit Vote
        </Button>
      </div>
    </div>
  );
};

export default page;
