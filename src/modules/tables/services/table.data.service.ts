import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { COUNTRIES } from 'src/modules/tables/data/countries';
import { SortDirection } from 'src/modules/tables/directives';
import { TableRecord } from 'src/modules/tables/models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
    records: TableRecord[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(records: TableRecord[], column: string, direction: string): TableRecord[] {
    if (direction === '') {
        return records;
    } else {
        return [...records].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(record: TableRecord, term: string, pipe: PipeTransform) {
    return ( //TODO: fix fields
        record.name.toLowerCase().includes(term.toLowerCase()) ||
        pipe.transform(record.area).includes(term) ||
        pipe.transform(record.population).includes(term)
    );
}

@Injectable({ providedIn: 'root' })
export class TableDataService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _records$ = new BehaviorSubject<TableRecord[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private pipe: DecimalPipe) {
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(120),
                switchMap(() => this._search()),
                delay(120),
                tap(() => this._loading$.next(false))
            )
            .subscribe(result => {
                this._records$.next(result.records);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get records$() {
        return this._records$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let records = sort(COUNTRIES, sortColumn, sortDirection);

        // 2. filter
        records = records.filter(country => matches(country, searchTerm, this.pipe));
        const total = records.length;

        // 3. paginate
        records = records.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ records, total });
    }
}
