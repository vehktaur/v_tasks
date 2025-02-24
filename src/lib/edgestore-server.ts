import { initEdgeStoreClient } from '@edgestore/server/core';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

//Initiate the edgeStore builder
const es = initEdgeStore.create();

//create the edgeStore router and configure the edgeStore image bucket
const edgeStoreRouter = es.router({
  taskCovers: es
    .imageBucket({
      maxSize: 1024 * 1024 * 3,
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log(`Deleted: ${fileInfo} \n With ctx: ${ctx}`);
      return true;
    }),
});

//create and export the api handler (to handle http routes)
export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

//create the backend client
export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

//export the type of the router for type safety (TBU in edgestore provider)
export type EdgeStoreRouter = typeof edgeStoreRouter;
