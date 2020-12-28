import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from 'src/modules/tables/directives';
import { Field, TableRecord } from 'src/modules/tables/models';
import { TableDataService } from 'src/modules/tables/services';
import { Observable, Subject } from 'rxjs';
import { NgbDatepickerKeyboardService } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ng-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './table.component.html',
    styleUrls: ['table.component.scss'],
})
export class TableComponent implements OnInit {
    @Input() records: Subject<any>;
    @Input() fields: Array<Field>;
    @Input() pageSize = 5;

    records$!: Observable<TableRecord[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    hideTableHead: false;
    headerFields: any[];

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public tableDataService: TableDataService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.tableDataService.fields = this.fields;
        this.tableDataService.pageSize = this.pageSize;
        this.records$ = this.tableDataService.records$;
        this.total$ = this.tableDataService.total$;
        this.headerFields = this.fields;
     
        this.records.subscribe(data => this.tableDataService.setOriginalRecords(data));
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.tableDataService.sortColumn = column;
        this.tableDataService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
}
