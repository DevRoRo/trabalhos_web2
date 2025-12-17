import { Poll, Option } from '../Entities/poll.js';
import { User } from '../Entities/user.js';

export class PollsRepository {

    // injetando a conexao do banco no repository
    constructor(dbCon) {
        this.dbCon = dbCon;
    }

    async salvar(poll) {
        await this.dbCon.poll.create({
            data: {
                id: poll.id,
                title: poll.title,
                visibility: poll.visibility,
                status: poll.status,
                startAt: poll.startAt,
                endAt: poll.endAt,
                expectedVotes: poll.expectedVotes,
                categories: poll.categories.join(),
                options: {
                    create: poll.options.map(opt => ({
                        description: opt.description
                    }))
                },
                creator: {
                    connect: { id: poll.creator.id }
                }
            },
        });
    }

    async buscar(id) {
        const data = await this.dbCon.poll.findUnique({
            where: { id },
            include: {
                creator: true,
    
                _count: {
                    select: { votes: true } 
                },

                options: {
                    include: {
                        _count: {
                           select: { votes: true }
                        }
                    } 
                }
            }
        });

        if (!data) return null;

        const optionsInstances = data.options.map(opt => {
            const optObj = new Option(opt.id, opt.description); 
            optObj.setQtdVotos(opt._count.votes)
            return optObj
        });

        const creatorInstance = new User(
            data.creator.id,
            `${data.creator.firstname} ${data.creator.surname}`,
            data.creator.cpf,
            data.creator.email,
            data.creator.password
        );

        const totalVotes = data._count.votes

        const poll = new Poll(
            data.id,
            data.title,
            data.visibility,
            data.status,
            data.endAt,         
            data.startAt,
            data.expectedVotes,
            data.categories.split(','),
            optionsInstances,
            creatorInstance,
        );

        poll.setQtdVotos(totalVotes)

        return poll;
    }

    async update(poll, partialData) {
        const id = poll.id
        try {
            const updatedPoll = await this.dbCon.poll.update({
                where: {
                    id: id
                },
                data: partialData 
            });

            return updatedPoll;

        } catch (error) {
            console.error(`Error updating poll with ID ${id}:`, error);
            throw error; 
        }
    }

    async votar(userId, pollId, optionId) {
        try {
            const vote = await this.dbCon.vote.create({
                data: {
                    userId,
                    pollId,
                    optionId
                }
            });

            return vote

        } catch (error) {
            if (error.code === 'P2002') {
            throw new Error("User already voted on this poll.");
            }
            throw error;
        }
    }
}