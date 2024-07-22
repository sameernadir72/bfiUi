'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import partyLogo from '@/public/PTI-Flag-01.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '../ui/use-toast';

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  electioOption: z.string().min(1, { message: 'election is Required' })
});

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  initialData: any | null;
}

export const CastForm: React.FC<FormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  // const title = initialData ? 'Edit product' : 'Create product ';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Submit Vote';

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        price: 0,
        imgUrl: [],
        category: ''
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <Heading title={title} description={description} /> */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto flex justify-end"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
