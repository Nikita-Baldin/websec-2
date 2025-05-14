import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnmapComponent } from './onmap.component';

describe('OnmapComponent', () => {
  let component: OnmapComponent;
  let fixture: ComponentFixture<OnmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
