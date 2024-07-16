import { gql } from "@apollo/client";

export const CREATE_OUTLET = gql`
  mutation CreateOutlet($name: String, $users: String) {
    createOutlet(name: $name, users: $users) {
      name
    }
  }
`;
export const EDIT_OUTLET = gql`
  mutation EditOutlet($id: Int, $name: String, $users: String) {
    editOutlet(id: $id, name: $name, users: $users) {
      name
    }
  }
`;
export const DELETE_OUTLET = gql`
  mutation DeleteOutlet($id: Int) {
    deleteOutlet(id: $id) {
      name
    }
  }
`;
