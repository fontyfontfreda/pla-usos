import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacioComponent } from './presentacio.component';

describe('PresentacioComponent', () => {
  let component: PresentacioComponent;
  let fixture: ComponentFixture<PresentacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentacioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
