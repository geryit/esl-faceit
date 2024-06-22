"use server";
import type { Post } from "@/types/Post";
import { getApiUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";

export const getFeeds = async (
  offset: number,
  limit: number
): Promise<Post[]> => {
  const url = getApiUrl(offset, limit);

  try {
    const response = await fetch(url);
    const data = (await response.json()) as Post[];
    if (!response.ok) {
      throw await handleError(response);
    }
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};
