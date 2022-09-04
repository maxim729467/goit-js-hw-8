import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const localStorageTimeKey = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const currentTime = +localStorage.getItem(localStorageTimeKey) || 0;

const onTimeUpdateHandler = e => {
  localStorage.setItem(localStorageTimeKey, e.seconds);
};
const onTimeUpdateThrottled = throttle(onTimeUpdateHandler, 1000);

player.on('play', () => player.on('timeupdate', onTimeUpdateThrottled));
player.on('pause', () => player.off('timeupdate', onTimeUpdateThrottled));
player.on('ended', () => localStorage.removeItem(localStorageTimeKey));
player.setCurrentTime(currentTime).catch(console.log);
