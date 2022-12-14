import { IOperation } from "../interfaces/operation.interface";
import Operation from "../schema/Operation";

const BigEval = require("bigeval");

export const calculate = async ({
  socketId,
  operationString,
}: {
  socketId: string;
  operationString: string;
}): Promise<string | undefined> => {
  const Obj = new BigEval();
  const result = Obj.exec(operationString);
  if (!result || result == "Error") return;
  await Operation.create({
    socketId,
    result,
    operation: operationString,
  });
  return result;
};

export const findHistory = async (socketId: string): Promise<IOperation[]> => {
  const operations = await Operation.find({ socketId })
    .limit(10)
    .sort({ _id: -1 })
    .lean();
  return operations;
};
