import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query GetAuthUser($menu: String) {
    getAuthUser(menu: $menu) {
      name
      menus
      access
      userGroup {
        name
      }
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers($skip: Int, $take: Int) {
    getUsers(skip: $skip, take: $take) {
      users {
        id
        name
        password
        userGroup {
          name
        }
      }
      userSum
    }
  }
`;
export const GET_USER = gql`
  query GetUser($name: String) {
    getUser(name: $name) {
      id
      name
      password
      userGroup {
        id
        name
      }
    }
  }
`;
export const SEARCH_USERS = gql`
  query SearchUsers($skip: Int, $take: Int, $search: String) {
    searchUsers(skip: $skip, take: $take, search: $search) {
      users {
        name
        password
        userGroup {
          name
        }
      }
      userSum
    }
  }
`;

export const GET_USER_GROUPS = gql`
  query GetUserGroups {
    getUserGroups {
      id
      name
    }
  }
`;
export const GET_USER_GROUP = gql`
  query GetUserGroup($name: String) {
    getUserGroup(name: $name) {
      id
      name
      roles {
        name
        details {
          id
          name
          access
        }
      }
    }
  }
`;
