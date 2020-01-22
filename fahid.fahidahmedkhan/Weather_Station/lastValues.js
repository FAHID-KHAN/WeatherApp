var lastValues = function(api) {
  $.ajax({
    url: api,
    dataType: "json"
  }).done(function(data) {
    $("#interval_div").html("");

    let html = `<table class="table table-striped" id="latest_values" class="display" style="width:100%">
         <thead>
             <tr>
                 <th><h4>Date</h4></th>
                 <th><h3>Time</h3></th>
                 <th><h2>Name</h2></th>
                 <th><h1>Value</h1></th>
             </tr>
         </thead>
         <tbody>
             `;

    data.forEach(element => {
      let d = new Date(element.date_time);
      let date = d.toLocaleDateString();
      let time = d.toLocaleTimeString();
      html += `<tr>
         <td id="date">${date}</td>
         <td id="time">${time}</td>`;

      // Access the data (sensor & value)
      for (name in element.data) {
        html += `<td id="name">${name}</td>
         <td id="value">${element.data[name]}</td>
         </tr>`;
      }
    });

    html += `
     </tbody>
      </table>`;

    $("#data_div").html(html);
  });
};
