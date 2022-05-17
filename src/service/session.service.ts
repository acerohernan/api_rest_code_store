import { FilterQuery} from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export async function createSession (userId: string, userAgent: string) {
 return SessionModel.create({user: userId, userAgent});
};

export async function findSessionById (sessionId: string) {
    return SessionModel.findById(sessionId);
};

export async function findSessionByQuery (query: FilterQuery<SessionDocument>) {
    return SessionModel.findOne(query).lean();
};

export async function deleteSessionByQuery (query: FilterQuery<SessionDocument>) {
    return SessionModel.findOneAndDelete(query);
};