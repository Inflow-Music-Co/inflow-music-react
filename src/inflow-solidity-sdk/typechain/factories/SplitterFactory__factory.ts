/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { SplitterFactory, SplitterFactoryInterface } from '../SplitterFactory';

const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'splitter',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address'
            }
        ],
        name: 'SplitterCreated',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'collateral',
                type: 'address'
            },
            {
                internalType: 'address[]',
                name: 'accounts',
                type: 'address[]'
            },
            {
                internalType: 'uint256[]',
                name: 'shares',
                type: 'uint256[]'
            }
        ],
        name: 'create',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

const _bytecode =
    '0x608060405234801561001057600080fd5b50611799806100206000396000f3fe60806040523480156200001157600080fd5b50600436106200002e5760003560e01c8063583cc4771462000033575b600080fd5b6200004a62000044366004620001c7565b6200004c565b005b60008383836040516200005f9062000125565b6200006d93929190620002aa565b604051809103906000f0801580156200008a573d6000803e3d6000fd5b5060405163f2fde38b60e01b81523360048201529091506001600160a01b0382169063f2fde38b90602401600060405180830381600087803b158015620000d057600080fd5b505af1158015620000e5573d6000803e3d6000fd5b50506040513392506001600160a01b03841691507f22142b283581f0b2a487f7a23e0422d292eb5783629173717aa106744ad70d6090600090a350505050565b6113da80620003b383390190565b80356001600160a01b03811681146200014b57600080fd5b919050565b600082601f83011262000161578081fd5b813560206200017a620001748362000375565b62000341565b80838252828201915082860187848660051b89010111156200019a578586fd5b855b85811015620001ba578135845292840192908401906001016200019c565b5090979650505050505050565b600080600060608486031215620001dc578283fd5b620001e78462000133565b925060208085013567ffffffffffffffff8082111562000205578485fd5b818701915087601f83011262000219578485fd5b81356200022a620001748262000375565b8082825285820191508585018b878560051b88010111156200024a578889fd5b8895505b838610156200027757620002628162000133565b8352600195909501949186019186016200024e565b5096505050604087013592508083111562000290578384fd5b5050620002a08682870162000150565b9150509250925092565b6001600160a01b038481168252606060208084018290528551918401829052600092868201929091906080860190855b81811015620002fa578551851683529483019491830191600101620002da565b50508581036040870152865180825290820193509150808601845b83811015620003335781518552938201939082019060010162000315565b509298975050505050505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156200036d576200036d6200039c565b604052919050565b600067ffffffffffffffff8211156200039257620003926200039c565b5060051b60200190565b634e487b7160e01b600052604160045260246000fdfe60806040523480156200001157600080fd5b50604051620013da380380620013da8339810160408190526200003491620004a4565b600080546001600160a01b031916339081178255604051909182917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508051825114620000e05760405162461bcd60e51b815260206004820152602b60248201527f53706c69747465723a2070617965657320616e6420736861726573206c656e6760448201526a0e8d040dad2e6dac2e8c6d60ab1b60648201526084015b60405180910390fd5b6000825111620001335760405162461bcd60e51b815260206004820152601360248201527f53706c69747465723a206e6f20706179656573000000000000000000000000006044820152606401620000d7565b600180546001600160a01b0319166001600160a01b03851617905560005b8251811015620001d257620001bd8382815181106200018057634e487b7160e01b600052603260045260246000fd5b6020026020010151838381518110620001a957634e487b7160e01b600052603260045260246000fd5b6020026020010151620001dc60201b60201c565b80620001c981620005fd565b91505062000151565b5050505062000647565b6001600160a01b038216620002425760405162461bcd60e51b815260206004820152602560248201527f53706c69747465723a206163636f756e7420697320746865207a65726f206164604482015264647265737360d81b6064820152608401620000d7565b60008111620002945760405162461bcd60e51b815260206004820152601660248201527f53706c69747465723a20736861726573206172652030000000000000000000006044820152606401620000d7565b6001600160a01b03821660009081526004602052604090205415620003085760405162461bcd60e51b8152602060048201526024808201527f53706c69747465723a206163636f756e7420616c7265616479206861732073686044820152636172657360e01b6064820152608401620000d7565b620003238260066200039e60201b620006d91790919060201c565b506001600160a01b03821660009081526004602052604081208290556002805483929062000353908490620005e2565b9091555050604080516001600160a01b0384168152602081018390527f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac910160405180910390a15050565b6000620003b5836001600160a01b038416620003be565b90505b92915050565b60008181526001830160205260408120546200040757508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620003b8565b506000620003b8565b80516001600160a01b03811681146200042857600080fd5b919050565b600082601f8301126200043e578081fd5b81516020620004576200045183620005bc565b62000589565b80838252828201915082860187848660051b890101111562000477578586fd5b855b85811015620004975781518452928401929084019060010162000479565b5090979650505050505050565b600080600060608486031215620004b9578283fd5b620004c48462000410565b602085810151919450906001600160401b0380821115620004e3578485fd5b818701915087601f830112620004f7578485fd5b8151620005086200045182620005bc565b8082825285820191508585018b878560051b880101111562000528578889fd5b8895505b838610156200055557620005408162000410565b8352600195909501949186019186016200052c565b5060408a015190975094505050808311156200056f578384fd5b50506200057f868287016200042d565b9150509250925092565b604051601f8201601f191681016001600160401b0381118282101715620005b457620005b462000631565b604052919050565b60006001600160401b03821115620005d857620005d862000631565b5060051b60200190565b60008219821115620005f857620005f86200061b565b500190565b60006000198214156200061457620006146200061b565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b610d8380620006576000396000f3fe6080604052600436106100a05760003560e01c80639852595c116100645780639852595c1461015d578063b81f2db014610193578063ce7c2ac2146101b3578063db2d5841146101e9578063e33b7de314610209578063f2fde38b1461021e57600080fd5b806319165587146100ac5780633a98ef39146100ce578063715018a6146100f25780638b83209b146101075780638da5cb5b1461013f57600080fd5b366100a757005b600080fd5b3480156100b857600080fd5b506100cc6100c7366004610aa1565b61023e565b005b3480156100da57600080fd5b506002545b6040519081526020015b60405180910390f35b3480156100fe57600080fd5b506100cc61047f565b34801561011357600080fd5b50610127610122366004610bdd565b6104f3565b6040516001600160a01b0390911681526020016100e9565b34801561014b57600080fd5b506000546001600160a01b0316610127565b34801561016957600080fd5b506100df610178366004610aa1565b6001600160a01b031660009081526005602052604090205490565b34801561019f57600080fd5b506100cc6101ae366004610abb565b610506565b3480156101bf57600080fd5b506100df6101ce366004610aa1565b6001600160a01b031660009081526004602052604090205490565b3480156101f557600080fd5b506100cc610204366004610af6565b61059d565b34801561021557600080fd5b506003546100df565b34801561022a57600080fd5b506100cc610239366004610aa1565b6105ef565b6001600160a01b0381166000908152600460205260409020546102a85760405162461bcd60e51b815260206004820152601f60248201527f53706c69747465723a206163636f756e7420686173206e6f207368617265730060448201526064015b60405180910390fd5b6001546003546040516370a0823160e01b81523060048201526001600160a01b03909216916000919083906370a082319060240160206040518083038186803b1580156102f457600080fd5b505afa158015610308573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032c9190610bf5565b6103369190610c91565b6001600160a01b038416600090815260056020908152604080832054600254600490935290832054939450919261036d9085610cc9565b6103779190610ca9565b6103819190610ce8565b9050806103dc5760405162461bcd60e51b8152602060048201526024808201527f53706c69747465723a206163636f756e74206973206e6f7420647565207061796044820152631b595b9d60e21b606482015260840161029f565b6001600160a01b03841660009081526005602052604081208054839290610404908490610c91565b92505081905550806003600082825461041d9190610c91565b9091555061043790506001600160a01b03841685836106f5565b604080516001600160a01b0386168152602081018390527fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056910160405180910390a150505050565b6000546001600160a01b031633146104a95760405162461bcd60e51b815260040161029f90610c5c565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600061050060068361074c565b92915050565b6000546001600160a01b031633146105305760405162461bcd60e51b815260040161029f90610c5c565b604051631a87840160e11b8152600481018390523060248201526001600160a01b03828116604483015284169063350f080290606401600060405180830381600087803b15801561058057600080fd5b505af1158015610594573d6000803e3d6000fd5b50505050505050565b60005b81518110156105eb576105d98282815181106105cc57634e487b7160e01b600052603260045260246000fd5b602002602001015161023e565b806105e381610d2f565b9150506105a0565b5050565b6000546001600160a01b031633146106195760405162461bcd60e51b815260040161029f90610c5c565b6001600160a01b03811661067e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161029f565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006106ee836001600160a01b038416610758565b9392505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526107479084906107a7565b505050565b60006106ee8383610879565b600081815260018301602052604081205461079f57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610500565b506000610500565b60006107fc826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661090d9092919063ffffffff16565b805190915015610747578080602001905181019061081a9190610bbd565b6107475760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161029f565b815460009082106108d75760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e604482015261647360f01b606482015260840161029f565b8260000182815481106108fa57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b606061091c8484600085610924565b949350505050565b6060824710156109855760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161029f565b843b6109d35760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161029f565b600080866001600160a01b031685876040516109ef9190610c0d565b60006040518083038185875af1925050503d8060008114610a2c576040519150601f19603f3d011682016040523d82523d6000602084013e610a31565b606091505b5091509150610a41828286610a4c565b979650505050505050565b60608315610a5b5750816106ee565b825115610a6b5782518084602001fd5b8160405162461bcd60e51b815260040161029f9190610c29565b80356001600160a01b0381168114610a9c57600080fd5b919050565b600060208284031215610ab2578081fd5b6106ee82610a85565b600080600060608486031215610acf578182fd5b610ad884610a85565b925060208401359150610aed60408501610a85565b90509250925092565b60006020808385031215610b08578182fd5b823567ffffffffffffffff80821115610b1f578384fd5b818501915085601f830112610b32578384fd5b813581811115610b4457610b44610d60565b8060051b604051601f19603f83011681018181108582111715610b6957610b69610d60565b604052828152858101935084860182860187018a1015610b87578788fd5b8795505b83861015610bb057610b9c81610a85565b855260019590950194938601938601610b8b565b5098975050505050505050565b600060208284031215610bce578081fd5b815180151581146106ee578182fd5b600060208284031215610bee578081fd5b5035919050565b600060208284031215610c06578081fd5b5051919050565b60008251610c1f818460208701610cff565b9190910192915050565b6020815260008251806020840152610c48816040850160208701610cff565b601f01601f19169190910160400192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610ca457610ca4610d4a565b500190565b600082610cc457634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615610ce357610ce3610d4a565b500290565b600082821015610cfa57610cfa610d4a565b500390565b60005b83811015610d1a578181015183820152602001610d02565b83811115610d29576000848401525b50505050565b6000600019821415610d4357610d43610d4a565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea164736f6c6343000804000aa164736f6c6343000804000a';

export class SplitterFactory__factory extends ContractFactory {
    constructor(signer?: Signer) {
        super(_abi, _bytecode, signer);
    }

    deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<SplitterFactory> {
        return super.deploy(overrides || {}) as Promise<SplitterFactory>;
    }
    getDeployTransaction(
        overrides?: Overrides & { from?: string | Promise<string> }
    ): TransactionRequest {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address: string): SplitterFactory {
        return super.attach(address) as SplitterFactory;
    }
    connect(signer: Signer): SplitterFactory__factory {
        return super.connect(signer) as SplitterFactory__factory;
    }
    static readonly bytecode = _bytecode;
    static readonly abi = _abi;
    static createInterface(): SplitterFactoryInterface {
        return new utils.Interface(_abi) as SplitterFactoryInterface;
    }
    static connect(address: string, signerOrProvider: Signer | Provider): SplitterFactory {
        return new Contract(address, _abi, signerOrProvider) as SplitterFactory;
    }
}
