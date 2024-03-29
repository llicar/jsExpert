const {readFile} = require('fs/promises')
const {join} = require('path')
const {error} = require('./constants')

const DEFAULT_OPTION = {
    maxLines:3,
    fields:["id","name","profession","age"]
}
class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)
        return content
    }

    static async getFileContent(filePath){
        const filename = join(__dirname,filePath)
        return (await readFile(filename)).toString("utf8")
    }
    static isValid(csvString,options = DEFAULT_OPTION){
        const [headers,...fileWithoutHeader] = csvString.split('\n')
        const isHeaderValid = headers ===options.fields.join(',')
        if(!isHeaderValid){
            return{
                error:error.FILE_FIELDS_ERROR_MESSAGE,
                valid:false
            }
        }
    }
}

(async () =>{
    const result = await File.csvToJson('./../mocks/invalid-header.csv')
    //const result = await File.csvToJson('./../mocks/fourItems-invalid.csv')
    console.log('result',result)
})();