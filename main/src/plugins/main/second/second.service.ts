import { SearchQueryDto } from '@model/dto/search-query.dto';
import { Cache } from '@shared/modules/cache/model/cache';
import { getRequest } from '@shared/lib/http.utils';

import { config } from '@config/config';
import { Product } from '@model/domain/product';
import { ProductsDto } from '@model/dto/products.dto';
import { ProductPageListDto } from '@model/dto/product-page-list.dto';
import { ProductDto } from '@model/dto/product.dto';

const { secondHost, secondCacheKey } = config.suppliers;

export class SecondService {
  constructor(private pagesCache: Cache) {}

  private async fetchProductList(page: number): Promise<ProductPageListDto> {
    try {
      const url = `${secondHost}/api/public/list`;
      return await getRequest<ProductPageListDto>(url, { page });
    } catch (err) {
      return { products: [], last: true };
    }
  }

  private async fetchProductsSearch(
    query: SearchQueryDto
  ): Promise<ProductsDto> {
    try {
      const url = `${secondHost}/api/public/search`;
      return await getRequest<ProductsDto>(url, query);
    } catch (err) {
      return { products: [] };
    }
  }

  async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto[]> {
    const { products } = await this.fetchProductsSearch(query);
    return products ?? [];
  }

  async getProductsListAllPages(): Promise<ProductDto[]> {
    const cached = this.pagesCache.get(secondCacheKey);
    if (cached !== undefined) return cached;

    const allProducts: Product[] = [];
    for (let page = 1; ; ++page) {
      const record = await this.fetchProductList(page);
      allProducts.push(...record.products);
      if (record.last) break;
    }

    this.pagesCache.set(secondCacheKey, allProducts);
    return allProducts;
  }

  async updateCache(): Promise<void> {
    this.pagesCache.del(secondCacheKey);
    await this.getProductsListAllPages();
  }
}
