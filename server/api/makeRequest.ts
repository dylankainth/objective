// include the required modules
import { BlobServiceClient } from "@azure/storage-blob";
import { getServerSession } from '#auth'
import { CosmosClient } from "@azure/cosmos";

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    if (!session) { return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };}
     
    // connect to cosmosdb using the connection string
    const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING as string);
    const database = client.database("production");
    const container = database.container("bids");

    var item = {
        'id': '70b63682-b93a-4c77-aad2-65501347265f',
        'category': 'gear-surf-surfboards',
        'name': 'Yamba Surfboard',
        'quantity': 12,
        'price': 850.00,
        'clearance': false
    };
    
    var response = await container.items.upsert(item);

    


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