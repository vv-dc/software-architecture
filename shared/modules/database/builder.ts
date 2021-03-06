import { Knex } from 'knex';

export class Builder {
  constructor(private query: Knex.QueryBuilder) {}

  min(column: string, value?: number): Builder {
    if (value !== undefined) this.query = this.query.where(column, '>=', value);
    return this;
  }

  max(column: string, value?: number): Builder {
    if (value !== undefined) this.query = this.query.where(column, '<=', value);
    return this;
  }

  includes(column: string, values?: (string | number)[]): Builder {
    if (values !== undefined && values.length !== 0)
      this.query = this.query.whereIn(column, values);
    return this;
  }

  like(column: string, value?: string): Builder {
    if (value !== undefined)
      this.query = this.query.where(column, 'ilike', `%${value}%`);
    return this;
  }

  buildQuery(): Knex.QueryBuilder {
    return this.query;
  }
}
