const loadBtn = document.getElementById('loadBtn');
const canvaLink = document.getElementById('canvaLink');
const canvaFrame = document.getElementById('canvaFrame');
const viewerLink = document.getElementById('viewerLink');

let currentSlide = 1;
let zoomLevel = 1;

const channel = new BroadcastChannel('whiteboard-sync');

function updateViewer(data) {
  localStorage.setItem('whiteboardData', JSON.stringify(data));
  channel.postMessage(data);
}

loadBtn.addEventListener('click', () => {

  let url = canvaLink.value.trim();

  if (!url) {
    alert('Paste Canva Link');
    return;
  }

  if (url.includes('/view')) {
    url = url.replace('/view', '/embed');
  }

  if (!url.includes('embed')) {
    alert('Use Canva Embed Link');
    return;
  }

  canvaFrame.src = url;

  const data = {
    url,
    slide: currentSlide,
    zoom: zoomLevel
  };

  updateViewer(data);

  const base = window.location.origin + window.location.pathname.replace('index.html', '');

  viewerLink.value = base + 'watch.html';

});

function nextSlide() {

  currentSlide++;

  syncControls();

}

function prevSlide() {

  if (currentSlide > 1) {
    currentSlide--;
  }

  syncControls();

}

function zoomIn() {

  zoomLevel += 0.1;

  syncControls();

}

function zoomOut() {

  if (zoomLevel > 0.3) {
    zoomLevel -= 0.1;
  }

  syncControls();

}

function clearBoard() {

  localStorage.removeItem('whiteboardData');

  canvaFrame.src = '';

}

function syncControls() {

  const data = {
    url: canvaFrame.src,
    slide: currentSlide,
    zoom: zoomLevel
  };

  updateViewer(data);

}

function toggleFullscreen() {

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }

}
