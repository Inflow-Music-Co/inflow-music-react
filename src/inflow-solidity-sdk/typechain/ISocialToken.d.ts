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
    Overrides,
    CallOverrides
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import { TypedEventFilter, TypedEvent, TypedListener } from './commons';

interface ISocialTokenInterface extends ethers.utils.Interface {
    functions: {
        'allowance(address,address)': FunctionFragment;
        'approve(address,uint256)': FunctionFragment;
        'balanceOf(address)': FunctionFragment;
        'burn(uint256)': FunctionFragment;
        'getBurnPrice(uint256)': FunctionFragment;
        'getCreatorFee(uint256)': FunctionFragment;
        'getMintPrice(uint256)': FunctionFragment;
        'mint(uint256)': FunctionFragment;
        'totalSupply()': FunctionFragment;
        'transfer(address,uint256)': FunctionFragment;
        'transferFrom(address,address,uint256)': FunctionFragment;
        'withdraw()': FunctionFragment;
    };

    encodeFunctionData(functionFragment: 'allowance', values: [string, string]): string;
    encodeFunctionData(functionFragment: 'approve', values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string;
    encodeFunctionData(functionFragment: 'burn', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getBurnPrice', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getCreatorFee', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getMintPrice', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'mint', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string;
    encodeFunctionData(functionFragment: 'transfer', values: [string, BigNumberish]): string;
    encodeFunctionData(
        functionFragment: 'transferFrom',
        values: [string, string, BigNumberish]
    ): string;
    encodeFunctionData(functionFragment: 'withdraw', values?: undefined): string;

    decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getBurnPrice', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getCreatorFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getMintPrice', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;

    events: {
        'Approval(address,address,uint256)': EventFragment;
        'Burned(address,uint256,uint256,uint256,uint256)': EventFragment;
        'Minted(address,uint256,uint256,uint256,uint256,uint256)': EventFragment;
        'Transfer(address,address,uint256)': EventFragment;
    };

    getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Burned'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Minted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
}

export class ISocialToken extends BaseContract {
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

    interface: ISocialTokenInterface;

    functions: {
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<[BigNumber]>;

        approve(
            spender: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

        burn(
            arg0: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        getBurnPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

        getCreatorFee(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

        getMintPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

        mint(
            arg0: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

        transfer(
            recipient: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        transferFrom(
            sender: string,
            recipient: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        withdraw(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;
    };

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;

    approve(
        spender: string,
        amount: BigNumberish,
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
        arg0: BigNumberish,
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBurnPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getCreatorFee(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getMintPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    mint(
        arg0: BigNumberish,
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
        recipient: string,
        amount: BigNumberish,
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
        sender: string,
        recipient: string,
        amount: BigNumberish,
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    callStatic: {
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;

        approve(spender: string, amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

        balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

        burn(arg0: BigNumberish, overrides?: CallOverrides): Promise<void>;

        getBurnPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

        getCreatorFee(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

        getMintPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

        mint(arg0: BigNumberish, overrides?: CallOverrides): Promise<void>;

        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

        transfer(
            recipient: string,
            amount: BigNumberish,
            overrides?: CallOverrides
        ): Promise<boolean>;

        transferFrom(
            sender: string,
            recipient: string,
            amount: BigNumberish,
            overrides?: CallOverrides
        ): Promise<boolean>;

        withdraw(overrides?: CallOverrides): Promise<void>;
    };

    filters: {
        Approval(
            owner?: string | null,
            spender?: string | null,
            value?: null
        ): TypedEventFilter<
            [string, string, BigNumber],
            { owner: string; spender: string; value: BigNumber }
        >;

        Burned(
            burner?: string | null,
            amount?: BigNumberish | null,
            burnPrice?: BigNumberish | null,
            tokenSupply?: null,
            reserve?: null
        ): TypedEventFilter<
            [string, BigNumber, BigNumber, BigNumber, BigNumber],
            {
                burner: string;
                amount: BigNumber;
                burnPrice: BigNumber;
                tokenSupply: BigNumber;
                reserve: BigNumber;
            }
        >;

        Minted(
            minter?: string | null,
            amount?: BigNumberish | null,
            mintPrice?: BigNumberish | null,
            tokenSupply?: null,
            royaltyPaid?: null,
            reserve?: null
        ): TypedEventFilter<
            [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
            {
                minter: string;
                amount: BigNumber;
                mintPrice: BigNumber;
                tokenSupply: BigNumber;
                royaltyPaid: BigNumber;
                reserve: BigNumber;
            }
        >;

        Transfer(
            from?: string | null,
            to?: string | null,
            value?: null
        ): TypedEventFilter<
            [string, string, BigNumber],
            { from: string; to: string; value: BigNumber }
        >;
    };

    estimateGas: {
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;

        approve(
            spender: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

        burn(
            arg0: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        getBurnPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

        getCreatorFee(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

        getMintPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

        mint(
            arg0: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

        transfer(
            recipient: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        transferFrom(
            sender: string,
            recipient: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        withdraw(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
    };

    populateTransaction: {
        allowance(
            owner: string,
            spender: string,
            overrides?: CallOverrides
        ): Promise<PopulatedTransaction>;

        approve(
            spender: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        balanceOf(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

        burn(
            arg0: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        getBurnPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

        getCreatorFee(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

        getMintPrice(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

        mint(
            arg0: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        transfer(
            recipient: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        transferFrom(
            sender: string,
            recipient: string,
            amount: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        withdraw(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;
    };
}
