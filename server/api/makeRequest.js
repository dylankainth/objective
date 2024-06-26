export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event);
    files?.foreach((file) => {
        console.log(file);
    });
});