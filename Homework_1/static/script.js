//Array to store applications
const applications = [];


numOfApplication = 0;

//Adds an application into a list
function addApp(){
    const appName = document.getElementById('appName').value;
    const zipCode = document.getElementById('zipCode').value;
    const appNumber = numOfApplication += 1;

    const appData ={
        name: appName,
        serialNumber: appNumber,
        status: "Recieved",
        zip: zipCode
            
    };

    fetch('/api/add_app',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appData)
    })
        .then(response => response.json())
        .then(data =>{
            console.log(data.message);

            applications.push(appData);
            console.log(applications)

           
            displayAnApplication();
        })

        .catch(error =>{
            console.error('Error adding application', error);
        });
        


}

//Shows an application
function displayAnApplication(){
    const appList = document.getElementById('appList');
    appList.innerHTML = '';

    applications.forEach(app => { 
        const appElement = document.createElement('div');
        appElement.innerHTML = `
        <p>Application Name: ${app.name}<br>
        Zipcode: ${app.zip}<br>
        Application Number: ${app.serialNumber}<br>
        Status: ${app.status} </p>
        `;
        appList.appendChild(appElement);

    });

}

//Api to display the status
function checkStatus(){
    
    fetch('/api/check_status',{
        method: 'POST',
        headers: {
            'Content-Type': 'applications/json'
        },
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.message)
        console.log(applications)

        displayStatus();
    })

    .catch(error =>{
        console.error('Error displaying status', error)
    });
    

}

//Displays the status of an application
function displayStatus(){
    const numToCheck = document.getElementById('checkStatus').value;
  

    if(numToCheck <= applications.length){
        const appStatusFound = document.createElement('div');
        appStatusFound.innerHTML = `
        <p>
            Application ${numToCheck} status: ${applications[numToCheck-1].status}
        </p>
        `;
        showStatus.appendChild(appStatusFound);
    }else{
        const appStatusNotFound = document.createElement('div');
        appStatusNotFound.innerHTML = `
        <p>
            Application number ${numToCheck} not found
        </p>
        `;

        statusFailed.appendChild(appStatusNotFound);
    }


   

}

//Api to updating the status
function updateStatus(){
    fetch('/api/update_status',{
        method: 'POST',
        headers:{
            'Content-Type': 'applications/json'
        },
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.message)
        console.log(applications)

        newStatus();
    })

    .catch(error =>{
        console.error('Error changing', error)
    });
}

//Changes the status of an application
function newStatus(){
    const appToChange = document.getElementById('appNumToUpdate').value;
    const newStatus = document.getElementById("newStatus").value;

    applications[appToChange - 1].status = newStatus;

    const showNewStatus = document.getElementById('showNewStatus');
    applications.forEach(app => { 
        const newStatusDiv = document.createElement('div');
        newStatusDiv.innerHTML = `
        <p>Application Name: ${app.name}<br>
        Zipcode: ${app.zip}<br>
        Application Number: ${app.serialNumber}<br>
        Status: ${app.status} </p>
        `;
        showNewStatus.appendChild(newStatusDiv);
    
        });
    
  
    }
