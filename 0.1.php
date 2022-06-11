<?php
require "geo.php";

// verificar que estan los paametros...
if (!isset($_POST["Lat1"], $_POST["Lat2"], $_POST["Lon1"], $_POST["Lon2"])){
   echo "Faltan parametros...";
   exit();
}

$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["highway"="cycleway"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';


// cURL the API
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $overpass);
$html = curl_exec($ch);

$geojson = Overpass2Geojson::convertWays($html,false); // Returns array with GeoJSON structure
$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($geojson));
fclose($myfile);

echo "$overpass";



?>
