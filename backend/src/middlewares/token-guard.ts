import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import { UserService } from '../service/user.service';

const userService = new UserService();

export const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
    const header = headers.authorization as string;

    if (!header)
        return header;

    return header;
};

export const tokenGuard: (() => RequestHandler) = (() => (req, res, next) => {

    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || '';
    const hasAccess = userService.verifyToken(token);

    hasAccess.then(acs => {
        if (!acs) {
            return res.status(403).send({ message: 'No access authority' });
        }

        next();
    });
});
