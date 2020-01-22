const drawWindspeedChart = function(api) {
  const signal = "wind_speed";
  $.getJSON(api + "/latest/" + signal, function(result) {
    let labels = [];
    let data = [];
    console.log(result);
    let date;
    let time;
    result.forEach(element => {
      let d = new Date(element.date_time);
      date = d.toLocaleDateString();
      time = d.toLocaleTimeString();
      labels.push(time);
      data.push(element[signal]);
    });

    $("#interval_div").html("");

    console.log("data", data);

    const myChart = echarts.init(document.getElementById("myChart"));

    const option = {
      title: {
        text: date + " " + time,
        x: "right",
        y: 10
      },
      grid: {
        left: "right"
      },
      series: {
        name: "Wind speed",
        type: "gauge",
        detail: { formatter: "{value}" },
        data: data,
        max: 20,
        radius: "100%"
      }
    };

    myChart.setOption(option);
    $(window).on("resize", function() {
      if (myChart != null && myChart != undefined) {
        myChart.resize();
      }
    });
  });
};
