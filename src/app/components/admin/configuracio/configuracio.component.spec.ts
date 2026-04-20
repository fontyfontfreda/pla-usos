import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracioComponent } from './configuracio.component';

describe('ConfiguracioComponent', () => {
  let component: ConfiguracioComponent;
  let fixture: ComponentFixture<ConfiguracioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
