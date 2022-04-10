import { useMutation } from "react-query";
import { request, gql } from "graphql-request";

const useGoogleLoginMutation = ({
  email,
  name,
  googleId,
  tokenId,
  accessToken,
}) => {
  return useMutation(
    ["useUserMutationKey"],
    async () =>
      await request(
        process.env.NEXT_PUBLIC_API_URL,
        gql`
          mutation GoogleLogin(
            $email: String!
            $name: String!
            $googleId: String!
            $tokenId: String!
            $accessToken: String!
          ) {
            googleLogin(
              email: $email
              name: $name
              googleId: $googleId
              tokenId: $tokenId
              accessToken: $accessToken
            ) {
              id
              email
              name
            }
          }
        `,
        { email, name, googleId, tokenId, accessToken }
      )
  );
};

export default useGoogleLoginMutation;
