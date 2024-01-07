import { gql } from "@apollo/client";

export const ME = gql`
query Me {
  me {
    _id
    username
    email
    password
    posts {
      _id
      poster
      content
      date
      subFrm
    }
  }
}
`;

export const SUB_INFO = gql`
query SubInfo {
  allUsers {
    _id
    username
    email
    password
    posts {
      _id
      poster
      content
      date
      subFrm
    }
  }
}
`;