export class TokenService {
  private readonly invalidatedTokens: Set<string>;

  constructor() {
    this.invalidatedTokens = new Set();
  }

  async blacklistToken(token: string) {
    this.invalidatedTokens.add(token);
  }

  async isTokenBlacklisted(token: string) {
    return this.invalidatedTokens.has(token);
  }
}
