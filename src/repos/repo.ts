export interface Repository<Monument extends { id: unknown }> {
  getAll(): Promise<Monument[]>;
  getById(_id: Monument['id']): Promise<Monument>;
  search({
    _key,
    _value,
  }: {
    _key: string;
    _value: unknown;
  }): Promise<Monument[]>;
  create(_newItem: Omit<Monument, 'id'>): Promise<Monument>;
  update(
    _id: Monument['id'],
    _updatedItem: Partial<Monument>
  ): Promise<Monument>;
  delete(_id: Monument['id']): Promise<void>;
}
