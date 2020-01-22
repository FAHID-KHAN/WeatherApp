const api = "http://webapi19sa-1.course.tamk.cloud/v1/weather";
function exampleFunction() {
  console.log("Inside exampleFunction");
  $.ajax({
    url: api,
    dataType: "json"
  }).done(function(data) {
    console.log("data fetch done", data);

    const selectMenuHtml = `
      <p>MyStyle selector</p>
              <p><select id="humiditySelectInterval" class="form-control selcls my-style-select">
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

    // Do something with the data

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
            <td>${item.id}</td>
            <td>${item.date_time}</td>
            <td>${item.data.temperature}</td>
        </tr>`;
    });

    const tableEnd = `
        </tbody>
        </table>`;

    const table = tableStart + tableContent + tableEnd;

    $("#data_div").html(table);
  });
}
