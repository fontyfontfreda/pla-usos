import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacioComponent } from './notificacio.component';

describe('NotificacioComponent', () => {
  let component: NotificacioComponent;
  let fixture: ComponentFixture<NotificacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
