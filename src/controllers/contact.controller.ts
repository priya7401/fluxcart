import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../config/httpStatusCodes";
import * as contactService from "../services/contact.service";
import { LinkPrecedence } from "../config/appConstants";
import { ContactInterface } from "../database/models/contact";

export const identifyContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, email } = req.body;

    let primaryContact: ContactInterface;
    let secondaryContactIds = [];

    // step 1: check if record already exists
    const existingContacts = await contactService.getContactsByPhoneOrEmail({
      phoneNumber,
      email,
    });

    if (!existingContacts || existingContacts.length === 0) {
      // step 2a. create new record if both phone and email are new
      primaryContact = await contactService.createContact({
        phoneNumber,
        email,
      });
    } else {
      // step 2b. update existing contacts

      // step 3. find primary contact of customer
      primaryContact = existingContacts.find(
        (contact) => contact.linkPrecedence === LinkPrecedence.primary
      );

      // step 3a. if there are no primary contacts (due to DB inconsistency or any other reason),
      //          treat the oldest one as the primary contact
      if (!primaryContact) {
        primaryContact = existingContacts[0];
        primaryContact.linkPrecedence = LinkPrecedence.primary;
        await contactService.updateContact(primaryContact.id, primaryContact);
      }

      // step 4. after finalising the primary contact from the above step, make the rest of the contacts
      //         as secondary and update the linkedId as the id of the primary contact from above step
      for (const contact of existingContacts) {
        if (contact.id !== primaryContact.id) {
          secondaryContactIds.push(contact.id);
        }
      }
      if (secondaryContactIds && secondaryContactIds.length > 0) {
        await contactService.setSecondaryContacts(
          primaryContact.id,
          secondaryContactIds
        );
      }

      const existingContactWithPhoneOrEmail = existingContacts.some(
        (contact) =>
          contact.email === email && contact.phoneNumber === phoneNumber
      );

      if (!existingContactWithPhoneOrEmail) {
        const newContact = await contactService.createContact({
          phoneNumber: phoneNumber,
          email: email,
          linkedId: primaryContact.id,
          linkPrecedence: LinkPrecedence.secondary,
        });
        secondaryContactIds.push(newContact.id);
      }
    }
    let emails: string[] = [];
    let phoneNumbers: string[] = [];

    existingContacts.forEach((contact) => {
      if (contact.email) {
        emails.push(contact.email);
      }
      if (contact.phoneNumber) {
        phoneNumbers.push(contact.phoneNumber);
      }
    });
    if (email) {
      emails.push(email);
    }
    if (phoneNumber) {
      phoneNumbers.push(phoneNumber);
    }

    return res.status(HttpStatusCode.OK).json({
      contact: {
        primaryContactId: primaryContact.id,
        emails: [...new Set(emails)],
        phoneNumbers: [...new Set(phoneNumbers)],
        secondaryContactIds: secondaryContactIds,
      },
    });
  } catch (error) {
    next(error);
  }
};
