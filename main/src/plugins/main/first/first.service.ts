import { Cache } from '@shared/modules/cache/model/cache';
import { getRequest } from '@shared/lib/http.utils';

import { config } from '@config/config';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { buildProductSpecificationMap } from '@modules/specification/product/build-map';
import { applyProductSpecification } from '@modules/specification/product/apply';
import { ProductDto } from '@model/dto/product.dto';
import { PriceListDto } from '@model/dto/price-list.dto';

const { firstHost, firstCacheKey } = config.suppliers;

export class FirstService {
  constructor(private cache: Cache) {}

  private async fetchPriceList(): Promise<PriceListDto> {
    try {
      const url = `${firstHost}/api/public/price-list`;
      return await getRequest<{ priceList: ProductDto[] }>(url);
    } catch (err) {
      // it would be nice to add some logging here
      return { priceList: [] };
    }
  }

  async getPriceList(): Promise<ProductDto[]> {
    const cached = this.cache.get(firstCacheKey);
    if (cached !== undefined) return cached;

    const { priceList } = await this.fetchPriceList();
    this.cache.set(firstCacheKey, priceList);
    return priceList;
  }

  async updateCache(): Promise<void> {
    this.cache.del(firstCacheKey);
    await this.getPriceList();
  }

  async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto[]> {
    const rawProducts = await this.getPriceList();
    const specificationMap = buildProductSpecificationMap(query);
    const products = applyProductSpecification(rawProducts, specificationMap);
    return products ?? [];
  }
}
