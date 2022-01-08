import { DatabaseConnection } from '@shared/modules/database/model/connection';
import { WhereQuery } from '@shared/modules/database/model/where';
import { Builder } from '@shared/modules/database/builder';
import { Director } from '@shared/modules/database/director';
import { objectToCamelCase } from '@shared/lib/case.utils';

import { UpdateProductDto } from '@model/dto/update-product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';
import { Product } from '@model/domain/product';

export class MainDao {
  constructor(private db: DatabaseConnection) {}

  private buildQuery(query: WhereQuery<Product>): string {
    const baseQuery = this.getProductBaseQuery();

    const builder = new Builder(baseQuery);
    const director = new Director(builder);

    for (const [column, params] of Object.entries(query)) {
      director.buildQuery(`p.${column}`, params);
    }

    return builder.collect();
  }

  async getProductsByQuery(query: WhereQuery<Product>): Promise<Product[]> {
    const rawSql = this.buildQuery(query);
    const rawResult = await this.db.raw<{ rows: Product[] }>(rawSql);
    return rawResult.rows.map((obj) => objectToCamelCase(obj));
  }

  private getProductBaseQuery() {
    return this.db
      .select<Product[]>([
        'p.id as id',
        'p.name as name',
        'p.external_name as externalName',
        'c.name as category',
        's.company_name as company',
        'p.price as price',
        'p.volume as volume',
        'p.discount as discount',
        'p.degree as degree',
        'p.units_in_stock as inStock',
        'p.description as description',
      ])
      .from('products as p')
      .join('categories as c', 'p.category_id', 'c.id')
      .join('suppliers as s', 'p.supplier_id', 's.id');
  }

  async getProductById(id: number): Promise<Product> {
    const products = await this.getProductBaseQuery().where('p.id', id);
    return products[0];
  }

  async deleteProductById(id: number): Promise<Product> {
    const products = await this.db('products')
      .delete('id')
      .where({ id })
      .returning('*');
    return products[0];
  }

  async updateProductById(id: number, dto: UpdateProductDto): Promise<Product> {
    const products = await this.db('products')
      .update(dto)
      .where({ id })
      .returning('*');
    return products[0];
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const products = await this.db('products').insert(dto).returning('*');
    return products[0];
  }
}
