import { pollService } from "../Services/poll-services.js";

export class pollController {

    /**
     * 
     * @param {pollService} service 
     */
    constructor(service) {
        this.service = service;
    }

    async create(req, res) {
        const pollInput = req.body
        const userInput = req.user

        const output = await this.service.createPoll(pollInput, userInput)

        res.json(output)
    }

    async endEarly(req, res) {
        const { pollId } = req.params
        const { email } = req.user

        const output = await this.service.endEarly(pollId, email)

        res.json(output)
    }

    async updatePoll(req, res) {
        const { pollId } = req.params
        const { email } = req.user
        const updateParams = req.body

        const output = await this.service.updatePoll(pollId, email, updateParams)

        res.json(output)
    }

    async votar(req, res) {
        const { pollId } = req.params
        const { email } = req.user
        const { optionId } = req.body

        const output = await this.service.votar(email, pollId, optionId)

        res.json(output)
    }

    async showPartials(req, res) {
        const { pollId } = req.params
        const { email } = req.user

        const output = await this.service.showPartials(pollId, email)

        res.json(output)
    }
}