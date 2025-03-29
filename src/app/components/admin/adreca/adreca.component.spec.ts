import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrecaComponent } from './adreca.component';

describe('AdrecaComponent', () => {
  let component: AdrecaComponent;
  let fixture: ComponentFixture<AdrecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdrecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdrecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
