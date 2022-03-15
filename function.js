// local storage data send
function data_send(key, value) {
  let data = JSON.stringify(value);
  localStorage.setItem(key, data);
  return true;
}

// local storage get data
function get_data(key) {
  let data = localStorage.getItem(key);
  return JSON.parse(data) ?? [];
}
