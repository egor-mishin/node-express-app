import {NextFunction, Request, Response} from "express"
import {LoggerService} from "../logger/logger.service"
import {IExceptionFilter} from "./exception.filter.interface"
import {HttpError} from "./http-error.class"
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface";
import {TYPES} from "../types";
import 'reflect-metadata'


@injectable()
export class ExceptionFilter implements IExceptionFilter {

    constructor(@inject(TYPES.Ilogger)  private logger: ILogger) {
    }

    catch(error: Error | HttpError , req: Request, res: Response, next: NextFunction) {
        if(error instanceof HttpError){
        this.logger.error(`[${error.context}] Error: ${error.statusCode} ${error.message}`)
        res.status(error.statusCode).send({err: error.message})
        } else {
            this.logger.error(error.message)
            res.status(500).send({err: error.message})
        }
    }
}
