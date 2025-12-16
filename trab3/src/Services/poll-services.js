import { Poll } from "../Entities/poll";

export class pollService {

    constructor(pollsRepository) {
        this.pollsRepository = pollsRepository
    }

    async createPoll({ title, description, visibility, endAt, expectedVotes, categories, options}) {
        const poll = new Poll(id, title, visibility, status, startAt, endAt, expectedVotes, categories, options, creator)
    }
}