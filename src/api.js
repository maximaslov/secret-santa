import axios from "axios";


const URL = 'https://6394a82986829c49e8236d0d.mockapi.io/secretsanta/';

export const SantaApi = {
    // getUsers(currentPage=1, pageSize = 5) {
    //     return axios.get(`users?page=${currentPage}&count=${pageSize}`)
    //         .then(res => res.data);
    // },

    get(companyId) {
        return axios.get(URL+companyId);
    },

    post(company) {
        return axios.post(URL, company);
    },

    put(currentCompany, newFriendsList) {
        return axios.put(URL+currentCompany.id, {...currentCompany, friends: newFriendsList});
    },

    updateCompanyStatus(currentCompany, status) {
        return axios.put(URL+currentCompany.id, {...currentCompany, status});
    }

    // unfollow(userId) {
    //     return instanse.delete(`follow/${userId}`).then(res => res.data);
    // },

}