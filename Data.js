function getDemoData() {
  return {
    Sleep: 12.5hrs,
    Heart_rate: 75,
    Stress: ~,  
    Steps: 5000
    
    
    // Add other demo values
  };
}

async function showSmartwatchDataDemo() {
  let data;
  if (API_KEY === 'YOUR_API_KEY') { // Or check if key is missing
    data = getDemoData();
  } else {
    data = await fetchSmartwatchData();
  }
  document.getElementById('smartwatch-data').innerHTML = `
    <p>Steps: ${data.steps}</p>
    <p>Heart Rate: ${data.heart_rate}</p>
  `;
}

showSmartwatchDataDemo();
