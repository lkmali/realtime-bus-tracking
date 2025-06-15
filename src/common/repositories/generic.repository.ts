// src/common/repositories/generic.repository.ts
import {
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository,
  DeepPartial,
  FindManyOptions
} from 'typeorm';
import { IGenericRepository } from '../interfaces/repository.interface';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';

export class GenericRepository<T> extends IGenericRepository<T> {
  private repository: Repository<T>;

  constructor(
    private target: EntityTarget<T>,
    private manager: EntityManager,
    private queryRunner?: QueryRunner,
  ) {
    super();
    this.repository = queryRunner
      ? queryRunner.manager.getRepository(target)
      : manager.getRepository(target);
  }

  async findAll(query: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(query);
  }

  async findOne(query: FindManyOptions<T>): Promise<T> {
    return this.repository.findOne(query);
  }

  async getById(id: number): Promise<T> {
    return this.repository.findOneByOrFail({ id } as any);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }
  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  }


