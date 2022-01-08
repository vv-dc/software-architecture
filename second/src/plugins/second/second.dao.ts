import { DatabaseConnection } from '@shared/modules/database/model/connection';
import { WhereQuery } from '@shared/modules/database/model/where';
import { Builder } from '@shared/modules/database/builder';
import { objectToCamelCase } from '@shared/lib/case.utils';

import { Product } from '@model/domain/product';
import { Director } from '@shared/modules/database/director';

export class SecondDao {
  constructor(private db: DatabaseConnection) {}

  private buildQuery(query: WhereQuery<Product>): string {
    const baseQuery = this.db('products').select();

    const builder = new Builder(baseQuery);
    const director = new Director(builder);

    for (const [column, params] of Object.entries(query)) {
      director.buildQuery(column, params);
    }

    return builder.collect();
  }

  async getProductsByQuery(query: WhereQuery<Product>): Promise<Product[]> {
    const rawSql = this.buildQuery(query);
    const rawResult = await this.db.raw<{ rows: Product[] }>(rawSql);
    return rawResult.rows.map((obj) => objectToCamelCase(obj));
  }

  getPage(page: number, pageSize: number): Promise<Product[]> {
    return this.db
      .select<Product[]>('*')
      .from('products')
      .offset((page - 1) * pageSize)
      .limit(pageSize);
  }
}
