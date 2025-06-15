import { DeepPartial, FindManyOptions } from 'typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';

export abstract class IGenericRepository<T> {
  abstract  findAll(query: FindManyOptions<T>): Promise<T[]>;
  abstract findOne(query: FindManyOptions<T>): Promise<T>;
  abstract getById(id: number): Promise<T>;
  abstract create(data: DeepPartial<T>): Promise<T>;
  abstract update(id: number, data: QueryDeepPartialEntity<T>): Promise<T>;
  abstract delete(id: number): Promise<void>;
}