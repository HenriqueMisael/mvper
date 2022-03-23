import { parseLevel } from '../model/sorcery';

describe('Sorcery level parser', () => {
  describe('For entity "Livre"', () => {
    it('should consider the first position as "Azul"', () => {
      expect(parseLevel('Livre', '1,0,0,0,0')).toEqual([1, [['Azul', 1]]]);
    });
    it('should consider the second position as "Branca"', () => {
      expect(parseLevel('Livre', '0,1,0,0,0')).toEqual([1, [['Branca', 1]]]);
    });
    it('should consider the third position as "Negra"', () => {
      expect(parseLevel('Livre', '0,0,1,0,0')).toEqual([1, [['Negra', 1]]]);
    });
    it('should consider the fourth position as "Verde"', () => {
      expect(parseLevel('Livre', '0,0,0,1,0')).toEqual([1, [['Verde', 1]]]);
    });
    it('should consider the fifth position as "Vermelha"', () => {
      expect(parseLevel('Livre', '0,0,0,0,1')).toEqual([1, [['Vermelha', 1]]]);
    });
    it('should work for mixed level', () => {
      expect(parseLevel('Livre', '1,2,0,0,1')).toEqual([
        4,
        [
          ['Azul', 1],
          ['Branca', 2],
          ['Vermelha', 1],
        ],
      ]);
    });
  });
});
