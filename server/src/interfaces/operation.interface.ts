import { Model, Types } from "mongoose";

export interface IOperation {
    socketId: string;
    operation: string;
    result: string;
  }
  
  export interface IOperationDocument extends IOperation, Document {
    readonly: {
      _id: Types.ObjectId;
      socketId: string;
      operation: string;
      result: string;
    };
  }
  export type IOperationModel = Model<IOperationDocument>;