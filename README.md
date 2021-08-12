# *CovidMap Poland*

### **Project is using HTML5 + JavaScript only.**
### **Site is also made fully in Polish.**

This webpage was made as a final project for a course named "Data communication and visualisation".
Site structure contains three elements:
* map of Poland divided into provinces,
* data writing panel,
    * drop-down list of provinces,
    * input for number of transmissions, deaths and recovered patients,
    * three buttons responsible for respectively: saving data; drawing data on the map and graph; clearing data.
* bar chart divided into provinces,
    * unliike map (where only number of transmissions is displayed), this chart displays all types of data collected from user.

## Map
Map displays data as a circle on the respective provinces. Diameter and color of this circle changes with number of transmissions.

## Chart
Chart displays all types of data taken from user through writing panel.

## Known bugs/problems:
* drop-down menu is supposed to give access to input areas only if province is picked,
    * now it gives access instantly after clicking on drop-down menu,
* maximum value is 25k,
* website is not usable on phones, no scaling/wrapping,
* pie chart feature is ready but merging it creates problems,
* other web browsers than Firefox (?).