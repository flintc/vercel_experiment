// import { useApolloClient } from "@apollo/client";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useUser } from "./useUser";
// import * as documents from "./user.documents";

// export const useUserStarred = () => {
//   const user = useUser();
//   const client = useApolloClient();
//   const queryClient = useQueryClient();
//   const queryFn = async ({ queryKey }) => {
//     const [, userId] = queryKey;
//     const resp = await client.query({
//       query: documents.USER_STARRED,
//       variables: {
//         userId: userId,
//       },
//     });
//     return resp?.data?.user?.starred as Map<string, string>;
//   };
//   const starredQuery = useQuery(["user", user?.data?.id, "starred"], queryFn, {
//     enabled: user.data !== null,
//     staleTime: 100000000000,
//   });

//   const onSettled = (...args) => {
//     // setTimeout(() => {
//     queryClient.invalidateQueries(["user", user?.data?.id, "starred"]);
//     // }, 1000);
//   };

//   const onError = (err, mediaId, context) => {
//     queryClient.setQueryData(
//       ["user", user?.data?.id, "starred"],
//       context.previousStarred
//     );
//   };

//   const onMutate = async (mediaId: Map<string, string>) => {
//     // console.log("mediaId?", mediaId);
//     // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
//     await queryClient.cancelQueries(["user", user?.data?.id, "starred"]);

//     // Snapshot the previous value
//     const previousStarred = queryClient.getQueryData<Map<string, string>>([
//       "user",
//       user?.data?.id,
//       "starred",
//     ]);

//     // Optimistically update to the new value
//     queryClient.setQueryData<Map<string, string>>(
//       ["user", user?.data?.id, "starred"],
//       // (old) => ({ ...old, ...mediaId })
//       { ...previousStarred, ...mediaId }
//     );

//     // Return a context object with the snapshotted value
//     return { previousStarred };
//   };

//   const addStarMutationFn = async (mediaId: string) => {
//     const resp = await client.mutate({
//       mutation: documents.ADD_STAR,
//       variables: {
//         userId: user?.data?.id,
//         mediaId: mediaId,
//       },
//     });

//     return resp.data.update_user.returning.map((x) => {
//       return x.starred as Map<string, string>;
//     })?.[0];
//   };
//   const addStarMutation = useMutation(addStarMutationFn, {
//     onMutate,
//     onError,
//     onSettled,
//   });
//   return { starredQuery, addStarMutation };
// };
export {};
