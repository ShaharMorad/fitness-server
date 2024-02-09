import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    const { path, params, body } = req;
    req
    console.log({ path, params, body, req });
    next();
};