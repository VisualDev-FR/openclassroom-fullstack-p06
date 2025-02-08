import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MddButtonComponent } from './mdd-button.component';

describe('MddButtonComponent', () => {
  let component: MddButtonComponent;
  let fixture: ComponentFixture<MddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MddButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
