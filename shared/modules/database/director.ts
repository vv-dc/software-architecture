import { Builder } from './builder';
import { NumberQuery } from './model/number-query';
import { StringQuery } from './model/string-query';

export class Director {
  constructor(private builder: Builder) {}

  private buildStringQuery(column: string, query: StringQuery) {
    this.builder.includes(column, query.includes).like(column, query.like);
  }

  private buildNumberQuery(column: string, query: NumberQuery) {
    this.builder
      .min(column, query.min)
      .max(column, query.max)
      .includes(column, query.includes);
  }

  buildQuery(column: string, query: NumberQuery | StringQuery) {
    if ('like' in query) {
      this.buildStringQuery(column, query);
    } else this.buildNumberQuery(column, query as NumberQuery);
  }
}
