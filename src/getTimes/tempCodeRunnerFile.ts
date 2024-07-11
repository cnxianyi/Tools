try {        
    //     let fileData = [];
    //     if (fs.existsSync(filePath)) {
    //         const fileContent = fs.readFileSync(filePath, 'utf8');
    //         fileData = JSON.parse(fileContent);            
    //     }        
    //     console.log(fileData);
    //     console.log(data);
        
    //     // // Append the new data
    //     fileData.push(data)

    //     // // Write updated data back to the JSON file
    //     fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

    //     ctx.status = 201;
    //     ctx.body = 'Data saved successfully';
    // } catch (error: any) {
    //     console.log(2);
        
    //     ctx.status = 500;
    //     ctx.body = {
    //         error: 'Failed to save data',
    //         details: error.message
    //     };
    // }