import { schedule } from 'node-cron';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';
import { everyDayAt } from '@shared/lib/cron.utils';
import { WhereQuery } from '@shared/modules/database/model/where';

import { FirstService } from '@plugins/main/first/first.service';
import { SecondService } from '@plugins/main/second/second.service';
import { MainDao } from '@plugins/main/main.dao';
import { buildProductSpecificationMap } from '@modules/specification/product/build-map';
import { applyProductSpecification } from '@modules/specification/product/apply';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { Product } from '@model/domain/product';
import { ProductDto } from '@model/dto/product.dto';
import { UpdateProductDto } from '@model/dto/update-product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';
import { ProductListDto } from '@model/dto/product-list.dto';

export class MainService {
  constructor(
    private dao: MainDao,
    private firstService: FirstService,
    private secondService: SecondService
  ) {}

  async getProductsByQuery(query: SearchQueryDto): Promise<ProductListDto> {
    const products = await this.dao.getProductsByQuery(
      query as WhereQuery<Product>
    );

    const firstList = await this.firstService.getPriceList();
    const secondList = await this.secondService.getProductsListAllPages();

    const specificationMap = buildProductSpecificationMap(query);
    products.push(...applyProductSpecification(firstList, specificationMap));
    products.push(...applyProductSpecification(secondList, specificationMap));

    if (!products.length) {
      throw new EntityNotFound('Not found any products by query');
    } else return { products };
  }

  async getProductById(id: number): Promise<ProductDto> {
    const product = await this.dao.getProductById(id);
    if (!product) {
      throw new EntityNotFound('Not found any products by id');
    } else return product;
  }

  async deleteProductById(id: number): Promise<ProductDto> {
    return this.dao.deleteProductById(id);
  }

  async updateProductById(
    id: number,
    dto: UpdateProductDto
  ): Promise<ProductDto> {
    return this.dao.updateProductById(id, dto);
  }

  async createProduct(dto: CreateProductDto): Promise<ProductDto> {
    return this.dao.createProduct(dto);
  }

  async updateCache(): Promise<void> {
    await this.firstService.updateCache();
    await this.secondService.updateCache();
  }

  async scheduleCacheUpdate(): Promise<void> {
    const cronString = everyDayAt(0, 0); // midnight
    schedule(cronString, async () => {
      await this.updateCache();
    });
  }
}
