import { defineCollection, z } from 'astro:content';

const mediaItem = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('video'),
    src: z.string(),
    poster: z.string().optional(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
]);

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['complete', 'in-progress', 'ongoing']),
    role: z.string(),
    tools: z.array(z.string()),
    summary: z.string(),
    repo: z.string().url().optional(),
    media: z.array(mediaItem).default([]),
    draft: z.boolean().default(false),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['lab-work', 'conference', 'paper-reading']),
    summary: z.string(),
    award: z.string().optional(),
    media: z.array(mediaItem).default([]),
    draft: z.boolean().default(false),
  }),
});

const involvement = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().default(null),
    summary: z.string(),
    media: z.array(mediaItem).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, research, involvement };
