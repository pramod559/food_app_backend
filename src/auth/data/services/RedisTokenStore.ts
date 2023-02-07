//import { createClient } from 'redis'
//import RedisClient from "@redis/client/dist/lib/client";
import ITokenStore from "../../services/ITokenStore";
import { RedisClient } from 'redis';
import { promisify } from 'util'

export default class RedisTokenStore implements ITokenStore {

    constructor(private readonly client: RedisClient) { }

    save(token: string): void {
        this.client.set(token, token)
    }
    async get(token: string): Promise<string> {
        const getAsync = promisify(this.client.get).bind(this.client)
        const res = await getAsync(token)
        return res ?? ''

    }

}