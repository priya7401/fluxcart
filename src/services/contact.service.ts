import { AppDataSource } from "../database/dbConnection";
import { Contact } from "../database/entity/Contact";

const projectRepository = AppDataSource.getRepository(Contact);
