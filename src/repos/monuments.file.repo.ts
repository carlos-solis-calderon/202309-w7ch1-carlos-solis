import fs from 'fs/promises';
import { Monument } from '../entities/entities.js';
import { Repository } from './repo';

import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W7E:monuments:file:repo');

export class MonumentsFileRepo implements Repository<Monument> {
  file: string;
  monuments: Monument[];
  constructor() {
    debug('Instantiated');
    this.file = '../../../../api/db.json';
    this.monuments = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.monuments = JSON.parse(data);
  }

  async getAll(): Promise<Monument[]> {
    return this.monuments;
  }

  async getById(id: string): Promise<Monument> {
    const result = this.monuments.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({
    _key,
    _value,
  }: {
    _key: string;
    _value: unknown;
  }): Promise<Monument[]> {
    // Temp this.monuments.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Monument, 'id'>): Promise<Monument> {
    const result: Monument = { ...newItem, id: crypto.randomUUID() };
    const newMonuments = [...this.monuments, result];
    await this.save(newMonuments as Monument[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Monument>): Promise<Monument> {
    let result = this.monuments.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Monument;
    const newMonuments = this.monuments.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newMonuments as Monument[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newMonuments = this.monuments.filter((item) => item.id !== id);
    if (newMonuments.length === this.monuments.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newMonuments);
  }

  private async save(newmonuments: Monument[]) {
    await fs.writeFile(this.file, JSON.stringify(newmonuments), {
      encoding: 'utf-8',
    });
    this.monuments = newmonuments;
  }
}
