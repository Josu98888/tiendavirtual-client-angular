import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPagesComponent } from './container-pages.component';

describe('ContainerPagesComponent', () => {
  let component: ContainerPagesComponent;
  let fixture: ComponentFixture<ContainerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
