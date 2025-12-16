export class Poll {

    constructor(id, title, visibility, status, startAt, endAt, expectedVotes, categories, options, creator) {
        this.id = id ?? randomUUID();
        this.title = title;
        this.visibility = visibility ?? 'PUBLIC';
        this.status = status ?? 'OPEN';
        this.startAt = startAt ?? new Date();
        this.endAt = endAt;
        this.expectedVotes = expectedVotes;
        this.categories = categories ?? [];
        this.options = options ?? [];
        this.creator = creator;
    }

    isActive() {
        const now = new Date();
        return (
            this.status === 'OPEN' &&
            now >= this.startAt &&
            now <= this.endAt
        );
    }

    addOption(text){
        this.options.push({
            id: randomUUID(),
            text
        });
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            visibility: this.visibility,
            status: this.status,
            startAt: this.startAt,
            endAt: this.endAt,
            expectedVotes: this.expectedVotes,
            categories: this.categories,
            options: this.options,
            createdBy: this.creator
        };
    }

    toPersistence() {
        return {
            id: this.id,
            title: this.title,
            visibility: this.visibility,
            status: this.status,
            startAt: this.startAt,
            endAt: this.endAt,
            expectedVotes: this.expectedVotes,
            // Convert Array to Comma-Separated String
            categories: this.categories.join(','),
            creatorId: this.creator.id
        };
    }

    static fromPrisma(data){
        return new Poll({
            id: data.id,
            title: data.title,
            visibility: data.visibility,
            status: data.status,
            startAt: data.startAt,
            endAt: data.endAt,
            expectedVotes: data.expectedVotes,
            // Convert Comma-Separated String back to Array
            categories: data.categories ? data.categories.split(',') : [],
            options: data.options,
            creator: {
                id: data.creator?.id,
                name: data.creator?.name ?? 'Unknown'
            }
        });
    }
}