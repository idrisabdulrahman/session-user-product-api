// import { Response, Request } from "express";
// import logger from "../utils/logger";
// import { omit } from "lodash";
// import { createUser } from "../service/user.service";
// import { CreateUserInput } from "../schema/user.schema";

// export async function createUserHandler(
//   req: Request<{}, {}, CreateUserInput["body"]>,
//   res: Response
// ) {
//   try {
//     const user = await createUser(req.body);
//     return res.send(omit(user.toJSON(), "password"));
//   } catch (error) {
//     logger.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
