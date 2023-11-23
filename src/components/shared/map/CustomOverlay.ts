export class CustomOverlay<T = void> {
  overlayView: naver.maps.OverlayView;
  position?: naver.maps.LatLng;
  map?: naver.maps.Map;
  _element: HTMLElement;
  onClick?: (e: MouseEvent, marker: CustomOverlay<T>) => void;
  data: T;

  constructor({
    position,
    map,
    element,
    onClick,
    data,
  }: {
    position: naver.maps.LatLng;
    map: naver.maps.Map;
    element: HTMLElement;
    onClick?: (e: MouseEvent, marker: CustomOverlay<T>) => void;
    data: T;
  }) {
    this._element = element;

    this.data = data;

    this.onClick = onClick;

    this.overlayView = new naver.maps.OverlayView();

    this.overlayView.onAdd = this.onAdd.bind(this);
    this.overlayView.draw = this.draw.bind(this);
    this.overlayView.onRemove = this.onRemove.bind(this);

    this.setPosition(position);
    this.overlayView.setMap(map || null);
  }

  setMap(map: naver.maps.Map | null) {
    this.overlayView.setMap(map);
  }

  getMap(): naver.maps.Map | null {
    return this.overlayView.getMap();
  }

  eventListener = (e: MouseEvent) => {
    if (!this.onClick) return;

    this.onClick(e, this);
  };

  onAdd() {
    this.onClick && this._element.addEventListener('click', this.eventListener);

    const overlayLayer = this.overlayView.getPanes().overlayLayer;

    // this._element?.appendTo(overlayLayer);

    // (window as any).overlayLayer = overlayLayer;

    overlayLayer.appendChild(this._element);
  }

  draw() {
    // 지도 객체가 설정되지 않았으면 draw 기능을 하지 않습니다.
    if (!this.overlayView.getMap()) {
      return;
    }

    // projection 객체를 통해 LatLng 좌표를 화면 좌표로 변경합니다.
    const projection = this.overlayView.getProjection(),
      position = this.getPosition();

    const pixelPosition = projection.fromCoordToOffset(position);

    // this._element.css('left', pixelPosition.x);
    // this._element.css('top', pixelPosition.y);

    this._element.style.setProperty('left', `${pixelPosition.x}px`);
    this._element.style.setProperty('top', `${pixelPosition.y}px`);
  }

  onRemove() {
    // 이벤트 핸들러를 설정했다면 정리합니다.
    if (this.eventListener !== undefined) {
      this._element.removeEventListener('click', this.eventListener);
    }

    this._element.remove();

    // 이벤트 핸들러를 설정했다면 정리합니다.
    // this._element.off();
  }

  // eslint-disable-next-line no-undef
  setPosition(position: naver.maps.LatLng) {
    this.position = position;

    this.draw();
  }

  getPosition() {
    // 생성자에서 넣어주는데? 아직 타입 문법을 잘 모르겠음.
    return this.position!;
  }

  getOverlapRect(tolerance = 10) {
    const map = this.overlayView.getMap();

    if (!map) return null;

    const proj = map.getProjection();
    const position = this.getPosition();
    const offset = proj.fromCoordToOffset(position);
    const rectLeftTop = offset.clone().sub(tolerance, tolerance);
    const rectRightBottom = offset.clone().add(tolerance, tolerance);

    return naver.maps.PointBounds.bounds(rectLeftTop, rectRightBottom);
  }
}
