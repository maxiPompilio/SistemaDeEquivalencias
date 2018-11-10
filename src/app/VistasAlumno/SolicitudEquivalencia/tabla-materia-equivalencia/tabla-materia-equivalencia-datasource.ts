import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TablaMateriaEquivalenciaItem {
  plan: string;
  materiaUNGS: string;
  materia: string;
  universidad: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablaMateriaEquivalenciaItem[] = [
  {id: 1,universidad: "UTN",materia: "Matematica magica", materiaUNGS: "Cálculo para la computacion",plan: "si"},
  {id: 2,universidad: "UBA",materia: "Defensa de las artes oscuras", materiaUNGS: "Programación 1",plan: "si"},
  {id: 3,universidad: "UTN",materia: "Fisica", materiaUNGS: "Matemática discreta",plan: "no"}
];

/**
 * Data source for the TablaMateriaEquivalencia view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablaMateriaEquivalenciaDataSource extends DataSource<TablaMateriaEquivalenciaItem> {
  data: TablaMateriaEquivalenciaItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }
 

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
   
   add(universidadInput: string,materiaCursoInput: string,materiaUNGSInput: string, planInput: string){
     this.data.push({id:this.data.length+1,universidad: universidadInput,
                   materia: materiaCursoInput, materiaUNGS: materiaUNGSInput, plan: planInput});
   }

   delete(id: number){

    this.data.splice(id-1,1);
    
    var arr={};
    var arr2=[];

    //guardo los valores
    for (var i = 0; i < this.data.length; ++i) {
      arr=Object.values(this.data[i]);
      
      arr[0]=i+1;

      arr2.push(arr[0]);
      arr2.push(arr[1]);
      arr2.push(arr[2]);
      arr2.push(arr[3]);
      arr2.push(arr[4]);
      
      console.log(arr);
    }
    //borro array
     while (this.data.length) { 
       this.data.pop(); 
     }
    //cargo de nuevo los datos
    for (var i = 0; i < arr2.length-1; i=i+5) {
      this.data.push({id:arr2[i],universidad: arr2[i+1], materia: arr2[i+2], materiaUNGS: arr2[i+3], plan: arr2[i+4]});
    }


   }



  connect(): Observable<TablaMateriaEquivalenciaItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TablaMateriaEquivalenciaItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TablaMateriaEquivalenciaItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'materia': return compare(a.materia, b.materia, isAsc);
        case 'materiaUNGS': return compare(+a.materiaUNGS, +b.materiaUNGS, isAsc);
        default: return 0;
      }
    });
  }

}


/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
