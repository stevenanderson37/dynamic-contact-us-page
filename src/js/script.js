// FETCH JSON DATA AND SAVE IT TO A VARIABLE FOR USE WITHOUT NEEDING TO REFETCH
// const url = "https://www.ivanti.com/data/offices?cc=en-US";
const url = "https://raw.githubusercontent.com/stevenanderson37/office-locations/master/office-locations.json";
const regionSelect = document.querySelector('#region-selector');
const imageUrl1 = "'https://static.ivanti.com/sites/marketing/media/images/company/contact/contact_location-";
const imageUrl1b = "'https://static.ivanti.com/sites/marketing/media/images/company/contact/";
const imageUrl2 = ".jpg'";
let officeLocations = [];

runFetch();

regionSelect.addEventListener("change", function() {
    officeLocations = [];
    document.querySelector('#office-locations-container').innerHTML = "";
    runFetch();
});

function runFetch() {
    fetch(url).then(
            function(response) { 
                return response.json();
            }
        ).then(
            function(data){

                for (i = 0; i < data.length; i++) {
                    officeLocations.push(data[i]);
                }

                for (j = 0; j < officeLocations.length; j++) {
                    var officeNameStr = officeLocations[j].Name;
                    var officeNameArr = officeNameStr.split(" ");

                    var addressHTML = "";
                    if (officeLocations[j].Address !== "") {
                        addressHTML = '<p>Ivanti</p><p>' + officeLocations[j].Address + '</p><p>' + officeLocations[j].Country + '</p>';
                    }
                    
                    var imageName = "";
                    // There is no consistent naming convention for the image files to be able to grab the systematically grab them with the data offered at the RESTful API endpoint. I tried many things to work around it, but there's not way to write code that would account for all the different names. I added in this first statement to check for officeLocations[j].Image to grab the correct string if it is added to the object. I went through and added all the correct Image values for each object that wasn't getting the image url made correctly.
                    if (officeLocations[j].Image) {
                        imageName = imageUrl1b + officeLocations[j].Image + "'";
                    } else if (officeNameStr.includes("(")) {
                        imageName = imageUrl1 + officeNameStr.substring(
                            officeNameStr.lastIndexOf("(") + 1, 
                            officeNameStr.lastIndexOf(")")
                        ) + imageUrl2;
                    } else {
                        imageName = imageUrl1 + officeNameArr[0] + imageUrl2;
                    }

                    if (officeLocations[j].Region === regionSelect.value || officeLocations[j].Region === "Global") {

                        if (officeLocations[j].Name !== "") {
                            var newEl = document.createElement('div');
                            newEl.setAttribute('class', 'office-location');
                            newEl.innerHTML = '<div class="office-location-img" style="background-image: url(' + imageName.toLowerCase() + ');"><div class="office-location-img-txt"><h5>' + officeLocations[j].Name + '</h5><p><span>Contact Information...</span></p></div></div><div class="office-location-info"><h5>' + officeLocations[j].Name + '</h5><p>Phone: <span><a href="tel:' + officeLocations[j].Phone + '">' + officeLocations[j].Phone + '</a></span></p><p><a href="mailto:' + officeLocations[j].Email + '">' + officeLocations[j].Email + '</a></p>' + addressHTML + '</div>';

                            document.querySelector('#office-locations-container').appendChild(newEl);
                        } else {
                            var newEl = document.createElement('div');
                            newEl.setAttribute('class', 'office-location');
                            newEl.innerHTML = '<div class="office-location-img" style="background-image: url(' + imageUrl1 + officeLocations[j].Country.toLowerCase() + imageUrl2 + ');"><div class="office-location-img-txt"><h5>' + officeLocations[j].Country + '</h5><p><span>Contact Information...</span></p></div></div><div class="office-location-info"><h5>' + officeLocations[j].Name + '</h5><p>Phone: <span><a href="tel:' + officeLocations[j].Phone + '">' + officeLocations[j].Phone + '</a></span></p><p><a href="mailto:' + officeLocations[j].Email + '">' + officeLocations[j].Email + '</a></p>' + addressHTML + '</div>';

                            document.querySelector('#office-locations-container').appendChild(newEl);
                        }

                    } else if (regionSelect.value === "Global") {

                        if (officeLocations[j].Name !== "") {
                            var newEl = document.createElement('div');
                            newEl.setAttribute('class', 'office-location');
                            newEl.innerHTML = '<div class="office-location-img" style="background-image: url(' + imageName.toLowerCase() + ');"><div class="office-location-img-txt"><h5>' + officeLocations[j].Name + '</h5><p><span>Contact Information...</span></p></div></div><div class="office-location-info"><h5>' + officeLocations[j].Name + '</h5><p>Phone: <span><a href="tel:' + officeLocations[j].Phone + '">' + officeLocations[j].Phone + '</a></span></p><p><a href="mailto:' + officeLocations[j].Email + '">' + officeLocations[j].Email + '</a></p>' + addressHTML + '</div>';

                            document.querySelector('#office-locations-container').appendChild(newEl);
                        } else {
                            var newEl = document.createElement('div');
                            newEl.setAttribute('class', 'office-location');
                            newEl.innerHTML = '<div class="office-location-img" style="background-image: url(' + imageUrl1 + officeLocations[j].Country.toLowerCase() + imageUrl2 + ');"><div class="office-location-img-txt"><h5>' + officeLocations[j].Country + '</h5><p><span>Contact Information...</span></p></div></div><div class="office-location-info"><h5>' + officeLocations[j].Name + '</h5><p>Phone: <span><a href="tel:' + officeLocations[j].Phone + '">' + officeLocations[j].Phone + '</a></span></p><p><a href="mailto:' + officeLocations[j].Email + '">' + officeLocations[j].Email + '</a></p>' + addressHTML + '</div>';

                            document.querySelector('#office-locations-container').appendChild(newEl);
                        }

                    }
                }
            }
        )
        .catch(function(err){
            console.log(err);
        });
}
