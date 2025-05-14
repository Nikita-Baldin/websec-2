import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationScheduleComponent } from './station-schedule.component';

describe('StationScheduleComponent', () => {
  let component: StationScheduleComponent;
  let fixture: ComponentFixture<StationScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
