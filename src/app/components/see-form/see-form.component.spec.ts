import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFormComponent } from './see-form.component';

describe('SeeFormComponent', () => {
  let component: SeeFormComponent;
  let fixture: ComponentFixture<SeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeFormComponent]
    });
    fixture = TestBed.createComponent(SeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
