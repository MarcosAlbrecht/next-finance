"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function userHasPremiumfunction(userId: string): Promise<boolean> {
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  return hasPremiumPlan;
}
