// src/common/providers/generic-repository.provider.ts
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GenericRepository } from '../repositories/generic.repository';

export function createGenericRepositoryProvider<T>(
  entity: any,
): Provider {
  return {
    provide: `GENERIC_REPO_${entity.name.toUpperCase()}`,
    useFactory: (dataSource: DataSource) =>
      new GenericRepository<T>(entity, dataSource.manager),
    inject: [DataSource],
  };
}
