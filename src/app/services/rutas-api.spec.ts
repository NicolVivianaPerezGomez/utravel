import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RutasService } from './rutas-api';

describe('RutasService', () => {
  let service: RutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RutasService]
    });
    service = TestBed.inject(RutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get image url with base URL', () => {
    const relativePath = '/media/image.jpg';
    const result = service.getImageUrl(relativePath);
    expect(result).toBe('http://127.0.0.1:8000/media/image.jpg');
  });

  it('should return full URL as is', () => {
    const fullUrl = 'http://example.com/image.jpg';
    const result = service.getImageUrl(fullUrl);
    expect(result).toBe(fullUrl);
  });

  it('should return empty string for empty path', () => {
    const result = service.getImageUrl('');
    expect(result).toBe('');
  });

  it('should set and retrieve token', () => {
    const testToken = 'test_token_123';
    service.setToken(testToken);
    expect(localStorage.getItem('access_token')).toBe(testToken);
  });
});
