import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
function routes(app: Express) {
  app.get("/health", (req: Request, res: Response) => res.sendStatus(200));
  app.post(
    "/api/user",
    validateResource(createUserSchema) as any,
    createUserHandler
  );

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema) as any,
    createUserSessionHandler
  );
}

export default routes;
