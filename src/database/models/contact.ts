import { LinkPrecedence } from "../../config/appConstants";

interface ContactInterface {
  id?: number;
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: number | null;
  linkPrecedence?: LinkPrecedence | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export { ContactInterface };
