function Humidityout(api) {
  console.log("Inside Humdity_out");
  $.ajax({
    url: api,
    dataType: "json"
  }).done(function(data) {
    console.log("data fetch done", data);

    // Do something with the data

    $("#interval_div").html("");

    const tableStart = `<table class="table table-striped" id="latest_values" class="display" style="width:100%">
           <thead>
               <tr>
                   <th><h2>ID</h2></th>
                   <th><h2>Time</h2></th>
                   <th><h2>Value</h2></th>
               </tr>
           </thead>
           <tbody>
               `;

    let tableContent = "";

    console.log(typeof data);
    data.forEach(function(item) {
      console.log("item: ", item);
      tableContent += `<tr>
              <td>${item.device_id}</td>
              <td>${item.date_time}</td>
              <td>${item.humidity_out}</td>
          </tr>`;
    });

    const tableEnd = `
          </tbody>
          
          </table>`;

    const table = tableStart + tableContent + tableEnd;

    $("#data_div").html(table);
  });
}
