import axios from 'axios';

export class ExclusionService {
    constructor() {
        this.externalUrl = 'http://localhost:3001/banned';
    }

    async checkForBannedWords(title, options) {
        try {
            console.log(`Checking content against: ${this.externalUrl}...`);

            const response = await axios.get(this.externalUrl);
            const bannedWords = response.data.banned;

            if (!bannedWords || !Array.isArray(bannedWords)) {
                console.warn("Warning: Received invalid format from Exclusion API");
                return { blocked: false };
            }

            const optionsText = options.map(o => o.text).join(' ');
            const contentToCheck = `${title} ${optionsText}`.toLowerCase();

            const foundWord = bannedWords.find(word => 
                contentToCheck.includes(word.toLowerCase())
            );

            if (foundWord) {
                console.log(`Blocked content due to word: "${foundWord}"`);
                return { 
                    blocked: true, 
                    reason: `Validation Failed: The term '${foundWord}' is not allowed.` 
                };
            }

            console.log("[App] Content passed validation.");
            return { blocked: false };

        } catch (error) {
            console.error(`[App] Exclusion Service Error: ${error.message}`);
            return { blocked: false }; 
        }
    }
}