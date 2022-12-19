import { NextApiRequest, NextApiResponse } from "next";

import client from "../../backend-client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.query.roomId === "string") {
    const resp = client.question.create({
      data: {
        name: "FOO??",
        round: 0,
        room: {
          connect: {
            id: req.query.roomId,
          },
        },
      },
    });
    const resp2 = client.question.create({
      data: {
        name: "BAR???",
        round: 0,
        room: {
          connect: {
            id: req.query.roomId,
          },
        },
      },
    });

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
    res.status(200).json({});
  }
}
