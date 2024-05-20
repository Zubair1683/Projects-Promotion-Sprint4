
// If title visible show paragraph and hide title , if paragraph visible show title and hide paragraph when you clicked
$(document).ready(function () {
  $('.infobutton').click(function () {
    var $h1 = $('.ProjectVInfo h1');
    var $p = $('.ProjectVInfo p');

    if ($h1.hasClass('normal')) {
      $h1.removeClass('normal');
      $h1.addClass('hide');
      $('.infobutton').html('Back <i class="fa fa-refresh"></i>');
    } else {
      $h1.removeClass('hide');
      $h1.addClass('normal');
      $('.infobutton').html('Info <i class="fa fa-refresh"></i>');
    }

    if ($p.hasClass('normal')) {
      $p.removeClass('normal');
      $p.addClass('hide');
    } else {
      $p.removeClass('hide');
      $p.addClass('normal');
    }

    $('.ProjectVInfo').toggleClass('rotate');
    $('.infobutton').toggleClass('buttonrotate');
    $h1.toggleClass('rotate');
    $p.toggleClass('rotate');

  });
});

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
              
              
              // Redirect to the project page
              const weburl = "projectInfo" + projectNumber + ".html";
              window.location.href = weburl;
          } else {
              const weburl = "projectInfo" + projectNumber + ".html";
              window.location.href = weburl;
          }
      })
      .catch(error => console.error('Error fetching IP address:', error));
}












