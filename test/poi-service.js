'use strict';

const axios = require('axios');
const baseUrl = 'http://dlombard:3000';

class PoiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users', newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getIslands() {
        const response = await axios.get(this.baseUrl + '/api/islands');
        return response.data;
    }

    async getIsland(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/islandss/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createIsland(newIsland) {
        const response = await axios.post(this.baseUrl + '/api/islands', newIsland);
        return response.data;
    }

    async deleteAllIslands() {
        const response = await axios.delete(this.baseUrl + '/api/islands');
        return response.data;
    }

    async deleteOneIsland(id) {
        const response = await axios.delete(this.baseUrl + '/api/islands/' + id);
        return response.data;
    }

    async getUsers() {
        const response = await axios.get(this.baseUrl + '/api/users');
        return response.data;
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/user/' + id);
            return response.data;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        const response = await axios.post(this.baseUrl + '/api/users', newUser);
        return response.data;
    }
}

module.exports = PoiService;