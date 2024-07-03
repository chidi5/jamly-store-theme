import { getSession } from "@/lib/utils/auth";

export const currentUser = async () => {
  const { user } = await getSession();
  return user;
};
