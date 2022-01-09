import { Cache } from '@shared/modules/cache/model/cache';
import { getRequest } from '@shared/lib/http.utils';

import { config } from '@config/config';
import { addProperty } from '@lib/object.utils';
import { Product } from '@model/domain/product';
import { ProductPageListDto } from '@model/dto/product-page-list.dto';
import { ProductDto } from '@model/dto/product.dto';
import { ProductListDto } from '@model/dto/product-list.dto';
import { SearchQueryDto } from '@model/dto/search-query.dto';

const { host, cacheKey, origin } = config.suppliers.second;

export class SecondService {
  constructor(private pagesCache: Cache) {}

  private async fetchProductList(page: number): Promise<ProductPageListDto> {
    try {
      const url = `${host}/api/public/list`;
      const dto = await getRequest<ProductPageListDto>(url, { page });
      dto.products.forEach((item) => addProperty(item, 'origin', origin));
      return dto;
    } catch (err) {
      return { products: [], last: true };
    }
  }

  private async fetchProductsSearch(
    query: SearchQueryDto
  ): Promise<ProductListDto> {
    try {
      const url = `${host}/api/public/search`;
      const dto = await getRequest<ProductListDto>(url, query);
      dto.products.forEach((item) => addProperty(item, 'origin', origin));
      return dto;
    } catch (err) {
      return { products: [] };
    }
  }

  async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto[]> {
    const { products } = await this.fetchProductsSearch(query);
    return products ?? [];
  }

  async getProductsListAllPages(): Promise<ProductDto[]> {
    const cached = this.pagesCache.get(cacheKey);
    if (cached !== undefined) return cached;

    const allProducts: Product[] = [];
    for (let page = 1; ; ++page) {
      const record = await this.fetchProductList(page);
      allProducts.push(...record.products);
      if (record.last) break;
    }

    this.pagesCache.set(cacheKey, allProducts);
    return allProducts;
  }

  async updateCache(): Promise<void> {
    this.pagesCache.del(cacheKey);
    await this.getProductsListAllPages();
  }
}
