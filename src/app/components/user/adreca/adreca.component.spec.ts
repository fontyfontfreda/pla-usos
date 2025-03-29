import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadesAdrecaComponent } from './adreca.component';

describe('DadesAdrecaComponent', () => {
  let component: DadesAdrecaComponent;
  let fixture: ComponentFixture<DadesAdrecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadesAdrecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadesAdrecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
