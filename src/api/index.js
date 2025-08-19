import user from './modules/user';
import general from './modules/general';
import goals from './modules/goals';
import category from "./modules/category.js";
import transactions from './modules/transactions.js';

class Api {
    constructor() {
        this.user = user;
        this.general = general;
        this.goals = goals;
        this.category = category;
        this.transactions = transactions;
    }
}

export default new Api();