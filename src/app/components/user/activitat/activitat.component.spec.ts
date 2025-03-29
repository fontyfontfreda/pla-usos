import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitatComponent } from './activitat.component';

describe('ActivitatComponent', () => {
  let component: ActivitatComponent;
  let fixture: ComponentFixture<ActivitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
