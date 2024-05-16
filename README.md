# Weather Display Script

This script allows users to enter a city name or coordinates and fetches the weather data for the next 2 weeks, displaying the average temperature for each day. The weather display is responsive and can fit into different shaped divs.

## How to Use

1. **Clone the Repository**:
   git clone https://github.com/Rgaibel/Rise.git

Download the dist/bundle.js file from this repository.

2. Include the Script in Your Webpage:
   <script src="path/to/bundle.js" type="module"></script>

3. Inject the Weather Display:

To inject the weather display into a specific div, use the following code:

<div id="myWeatherDiv"></div>
<script>
  injectWeatherDiv('myWeatherDiv');
</script>

Note: If no div id is provided, the script will create a new div in the body:

<script>
  injectWeatherDiv();
</script>

View the Weather Display: The script will display an input field where you can enter a city name or coordinates. Pressing the "Submit" button will show the average temperature for each day of the week for the specified location.

DEPENDENCIES:
Webpack: To bundle the TypeScript code into a single JavaScript file.
TypeScript: To compile TypeScript code to JavaScript.
ts-loader: To allow Webpack to bundle TypeScript files.
style-loader and css-loader: To bundle CSS files used for styling.
file-loader: To handle file imports in the TypeScript code.
html-webpack-plugin: To generate an HTML file that includes the bundled script.

npm install webpack typescript ts-loader style-loader css-loader file-loader html-w
