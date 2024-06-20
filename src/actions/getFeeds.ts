"use server";
import { getApiUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";
import {Feed} from "@/types/Feed";

export const getFeeds = async (
  offset: number,
  limit: number
): Promise<Feed[]> => {
  const url = getApiUrl(offset, limit);

  try {
    const response = await fetch(url);
    const data = (await response.json()) as Feed[];
    if (!response.ok) {
      throw await handleError(response);
    }
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};
