const myChartOptions = {
  animation: false,
  showLines: true,
  events: [],
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const getJsonCallbackTemperature = function(result) {
  const signal = "temperature";
  let labels = [];
  let data = [];
  console.log(result);

  // chart
  for (let i = 0; i < result.length; i++) {
    let d = new Date(result[i].date_time);
    let date = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    labels.push(date + " " + time);
    data.push(result[i][signal]);
  }

  // table data, reverse order
  result.reverse();
  const selectMenuHtml = `
      <p>Pick a time interval:</p>
              <p><select id="temperatureSelectInterval" class="form-control selcls">
                <option value="0">Live</option>
                <option value="24" selected>24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">72 hours</option>
                <option value="168">1 week</option>
                <option value="744">1 month</option>
              </select></p>
              <div id="selectNameDiv">
                <p>Pick a measurement:</p><p><select id='selectName' class='form-control selcls'></select></p>
                <button id="updateName" type="button" class="btn btn-primary">Update</button>
              </div>
    `;
  $("#interval_div").html(selectMenuHtml);
  let dataHtml = `<table class='table table-striped'>
        <thead>                                                      
          <tr>
            <th><h1>Date</h1></th>
            <th><h1>Time</h1></th>
            <th><h1>Value</h1></th>
          </tr>
        </thead>
        <tbody>`;
  for (let i = 0; i < result.length; i++) {
    let d = new Date(result[i].date_time);
    let date = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    dataHtml += `<tr><td>${date}</td><td>${time}</td><td>${
      result[i][signal]
    }</td></tr>`;
  }
  dataHtml += `</tbody></table><canvas id="myChart" width="400" height="400"></canvas>`;
  $("#data_div").html(dataHtml);

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      type: "time",
      datasets: [
        {
          label: "Temperature ",
          data: data,
          fill: false,
          borderColor: "black"
        }
      ]
    },
    options: myChartOptions
  });
};

const drawTemperatureData = function(API_ADDRESS) {
  console.log("inside drawTemperatureData()");
  let url = `${API_ADDRESS}/temperature`;
  console.log("url", url);

  let selectedInterval = null;

  $("#interval_div").on("change", "#temperatureSelectInterval", element => {
    console.log("selected", element.target.value);
    selectedInterval = element.target.value;

    if (selectedInterval === "0") {
      url = `${API_ADDRESS}/temperature`;
    } else {
      url = `${API_ADDRESS}/temperature/${selectedInterval}`;
      console.log("url", url);
    }

    $.getJSON(url, getJsonCallbackTemperature);
  });

  $.getJSON(url, getJsonCallbackTemperature);
};
