import { evaluate } from "../helpers/strings.helper";
import { IOperation } from "../interfaces/operation.interface";
import Operation from "../schema/Operation";
/**
 * returns operation result from the giving string
 * @param  {string} socketId
 * @param  {string} operationString
 */
export async function calculate({
  socketId,
  operationString,
}: {
  socketId: string;
  operationString: string;
}): Promise<number | undefined> {
  const result: number = evaluate(operationString);
  if (!result || Number.isNaN(result)) {
    throw new Error("Unprocessable entity");
  }
  try {
    await Operation.create({
      socketId,
      result,
      operation: operationString,
    });
    return result;
  } catch (e: any) {
    throw new Error(e.name);
  }
}
/**
 * returns the latest 10 operations executed by the given user (socketId)
 * @param  {string} socketId
 */
export const findHistory = async (socketId: string): Promise<IOperation[]> => {
  const operations = await Operation.find({ socketId })
    .limit(10)
    .select({ operation: 1, result: 1 })
    .sort({ _id: -1 })
    .lean();
  return operations;
};
