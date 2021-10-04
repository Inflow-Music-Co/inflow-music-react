/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { SocialTokenFactory, SocialTokenFactoryInterface } from '../SocialTokenFactory';

const _abi = [
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'socialToken',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address'
            }
        ],
        name: 'SocialTokenCreated',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'Unwhitelisted',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'Whitelisted',
        type: 'event'
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address'
                    },
                    {
                        internalType: 'address',
                        name: 'collateral',
                        type: 'address'
                    },
                    {
                        internalType: 'uint256',
                        name: 'maxSupply',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'slope',
                        type: 'uint256'
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'symbol',
                        type: 'string'
                    }
                ],
                internalType: 'struct ISocialToken.CreateData',
                name: 'data',
                type: 'tuple'
            }
        ],
        name: 'create',
        outputs: [
            {
                internalType: 'address',
                name: 'socialTokenAddress',
                type: 'address'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'creator',
                type: 'address'
            }
        ],
        name: 'getToken',
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
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'isWhitelisted',
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
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bool',
                name: 'enabled',
                type: 'bool'
            }
        ],
        name: 'setWhitelistEnabled',
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
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'unwhitelist',
        outputs: [
            {
                internalType: 'bool',
                name: 'success',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'whitelist',
        outputs: [
            {
                internalType: 'bool',
                name: 'success',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

const _bytecode =
    '0x60806040526000805460ff60a01b1916600160a01b17905534801561002357600080fd5b50600080546001600160a01b031916339081178255604051909182917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061277b806100746000396000f3fe60806040523480156200001157600080fd5b50600436106200009f5760003560e01c80638da5cb5b116200006e5780638da5cb5b14620001235780639a59042714620001355780639b19251a146200014c578063a22d71b31462000163578063f2fde38b146200017a57600080fd5b8063052d9e7e14620000a45780633af32abf14620000bd5780635977043814620000e9578063715018a61462000119575b600080fd5b620000bb620000b536600462000980565b62000191565b005b620000d4620000ce36600462000963565b620001e5565b60405190151581526020015b60405180910390f35b62000100620000fa36600462000963565b620001fa565b6040516001600160a01b039091168152602001620000e0565b620000bb62000299565b6000546001600160a01b031662000100565b620000d46200014636600462000963565b62000310565b620000d46200015d36600462000963565b6200038e565b6200010062000174366004620009a2565b6200040b565b620000bb6200018b36600462000963565b62000688565b6000546001600160a01b03163314620001c75760405162461bcd60e51b8152600401620001be9062000a06565b60405180910390fd5b60008054911515600160a01b0260ff60a01b19909216919091179055565b6000620001f460018362000777565b92915050565b60006001600160a01b0382166200027a5760405162461bcd60e51b815260206004820152603760248201527f536f6369616c546f6b656e466163746f72793a20676574546f6b656e2071756560448201527f727920666f7220746865207a65726f20616464726573730000000000000000006064820152608401620001be565b506001600160a01b039081166000908152600360205260409020541690565b6000546001600160a01b03163314620002c65760405162461bcd60e51b8152600401620001be9062000a06565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600080546001600160a01b031633146200033e5760405162461bcd60e51b8152600401620001be9062000a06565b6200034b6001836200079c565b9050801562000389576040516001600160a01b038316907f51085ddf9ebdded84b76e829eb58c4078e4b5bdf97d9a94723f336039da4679190600090a25b919050565b600080546001600160a01b03163314620003bc5760405162461bcd60e51b8152600401620001be9062000a06565b620003c9600183620007b3565b9050801562000389576040516001600160a01b038316907faab7954e9d246b167ef88aeddad35209ca2489d95a8aeb59e288d9b19fae5a5490600090a2919050565b60008054600160a01b900460ff16156200047a576200042c60013362000777565b6200047a5760405162461bcd60e51b815260206004820152601f60248201527f57686974656c69737461626c653a2077686974656c6973746564206f6e6c79006044820152606401620001be565b60006003816200048e602086018662000963565b6001600160a01b03908116825260208201929092526040016000205416146200050b5760405162461bcd60e51b815260206004820152602860248201527f536f6369616c546f6b656e466163746f72793a20746f6b656e20616c72656164604482015267792065786973747360c01b6064820152608401620001be565b60008260405160200162000520919062000a3b565b604051602081830303815290604052805190602001208360405162000545906200093d565b62000551919062000a3b565b8190604051809103906000f590508015801562000572573d6000803e3d6000fd5b50915081905080600360006200058c602087018762000963565b6001600160a01b039081168252602080830193909352604090910160002080546001600160a01b031916938216939093179092559082169063f2fde38b90620005d89086018662000963565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156200061a57600080fd5b505af11580156200062f573d6000803e3d6000fd5b506200064392505050602084018462000963565b6001600160a01b0316826001600160a01b03167f76df8d112a6476b76573e35f5e1230a3e5b1474633777037180a13114f1eed4360405160405180910390a350919050565b6000546001600160a01b03163314620006b55760405162461bcd60e51b8152600401620001be9062000a06565b6001600160a01b0381166200071c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401620001be565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038116600090815260018301602052604081205415155b9392505050565b600062000795836001600160a01b038416620007ca565b600062000795836001600160a01b038416620008eb565b60008181526001830160205260408120548015620008e0576000620007f160018362000b2f565b8554909150600090620008079060019062000b2f565b905060008660000182815481106200082f57634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050808760000184815481106200086157634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260018901909152604090208490558654879080620008a357634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050620001f4565b6000915050620001f4565b60008181526001830160205260408120546200093457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620001f4565b506000620001f4565b611c1b8062000b5483390190565b80356001600160a01b03811681146200038957600080fd5b60006020828403121562000975578081fd5b62000795826200094b565b60006020828403121562000992578081fd5b8135801515811462000795578182fd5b600060208284031215620009b4578081fd5b813567ffffffffffffffff811115620009cb578182fd5b820160c0818503121562000795578182fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020815260006001600160a01b038062000a55856200094b565b1660208401528062000a6a602086016200094b565b16604084015250604083013560608301526060830135608083015262000a94608084018462000ae0565b60c060a085015262000aab60e085018284620009dd565b91505062000abd60a085018562000ae0565b848303601f190160c086015262000ad6838284620009dd565b9695505050505050565b6000808335601e1984360301811262000af7578283fd5b830160208101925035905067ffffffffffffffff81111562000b1857600080fd5b80360383131562000b2857600080fd5b9250929050565b60008282101562000b4e57634e487b7160e01b81526011600452602481fd5b50039056fe60806040523480156200001157600080fd5b5060405162001c1b38038062001c1b83398101604081905262000034916200024e565b608081015160a0820151600080546001600160a01b031916339081178255604051909182917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350815162000094906004906020850190620000fa565b508051620000aa906005906020840190620000fa565b50506001600655508051600780546001600160a01b039283166001600160a01b031991821617909155602083015160088054919093169116179055606081015160095560400151600a55620003cf565b82805462000108906200037c565b90600052602060002090601f0160209004810192826200012c576000855562000177565b82601f106200014757805160ff191683800117855562000177565b8280016001018555821562000177579182015b82811115620001775782518255916020019190600101906200015a565b506200018592915062000189565b5090565b5b808211156200018557600081556001016200018a565b80516001600160a01b0381168114620001b857600080fd5b919050565b600082601f830112620001ce578081fd5b81516001600160401b03811115620001ea57620001ea620003b9565b602062000200601f8301601f1916820162000349565b828152858284870101111562000214578384fd5b835b838110156200023357858101830151828201840152820162000216565b838111156200024457848385840101525b5095945050505050565b60006020828403121562000260578081fd5b81516001600160401b038082111562000277578283fd5b9083019060c082860312156200028b578283fd5b620002956200031e565b620002a083620001a0565b8152620002b060208401620001a0565b60208201526040830151604082015260608301516060820152608083015182811115620002db578485fd5b620002e987828601620001bd565b60808301525060a08301518281111562000301578485fd5b6200030f87828601620001bd565b60a08301525095945050505050565b60405160c081016001600160401b0381118282101715620003435762000343620003b9565b60405290565b604051601f8201601f191681016001600160401b0381118282101715620003745762000374620003b9565b604052919050565b600181811c908216806200039157607f821691505b60208210811415620003b357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61183c80620003df6000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c8063715018a6116100de578063a9059cbb11610097578063d8dfeb4511610071578063d8dfeb4514610308578063dd62ed3e1461031b578063f1af9d3f14610354578063f2fde38b1461036757600080fd5b8063a9059cbb146102e3578063cd3293de146102f6578063d5abeb01146102ff57600080fd5b8063715018a61461029357806383caf2751461029b5780638da5cb5b146102a457806395d89b41146102b5578063a0712d68146102bd578063a457c2d7146102d057600080fd5b8063346fd5dd11610130578063346fd5dd1461021457806339509351146102275780633ccfd60b1461023a57806342966c6814610244578063559e775b1461025757806370a082311461026a57600080fd5b806302d05d3f1461017857806306fdde03146101a8578063095ea7b3146101bd57806318160ddd146101e057806323b872dd146101f2578063313ce56714610205575b600080fd5b60075461018b906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6101b061037a565b60405161019f919061165e565b6101d06101cb3660046115c9565b61040c565b604051901515815260200161019f565b6003545b60405190815260200161019f565b6101d061020036600461158e565b610422565b6040516012815260200161019f565b6101e4610222366004611612565b6104da565b6101d06102353660046115c9565b6105a6565b6102426105dd565b005b610242610252366004611612565b6106dc565b6101e4610265366004611612565b61081a565b6101e4610278366004611542565b6001600160a01b031660009081526001602052604090205490565b6102426108bd565b6101e460095481565b6000546001600160a01b031661018b565b6101b0610931565b6102426102cb366004611612565b610940565b6101d06102de3660046115c9565b610b5a565b6101d06102f13660046115c9565b610bf5565b6101e4600b5481565b6101e4600a5481565b60085461018b906001600160a01b031681565b6101e461032936600461155c565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6101e4610362366004611612565b610c02565b610242610375366004611542565b610c21565b606060048054610389906117de565b80601f01602080910402602001604051908101604052809291908181526020018280546103b5906117de565b80156104025780601f106103d757610100808354040283529160200191610402565b820191906000526020600020905b8154815290600101906020018083116103e557829003601f168201915b5050505050905090565b6000610419338484610d0b565b50600192915050565b600061042f848484610e30565b6001600160a01b0384166000908152600260209081526040808320338452909152902054828110156104b95760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6104cd85336104c8868561179b565b610d0b565b60019150505b9392505050565b6000806104e660035490565b9050600081116105385760405162461bcd60e51b815260206004820152601b60248201527f536f6369616c546f6b656e3a20737570706c79206973207a65726f000000000060448201526064016104b0565b808311156105585760405162461bcd60e51b81526004016104b090611691565b6000610564848361179b565b600b54909150610574838061177c565b8261057f818461177c565b610589919061177c565b610593919061175c565b61059d908261179b565b95945050505050565b3360008181526002602090815260408083206001600160a01b038716845290915281205490916104199185906104c8908690611744565b6000546001600160a01b031633146106075760405162461bcd60e51b81526004016104b0906116d8565b6002600654141561062a5760405162461bcd60e51b81526004016104b09061170d565b6002600655600854600b546040516370a0823160e01b81523060048201526001600160a01b03909216916000919083906370a082319060240160206040518083038186803b15801561067b57600080fd5b505afa15801561068f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b3919061162a565b6106bd919061179b565b90506106d36001600160a01b0383163383611008565b50506001600655565b600260065414156106ff5760405162461bcd60e51b81526004016104b09061170d565b6002600655600061070f60035490565b9050600081116107615760405162461bcd60e51b815260206004820152601b60248201527f536f6369616c546f6b656e3a20737570706c79206973207a65726f000000000060448201526064016104b0565b808211156107815760405162461bcd60e51b81526004016104b090611691565b600061078c836104da565b905080600b60008282546107a0919061179b565b909155506107b090503384611070565b6008546107c7906001600160a01b03163383611008565b8083337ff1b8071d85a68dbc6b0a9b8ff17e44602315ec457cdf743f3eee37cf4a6dd38e6107f5838761179b565b600b546040805192835260208301919091520160405180910390a45050600160065550565b60008061082660035490565b905060006108348483611744565b600b549091508215610879578061084b848061177c565b83610856818561177c565b610860919061177c565b61086a919061175c565b610874919061179b565b61059d565b73af298d050e4395d69670b12b7f410000000000006002868760095461089f919061177c565b6108a9919061177c565b6108b3919061175c565b61059d919061175c565b6000546001600160a01b031633146108e75760405162461bcd60e51b81526004016104b0906116d8565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b606060058054610389906117de565b600260065414156109635760405162461bcd60e51b81526004016104b09061170d565b6002600655806109b55760405162461bcd60e51b815260206004820152601b60248201527f536f6369616c546f6b656e3a20616d6f756e74206973207a65726f000000000060448201526064016104b0565b60006109c08261081a565b905060008111610a125760405162461bcd60e51b815260206004820152601b60248201527f536f6369616c546f6b656e3a20616d6f756e7420746f6f206c6f77000000000060448201526064016104b0565b6000610a1d60035490565b600a54909150610a2d8483611744565b1115610a7b5760405162461bcd60e51b815260206004820152601d60248201527f536f6369616c546f6b656e3a20616d6f756e7420746f6f206c6172676500000060448201526064016104b0565b60006064610a8a84600f61177c565b610a94919061175c565b90506000610aa182610c02565b9050610aad828561179b565b600b6000828254610abe9190611744565b90915550610ace905033866111bf565b6008546001600160a01b0316610ae68133308861129e565b600754610b00906001600160a01b03838116911684611008565b8486337f9045b28c8427bc83571801c0916c82f9ec27d9233ce8c25ac55e60cdf1ba3008610b2e8389611744565b600b54604080519283526020830189905282015260600160405180910390a45050600160065550505050565b3360009081526002602090815260408083206001600160a01b038616845290915281205482811015610bdc5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104b0565b610beb33856104c8868561179b565b5060019392505050565b6000610419338484610e30565b6000600a610c1183600861177c565b610c1b919061175c565b92915050565b6000546001600160a01b03163314610c4b5760405162461bcd60e51b81526004016104b0906116d8565b6001600160a01b038116610cb05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104b0565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038316610d6d5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104b0565b6001600160a01b038216610dce5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104b0565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316610e945760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104b0565b6001600160a01b038216610ef65760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104b0565b6001600160a01b03831660009081526001602052604090205481811015610f6e5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104b0565b610f78828261179b565b6001600160a01b038086166000908152600160205260408082209390935590851681529081208054849290610fae908490611744565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ffa91815260200190565b60405180910390a350505050565b6040516001600160a01b03831660248201526044810182905261106b90849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526112dc565b505050565b6001600160a01b0382166110d05760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104b0565b6001600160a01b038216600090815260016020526040902054818110156111445760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104b0565b61114e828261179b565b6001600160a01b0384166000908152600160205260408120919091556003805484929061117c90849061179b565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610e23565b6001600160a01b0382166112155760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104b0565b80600360008282546112279190611744565b90915550506001600160a01b03821660009081526001602052604081208054839290611254908490611744565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6040516001600160a01b03808516602483015283166044820152606481018290526112d69085906323b872dd60e01b90608401611034565b50505050565b6000611331826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166113ae9092919063ffffffff16565b80519091501561106b578080602001905181019061134f91906115f2565b61106b5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016104b0565b60606113bd84846000856113c5565b949350505050565b6060824710156114265760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016104b0565b843b6114745760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104b0565b600080866001600160a01b031685876040516114909190611642565b60006040518083038185875af1925050503d80600081146114cd576040519150601f19603f3d011682016040523d82523d6000602084013e6114d2565b606091505b50915091506114e28282866114ed565b979650505050505050565b606083156114fc5750816104d3565b82511561150c5782518084602001fd5b8160405162461bcd60e51b81526004016104b0919061165e565b80356001600160a01b038116811461153d57600080fd5b919050565b600060208284031215611553578081fd5b6104d382611526565b6000806040838503121561156e578081fd5b61157783611526565b915061158560208401611526565b90509250929050565b6000806000606084860312156115a2578081fd5b6115ab84611526565b92506115b960208501611526565b9150604084013590509250925092565b600080604083850312156115db578182fd5b6115e483611526565b946020939093013593505050565b600060208284031215611603578081fd5b815180151581146104d3578182fd5b600060208284031215611623578081fd5b5035919050565b60006020828403121561163b578081fd5b5051919050565b600082516116548184602087016117b2565b9190910192915050565b602081526000825180602084015261167d8160408501602087016117b2565b601f01601f19169190910160400192915050565b60208082526027908201527f536f6369616c546f6b656e3a20616d6f756e742067726561746572207468616e60408201526620737570706c7960c81b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b6000821982111561175757611757611819565b500190565b60008261177757634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561179657611796611819565b500290565b6000828210156117ad576117ad611819565b500390565b60005b838110156117cd5781810151838201526020016117b5565b838111156112d65750506000910152565b600181811c908216806117f257607f821691505b6020821081141561181357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea164736f6c6343000804000aa164736f6c6343000804000a';

export class SocialTokenFactory__factory extends ContractFactory {
    constructor(signer?: Signer) {
        super(_abi, _bytecode, signer);
    }

    deploy(
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<SocialTokenFactory> {
        return super.deploy(overrides || {}) as Promise<SocialTokenFactory>;
    }
    getDeployTransaction(
        overrides?: Overrides & { from?: string | Promise<string> }
    ): TransactionRequest {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address: string): SocialTokenFactory {
        return super.attach(address) as SocialTokenFactory;
    }
    connect(signer: Signer): SocialTokenFactory__factory {
        return super.connect(signer) as SocialTokenFactory__factory;
    }
    static readonly bytecode = _bytecode;
    static readonly abi = _abi;
    static createInterface(): SocialTokenFactoryInterface {
        return new utils.Interface(_abi) as SocialTokenFactoryInterface;
    }
    static connect(address: string, signerOrProvider: Signer | Provider): SocialTokenFactory {
        return new Contract(address, _abi, signerOrProvider) as SocialTokenFactory;
    }
}
