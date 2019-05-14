import moment from 'moment';
import psl from 'psl';

export function getDomain(url) {
  const { hostname } = new URL(url);
  const parsed = psl.parse(hostname);
  return parsed.domain;
}

export function getFormattedDate(date) {
  return moment(date).format(`LTS`);
}

export function getPostedAtOn(hit) {
  return `Posted at ${getFormattedDate(hit.posted)} on ${getDomain(hit.url)}`;
}
