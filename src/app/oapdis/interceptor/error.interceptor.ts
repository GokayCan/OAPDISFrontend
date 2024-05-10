import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()


export class ErrorInterceptor implements HttpInterceptor {

    constructor(private messsageService: MessageService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError((error) => {
            switch (error.status) {
                case 0:
                    this.messsageService.add({ severity: 'error', summary: 'Hata', detail: 'Sunucu Bağlantısı Yok' });
                    break;
                case HttpStatusCode.Unauthorized:
                    this.messsageService.add({ severity: 'error', summary: 'Hata', detail: 'Yetkisiz İşlem' });
                    break;
                case HttpStatusCode.InternalServerError:
                    this.messsageService.add({ severity: 'error', summary: 'Hata', detail: error.error.Message });
                    break;
                case HttpStatusCode.BadRequest:
                    this.messsageService.add({ severity: 'error', summary: 'Hata', detail: error.error });
                    break;
                default:
                    this.messsageService.add({ severity: 'error', summary: 'Hata', detail: 'Beklenmeyen Hata' });
                    break;
            }
            return throwError(error);
        }));
    }
}
