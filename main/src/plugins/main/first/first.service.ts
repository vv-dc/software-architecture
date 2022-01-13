import { Cache } from '@shared/modules/cache/model/cache';
import { getRequest } from '@shared/lib/http.utils';

import { config } from '@config/config';
import { buildProductSpecificationMap } from '@modules/specification/product/build-map';
import { applyProductSpecification } from '@modules/specification/product/apply';
import { addProperty } from '@lib/object.utils';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { ProductDto } from '@model/dto/product.dto';

const { host, cacheKey, origin } = config.suppliers.first;

export class FirstService {
  constructor(private cache: Cache) {}

  private async fetchPriceList(): Promise<{ priceList: ProductDto[] }> {
    try {
      const url = `${host}/api/public/price-list`;
      const dto = await getRequest<{ priceList: ProductDto[] }>(url);
      dto.priceList.forEach((item) => addProperty(item, 'origin', origin));
      return dto;
    } catch (err) {
      // it would be nice to add some logging here
      return { priceList: [] };
    }
  }

  private async cachePriceList(): Promise<void> {
    const { priceList } = await this.fetchPriceList();
    this.cache.set(cacheKey, priceList);
  }

  async getPriceList(): Promise<ProductDto[]> {
    if (!this.cache.has(cacheKey)) {
      await this.cachePriceList();
    }
    return this.cache.get(cacheKey);
  }

  async updateCache(): Promise<void> {
    this.cache.del(cacheKey);
    await this.cachePriceList();
  }

  async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto[]> {
    const { priceList: rawProducts } = await this.fetchPriceList();
    const specificationMap = buildProductSpecificationMap(query);
    const products = applyProductSpecification(rawProducts, specificationMap);
    return products ?? [];
  }
}
