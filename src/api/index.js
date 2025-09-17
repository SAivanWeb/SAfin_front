import user from './modules/user';
import general from './modules/general';
import goals from './modules/goals';
import category from "./modules/category.js";
import transactions from './modules/transactions.js';
import accounts from './modules/account.js';

class Api {
    constructor() {
        this.user = user;
        this.general = general;
        this.goals = goals;
        this.category = category;
        this.transactions = transactions;
        this.accounts = accounts;
    }
}

export default new Api();