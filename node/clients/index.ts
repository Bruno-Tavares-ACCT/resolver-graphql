import { IOClients } from '@vtex/api'

import LogClient from './createLog'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get logClient() {
    return this.getOrSet('logClient', LogClient)
  }
}
