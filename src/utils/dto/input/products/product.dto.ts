import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}

export class UpdateProductDTO extends CreateProductDTO {
  constructor() {
    super();
  }
}

export class UpdateStockDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
