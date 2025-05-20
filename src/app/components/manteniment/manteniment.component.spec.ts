import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimentComponent } from './manteniment.component';

describe('MantenimentComponent', () => {
  let component: MantenimentComponent;
  let fixture: ComponentFixture<MantenimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
