import moment from 'moment';
import psl from 'psl';

import sweetAlert1 from '../audio/sweetAlert1.wav';
import sweetAlert2 from '../audio/sweetAlert2.wav';
import sweetAlert3 from '../audio/sweetAlert3.wav';
import sweetAlert4 from '../audio/sweetAlert4.wav';
import sweetAlert5 from '../audio/sweetAlert5.wav';

export * from './notification';

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

function getAudioFile(name) {
  switch (name) {
    case `sweetAlert1`:
      return sweetAlert1;
    case `sweetAlert2`:
      return sweetAlert2;
    case `sweetAlert3`:
      return sweetAlert3;
    case `sweetAlert4`:
      return sweetAlert4;
    case `sweetAlert5`:
      return sweetAlert5;
    default:
      return null;
  }
}

export function playAudio(settings) {
  if (settings.hitAudio && settings.hitVolume) {
    const file = getAudioFile(settings.hitAudio);
    const audio = new Audio(file);
    audio.volume = settings.hitVolume / 100;
    audio.play();
  }
}
