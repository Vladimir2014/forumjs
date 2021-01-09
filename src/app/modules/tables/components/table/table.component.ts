import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '../../../tables/directives';
import { TableDataService } from '../../../tables/services';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'ng-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './table.component.html',
    styleUrls: ['table.component.scss'],
})
export class TableComponent implements OnInit {
    @Input() records: Subject<any>;
    @Input() headerFields: Array<any>;
    @Input() tableBodyTemplate: TemplateRef<any>; 
    @Input() pageSize = 5;

    records$!: Observable<any[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    hideTableHead: false;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public tableDataService: TableDataService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.tableDataService.pageSize = this.pageSize;
        this.records$ = this.tableDataService.records$;
        this.total$ = this.tableDataService.total$;
     
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
