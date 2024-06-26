// include the required modules
import { BlobServiceClient } from "@azure/storage-blob";
import { getServerSession } from '#auth'
import { CosmosClient } from "@azure/cosmos";
import {v4 as uuidv4} from 'uuid';

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    if (!session) { return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };}
     
    // connect to cosmosdb using the connection string
    const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING as string);
    const database = client.database("production");
    const container = database.container("bids");

    let myuuid = uuidv4();

    var item = {
        'id': myuuid,
        'person': session.user?.email,
        'status': 'open',
        'created': new Date().toISOString(),
        'expires': new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
        'bids': [],
        'startingbid': 10,
        'files': [] as { name: string, url: string }[],
        'publicfiles': true
    };

    const files = await readMultipartFormData(event);
    files?.forEach((file) => {
        // upload to blob
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string);

        const containerName = "printfilecontainer";
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const blobName = file.filename;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName as string);

        blockBlobClient.uploadData(file.data);

        item.files.push({
            'name': blobName as string,
            'url': blockBlobClient.url
        });

    });
    
    var response = await container.items.upsert(item);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "File uploaded successfully" }),
    };
});