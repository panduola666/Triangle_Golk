var e=window.location.href.split("/").pop().split(".")[0],i=document.querySelectorAll(".nav-link");i.forEach(function(a){var t=a.getAttribute("data-page");t===e&&a.classList.add("active")});
