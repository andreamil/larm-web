import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenciaForaDoHorarioComponent } from './permanencia-fora-do-horario.component';

describe('PermanenciaForaDoHorarioComponent', () => {
  let component: PermanenciaForaDoHorarioComponent;
  let fixture: ComponentFixture<PermanenciaForaDoHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenciaForaDoHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenciaForaDoHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
