import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchDictionary: string[] = [];
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("assets/data.json").subscribe(data => {
      this.searchDictionary = data.toString().split(',').sort();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchDictionary.filter(option => option.toLowerCase().includes(filterValue));
  }
}
