import { IOClients } from '@vtex/api'

import LogClient from './createLog'
import VtexId from './vtexid'
import Cep from './cep'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get logClient() {
    return this.getOrSet('logClient', LogClient)
  }

  public get vtexid() {
    return this.getOrSet('vtexid', VtexId)
  }

  public get cep(){
    return this.getOrSet('cep', Cep)
  }
}
