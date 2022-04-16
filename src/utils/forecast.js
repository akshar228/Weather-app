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
        `Time: ${body.current.observation_time}, Temperature: ${body.current.temperature}, Feels like: ${body.current.feelslike}, Wind speed: ${body.current.wind_speed}, Wind degree: ${body.current.wind_degree} ${body.current.wind_dir}, Humidity: ${body.current.humidity}, Visibility: ${body.current.visibility}, UV index: ${body.current.uv_index}`
      );
    }
  });
};

module.exports = forecast;
