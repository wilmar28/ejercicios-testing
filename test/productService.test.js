const ProductService = require('../src/productService');

const mockRepo = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
};

describe('ProductService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductService(mockRepo);
  });

  describe('getById()', () => {

    it('devuelve el producto cuando existe', async () => {

      mockRepo.findById.mockResolvedValue({
        id: 1,
        name: 'Laptop',
        category: 'Tecnologia',
        price: 3000
      });

      const product = await service.getById(1);

      expect(product.name).toBe('Laptop');
      expect(mockRepo.findById).toHaveBeenCalledWith(1);
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });

    it('lanza error si el producto no existe', async () => {

      mockRepo.findById.mockResolvedValue(null);

      await expect(service.getById(99))
        .rejects
        .toThrow('Producto 99 no encontrado.');
    });

  });

  describe('getByCategory()', () => {

    it('devuelve solo productos de esa categoría', async () => {

      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop', category: 'Tecnologia' },
        { id: 2, name: 'Mouse', category: 'Tecnologia' },
        { id: 3, name: 'Camisa', category: 'Ropa' },
      ]);

      const result = await service.getByCategory('Tecnologia');

      expect(result).toHaveLength(2);
      expect(result.every(p => p.category === 'Tecnologia')).toBe(true);
    });

    it('devuelve array vacío si no hay productos', async () => {

      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop', category: 'Tecnologia' }
      ]);

      const result = await service.getByCategory('Hogar');

      expect(result).toEqual([]);
    });

  });

  describe('searchByName()', () => {

    it('realiza búsqueda correctamente', async () => {

      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop Gamer' },
        { id: 2, name: 'Mouse Gamer' },
        { id: 3, name: 'Camisa' },
      ]);

      const result = await service.searchByName('Gamer');

      expect(result).toHaveLength(2);
    });

    it('la búsqueda es case-insensitive', async () => {

      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop Gamer' },
      ]);

      const result = await service.searchByName('gamer');

      expect(result).toHaveLength(1);
    });

    it('lanza error si query está vacío', async () => {

      await expect(service.searchByName(''))
        .rejects
        .toThrow('La búsqueda no puede estar vacía.');
    });

  });

  describe('create()', () => {

    it('guarda producto válido', async () => {

      const newProduct = {
        name: 'Teclado',
        category: 'Tecnologia',
        price: 150
      };

      mockRepo.save.mockResolvedValue({
        id: 1,
        ...newProduct
      });

      const result = await service.create(newProduct);

      expect(result.name).toBe('Teclado');

      expect(mockRepo.save).toHaveBeenCalledWith(newProduct);

      expect(mockRepo.save).toHaveBeenCalledTimes(1);
    });

    it('lanza error si el precio es negativo', async () => {

      await expect(service.create({
        name: 'Teclado',
        price: -10
      }))
        .rejects
        .toThrow('El precio debe ser mayor a 0.');
    });

    it('lanza error si falta el nombre', async () => {

      await expect(service.create({
        price: 100
      }))
        .rejects
        .toThrow('El nombre es obligatorio.');
    });

  });

});