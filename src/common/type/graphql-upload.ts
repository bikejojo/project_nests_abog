// types/graphql-upload.d.ts
declare module 'graphql-upload' {
  import { RequestHandler } from 'express';

  export type FileUpload = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  };

  export const GraphQLUpload: any;
  const graphqlUploadExpress: (options?: {
    maxFileSize?: number;
    maxFiles?: number;
  }) => RequestHandler;

  export default graphqlUploadExpress;
}
