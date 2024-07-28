'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '../ui/use-toast';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { useActiveAccount } from 'thirdweb/react';
import { getContract, prepareContractCall } from 'thirdweb';
import { client } from '@/lib/thirdweb';
import { sepolia } from 'thirdweb/chains';
import { abi, contract_address } from '@/lib/contract';
import { useSendTransaction } from 'thirdweb/react';

const candidateSchema = z.object({
  id: z.number().default(0),
  name: z
    .string()
    .min(3, { message: 'Candidate Name must be at least 3 characters' }),
  partyName: z
    .string()
    .min(3, { message: 'Party Name must be at least 3 characters' }),
  partySymbol: z.string().min(1, { message: 'Party Symbol must be provided' }),
  votes: z.number().default(0)
});

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Election Name must be at least 3 characters' }),
  city: z.string().optional(),
  area: z.string().optional(),
  startDate: z.any(),
  endDate: z.any(),
  // candidates: z.array(candidateSchema)
  candidates: z.any()
});

type CandidateFormValues = z.infer<typeof candidateSchema>;
type ElectionFormValues = z.infer<typeof formSchema>;

interface ElectionFormProps {
  initialData: any | null;
}

export const ElectionForm: React.FC<ElectionFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const account = useActiveAccount();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        city: '',
        area: '',
        startDate: '',
        endDate: '',
        candidates: [{ id: 0, name: '', partyName: '', votes: 0 }]
      };

  const form = useForm<ElectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const contract = getContract({
    client: client,
    chain: sepolia,
    address: contract_address,
    abi: abi
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'candidates'
  });

  const onSubmit = async (data: ElectionFormValues) => {
    try {
      if (account) {
        setLoading(true);
        const formData = {
          ...data,
          startDate: new Date(data.startDate).getTime() / 1000,
          endDate: new Date(data.endDate).getTime() / 1000
        };

        // Store election data in Firebase
        // await setDoc(doc(db, 'elections', documentId), formData);

        // Prepare the candidates array for blockchain
        const candidates = data.candidates.map((candidate: any) => ({
          id: 0,
          name: candidate.name,
          partyName: candidate.partyName,
          votes: 0
        }));

        // Prepare and send transaction to blockchain
        const transaction = prepareContractCall({
          contract,
          method: 'createElection',
          params: [
            formData.name,
            formData.city || '',
            candidates,
            formData.startDate,
            formData.endDate
          ]
        });
        sendTransaction(transaction);
        toast({
          variant: 'default',
          title: 'Transaction request initiated.',
          description: 'Please wait for the wallet popup.'
        });
      } else {
        throw new Error('Please connect your wallet');
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: String(error)
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // Implement delete functionality if needed
      router.refresh();
      // router.push('/${params.storeId}/products);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Election name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter City (Optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Area (Optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.map((item, index) => (
              <div key={item.id} className="space-y-4">
                <Controller
                  control={control}
                  name={`candidates.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidate Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Candidate name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name={`candidates.${index}.partyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Party name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Controller
                  control={control}
                  name={`candidates.${index}.partySymbol`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party Symbol</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Party symbol"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.candidates?.[index]?.partySymbol?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                /> */}
                <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove Candidate
                </Button>
              </div>
            ))}
            <Button
              disabled={loading}
              variant="secondary"
              onClick={() =>
                append({
                  id: 0,
                  name: '',
                  partyName: '',
                  partySymbol: '',
                  votes: 0
                })
              }
            >
              Add Candidate
            </Button>
            <Button
              disabled={loading}
              className="ml-auto"
              type="submit"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {initialData ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
