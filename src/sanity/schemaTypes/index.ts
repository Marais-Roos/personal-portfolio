import { type SchemaTypeDefinition } from 'sanity'

import project from './project';
import service from './service';
import contact from './contact';
import portfolioDownload from './portfolioDownload';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    service,
    contact,
    portfolioDownload,
  ],
}
