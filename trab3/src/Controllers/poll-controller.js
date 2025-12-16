import { pollService } from "../Services/poll-services";

export class pollController {

/**
 * 
 * @param {pollService} service 
 */
constructor(service) {
    this.service = service;
}

async create(req, res) {
    const input = req.body

    const output = await this.service.createPoll(input)

    res.send(output)
}

}