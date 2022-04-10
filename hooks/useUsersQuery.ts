import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const useUsersQuery = () => {
  return useQuery(
    ["usersQueryKey"],
    async () =>
      await request(
        `https://api.josns.pe.kr/graphql`,
        gql`
          query {
            users {
              id
              name
              email
            }
          }
        `
      ),
    {
      select: (data) => data.data.users,
    }
  );
};

export default useUsersQuery;
