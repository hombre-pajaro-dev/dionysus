import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber'

export class DionysusWorld extends World {
  phone: string = ''
  response: Response | null = null
  otp: string | null = null

  constructor(options: IWorldOptions) {
    super(options)
  }
}

setWorldConstructor(DionysusWorld)
