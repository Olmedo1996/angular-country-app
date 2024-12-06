import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = 'Buscar';

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
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
