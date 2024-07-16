import { gql } from "@apollo/client";

export const GET_OUTLETS = gql`
  query GetOutlets {
    getOutlets {
      outlets {
        name
      }
      sum
    }
  }
`;

export const GET_OUTLET = gql`
  query GetOutlet($name: String) {
    getOutlet(name: $name) {
      id
      name
      users {
        id
        name
        access
      }
    }
  }
`;
