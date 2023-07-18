import { Request, Response } from "express"
import { InterfaceComic } from "../types";
import { QUERIES } from '../enum';
import { allComics, prisma } from "./database";

// C
export const AddComic = (req: Request, res: Response) => {

  // const { publisher: publisher_id, title, issue, year, writer: writer_id, illustrator: illustrator_id }: InterfaceComic = req.body;

  // try {
  //   db.run(QUERIES.NEW_COMIC,
  //     [publisher_id, title, issue, year, writer_id, illustrator_id],
  //     function (err) {

  //       if (err) {
  //         console.error(err);
  //         res.status(500).json({ error: 'Failed to create comic' });
  //       }
  //     }
  //   );
  // } catch {
  //   res.status(500).json({ error: 'Failed to complete operation' });
  // } finally {
  //   res.status(200).send({
  //     msg: "Comic added sucessfully!",
  //   });
  // }
}

export const AddEntry = (req: Request, res: Response) => {

  //  const { publisher, name, writer, illustrator }: Partial<InterfaceComic> = req.body;

  //  function capitalizeFirstCharacter(str: string | undefined) {

  //   if (str) {
  //     return str.split(' ')
  //       .map(block => block.charAt(0).toUpperCase() + block.slice(1))
  //       .join(' ');
  //   }

  //   return '';
  //  }

  // try {

  //   if (publisher) {
  //     const sanitized = capitalizeFirstCharacter(publisher); 

  //     db.run(QUERIES.NEW_PUBLISHER,
  //       [sanitized],
  //       function (err) {

  //         if (err) {
  //           console.error(err);
  //           res.status(500).json({ error: 'Failed to create entry' });
  //         }
  //       }
  //     );

  //     return;
  //   }

  //   if (name) {
  //     const sanitized = capitalizeFirstCharacter(name); 

  //     const newWriter = () => {
  //       db.run(QUERIES.NEW_WRITER,
  //         [sanitized],
  //         function (err) {

  //           if (err) {
  //             console.error(err);
  //             res.status(500).json({ error: 'Failed to create entry' });
  //           }
  //         }
  //       );
  //     }

  //     const newIllustrator = () => {
  //       db.run(QUERIES.NEW_ILLUSTRATOR,
  //         [sanitized],
  //         function (err) {

  //           if (err) {
  //             console.error(err);
  //             res.status(500).json({ error: 'Failed to create entry' });
  //           }
  //         }
  //       );
  //     }

  //     if (writer && illustrator) {

  //       newWriter();
  //       newIllustrator();
  //       return;
  //     }

  //     if (writer) {

  //       newWriter();
  //       return;
  //     }

  //     if (illustrator) {

  //       newIllustrator();
  //       return;
  //     }

  //   }

  // } catch {
  //   res.status(500).json({ error: 'Failed to complete operation' });
  // } finally {
  //   res.status(200).send({
  //     msg: "Entry created sucessfully!",
  //   });
  // }

}

// R
export const GetDashData = (_: Request, res: Response) => {

  async function fetchAllTables() {
    try {
      const [comics, publishers, writers, illustrators] = await Promise.all([
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
          }
        }),
        prisma.publishers.findMany(),
        prisma.writers.findMany(),
        prisma.illustrators.findMany()
      ]);

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
  // const { id } = req.params;

  // try {
  //   db.run(QUERIES.DELETE_COMIC, [id],
  //     function (err) {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).json({ error: 'Failed to delete comic' });
  //       } else if (this.changes === 0) {
  //         res.status(404).json({ error: 'Comic not found' });
  //       }
  //     }
  //   );
  // } catch {
  //   res.status(500).json({ error: 'Failed to complete operation' });
  // } finally {
  //   res.status(200).json({ msg: 'Comic deleted successfully' });
  // }
}