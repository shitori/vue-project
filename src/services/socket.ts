import { io } from 'socket.io-client';
import {
    FROM_RF,
    DIFFUSE,
    FROM_GRAPH,
    FROM_API,
    FROM_SPRINT,
} from '../interfaces/interfaceCibleWS'

import { storeSocket as store } from './store';

class SocketioService {
    socket;


    setupSocketConnection() {
        this.socket = io("http://localhost:3001/");

        this.socket.emit('chat message', 'Hello there from Vue.');

        this.socket.on('chat message', (msg) => {
            console.info(`Message from server : ${msg}`)
            store.setMessage(msg)
        })

        this.socket.on(FROM_RF, (msg) => {
            console.info(`Message RF from server : ${msg}`)
            store.setFromJson(JSON.parse(msg))
        })

        this.socket.on(DIFFUSE, (msg) => {
            console.info(`Message DIFFUSE from server : ${msg}`)
            store.setFromJson(JSON.parse(msg))
        })

        this.socket.on(FROM_GRAPH, (msg) => {
            console.info(`Message GRAPH from server : ${msg}`)
            store.setFromJson(JSON.parse(msg))
        })

        this.socket.on(FROM_API, (msg) => {
            console.info(`Message API from server : ${msg}`)
            store.setFromJson(JSON.parse(msg))
        })

        this.socket.on(FROM_SPRINT, (msg) => {
            console.info(`Message SPRINT from server : ${msg}`)
            store.setFromJson(JSON.parse(msg))
        })
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();