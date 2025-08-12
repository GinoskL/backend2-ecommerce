import { UserDAO } from "../daos/user.dao.js"

class UserRepository {
  constructor() {
    this.dao = new UserDAO()
  }

  create(data) {
    return this.dao.create(data)
  }

  findByEmail(email) {
    return this.dao.findByEmail(email)
  }

  findById(id) {
    return this.dao.findById(id)
  }

  update(id, data) {
    return this.dao.update(id, data)
  }
}

export const userRepository = new UserRepository()
