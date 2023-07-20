import { Request, Response } from "express"
import { prisma } from "./database";
import { InterfaceComic } from "../types";

// C
export const AddComic = (req: Request, res: Response) => {

  const { publisher, title, issue, year, writer, illustrator }: InterfaceComic = req.body;

  async function insertComic() {

    try {

      return await prisma.comics.create({
        data: {
          title,
          issue: Number(issue),
          year: Number(year),
          publisher_id: Number(publisher),
          writer_id: Number(writer),
          illustrator_id: Number(illustrator),
        }
      })
    } catch (error) {

      console.error('An error occurred while inserting comic', error);
    } finally {

      await prisma.$disconnect();
    }
  }

  insertComic()
    .then(() => res.status(200).send({
      msg: "Comic inserted sucessfully!",
    }))
    .catch((e) => {
      console.error(e);

      res.status(500).json({ error: 'Failed to complete operation' });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

}

export const AddEntry = (req: Request, res: Response) => {

  const { publisher, name, writer, illustrator }: Partial<InterfaceComic> = req.body;

  function capitalizeFirstCharacter(str: string | undefined) {

    if (str) {
      return str.split(' ')
        .map(block => block.charAt(0).toUpperCase() + block.slice(1))
        .join(' ');
    }

    throw new Error("capitalize function should receive a string");
  }

  async function insertEntry() {

    try {
      if (publisher) {
        const sanitized = capitalizeFirstCharacter(publisher);

        return await prisma.publishers.create({
          data: {
            name: sanitized,
          }
        })
      }

      if (name) {
        const sanitized = capitalizeFirstCharacter(name);

        const insertWriter = async () => {
          return await prisma.writers.create({
            data: {
              name: sanitized,
            }
          })
        }

        const insertIllustrator = async () => {
          return await prisma.illustrators.create({
            data: {
              name: sanitized,
            }
          })
        }

        if (writer && illustrator) {
          await insertWriter();
          await insertIllustrator();
          return;
        }

        if (writer) {
          await insertWriter();
          return;
        }

        if (illustrator) {
          await insertIllustrator();
          return;
        }
      }

    } catch (error) {
      console.error('An error occurred while creating an entry', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  insertEntry()
    .then(() => res.status(200).send({
      msg: "Entry created sucessfully!",
    }))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'Failed to complete operation' });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

// R
export const GetDashData = (_: Request, res: Response) => {

  async function fetchAllTables() {
    try {
      const [comicsQuery, publishers, writers, illustrators] = await Promise.all([
        prisma.comics.findMany({
          select: {
            id: true,
            title: true,
            issue: true,
            year: true,
            publishers: {
              select: {
                name: true
              }
            },
            writers: {
              select: {
                name: true
              }
            },
            illustrators: {
              select: {
                name: true
              }
            }
          },
          take: 10,
          orderBy: {
            id: 'desc'
          }
        }),
        prisma.publishers.findMany(),
        prisma.writers.findMany(),
        prisma.illustrators.findMany()
      ]);

      const comics = comicsQuery.map(comic => {

        const { id, title, issue, year, publishers, writers, illustrators } = comic;

        return {
          id,
          title,
          issue,
          year,
          publisher: publishers.name,
          writer: writers.name,
          illustrator: illustrators.name
        };

      });

      const response = {
        comics,
        publishers,
        writers,
        illustrators
      };

      return response;
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  fetchAllTables()
    .then(response => {
      // console.log(response);

      res.status(200).json(response);
    })
    .catch(error => {
      console.error('An error occurred:', error);
      res.status(500).json({
        error: 'Failed to complete operation: DashboardData'
      });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

// U
export const EditComic = (req: Request, res: Response) => {

  // const { id, publisher: publisher_id, title, issue, year, writer: writer_id, illustrator: illustrator_id }: InterfaceComic = req.body;

  // try {
  //   db.run(QUERIES.EDIT_COMIC,
  //     [publisher_id, title, issue, year, writer_id, illustrator_id, id],
  //     function (err) {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).json({ error: 'Failed to update comic' });
  //       } else {
  //         res.status(200).json({ msg: 'Comic updated successfully' });
  //       }
  //     }
  //   );
  // } catch {
  //   res.status(500).json({ error: 'Failed to complete operation' });
  // }

}

// D
export const DeleteComic = (req: Request, res: Response) => {

  const { id } = req.params;

  async function insertComic() {

    try {

      return await prisma.comics.delete({
        where: {
          id: Number(id),
        }
      })
    } catch (error) {

      console.error('An error occurred while inserting comic', error);
    } finally {

      await prisma.$disconnect();
    }
  }

  insertComic()
    .then(() => res.status(200).send({
      msg: "Comic deleted sucessfully!",
    }))
    .catch((e) => {
      console.error(e);

      res.status(500).json({ error: 'Failed to complete operation' });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}