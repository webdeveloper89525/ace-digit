import { User } from "../model/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export class UserService {
    private readonly _saltRounds = 12;
    private readonly _jwtSecret = '0.rfyj3n9nzh';

    constructor() {}

    async getUsers() {
        try {
            const allUsers: User[] = await User.findAll();
            return {hasError: false, data: allUsers};
        } catch (err) {
            return {hasError: true, error: err, message: "Failed to get all users."};
        }
    }

    async registerUser(name: string, email: string, password: string) {

        const existedUser = await User.findOne({ where: { email } });
        if (existedUser) {
            return {hasError: true, message: "The Email is already existed.", error: null};
        }

        try {
            const hash = await bcrypt.hash(password, this._saltRounds);
            const user: User = await User.create({
                name: name,
                email: email,
                password: hash,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            return {hasError: false, data: user};
        } catch (err) {
            return {hasError: true, error: err, message: "Failed to create the new user."};
        }
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return {hasError: true, message: "The Email is not existed.", error: null};
        }

        const plainUser = user?.get({ plain:true });

        const result = await bcrypt.compare(password, plainUser.password);
        if (!result) {
            return {hasError: true, message: "The Password is not correct.", error: null};
        }

        const id = user.id;
        const token = jwt.sign({id, email}, this._jwtSecret);

        await User.update({token: token}, {
            where: {
                id: id
            }
        });

        const userData = {
            name: plainUser.name,
            email: plainUser.email,
            id: plainUser.id
        }

        return {hasError: false, token: token, data: userData};
    }

    async verifyToken(token: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const {id} = jwt.verify(token, this._jwtSecret) as JwtPayload;

                if (!id) {
                    resolve(false);
                    return;
                }

                const user = await User.findOne({ where: { id } });
        
                if (!user) {
                    resolve(false);
                    return;
                }

                const plainUser = user?.get({ plain:true });
                if (plainUser.token === token) {
                    resolve(true);
                    return;
                } else {
                    resolve(false);
                    return;
                }
            } catch (err) {
                resolve(false);
                return;
            }
        }) as Promise<boolean>;
    }

    async logout(token: string) {
        if (!(token.length > 0)) {
            return {hasError: true, message: "Token is empty."}
        }

        try {
            const {id} = jwt.verify(token, this._jwtSecret) as JwtPayload;

            if (!id) {
                return {hasError: true, message: "The user is not existed."};
            }
            
            await User.update({token: ''}, {
                where: {
                    id: id
                }
            });
            
            return {hasError: false, message: "You have been logged out."};
        } catch(err) {
            return {hasError: true, message: "Token is invalid"};
        }
    }

};
