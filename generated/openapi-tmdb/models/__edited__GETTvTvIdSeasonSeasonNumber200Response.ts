/* tslint:disable */
/* eslint-disable */
/**
 * API
 * ## Welcome  This is a place to put general notes and extra information, for internal use.  To get started designing/documenting this API, select a version on the left. # Title No Description
 *
 * The version of the OpenAPI document: 3
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import type { GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInner } from "./GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInner";
import {
  GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInnerFromJSON,
  GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInnerFromJSONTyped,
  GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInnerToJSON,
} from "./GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInner";

/**
 *
 * @export
 * @interface GETTvTvIdSeasonSeasonNumber200Response
 */
export interface GETTvTvIdSeasonSeasonNumber200Response {
  /**
   *
   * @type {string}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  _id?: string;
  /**
   *
   * @type {string}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  airDate?: string;
  /**
   *
   * @type {Array<GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInner>}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  episodes?: Array<GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInner>;
  /**
   *
   * @type {string}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  overview?: string;
  /**
   *
   * @type {number}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  posterPath?: string | null;
  /**
   *
   * @type {number}
   * @memberof GETTvTvIdSeasonSeasonNumber200Response
   */
  seasonNumber?: number;
}

/**
 * Check if a given object implements the GETTvTvIdSeasonSeasonNumber200Response interface.
 */
export function instanceOfGETTvTvIdSeasonSeasonNumber200Response(
  value: object
): boolean {
  let isInstance = true;

  return isInstance;
}

export function GETTvTvIdSeasonSeasonNumber200ResponseFromJSON(
  json: any
): GETTvTvIdSeasonSeasonNumber200Response {
  return GETTvTvIdSeasonSeasonNumber200ResponseFromJSONTyped(json, false);
}

export function GETTvTvIdSeasonSeasonNumber200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GETTvTvIdSeasonSeasonNumber200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "_id") ? undefined : json["_id"],
    airDate: !exists(json, "air_date") ? undefined : json["air_date"],
    episodes: !exists(json, "episodes")
      ? undefined
      : (json["episodes"] as Array<any>).map(
          GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInnerFromJSON
        ),
    name: !exists(json, "name") ? undefined : json["name"],
    overview: !exists(json, "overview") ? undefined : json["overview"],
    _id: !exists(json, "id") ? undefined : json["id"],
    posterPath: !exists(json, "poster_path") ? undefined : json["poster_path"],
    seasonNumber: !exists(json, "season_number")
      ? undefined
      : json["season_number"],
  };
}

export function GETTvTvIdSeasonSeasonNumber200ResponseToJSON(
  value?: GETTvTvIdSeasonSeasonNumber200Response | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    _id: value.id,
    air_date: value.airDate,
    episodes:
      value.episodes === undefined
        ? undefined
        : (value.episodes as Array<any>).map(
            GETTvTvIdSeasonSeasonNumber200ResponseEpisodesInnerToJSON
          ),
    name: value.name,
    overview: value.overview,
    id: value.id,
    poster_path: value.posterPath,
    season_number: value.seasonNumber,
  };
}
