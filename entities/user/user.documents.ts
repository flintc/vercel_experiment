import { gql } from "@apollo/client";
// import { graphql } from "../../generated/gql";

export const GET_USER = gql`
  query User($userId: String!) {
    user: user_by_pk(id: $userId) {
      id
      name
      starred
      room {
        state
        id
        name
      }
    }
  }
`;

export const USER_STARRED = gql`
  query UserStarred($userId: String!) {
    user: user_by_pk(id: $userId) {
      id
      name
      starred
    }
  }
`;

export const SUBSCRIBE_TO_USER = gql`
  subscription UserSubscription($userId: String!) {
    user: user_by_pk(id: $userId) {
      id
      name
      starred
      room {
        state
        id
        name
        round
        users {
          id
          name
        }
        questions(order_by: { created_at: asc_nulls_last }) {
          id
          name
          questionId
          description
          answer
          responses(order_by: { created_at: desc_nulls_last }) {
            value
            owner {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation UserAddStar($userId: String!, $mediaId: jsonb) {
    update_user(
      where: { id: { _eq: $userId } }
      _append: { starred: $mediaId }
    ) {
      returning {
        id
        name
        starred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation UserRemoveStar($userId: String!, $mediaId: String) {
    update_user(
      where: { id: { _eq: $userId } }
      _delete_key: { starred: $mediaId }
    ) {
      returning {
        id
        name
        starred
      }
    }
  }
`;
