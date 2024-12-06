import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit{
  private debouncer = new Subject<string>();

  @Input()
  public placeholder: string = 'Buscar';

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => this.onDebounce.emit(value));
  }

  emitValue() {
    const term = this.txtSearch.nativeElement.value
    this.onValue.emit(term);
  }

  onKeyPress() {
    const searchTerm = this.txtSearch.nativeElement.value
    this.debouncer.next(searchTerm);
  }
}
