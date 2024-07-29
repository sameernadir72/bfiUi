import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Election } from '@/constants/data';

type ElectionResultProps = {
  results: Election[];
};

export const ElectionResult: React.FC<ElectionResultProps> = ({ results }) => {
  return (
    <div className="space-y-8">
      {results.map((election) =>
        new Date(election.startTime).getTime() > new Date().getTime() ? (
          <div key={election.id} className="rounded-lg border p-4 shadow-lg">
            <Heading
              title={election.name}
              description={election.city ? `City: ${election.city}` : ''}
            />
            <p>
              {election.startTime} - {election.endTime}
            </p>
            <Separator />
            <div className="mt-4 space-y-4">
              {election.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex justify-between rounded-lg border p-4 shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p>Party: {candidate.partyName}</p>
                  </div>
                  <p className="font-semibold">{candidate.votes} votes</p>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
