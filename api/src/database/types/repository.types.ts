import { Prisma } from '@prisma/client';

export type TypeMap = {
  meta: {
    modelProps: string;
  };
  model: {
    [K: string]: {
      operations: {
        findFirst: { args: { where?: any; orderBy?: any; include?: any } };
        create: { args: { data: any; include?: any } };
        update: { args: { data: any; where: any; include?: any } };
        findUnique: { args: { where: any } };
        updateMany: { where?: any; result?: any };
      };
    };
  };
};

export type TModels = Prisma.TypeMap['meta']['modelProps'];

export type TUpdate<Model extends TModels> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['update']['args']['data'];

export type TCreate<Model extends TModels> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['create']['args']['data'];

export type TSort<Model extends TModels> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['orderBy'];

export type TWhere<Model extends TModels> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['where'];

export type TWhereUnique<Model extends TModels> = Prisma.TypeMap['model'][Capitalize<Model>]['operations']['findUnique']['args']['where'];

export type TInclude<TTypeMap extends TypeMap, Model extends TModels> =
  TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['include'];
