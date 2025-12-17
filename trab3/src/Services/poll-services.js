import { Poll, Option } from "../Entities/poll.js";
import { ExclusionService } from "./exclusion-service.js";

export class pollService {

    constructor(pollRepository, userRepository) {
        this.pollRepository = pollRepository
        this.userRepository = userRepository
        this.exclusionService = new ExclusionService()
    }

    async createPoll(input, userInfo) {
        const { title, visibility, status, endAt, expectedVotes, categories, options } = input
        const { email } = userInfo
        const user = await this.userRepository.buscar(email)
        const pollOptions = []

        try {
        console.log("Consulting external exclusion service...");
        
        const checkResult = await this.exclusionService.checkForBannedWords(title, options);

        if (checkResult.blocked) {
            throw new Error(`${checkResult.reason}`)
        }

        for (let option of options) {
            pollOptions.push(new Option(null, option.text))
        }

        const poll = new Poll(null, title, visibility, status, endAt, null, expectedVotes, categories, pollOptions, user)

        this.pollRepository.salvar(poll)

        return poll

        } catch (error) {
            throw error;
        }

    }

    async updatePoll(pollId, userEmail, updateParams) {
        const poll = await this.pollRepository.buscar(pollId)
        console.dir(poll, {depth: null})
        const user = await this.userRepository.buscar(userEmail)
        const userId = user.id
        const pollCreatorId = poll.creator.id

        if(pollCreatorId === userId) {
            return this.pollRepository.update(poll, updateParams)
        } else {
            return 'USUÁRIO NÃO É O CRIADOR DA POLL'
        }
    }

    async votar(email, pollId, optionId) {

        const user = await this.userRepository.buscar(email);
        if (!user) throw new Error("Usuário não encontrado.");

        const poll = await this.pollRepository.buscar(pollId);
        if (!poll) throw new Error("Enquete não encontrada.");

        if (poll.status === 'CLOSED') {
            throw new Error("Esta enquete já está fechada.");
        }
        const now = new Date();
        
        if (now < poll.startAt) {
            throw new Error("A enquete ainda não começou.");
        }
        
        if (now > poll.endAt) {
            throw new Error("O período de votação já encerrou.");
        }

        if (poll.expectedVotes && poll.expectedVotes > 0) {
            const currentVotes = poll.qtdVotos

            if (currentVotes >= poll.expectedVotes) {
                throw new Error("A enquete atingiu o limite máximo de votos.");
            }
        }

        try {
            return await this.pollRepository.votar(user.id, pollId, optionId);
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error("Você já votou nesta enquete.");
            }
            throw error;
        }
    }

    async showPartials(pollId, email) {
        const poll = await this.pollRepository.buscar(pollId);

        if (!poll) {
            throw new Error('Poll not found.');
        }

        if (poll.visibility === 'PRIVATE') {
            if (poll.creator?.email !== email) {
                throw new Error('Access denied: Only the creator can view partial results of a private poll.');
            }
        }

        const totalVotes = poll.options.reduce((sum, option) => {
            return sum + (Number(option.qtdVotos) || 0);
        }, 0);

        const formattedOptions = poll.options.map(option => {
            const voteCount = Number(option.qtdVotos) || 0;

            const percentage = totalVotes === 0 
                ? 0 
                : (voteCount / totalVotes) * 100;

            return {
                id: option.id,
                text: option.text,
                votes: voteCount, 
                percentage: Number(percentage.toFixed(2)) 
            };
        });

        return {
            pollId: poll.id,
            title: poll.title,
            totalVotes: totalVotes,
            options: formattedOptions,
            status: poll.status
        };
    }
}