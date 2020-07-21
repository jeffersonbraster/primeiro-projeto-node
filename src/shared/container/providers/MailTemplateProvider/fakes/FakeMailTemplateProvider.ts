import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IMailTemplateDTO): Promise<string> {
    return template;
  }
}
