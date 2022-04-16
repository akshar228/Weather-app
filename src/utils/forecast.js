const request = require('request');

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=800e9d1cea6e39825be80bf9d90b684e&query=${lat},${lng}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback(`unable to find location.(${body.error.code})`, undefined);
    } else {
      callback(
        undefined,
        `Time: ${body.current.observation_time}</br> Temperature: ${body.current.temperature} </br> Feels like: ${body.current.feelslike} </br> Wind speed: ${body.current.wind_speed} </br> Wind degree: ${body.current.wind_degree} ${body.current.wind_dir} </br> Humidity: ${body.current.humidity} </br> Visibility: ${body.current.visibility} </br> UV index: ${body.current.uv_index}`
      );
    }
  });
};

module.exports = forecast;
