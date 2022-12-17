import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import client from "../../backend-client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("...", req.query.userId);
  if (typeof req.query.roomId === "string") {
    const q1 = await client.question.create({
      data: {
        name: "FOO",
      },
    });
    const q2 = await client.question.create({
      data: {
        name: "BAR",
      },
    });
    // const resp = client.room.update({
    //   where: {
    //     id: req.query.roomId,
    //   },
    //   data: {
    //     current_question_id: q1.id,
    //     question: {
    //       connect: {
    //         id: q1.id,
    //       },
    //     },
    //   },
    //   include: {
    //     question: true,
    //   },
    // });
    const resp = client.$transaction(
      [
        client.room.update({
          where: {
            id: req.query.roomId,
          },
          data: {
            current_question_id: q1.id,
            question: {
              connect: {
                id: q1.id,
              },
            },
          },
          include: {
            question: true,
          },
        }),
      ],
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      }
    );
    const resp2 = client.$transaction(
      [
        client.room.update({
          where: {
            id: req.query.roomId,
          },
          data: {
            current_question_id: q2.id,
            question: {
              connect: {
                id: q2.id,
              },
            },
          },
          include: {
            question: true,
          },
        }),
      ],
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      }
    );
    // const resp = client.room.update({
    //   where: {
    //     id: req.query.roomId,
    //   },
    //   data: {
    //     current_question_id: q1.id,
    //     question: {
    //       connect: {
    //         id: q1.id,
    //       },
    //     },
    //   },
    //   include: {
    //     question: true,
    //   },
    // });
    // const resp2 = client.room.update({
    //   where: {
    //     id: req.query.roomId,
    //   },
    //   data: {
    //     current_question_id: q2.id,
    //     question: {
    //       connect: {
    //         id: q2.id,
    //       },
    //     },
    //   },
    //   include: {
    //     question: true,
    //   },
    // });

    // await Promise.all([resp, resp2]);
    resp
      .then((x) => {
        console.log("resp", x);
      })
      .catch((err) => {
        console.log("resp err", err);
      });
    resp2
      .then((x) => {
        console.log("resp2", x);
      })
      .catch((err) => {
        console.log("resp2 err", err);
      });
    // console.log("resp\n\n", resp, "\n\n", resp2);
    res.status(200).json({});
  }

  // res.status(200).json({ name: "John Doe" });
}
