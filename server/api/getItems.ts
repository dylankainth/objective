import { getServerSession } from '#auth'
import { CosmosClient } from "@azure/cosmos";

export default defineEventHandler(async (event) => {
    
        const session = await getServerSession(event)
        if (!session) { return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };}
    
        // connect to cosmosdb using the connection string
        const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING as string);
        const database = client.database("production");
        const container = database.container("bids");

        const querySpec = {
            query: 'SELECT * FROM bids'
        };
        
        var response = await container.items.query(querySpec).fetchAll();

        return {
            statusCode: 200,
            body: (response.resources),
        };
})
