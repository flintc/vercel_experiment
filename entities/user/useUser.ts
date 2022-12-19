import { useApolloClient, useQuery as useApolloQuery } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";
import * as documents from "./user.documents";
import { useAuth0 } from "@auth0/auth0-react";
// import { UserQuery } from "../../generated/gql/graphql";

const transformData = (data: any) => {
  if (!data) {
    return data;
  }
  return {
    foo: data.name,
  };
};

export const useUser = () => {
  const { user } = useAuth0();
  const userId = user?.sub;
  console.log("useUser userId", userId);
  const client = useApolloClient();
  const queryFn = async () => {
    const out = await client.query({
      query: documents.GET_USER,
      variables: {
        userId: userId,
      },
    });
    return out.data.user;
  };
  const query = useQuery(["user", userId], queryFn, {
    staleTime: 1000 * 60 * 60 * 60,
    enabled: userId !== undefined || userId != null,
    // select: (data) => {
    //   return {
    //     foo: data,
    //   };
    // },
    // select: transformData,
  });
  // if (query.data) {
  //   const bar = query.data.foo;
  // }
  return query;
};
