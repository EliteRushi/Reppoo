const watchFrame = document.getElementById('watchFrame');

const channel = new BroadcastChannel('whiteboard-sync');

function applyData(data) {

  if (!data || !data.url) {
    return;
  }

  watchFrame.src = data.url;

  watchFrame.style.transform = `scale(${data.zoom})`;

}

channel.onmessage = (event) => {

  applyData(event.data);

};

const savedData = localStorage.getItem('whiteboardData');

if (savedData) {

  applyData(JSON.parse(savedData));

}
