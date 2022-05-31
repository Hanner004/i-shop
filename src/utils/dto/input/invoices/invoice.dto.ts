import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';

class ProductDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateInvoiceDTO {
  @ApiProperty({ type: [ProductDTO] })
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  @IsNotEmpty()
  products: ProductDTO[];

  // @ApiProperty()
  // @IsUUID('all', { each: true })
  // @IsNotEmpty()
  // productsIds: string[];
}
