import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Specification } from './specification.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SpecificationService {

    private resourceUrl = 'api/specifications';
    private resourceSearchUrl = 'api/_search/specifications';

    constructor(private http: Http) { }

    create(specification: Specification): Observable<Specification> {
        const copy = this.convert(specification);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(specification: Specification): Observable<Specification> {
        const copy = this.convert(specification);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Specification> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(specification: Specification): Specification {
        const copy: Specification = Object.assign({}, specification);
        return copy;
    }
}
