import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super({ header: 'X-Api-Key', prefix: '' }, true, (apikey, done, ) => {
      const checkKey = authService.validateApiKey(apikey);
      if (!checkKey) {
        return done(false);
      }
      return done(true);
    });
  }
}
