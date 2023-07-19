import { QUERIES } from '../enum';
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// export const db = new sqlite3.Database(
//   process.env.NODE_ENV ? './ctdb_prod.db' : './ctdb_dev.db'
// );

// TODO: create basic tables on Prisma
export const StartingDB = () => {

  //   db.serialize(() => {

  //     db.run(QUERIES.CREATE_COMICS);

  //     db.run(QUERIES.CREATE_PUBLISHERS);

  //     db.run(QUERIES.CREATE_WRITERS);

  //     db.run(QUERIES.CREATE_ILLUSTRATORS);

  //     const publishers = ['Marvel', 'DC', 'Image', 'Manga'];

  //     const insertPublisher = db.prepare(QUERIES.DEFAULT_PUBLISHERS);

  //     publishers.forEach((publisher) => {
  //       insertPublisher.run(publisher);
  //     });

  //     insertPublisher.finalize();
  //   });
}

export const allPublishers = async () => await prisma.publishers.findMany();

export const allWriters = async () => await prisma.writers.findMany();

export const allIllustrators = async () => await prisma.illustrators.findMany();

