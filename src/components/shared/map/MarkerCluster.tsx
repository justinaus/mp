import { useState } from 'react';
import { Overlay, useMap, useNavermaps } from 'react-naver-maps';

import { accidentDeath } from './accidentDeath';
import { makeMarkerClustering } from './marker-cluster';

export type NaverPlace = {
  id: string;
  name: string;
  rank: string;
  lat: string;
  lng: string;
};

type Props = {
  places: NaverPlace[];
};

export default function MarkerCluster({ places }: Props) {
  // https://github.com/navermaps/marker-tools.js/blob/master/marker-clustering/src/MarkerClustering.js
  // 예제에서 제공된 코드를 그대로 사용하되 naver 객체를 주입 받도록 간단히 makeMarkerClustering로 Wrapping 합니다.

  const navermaps = useNavermaps();
  const map = useMap();

  // https://github.com/zeakd/react-naver-maps/blob/main/website/src/samples/marker-cluster.js
  const MarkerClustering = makeMarkerClustering((window as any).naver);

  const htmlMarker1 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker2 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };

  // https://navermaps.github.io/maps.js.ncp/docs/data/accidentdeath.js
  const data = accidentDeath.searchResult.accidentDeath;

  const naver = (window as any).naver;

  // Customize Overlay 참고
  // https://zeakd.github.io/react-naver-maps/guides/customize-overlays/
  const [cluster] = useState(() => {
    const markers = [];

    // for (let i = 0, ii = data.length; i < ii; i++) {
    //   const spot = data[i],
    //     latlng = new naver.maps.LatLng(spot.grd_la, spot.grd_lo),
    //     marker = new naver.maps.Marker({
    //       position: latlng,
    //       draggable: true,
    //     });

    //   markers.push(marker);
    // }

    for (let i = 0, ii = places.length; i < ii; i++) {
      const spot = places[i],
        latlng = new naver.maps.LatLng(spot.lat, spot.lng),
        marker = new naver.maps.Marker({
          position: latlng,
          draggable: true,
        });

      markers.push(marker);
    }

    const cluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 8,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: function (clusterMarker: any, count: any) {
        // without jquery $(clusterMarker.getElement()).find('div:first-child').text(count)
        clusterMarker.getElement().querySelector('div:first-child').innerText =
          count;
      },
    });

    return cluster;
  });

  return <Overlay element={cluster as any} />;
}
