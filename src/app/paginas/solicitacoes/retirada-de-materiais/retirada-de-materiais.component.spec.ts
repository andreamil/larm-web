import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiradaDeMateriaisComponent } from './retirada-de-materiais.component';

describe('RetiradaDeMateriaisComponent', () => {
  let component: RetiradaDeMateriaisComponent;
  let fixture: ComponentFixture<RetiradaDeMateriaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiradaDeMateriaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiradaDeMateriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
