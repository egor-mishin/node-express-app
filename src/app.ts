import express, {Express} from "express"
import { Server } from 'http'
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
export class  App {
    app: Express
    port: number
    server: Server
    logger: LoggerService
    userController: UsersController;
    exceptionFilter: ExceptionFilter
    constructor(logger: LoggerService, userController: UsersController, exceptionFilter: ExceptionFilter) {
        this.app = express()
        this.port = 8000
        this.logger = logger
        this.userController = userController
        this.exceptionFilter = exceptionFilter
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
