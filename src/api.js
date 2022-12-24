import axios from "axios";

const URL = 'https://6394a82986829c49e8236d0d.mockapi.io/secretsanta/';

export const SantaApi = {

    get(companyId) {
        return axios.get(URL+companyId);
    },

    post(company) {
        return axios.post(URL, company);
    },

    put(currentCompany, newFriendsList) {
        return axios.put(URL+currentCompany.id, {...currentCompany, friends: newFriendsList});
    },

    // updateCompanyStatus(currentCompany, status) {
    //     return axios.put(URL+currentCompany.id, {...currentCompany, status});
    // }
}