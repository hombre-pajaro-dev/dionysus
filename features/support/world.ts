import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber'

export class DionysusWorld extends World {
  // auth
  phone: string = ''
  otp: string | null = null
  sessionToken: string = ''

  // shared HTTP
  response: Response | null = null

  // membership
  venueId: string = ''
  organizerUserId: string = ''
  inviteToken: string = ''
  membershipId: string = ''

  // current user
  userId: string = ''

  constructor(options: IWorldOptions) {
    super(options)
  }
}

setWorldConstructor(DionysusWorld)
