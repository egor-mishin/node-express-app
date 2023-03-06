import {baseController} from "../common/base.controller";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error.class";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";
import 'reflect-metadata'
import {IUserController} from "./users.controller.interface";
@injectable()
export class UsersController extends baseController implements IUserController{
    constructor(@inject(TYPES.Ilogger)  private loggerService: ILogger) {
        super(loggerService);
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


