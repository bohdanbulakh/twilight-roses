import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends PrismaRepository<'category', CategoryEntity> {
  constructor (prisma: PrismaService) {
    super(prisma.category);
  }
}
