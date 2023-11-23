import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export function createCustomMarker(
  marker: ReactElement,
  meta: ReactElement,
  // handler?: () => void,
): HTMLElement {
  // container
  const elContainer = document.createElement('div');
  elContainer.classList.add('naver-marker-container');
  elContainer.style.setProperty('position', 'absolute');

  // marker
  const markerStaticMarkup = renderToStaticMarkup(marker);
  const elMarker = document.createElement('div');
  elMarker.innerHTML = markerStaticMarkup;
  elMarker.style.setProperty('cursor', 'pointer');
  elMarker.style.setProperty('z-index', '110');
  // if (handler !== undefined) {
  //   elMarker.addEventListener('click', handler);
  // }

  // meta data
  const metaStaticMarkup = renderToStaticMarkup(meta);
  const elMeta = document.createElement('div');
  // meta 데이터가 마커위로 겹치는 현상 방지
  elMeta.style.setProperty('z-index', '109');
  elMeta.style.setProperty('pointer-events', 'none');
  elMeta.innerHTML = metaStaticMarkup;

  elContainer.appendChild(elMarker);
  elContainer.appendChild(elMeta);

  return elContainer;
}

export function latLng({ lat, lng }: { lat: number; lng: number }) {
  return new window.naver.maps.LatLng(lat, lng);
}
