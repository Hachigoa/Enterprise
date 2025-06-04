function drawDemoStepsChart() {
  // Demo data: Steps for a week
  const ctx = document.getElementById('stepsChart').getContext('2d');
  const stepsData = [7500, 8200, 9000, 11000, 9800, 10200, 8452];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Steps per Day',
        data: stepsData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Call this after the DOM has drawn the canvas
drawDemoStepsChart();
