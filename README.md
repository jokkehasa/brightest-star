# brightest-star
App for recognising objects in the night sky

Functionality
--------------
1. App has a database of brightest stars, their names, magnitudes and celestial coordinates (declination and right ascension) in the current epoch
2. When user opens the website, app records their geographic coordinates (latitude and longitude) and datetime
    * Coordinates and datetime can be also updated with a button
4. Using coordinates and datetime, app transforms the star database to horizontal coordinates (altitude and azimuth)
5. App also adds the classical planets to the list
6. User gives the approximate viewing direction using an svg image of sky regions 
7. App filters the star and planet data according to viewing direction
8. App gives the brightest objects (up to magnitude 2) in a list
9. App draws a picture of the sky, showing stars up to magnitude 3 or 4, as well as all planets
    * Either full view of the sky (rotatable) or portion in viewing direction (pannable)
    * Names of stars and planets can be seen on hover or click 
