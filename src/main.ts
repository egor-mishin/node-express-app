import {App} from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import {LoggerService} from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {TYPES} from "./types";
import {IExceptionFilter} from "./errors/exception.filter.interface";

export const appBindings = new ContainerModule(( bind: interfaces.Bind ) => {
     bind<ILogger>(TYPES.Ilogger).to(LoggerService)
     bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
     bind<UsersController>(TYPES.UserController).to(UsersController)
     bind<App>(TYPES.Application).to(App)
})

function bootstrap(){
     const appContainer = new Container()
     appContainer.load(appBindings)
     const app = appContainer.get<App>(TYPES.Application)
     app.init()
     return {appContainer, app}

}

export const { app, appContainer } = bootstrap()


