import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchDictionary: string[] = [];
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  searchForm = this.formBuilder.group({
    searchValue: ['']
  });

  constructor(
    private httpClient: HttpClient, 
    private formBuilder: FormBuilder
  ) { }

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

  onSubmit(): void {
    let word = this._formatSearchWordToQuery(this.myControl.value);
    window.open(`https://www.google.com/search?q=${word}`, '_blank');
    this.searchForm.reset();
  }

  private _formatSearchWordToQuery(searchWord: string): string {
    searchWord = searchWord.split(' ').join('+');
    searchWord = searchWord.split(':').join('%3A');
    return searchWord;
  }
}
