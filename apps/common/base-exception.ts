import { Catch, HttpException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { throwError } from "rxjs";

Catch(HttpException)
export class HttpToRCPExceptionFilter {
    catch(exception: HttpException) {
        return throwError(() => new RpcException(exception))
    }
}