/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
    ethers,
    EventFilter,
    Signer,
    BigNumber,
    BigNumberish,
    PopulatedTransaction,
    BaseContract,
    ContractTransaction,
    CallOverrides
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import { TypedEventFilter, TypedEvent, TypedListener } from './commons';

interface IRoyaltiesV2Interface extends ethers.utils.Interface {
    functions: {
        'getRoyalties(uint256)': FunctionFragment;
    };

    encodeFunctionData(functionFragment: 'getRoyalties', values: [BigNumberish]): string;

    decodeFunctionResult(functionFragment: 'getRoyalties', data: BytesLike): Result;

    events: {
        'RoyaltiesSet(uint256,tuple[])': EventFragment;
    };

    getEvent(nameOrSignatureOrTopic: 'RoyaltiesSet'): EventFragment;
}

export class IRoyaltiesV2 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;

    listeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
    ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
    off<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    on<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    once<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
    ): this;

    listeners(eventName?: string): Array<Listener>;
    off(eventName: string, listener: Listener): this;
    on(eventName: string, listener: Listener): this;
    once(eventName: string, listener: Listener): this;
    removeListener(eventName: string, listener: Listener): this;
    removeAllListeners(eventName?: string): this;

    queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
        event: TypedEventFilter<EventArgsArray, EventArgsObject>,
        fromBlockOrBlockhash?: string | number | undefined,
        toBlock?: string | number | undefined
    ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

    interface: IRoyaltiesV2Interface;

    functions: {
        getRoyalties(
            tokenId: BigNumberish,
            overrides?: CallOverrides
        ): Promise<[([string, BigNumber] & { account: string; value: BigNumber })[]]>;
    };

    getRoyalties(
        tokenId: BigNumberish,
        overrides?: CallOverrides
    ): Promise<([string, BigNumber] & { account: string; value: BigNumber })[]>;

    callStatic: {
        getRoyalties(
            tokenId: BigNumberish,
            overrides?: CallOverrides
        ): Promise<([string, BigNumber] & { account: string; value: BigNumber })[]>;
    };

    filters: {
        RoyaltiesSet(
            tokenId?: null,
            royalties?: null
        ): TypedEventFilter<
            [BigNumber, ([string, BigNumber] & { account: string; value: BigNumber })[]],
            {
                tokenId: BigNumber;
                royalties: ([string, BigNumber] & {
                    account: string;
                    value: BigNumber;
                })[];
            }
        >;
    };

    estimateGas: {
        getRoyalties(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };

    populateTransaction: {
        getRoyalties(
            tokenId: BigNumberish,
            overrides?: CallOverrides
        ): Promise<PopulatedTransaction>;
    };
}
