window.onload = function(){
	var ctx = document.querySelector('#runs');

	var chartData = {
		labels: [],
		datasets: []
	};

	fetch('http://localhost:3000/users/').then(function(response){
		response.json().then(function(data){
			data.forEach(function(user, index){
				var newUserObj = {
					label: "Runs for " + user.name,
					data: []
				};
				user.runs.forEach(function(run){
					var date = new Date(run.date);
					newUserObj.data.push({
						// x: date.toLocaleString(),
						x: date,
						y: run.distance
					});
				})
				chartData.datasets.push(newUserObj);
			});

			var runsChart = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: {
					scales: {
						xAxes: [{
							type: 'time',
							position: 'bottom'
						}]
					}
				}
			});
		});
	})
}
