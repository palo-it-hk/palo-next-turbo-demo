import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class JwtStore {
  jwtToken: string = '';

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'JwtStore',
      properties: ['jwtToken'],
      storage: typeof window === 'undefined' ? undefined : window.localStorage,
    });
  }

  get getJwt() {
    return this.jwtToken;
  }

  setJwt(jwtToken: string) {
    this.jwtToken = jwtToken;
  }
}

const jwtStore = new JwtStore();

export function useJwtStore() {
  return jwtStore;
}
