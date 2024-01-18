import z from 'zod';
import { WithPagination, WithSortingSchema } from './utils-schema';

const CreatePostInputBody = z.object({
    title: z.string(),
    body: z.string(),
    isActive: z.boolean().default(true),
    geoLocation: z.object({
        type: z.enum(['Point']).default('Point'),
        coordinates: z.array(z.number()).min(2).max(2)
    })
})


export const CreatePostInputSchema = z.object({
    body: CreatePostInputBody
});


export const UpdatePostInputSchema = z.object({
    body: CreatePostInputBody,
    params: z.object({
        id: z.string()
    })
})


export const PostListInputSchema = z.object({
    query: WithPagination.merge(WithSortingSchema)
})
