import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  itemsAnterior:any[]=[];
  transform(items: any[], searchText: string,limit:number): any[] {
    console.log(items);
    
    if(!items) return [];
    if(!searchText) if(limit)return items.slice(0,limit);
                    else return items;
    searchText = searchText.toLowerCase();
    let returnItems= items.filter( it => {
      return it.fullName.toLowerCase().includes(searchText)
          ||(it.matricula&&it.matricula.includes(searchText))
          ||(it.siape&&it.siape.includes(searchText))
          ||(it.role&&it.role.filter(r=>r.includes(searchText)).length);
    });/*
    if(returnItems.length){
      this.itemsAnterior=returnItems;*/
      if(limit)return returnItems.slice(0,limit);
      else return returnItems;
    /*}
    else {
      return this.itemsAnterior;
    }*/
   }
}