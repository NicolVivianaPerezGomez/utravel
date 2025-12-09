import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RutasturisticasList } from './rutasturisticas';
import { RutasService } from '../../services/rutas-api';

describe('RutasturisticasList', () => {
  let component: RutasturisticasList;
  let fixture: ComponentFixture<RutasturisticasList>;
  let rutasService: RutasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasturisticasList, HttpClientTestingModule],
      providers: [RutasService]
    }).compileComponents();

    fixture = TestBed.createComponent(RutasturisticasList);
    component = fixture.componentInstance;
    rutasService = TestBed.inject(RutasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rutas on init', () => {
    // cargando debe ser falso después de detectChanges()
    expect(component.cargando).toBeFalse();
  });

  it('should get image url correctly', () => {
    const testUrl = 'image.jpg';
    const result = component.getImageUrl({ rut_imagen: testUrl });

    // Se espera que el servicio agregue el dominio, ejemplo:
    // http://127.0.0.1:8000/media/image.jpg
    expect(result).toContain('http://');
    expect(result).toContain('image.jpg');
  });

  it('should return placeholder for empty image', () => {
    const result = component.getImageUrl({ rut_imagen: null });
    expect(result).toBe('assets/placeholder.png');
  });
});
