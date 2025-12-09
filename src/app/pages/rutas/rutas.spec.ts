import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RutasList } from './rutas';
import { RutasService } from '../../services/rutas-api';

describe('RutasList', () => {
  let component: RutasList;
  let fixture: ComponentFixture<RutasList>;
  let rutasService: RutasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasList, HttpClientTestingModule],
      providers: [RutasService]
    }).compileComponents();

    fixture = TestBed.createComponent(RutasList);
    component = fixture.componentInstance;
    rutasService = TestBed.inject(RutasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rutas on init', () => {
    expect(component.cargando).toBeFalsy();
  });

  it('should get image url correctly', () => {
    const testUrl = '/media/image.jpg';
    const result = component.getImageUrl({ rut_imagen: testUrl });
    expect(result).toContain('http://127.0.0.1:8000');
  });

  it('should return placeholder for empty image', () => {
    const result = component.getImageUrl({ rut_imagen: null });
    expect(result).toBe('assets/placeholder.png');
  });
});
