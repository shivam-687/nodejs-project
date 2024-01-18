import config from '@/config';
import z from 'zod';

export const WithPagination = z.object({
    page: z.string().optional(),
    limit: z.string().optional().default(config.limit.toString())
});

export const WithSortingSchema = z.object({
    sortOrder: z.string().optional(),
    sortBy: z.enum(['asc, desc']).optional()
})