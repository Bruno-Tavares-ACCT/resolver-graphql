import { ExternalClient, IOContext } from "@vtex/api";

export default class Cep extends ExternalClient{
    constructor(ctx: IOContext) {
        super('https://viacep.com.br', ctx)
    }

    public getCep = (cep: string) => {
        return this.http.get(`ws/${cep}/json/`)
    }
}