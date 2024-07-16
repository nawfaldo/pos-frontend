import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($name: String, $password: String) {
    login(name: $name, password: $password) {
      name
      toMenu
    }
  }
`;
export const LOGOUT = gql`
  mutation Logout {
    logout {
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String, $password: String, $userGroupId: Int) {
    createUser(name: $name, password: $password, userGroupId: $userGroupId) {
      name
    }
  }
`;
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: Int
    $userName: String
    $name: String
    $password: String
    $userGroupId: Int
  ) {
    updateUser(
      userId: $userId
      userName: $userName
      name: $name
      password: $password
      userGroupId: $userGroupId
    ) {
      id
      name
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: Int) {
    deleteUser(id: $id) {
      name
    }
  }
`;

export const CREATE_USER_GROUP = gql`
  mutation CreateUserGroup($name: String, $check: String) {
    createUserGroup(name: $name, check: $check) {
      name
    }
  }
`;
export const EDIT_USER_GROUP = gql`
  mutation EditUserGroup($id: Int, $name: String, $check: String) {
    editUserGroup(id: $id, name: $name, check: $check) {
      name
    }
  }
`;
export const DELETE_USER_GROUP = gql`
  mutation DeleteUserGroup($id: Int) {
    deleteUserGroup(id: $id) {
      name
    }
  }
`;
