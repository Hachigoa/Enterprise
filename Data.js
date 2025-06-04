function getDemoSmartwatchData() {
  return {
    steps: 8452,
    heart_rate: 68,
    sleep: '7h 12m',
    stress: 'Moderate'
  };
}

function showDemoSmartwatchData() {
  const data = getDemoSmartwatchData();
  document.getElementById('smartwatch-data').innerHTML = `
    <h3>Smartwatch Data (Demo)</h3>
    <ul>
      <li>Steps: ${data.steps}</li>
      <li>Heart Rate: ${data.heart_rate} bpm</li>
      <li>Sleep: ${data.sleep}</li>
      <li>Stress Level: ${data.stress}</li>
    </ul>
    <div style="color: orange;">Demo data shown</div>
  `;
}

showDemoSmartwatchData();
