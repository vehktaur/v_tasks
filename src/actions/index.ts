'use server';

import { backendClient } from '@/lib/edgestore-server';

export const deleteCoverImage = async (url?: string | null) => {
  try {
    // Delete picture from edgestore
    if (url) await backendClient.taskCovers.deleteFile({ url });

    return {
      success: true,
      msg: 'Cover image deleted',
    };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
