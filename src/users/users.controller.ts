import {baseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error.class";

export class UsersController extends baseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login }
        ])
    }

    login(req: Request, res: Response, next: NextFunction){
        new HttpError(401, 'Auth error')
        // this.ok(res, 'login')
    }

    register(req: Request, res: Response, next: NextFunction){
        this.ok(res, 'register')
    }
}


