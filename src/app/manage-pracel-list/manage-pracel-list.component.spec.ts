import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePracelListComponent } from './manage-pracel-list.component';

describe('ManagePracelListComponent', () => {
  let component: ManagePracelListComponent;
  let fixture: ComponentFixture<ManagePracelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePracelListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePracelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
