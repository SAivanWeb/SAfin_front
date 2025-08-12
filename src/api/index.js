import user from './modules/user';
import general from './modules/general';
import goals from './modules/goals';

class Api {
    constructor() {
        this.user = user;
        this.general = general;
        this.goals = goals;
    }
}

export default new Api();