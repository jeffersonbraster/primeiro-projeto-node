import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandleBarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({ file, variables }: IMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
