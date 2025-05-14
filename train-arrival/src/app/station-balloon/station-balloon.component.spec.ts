import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationBalloonComponent } from './station-balloon.component';

describe('StationBalloonComponent', () => {
  let component: StationBalloonComponent;
  let fixture: ComponentFixture<StationBalloonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationBalloonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
