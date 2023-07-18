import { QUERIES } from '../enum';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// export const db = new sqlite3.Database(
//   process.env.NODE_ENV ? './ctdb_prod.db' : './ctdb_dev.db'
// );

const allComics = async () => {

  console.log(await prisma.comics.findMany())
}

// TODO: create basic tables on Prisma
export const StartingDB = () => {

  allComics();

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
