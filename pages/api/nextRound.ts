import { NextApiRequest, NextApiResponse } from "next";
import client from "../../backend-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (typeof req.query.roomId === "string") {
  //   const resp = client.room.update({
  //     where: { id: roomId },
  //     data: {
  //       round: {
  //         set: (currValue) => {
  //         }
  //       }
  //     },
  //   });
  // }
}
