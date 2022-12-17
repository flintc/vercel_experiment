import { useApolloClient, useQuery as useApolloQuery } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";
import * as documents from "./user.documents";
import { useAuth0 } from "@auth0/auth0-react";
import { UserQuery } from "../../generated/gql/graphql";

const transformData = (data: UserQuery["user"]) => {
  if (!data) {
    return data;
  }
  return {
    foo: data.name,
  };
};

export const useUser = () => {
  const {
    user: { sub: userId },
  } = useAuth0();
  const client = useApolloClient();
  const queryFn = async () => {
    const out = await client.query({
      query: documents.GET_USER,
      variables: {
        userId: userId,
      },
    });
    return out.data.user?.name;
  };
  const query = useQuery(["user", userId], queryFn, {
    staleTime: 1000 * 60 * 60 * 60,
    select: (data) => {
      return {
        foo: data,
      };
    },
    // select: transformData,
  });
  if (query.data) {
    const bar = query.data.foo;
  }
  return query;
};
