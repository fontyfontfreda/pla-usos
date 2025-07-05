import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpigrafComponent } from './epigraf.component';

describe('EpigrafComponent', () => {
  let component: EpigrafComponent;
  let fixture: ComponentFixture<EpigrafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpigrafComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpigrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
