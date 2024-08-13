import { LinkPrecedence } from "../config/appConstants";
import { AppDataSource } from "../database/dbConnection";
import { Contact } from "../database/entity/Contact";
import { ContactInterface } from "../database/models/contact";

const contactRepository = AppDataSource.getRepository(Contact);

export const getContactsByPhoneOrEmail = async (
  contactDetails?: ContactInterface
) => {
  return await contactRepository.find({
    where: [
      { phoneNumber: contactDetails.phoneNumber },
      { email: contactDetails.email },
    ],
    order: {
      createdAt: "ASC",
    },
  });
};

export const createContact = async (contactDetails?: ContactInterface) => {
  const contact = contactRepository.create(contactDetails);
  return await contactRepository.save(contact);
};

export const updateContact = async (
  id: number,
  contactDetails?: ContactInterface
) => {
  return await contactRepository.update({ id: id }, contactDetails);
};

export const setSecondaryContacts = async (
  primaryContactId: number,
  secondaryContactIds: number[]
) => {
  const updatedContacts = await AppDataSource.createQueryBuilder()
    .update(Contact)
    .set({
      linkPrecedence: LinkPrecedence.secondary,
      linkedId: primaryContactId,
    })
    .where("id IN (:...ids)", { ids: secondaryContactIds })
    .execute();
  const contacts = updatedContacts.raw[0];
  return contacts;
};
