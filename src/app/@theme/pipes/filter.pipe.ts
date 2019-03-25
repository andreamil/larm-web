import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  itemsAnterior:any[]=[];
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
    let returnItems= items.filter( it => {
      return it.fullName.toLowerCase().includes(searchText)
          ||(it.matricula&&it.matricula.includes(searchText))
          ||(it.role.filter(r=>r.includes(searchText)).length);
    });/*
    if(returnItems.length){
      this.itemsAnterior=returnItems;*/
      return returnItems;
    /*}
    else {
      return this.itemsAnterior;
    }*/
   }
}