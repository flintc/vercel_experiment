import { graphql } from "./generated/gql";

export const GET_ROOM = graphql(`
  query Room($roomName: String!) {
    room(where: { name: { _eq: $roomName } }) {
      state
      round
    }
  }
`);

export const GET_USER = graphql(`
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
`);

export const GET_ROOM_2 = graphql(
  "\n  query Room($roomName: String!) {\n    room(where: { name: { _eq: $roomName } }) {\n      state\n      round\n    }\n  }\n"
);

export const USER_STARRED = graphql(`
  query UserStarred($userId: String!) {
    user: user_by_pk(id: $userId) {
      id
      name
      starred
    }
  }
`);

export const ADD_STAR = graphql(`
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
`);

export const Foo = graphql(
  "\n  subscription UserSubscription($userId: String!) {\n    user: user_by_pk(id: $userId) {\n      id\n      name\n      starred\n      room {\n        state\n        id\n        name\n        round\n        users {\n          id\n          name\n        }\n        questions(order_by: { created_at: asc_nulls_last }) {\n          id\n          name\n          questionId\n          description\n          answer\n          responses(order_by: { created_at: desc_nulls_last }) {\n            value\n            owner {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"
);

export const SUBSCRIBE_TO_USER = graphql(`
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
`);

export const SUBMIT_ANSWER = graphql(`
  mutation SubmitAnswer(
    $questionId: uuid!
    $ownerId: String!
    $answer: Int!
    $roomState: String!
  ) {
    insert_response(
      objects: [
        { value: $answer, owner_id: $ownerId, question_id: $questionId }
      ]
    ) {
      affected_rows
    }
    update_room(
      where: { questions: { id: { _eq: $questionId } } }
      _set: { state: $roomState }
    ) {
      returning {
        round
      }
    }
  }
`);

export const START_GAME = graphql(`
  mutation StartGame($roomName: String!) {
    update_room(
      where: { name: { _eq: $roomName } }
      _set: { state: "selecting" }
    ) {
      affected_rows
    }
  }
`);
