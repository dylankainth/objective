// include the required modules

import { BlobServiceClient } from "@azure/storage-blob";

export default defineEventHandler(async (event) => {

    const files = await readMultipartFormData(event);
    files?.forEach((file) => {

        // upload to blob
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string);

        const containerName = "printfilecontainer";
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const blobName = file.filename;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName as string);

        blockBlobClient.uploadData(file.data);

    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "File uploaded successfully" }),
    };
});