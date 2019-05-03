import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFSAddComponent } from './rfs-add.component';

describe('RFSAddComponent', () => {
  let component: RFSAddComponent;
  let fixture: ComponentFixture<RFSAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFSAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFSAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
