import { type SchemaTypeDefinition } from 'sanity'

import project from './project';
import service from './service';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    service,
  ],
}
