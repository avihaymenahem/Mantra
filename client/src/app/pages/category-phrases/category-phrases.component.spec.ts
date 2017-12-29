import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPhrasesComponent } from './category-phrases.component';

describe('CategoryPhrasesComponent', () => {
  let component: CategoryPhrasesComponent;
  let fixture: ComponentFixture<CategoryPhrasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPhrasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPhrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
