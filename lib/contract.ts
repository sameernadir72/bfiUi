export const contract_address: string =
  '0xA4f9B7e2E90453228B63cb00b2e319c1118F7986';
export const abi: any = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'candidateId',
        type: 'uint256'
      }
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'city',
        type: 'string'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'partyName',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'votes',
            type: 'uint256'
          }
        ],
        internalType: 'struct VotingSystem.Candidate[]',
        name: 'candidates',
        type: 'tuple[]'
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256'
      }
    ],
    name: 'createElection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'OwnableInvalidOwner',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256'
      }
    ],
    name: 'ElectionCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'city',
        type: 'string'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'partyName',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'votes',
            type: 'uint256'
          }
        ],
        internalType: 'struct VotingSystem.Candidate[]',
        name: 'candidates',
        type: 'tuple[]'
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256'
      }
    ],
    name: 'updateElection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'candidateId',
        type: 'uint256'
      }
    ],
    name: 'VoteCasted',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256'
      }
    ],
    name: 'electionDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'city',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'partyName',
                type: 'string'
              },
              {
                internalType: 'uint256',
                name: 'votes',
                type: 'uint256'
              }
            ],
            internalType: 'struct VotingSystem.Candidate[]',
            name: 'candidates',
            type: 'tuple[]'
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          }
        ],
        internalType: 'struct VotingSystem.Election',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256'
      }
    ],
    name: 'hasCastedVote',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalCandidates',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalElections',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
