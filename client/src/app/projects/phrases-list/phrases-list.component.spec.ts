import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasesListComponent } from './phrases-list.component';

describe('PhrasesListComponent', () => {
  let component: PhrasesListComponent;
  let fixture: ComponentFixture<PhrasesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
