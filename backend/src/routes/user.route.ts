import { Request, Response, Router } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import { getTokenFromHeaders } from '../middlewares/token-guard';

import { UserService } from '../service/user.service';

export const userRouter = Router();
const userService = new UserService();

userRouter.get("/users", async (req: Request, res: Response): Promise<Response> => {
    const data = await userService.getUsers();
    return res.status(200).json(data);
});

userRouter.post("/register", async (req: Request, res: Response): Promise<Response> => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const data = await userService.registerUser(name, email, password);
    return res.status(200).json(data);
});

userRouter.post("/login", async (req: Request, res: Response): Promise<Response> => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    const email = req.body.email;
    const password = req.body.password;

    const data = await userService.login(email, password);
    return res.status(200).json(data);
});

userRouter.get("/logout", async (req: Request, res: Response): Promise<Response> => {
    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || '';

    const data = await userService.logout(token);
    return res.status(200).json(data);
});
