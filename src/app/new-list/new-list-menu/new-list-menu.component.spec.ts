import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListMenuComponent } from './new-list-menu.component';

describe('NewListMenuComponent', () => {
  let component: NewListMenuComponent;
  let fixture: ComponentFixture<NewListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewListMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
