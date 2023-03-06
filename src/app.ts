import express, {Express} from "express"
import { Server } from 'http'
import {UsersController} from "./users/users.controller"
import {ExceptionFilter} from "./errors/exception.filter"
import {ILogger} from "./logger/logger.interface"
import {inject, injectable} from "inversify";
import {TYPES} from "./types";

@injectable()
export class  App {
    app: Express
    port: number
    server: Server
    constructor(
        @inject(TYPES.Ilogger)  private logger: ILogger,
        @inject(TYPES.UserController)  private userController: UsersController,
        @inject(TYPES.ExceptionFilter)  private exceptionFilter: ExceptionFilter,
        @inject(TYPES.Ilogger)  private loggerService: ILogger,
    ) {
        this.app = express()
        this.port = 8000
    }

    public useExceptionFilters(){
            this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public useRoutes() {
        this.app.use('./users', this.userController.router )
    }
    public async init() {
        this.useRoutes()
        this.useExceptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log(`Server is running on http://localhost:${this.port}`)

    }
}
