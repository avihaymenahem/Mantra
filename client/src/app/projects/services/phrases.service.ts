import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { ApiService } from '../../shared/api.service';
import { Phrase } from '../model/phrase';

@Injectable()
export class PhrasesService {

  private _phrases = new BehaviorSubject<Phrase[]>([]);
  public phrases = this._phrases.asObservable();

  private _activePhrase = new BehaviorSubject<Phrase>(null);
  public activePhrase = this._activePhrase.asObservable();

  constructor(private api: ApiService) { }

  fetchPhrases(categoryID: string): Observable<Phrase[]> {
    let request = this.api.request({
      uri: `/categories/${categoryID}/phrases`,
      method: 'GET',
    })
      .map(phrases => {
        if (!phrases) {
          throw new Error("no phrases in response");
        }
        return phrases;
      }).share();

    request.subscribe(
      phrases => { this._phrases.next(phrases); }
    );

    return request;
  }

  fetchPhrase(id: string): Observable<Phrase> {
    let request = this.api.request({
      uri: `/phrases/${id}`,
      method: 'GET',
    })
      .map(phrase => {
        if (!phrase) {
          throw new Error("no phrase in response");
        }
        return phrase;
      }).share();

    request.subscribe(phrase => this._activePhrase.next(phrase));

    return request;
  }

  deletePhrase(phraseID: string): Observable<any> {
    let request = this.api.request({
      uri: `/phrases/${phraseID}`,
      method: 'DELETE'
    }).share();

    request.subscribe(() => {
      let phrases = this._phrases.getValue().filter(_phrases => _phrases.ID !== parseInt(phraseID));
      this._phrases.next(phrases);
      this._activePhrase.next(null);
    });

    return request;
  }

  createPhrase(phrase): Observable<Phrase> {
    let request = this.api.request({
      uri: '/phrases',
      method: 'POST',
      body: JSON.stringify(phrase),
    })
      .map(phrases => {
        if (!phrases) {
          throw new Error("no phrase in response");
        }
        return phrases;
      }).share();

    request.subscribe(
      phrase => {
        let phrases = this._phrases.getValue().concat(phrase);
        this._phrases.next(phrases);
      });

    return request;
  }
}
