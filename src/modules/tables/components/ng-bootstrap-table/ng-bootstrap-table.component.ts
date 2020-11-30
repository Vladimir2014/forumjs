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
import { TableRecord } from 'src/modules/tables/models';
import { TableDataService } from 'src/modules/tables/services';
import { Observable } from 'rxjs';
import { NgbDatepickerKeyboardService } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 4;

    records$!: Observable<TableRecord[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    hideTableHead: false;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public tableDataService: TableDataService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.tableDataService.pageSize = this.pageSize;
        this.records$ = this.tableDataService.records$;
        this.total$ = this.tableDataService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.tableDataService.sortColumn = column;
        this.tableDataService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
}
