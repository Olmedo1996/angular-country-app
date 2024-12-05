import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = 'Buscar';

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue() {
    const term = this.txtSearch.nativeElement.value
    this.onValue.emit(term);
  }
}
