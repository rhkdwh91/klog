import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const useUsersQuery = () => {
  return useQuery(
    ["usersQueryKey"],
    async () =>
      await request(
        process.env.NEXT_PUBLIC_API_URL,
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
