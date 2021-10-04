/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { IRoyaltiesV1, IRoyaltiesV1Interface } from '../IRoyaltiesV1';

const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'address[]',
                name: 'recipients',
                type: 'address[]'
            },
            {
                indexed: false,
                internalType: 'uint256[]',
                name: 'bps',
                type: 'uint256[]'
            }
        ],
        name: 'SecondarySaleFees',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'getFeeBps',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'getFeeRecipients',
        outputs: [
            {
                internalType: 'address payable[]',
                name: '',
                type: 'address[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];

export class IRoyaltiesV1__factory {
    static readonly abi = _abi;
    static createInterface(): IRoyaltiesV1Interface {
        return new utils.Interface(_abi) as IRoyaltiesV1Interface;
    }
    static connect(address: string, signerOrProvider: Signer | Provider): IRoyaltiesV1 {
        return new Contract(address, _abi, signerOrProvider) as IRoyaltiesV1;
    }
}
