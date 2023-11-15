import { Omit, omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import logger from "../utils/logger";

export async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    logger.error(error);
    throw new Error();
  }
}

export async function validatePassword({
  email,
  password,
}: {
  // email: UserDocument["email"];
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
}
