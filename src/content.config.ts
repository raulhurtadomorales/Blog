import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const casos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dek: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { casos };
