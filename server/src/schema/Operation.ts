import {  Schema, model, SchemaOptions } from "mongoose";
import { IOperationDocument, IOperationModel } from "../interfaces/operation.interface";



const options: SchemaOptions = { timestamps: true };

export const operationSchema = new Schema<IOperationDocument, IOperationModel>(
  {
    socketId: { type: String, trim: true, required: true },
    operation: { type: String, trim: true, required: true },
    result: { type: String, trim: true, required: true },
  },
  options
);

export default model<IOperationDocument, IOperationModel>(
  "operations",
  operationSchema
);
