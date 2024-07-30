import { z } from "zod";

export const AddFishFormSchema = z.object({
  name: z
    .string({ required_error: "Name cannot be empty" })
    .min(1, "Name must contain at least 1 character(s)")
    .max(255, "Name cannot longer than 255 character(s)"),
  latin_name: z
    .string({ required_error: "Latin name cannot be empty" })
    .min(1, "Latin name must contain at least 1 character(s)")
    .max(255, "Latin name cannot longer than 255 character(s)"),
  images: z.any(),
  description: z
    .string({ required_error: "Description cannot be empty" })
    .min(50, "Description must contain at least 50 character(s)")
    .max(3000, "Description cannot longer than 3000 character(s)"),
  ideal_temperature: z
    .string({ required_error: "Ideal temperature cannot be empty" })
    .min(1, "Ideal temperature must contain at least 1 character(s)")
    .max(9, "Ideal temperature cannot longer than 9 character(s)"),
  ideal_ph: z
    .string({ required_error: "Ideal pH cannot be empty" })
    .min(1, "Ideal pH must contain at least 1 character(s)")
    .max(9, "Ideal pH cannot longer than 9 character(s)"),
  foods: z
    .array(
      z
        .string({ required_error: "Item(s) must be string" })
        .min(2, "Item(s) must contain at least 2 character(s)")
        .max(255, "Item(s) cannot longer than 255 character(s)"),
    )
    .min(1, "Foods must contain at least 1 item(s)"),
  tags: z
    .array(
      z
        .string({ required_error: "Item(s) must be string" })
        .min(2, "Item(s) must contain at least 2 character(s)")
        .max(255, "Item(s) cannot longer than 255 character(s)"),
    )
    .min(1, "Tags must contain at least 1 item(s)"),
  compatibility: z
    .array(
      z
        .string({ required_error: "Item(s) must be string" })
        .min(2, "Item(s) must contain at least 2 character(s)")
        .max(255, "Item(s) cannot longer than 255 character(s)"),
    )
    .min(1, "Compatibility must contain at least 1 item(s)"),
  treatment: z
    .string({ required_error: "Treatment cannot be empty" })
    .min(50, "Treatment must contain at least 50 character(s)")
    .max(3000, "Treatment cannot longer than 3000 character(s)"),
  general_problem: z
    .string({ required_error: "General problem cannot be empty" })
    .min(50, "General problem must contain at least 50 character(s)")
    .max(3000, "General problem cannot longer than 3000 character(s)"),
  history: z
    .string({ required_error: "History problem cannot be empty" })
    .min(50, "History must contain at least 50 character(s)")
    .max(3000, "History cannot longer than 3000 character(s)"),
  info_src: z
    .array(
      z
        .string({ invalid_type_error: "Information source must be a string" })
        .url({ message: "Information source must be a valid URL" }),
    )
    .min(1, "Source must contain at least 1 item(s)"),
  tipe: z.literal("ikan"),
});

export const EditFishFormSchema = z.object({
  name: z
    .string({ required_error: "Name cannot be empty" })
    .min(1, "Name must contain at least 1 character(s)")
    .max(255, "Name cannot longer than 255 character(s)"),
  latin_name: z
    .string({ required_error: "Latin name cannot be empty" })
    .min(1, "Latin name must contain at least 1 character(s)")
    .max(255, "Latin name cannot longer than 255 character(s)"),
  images_url: z.array(z.string().url()),
  images: z.any(),
  description: z
    .string({ required_error: "Description cannot be empty" })
    .min(50, "Description must contain at least 50 character(s)")
    .max(3000, "Description cannot longer than 3000 character(s)"),
  ideal_temperature: z
    .string({ required_error: "Ideal temperature cannot be empty" })
    .min(1, "Ideal temperature must contain at least 1 character(s)")
    .max(9, "Ideal temperature cannot longer than 9 character(s)"),
  ideal_ph: z
    .string({ required_error: "Ideal pH cannot be empty" })
    .min(1, "Ideal pH must contain at least 1 character(s)")
    .max(9, "Ideal pH cannot longer than 9 character(s)"),
  foods: z
    .array(
      z
        .string({ required_error: "Item(s) must be string" })
        .min(2, "Item(s) must contain at least 2 character(s)")
        .max(255, "Item(s) cannot longer than 255 character(s)"),
    )
    .min(1, "Foods must contain at least 1 item(s)"),
  tags: z
    .array(
      z
        .string({ required_error: "Item(s) must be string" })
        .min(2, "Item(s) must contain at least 2 character(s)")
        .max(255, "Item(s) cannot longer than 255 character(s)"),
    )
    .min(1, "Tags must contain at least 1 item(s)"),
  compatibility: z
    .array(
      z
        .string({ required_error: "Item(s) must be string" })
        .min(2, "Item(s) must contain at least 2 character(s)")
        .max(255, "Item(s) cannot longer than 255 character(s)"),
    )
    .min(1, "Compatibility must contain at least 1 item(s)"),
  treatment: z
    .string({ required_error: "Treatment cannot be empty" })
    .min(50, "Treatment must contain at least 50 character(s)")
    .max(3000, "Treatment cannot longer than 3000 character(s)"),
  general_problem: z
    .string({ required_error: "General problem cannot be empty" })
    .min(50, "General problem must contain at least 50 character(s)")
    .max(3000, "General problem cannot longer than 3000 character(s)"),
  history: z
    .string({ required_error: "History problem cannot be empty" })
    .min(50, "History must contain at least 50 character(s)")
    .max(3000, "History cannot longer than 3000 character(s)"),
  info_src: z
    .array(
      z
        .string({ invalid_type_error: "Information source must be a string" })
        .url({ message: "Information source must be a valid URL" }),
    )
    .min(1, "Source must contain at least 1 item(s)"),
  tipe: z.literal("ikan"),
});
