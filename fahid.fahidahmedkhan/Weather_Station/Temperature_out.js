function Temperatureout(API_ADDRESS) {
  console.log("Inside Temperature_out");
  console.log("API_ADDRESS", API_ADDRESS);
  $.ajax({
    url: `${API_ADDRESS}/temperature`,
    dataType: "json"
  }).done(function(data) {
    console.log("data fetch done", data);

    // Do something with the data

    $("#interval_div").html("");

    const tableStart = `<table class="table table-striped" id="latest_values" class="display" style="width:100%">
           <thead>
               <tr>
                   <th><h1>ID</h1></th>
                   <th><h1>Time</h1></th>
                   <th><h1>Value</h1></th>
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
              <td>${item.temperature}</td>
          </tr>`;
    });

    const tableEnd = `
      
          </tbody>
          </table>`;

    const table = tableStart + tableContent + tableEnd;

    $("#data_div").html(table);
  });
}
