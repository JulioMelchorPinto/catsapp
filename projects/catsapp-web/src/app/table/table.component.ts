import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import { Breed } from './breed';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Breed>;

    dataSource: TableDataSource;
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
/*     displayedColumns = ['breed', 'country', 'origin', 'coat', 'pattern'];
 */    displayedColumns = ['breed', 'country', 'origin'];

    ngOnInit() {
        this.dataSource = new TableDataSource();
    }
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
}
