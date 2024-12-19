import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import e from "express";
import { object } from "joi";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class ClientExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let error = exception.getError();
        if (typeof error === 'object' && 'error' in error) {
            error = error.error as object
            {
                if ('status' in error && 'message' in error) {
                    return response.status(error.status).json({
                        status: error.status,
                        message: error.message
                    })
                }
            }
        }

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message
        })
    }
}