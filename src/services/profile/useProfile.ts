import { useQuery, useMutation } from "@tanstack/react-query";
import { client } from "../client";
import { useRegister } from "@/services/auth/useAuth";

const fetchProfile = async ({ query = {} }) => {
  return client("/getProfile", {
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useProfile = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["profile", query],
    queryFn: () => fetchProfile({ query }),
    ...options,
  }) as any;
};

function useCreateProfile({ options }: any) {
  return useMutation({
    mutationFn: (reqBody: any) =>
      client("/createProfile", {
        method: "POST",
        data: reqBody,
      }),
    ...options,
  }) as any;
}

function useUpdateProfile({ options }: any) {
  return useMutation({
    mutationFn: (updates) =>
      client("/updateProfile", {
        method: "PUT",
        data: updates,
      }),
    ...options,
  });
}

export { useProfile, useCreateProfile, useUpdateProfile };
