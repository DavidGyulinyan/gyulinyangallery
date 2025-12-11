import { z } from 'zod'

export const artworkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  dimensions: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  price: z.number().min(0).optional(),
  url: z.string().url('Invalid URL'),
})

export const exhibitionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
})

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const contactFormSchema = messageSchema

export type Artwork = z.infer<typeof artworkSchema>
export type Exhibition = z.infer<typeof exhibitionSchema>
export type Message = z.infer<typeof messageSchema>