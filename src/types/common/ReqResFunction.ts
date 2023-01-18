import { Request, Response } from "express";

/**
 * Function type that takes request & response then retuns a void promise
 */
export type ReqResFunction = (req: Request, res: Response) => Promise<void>;
