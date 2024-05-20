function increaseViewCount(projectNumber, event) {
    // Prevent the default behavior of the <a> tag
    event.preventDefault();
    
    // Get the IP address of the user
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const projectKey = "projectViews";
            const viewedIPsKey = "viewedIPs";
            
            // Retrieve existing view counts and viewed IPs from local storage
            let projectViews = JSON.parse(localStorage.getItem(projectKey)) || {};
            let viewedIPs = JSON.parse(localStorage.getItem(viewedIPsKey)) || {};
            
            const lastViewed = viewedIPs[ipAddress];
            const now = Date.now();

            if (!viewedIPs[ipAddress] || (lastViewed && now - lastViewed > 1000)) {
                // Increment the view count for the specific project
                if (!projectViews[projectNumber]) {
                    projectViews[projectNumber] = { count: 0, name: "" };
                }
                projectViews[projectNumber].count++;

                // Store the updated view counts and viewed IPs back in local storage
                localStorage.setItem(projectKey, JSON.stringify(projectViews));
                viewedIPs[ipAddress] = now;
                localStorage.setItem(viewedIPsKey, JSON.stringify(viewedIPs));
                
                // Update the view counter on the page
                const viewCounterElement = document.getElementById("viewCounter" + projectNumber);
                viewCounterElement.textContent = projectViews[projectNumber].count + " view";
                
                // Redirect to the project page
                const weburl = "projects/projectInfo" + projectNumber + ".html";
                window.location.href = weburl;
            } else {
                const weburl = "projects/projectInfo" + projectNumber + ".html";
                window.location.href = weburl;
            }
        })
        .catch(error => console.error('Error fetching IP address:', error));
}

window.onload = function () {
    // Initialize view counts for all projects
    const projectKey = "projectViews";
    const projectViews = JSON.parse(localStorage.getItem(projectKey)) || {};

    for (let i = 1; i <= 4; i++) {
        const viewCounterElement = document.getElementById("viewCounter" + i);
        if (projectViews[i]) {
            viewCounterElement.textContent = projectViews[i].count + " view";
        } else {
            projectViews[i] = { count: 0, name: "" };
        }
    }
    localStorage.setItem(projectKey, JSON.stringify(projectViews));
};

function storeProjectsNames() {
    const projectKey = "projectViews";
    const projectViews = JSON.parse(localStorage.getItem(projectKey)) || {};

    for (let i = 1; i <= 4; i++) {
        const projectName = document.getElementById("ProjectName" + i).textContent;
        if (!projectViews[i]) {
            projectViews[i] = { count: 0, name: projectName };
        } else {
            projectViews[i].name = projectName;
        }
    }

    localStorage.setItem(projectKey, JSON.stringify(projectViews));
}

function findTopMostViewed() {
    const projectKey = "projectViews";
    const projectViews = JSON.parse(localStorage.getItem(projectKey)) || {};
    const projects = Object.keys(projectViews).map(key => ({
        number: key,
        count: projectViews[key].count,
        name: projectViews[key].name
    }));

    projects.sort((a, b) => b.count - a.count);

    const list = document.getElementById('topList');
    list.innerHTML = ''; // Clear existing list
    for (let i = 0; i < Math.min(3, projects.length); i++) {
        const li = document.createElement('li');
        li.textContent = projects[i].name;
        list.appendChild(li);
    }
}

storeProjectsNames();
findTopMostViewed();
