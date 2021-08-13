const { nanoid } = require('nanoid');
const { pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = pool;
  }

  async addUser({ username, password, fullname }) {
    await this.verivyNewUsername(username);

    const id = `id-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hashedPassword(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1,$2,$3,$4)',
      values: [id, username, hashedPassword, fullname],
    };

    const result = this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId],
    };

    const result = this._pool.query(query);
    if (!result.rows.length) {
      throw new Error('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async verivyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambah user. Username sudah digunakan.');
    }
  }
}

module.exports = UsersService;
