import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

const compileEmailTemplate = async (templateName: string, data: Record<string, any>) => {
    // const filePath = path.join(__dirname, '../templates/mail.hbs')
    const filePath = path.join(__dirname, '../templates', `${templateName}.hbs`)
    const source = fs.readFileSync(filePath, 'utf-8')
    const template = handlebars.compile(source)

    return template(data)
}

export default compileEmailTemplate