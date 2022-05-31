import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ClientRepository,
  InvoiceRepository,
  ProductRepository,
} from 'src/database/repositories';
import { CreateInvoiceDTO } from 'src/utils/dto/input/invoices';

@Injectable()
export class InvoicesService {
  constructor(
    private clientRepository: ClientRepository,
    private invoiceRepository: InvoiceRepository,
    private productRepository: ProductRepository,
  ) {}

  async createInvoiceOfClient(
    clientId: string,
    { products, ...data }: CreateInvoiceDTO,
  ) {
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');

    const newInvoices = [];
    const productsFound = [];

    for (const i of products) {
      const productFound = await this.productRepository.findOne({
        where: { id: i.id },
      });
      if (!productFound) throw new NotFoundException('product not found');
      productFound.stock -= i.quantity;

      if (productFound.stock < 0)
        throw new BadRequestException(
          `${productFound.name.toUpperCase()} - quantity exceeds current stock`,
        );

      const newInvoice = this.invoiceRepository.create({
        client: clientFound,
        product: productFound,
        quantity: i.quantity,
      });

      newInvoices.push(newInvoice);
      productsFound.push(productFound);
    }

    await this.invoiceRepository.save(newInvoices);
    await this.productRepository.save(productsFound);
  }

  async getInvoices() {
    return await this.invoiceRepository.find({
      relations: ['client', 'product'],
    });
  }

  async getInvoiceOfClient(clientId: string) {
    return await this.invoiceRepository.find({
      where: { client: { id: clientId } },
      relations: ['product'],
    });
  }
}
