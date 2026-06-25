import 'express';

declare module 'express' {
  interface Request {
    user?: import('../auth/dto/access-token-payload.dto').AccessTokenPayloadDto;
  }
}
