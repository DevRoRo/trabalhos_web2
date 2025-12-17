import crypto from 'crypto';

export class Poll {

    constructor(id, title, visibility, status, endAt, startAt, expectedVotes, categories, options, creator) {
        this.id = id ?? crypto.randomUUID();
        this.title = title;
        this.visibility = visibility ?? 'PUBLIC';
        this.status = status ?? 'OPEN';
        this.startAt = new Date() ?? new Date(startAt);
        this.endAt = new Date(endAt);
        this.expectedVotes = expectedVotes;
        this.categories = categories ?? [];
        this.options = options ?? [];
        this.creator = creator;
        this.qtdVotos = 0;
    }

    setQtdVotos(qtdVotos){
        this.qtdVotos = qtdVotos
    }
}

export class Option {
    
    constructor(id, description) {
        this.id = id
        this.description = description
        this.qtdVotos = 0
    }

    setQtdVotos(qtdVotos) {
        this.qtdVotos = qtdVotos
    }
}