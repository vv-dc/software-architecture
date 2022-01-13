import { DatabaseConnection } from '@shared/modules/database/model/connection';
import { WhereQuery } from '@shared/modules/database/model/where';
import { Builder } from '@shared/modules/database/builder';

import { Product } from '@model/domain/product';
import { Director } from '@shared/modules/database/director';

export class SecondDao {
  constructor(private db: DatabaseConnection) {}

  async getProductsByQuery(query: WhereQuery<Product>): Promise<Product[]> {
    const baseQuery = this.db('products').select();

    const builder = new Builder(baseQuery);
    const director = new Director(builder);

    for (const [column, params] of Object.entries(query)) {
      director.buildQuery(column, params);
    }

    return builder.buildQuery();
  }

  getPage(page: number, pageSize: number): Promise<Product[]> {
    return this.db
      .select<Product[]>('*')
      .from('products')
      .orderBy('id')
      .offset((page - 1) * pageSize)
      .limit(pageSize);
  }
}
