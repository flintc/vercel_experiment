import { NextApiRequest, NextApiResponse } from "next";

import client from "../../backend-client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("...", req.query.userId);
  if (typeof req.query.userId === "string") {
    const resp = await client.user.update({
      where: {
        id: req.query.userId,
      },
      include: {
        room: true,
      },
      data: {
        room: {
          create: {
            name: "AAAA",
          },
        },
      },
    });
    console.log("resp");
    res.status(200).json(resp);
  }

  // res.status(200).json({ name: "John Doe" });
}
