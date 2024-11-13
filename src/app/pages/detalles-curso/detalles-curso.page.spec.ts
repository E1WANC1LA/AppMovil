import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesCursoPage } from './detalles-curso.page';

describe('DetallesCursoPage', () => {
  let component: DetallesCursoPage;
  let fixture: ComponentFixture<DetallesCursoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
