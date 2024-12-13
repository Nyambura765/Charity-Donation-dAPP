/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace CampaignDonation {
  export type DonationStruct = {
    donor: AddressLike;
    amount: BigNumberish;
    timestamp: BigNumberish;
  };

  export type DonationStructOutput = [
    donor: string,
    amount: bigint,
    timestamp: bigint
  ] & { donor: string; amount: bigint; timestamp: bigint };
}

export interface CampaignDonationInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addCampaignUpdate"
      | "campaigns"
      | "createCampaign"
      | "donateToCampaign"
      | "donations"
      | "getCampaignUpdates"
      | "getDonationHistory"
      | "nextCampaignId"
      | "updateCampaignStatus"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CampaignCreated"
      | "CampaignStatusUpdated"
      | "CampaignUpdated"
      | "DonationReceived"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addCampaignUpdate",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "campaigns",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCampaign",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "donateToCampaign",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "donations",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCampaignUpdates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDonationHistory",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextCampaignId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateCampaignStatus",
    values: [BigNumberish, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "addCampaignUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "campaigns", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "donateToCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "donations", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCampaignUpdates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDonationHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextCampaignId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCampaignStatus",
    data: BytesLike
  ): Result;
}

export namespace CampaignCreatedEvent {
  export type InputTuple = [
    id: BigNumberish,
    creator: AddressLike,
    title: string,
    targetAmount: BigNumberish
  ];
  export type OutputTuple = [
    id: bigint,
    creator: string,
    title: string,
    targetAmount: bigint
  ];
  export interface OutputObject {
    id: bigint;
    creator: string;
    title: string;
    targetAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CampaignStatusUpdatedEvent {
  export type InputTuple = [id: BigNumberish, active: boolean];
  export type OutputTuple = [id: bigint, active: boolean];
  export interface OutputObject {
    id: bigint;
    active: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CampaignUpdatedEvent {
  export type InputTuple = [id: BigNumberish, updateMessage: string];
  export type OutputTuple = [id: bigint, updateMessage: string];
  export interface OutputObject {
    id: bigint;
    updateMessage: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DonationReceivedEvent {
  export type InputTuple = [
    campaignId: BigNumberish,
    donor: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [campaignId: bigint, donor: string, amount: bigint];
  export interface OutputObject {
    campaignId: bigint;
    donor: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CampaignDonation extends BaseContract {
  connect(runner?: ContractRunner | null): CampaignDonation;
  waitForDeployment(): Promise<this>;

  interface: CampaignDonationInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addCampaignUpdate: TypedContractMethod<
    [_id: BigNumberish, _updateMessage: string],
    [void],
    "nonpayable"
  >;

  campaigns: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, string, bigint, bigint, boolean] & {
        id: bigint;
        creator: string;
        title: string;
        description: string;
        targetAmount: bigint;
        totalDonated: bigint;
        active: boolean;
      }
    ],
    "view"
  >;

  createCampaign: TypedContractMethod<
    [_title: string, _description: string, _targetAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  donateToCampaign: TypedContractMethod<[_id: BigNumberish], [void], "payable">;

  donations: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [string, bigint, bigint] & {
        donor: string;
        amount: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  getCampaignUpdates: TypedContractMethod<
    [_id: BigNumberish],
    [string[]],
    "view"
  >;

  getDonationHistory: TypedContractMethod<
    [_id: BigNumberish],
    [CampaignDonation.DonationStructOutput[]],
    "view"
  >;

  nextCampaignId: TypedContractMethod<[], [bigint], "view">;

  updateCampaignStatus: TypedContractMethod<
    [_id: BigNumberish, _active: boolean],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addCampaignUpdate"
  ): TypedContractMethod<
    [_id: BigNumberish, _updateMessage: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "campaigns"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, string, bigint, bigint, boolean] & {
        id: bigint;
        creator: string;
        title: string;
        description: string;
        targetAmount: bigint;
        totalDonated: bigint;
        active: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "createCampaign"
  ): TypedContractMethod<
    [_title: string, _description: string, _targetAmount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "donateToCampaign"
  ): TypedContractMethod<[_id: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "donations"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [string, bigint, bigint] & {
        donor: string;
        amount: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getCampaignUpdates"
  ): TypedContractMethod<[_id: BigNumberish], [string[]], "view">;
  getFunction(
    nameOrSignature: "getDonationHistory"
  ): TypedContractMethod<
    [_id: BigNumberish],
    [CampaignDonation.DonationStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "nextCampaignId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "updateCampaignStatus"
  ): TypedContractMethod<
    [_id: BigNumberish, _active: boolean],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "CampaignCreated"
  ): TypedContractEvent<
    CampaignCreatedEvent.InputTuple,
    CampaignCreatedEvent.OutputTuple,
    CampaignCreatedEvent.OutputObject
  >;
  getEvent(
    key: "CampaignStatusUpdated"
  ): TypedContractEvent<
    CampaignStatusUpdatedEvent.InputTuple,
    CampaignStatusUpdatedEvent.OutputTuple,
    CampaignStatusUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "CampaignUpdated"
  ): TypedContractEvent<
    CampaignUpdatedEvent.InputTuple,
    CampaignUpdatedEvent.OutputTuple,
    CampaignUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "DonationReceived"
  ): TypedContractEvent<
    DonationReceivedEvent.InputTuple,
    DonationReceivedEvent.OutputTuple,
    DonationReceivedEvent.OutputObject
  >;

  filters: {
    "CampaignCreated(uint256,address,string,uint256)": TypedContractEvent<
      CampaignCreatedEvent.InputTuple,
      CampaignCreatedEvent.OutputTuple,
      CampaignCreatedEvent.OutputObject
    >;
    CampaignCreated: TypedContractEvent<
      CampaignCreatedEvent.InputTuple,
      CampaignCreatedEvent.OutputTuple,
      CampaignCreatedEvent.OutputObject
    >;

    "CampaignStatusUpdated(uint256,bool)": TypedContractEvent<
      CampaignStatusUpdatedEvent.InputTuple,
      CampaignStatusUpdatedEvent.OutputTuple,
      CampaignStatusUpdatedEvent.OutputObject
    >;
    CampaignStatusUpdated: TypedContractEvent<
      CampaignStatusUpdatedEvent.InputTuple,
      CampaignStatusUpdatedEvent.OutputTuple,
      CampaignStatusUpdatedEvent.OutputObject
    >;

    "CampaignUpdated(uint256,string)": TypedContractEvent<
      CampaignUpdatedEvent.InputTuple,
      CampaignUpdatedEvent.OutputTuple,
      CampaignUpdatedEvent.OutputObject
    >;
    CampaignUpdated: TypedContractEvent<
      CampaignUpdatedEvent.InputTuple,
      CampaignUpdatedEvent.OutputTuple,
      CampaignUpdatedEvent.OutputObject
    >;

    "DonationReceived(uint256,address,uint256)": TypedContractEvent<
      DonationReceivedEvent.InputTuple,
      DonationReceivedEvent.OutputTuple,
      DonationReceivedEvent.OutputObject
    >;
    DonationReceived: TypedContractEvent<
      DonationReceivedEvent.InputTuple,
      DonationReceivedEvent.OutputTuple,
      DonationReceivedEvent.OutputObject
    >;
  };
}
