import { api } from "@/lib/api";
import { createCrudService } from "./crud.service";
import { revalidatePage } from "@/app/actions";

export interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const adminContactService = createCrudService<Contact>("/admin/contacts");

export const getContactsByAdmin = async (params: Record<string, any> = {}) => {
  return adminContactService.getAll(params);
};

export const getContactByIdByAdmin = async (id: string) => {
  return adminContactService.getByIdOrSlug(id);
};

export const updateContactByAdmin = async (
  id: string,
  data: Partial<Contact>,
) => {
  await revalidatePage("/", "layout");
  return adminContactService.update(id, data);
};

export const deleteContactByAdmin = async (id: string) => {
  await revalidatePage("/", "layout");
  return adminContactService.delete(id);
};

export const submitContactForm = async (data: Partial<Contact>) => {
  return api("/contact-us", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
