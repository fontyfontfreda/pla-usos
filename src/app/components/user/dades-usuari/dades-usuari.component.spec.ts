import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadesUsuariComponent } from './dades-usuari.component';

describe('DadesUsuariComponent', () => {
  let component: DadesUsuariComponent;
  let fixture: ComponentFixture<DadesUsuariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadesUsuariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadesUsuariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
