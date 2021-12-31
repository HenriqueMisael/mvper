export interface ComplexEntity<K, L> {
  id: K;
  name: string;
  detail: string[];
  levels: L[];
}
