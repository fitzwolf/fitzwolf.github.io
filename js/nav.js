window.onload = function() {
    var pages = ["index.html", "sheet1.html", "sheet2.html", "sheet3.html", "sheet4.html", "sheet5.html", "sheet6.html", "sheet7.html"];
    var currentPage = window.location.pathname.split('/').pop();
  
    function getPrevPage() {
      var index = pages.indexOf(currentPage);
      if (index > 0) {
        return pages[index - 1];
      } else {
        return null;
      }
    }
  
    function getNextPage() {
      var index = pages.indexOf(currentPage);
      if (index < pages.length - 1) {
        return pages[index + 1];
      } else {
        return null;
      }
    }
  
    var prevButton = getPrevPage() ? `<a href="${getPrevPage()}"><button>Previous</button></a>` : '';
    var nextButton = getNextPage() ? `<a href="${getNextPage()}"><button>Next</button></a>` : '';
  
    // nav.js
    var navLinks = {
        'sheet1.html': 'About Project',
        'sheet2.html': 'About Data',
        'sheet3.html': 'Apple',
        'sheet4.html': 'SLV',
        'sheet5.html': 'SPY',
        'sheet6.html': 'Microsoft',
        'sheet7.html': 'Combined Results'
    }

    var div = document.createElement('div');
    div.id = "nav-container";
    div.style.textAlign = "center";

    var nav = document.createElement('nav');
    nav.id = "nav-bar";

    var ul = document.createElement('ul');
    ul.style.display = "inline-block";
    ul.style.textAlign = "left";

    for(var key in navLinks){
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = key;
        a.innerText = navLinks[key];
        if(currentPage === key) {
            li.classList.add('active');
        }
        li.appendChild(a);
        ul.appendChild(li);
    }

    nav.appendChild(ul);
    div.appendChild(nav);

    var buttonsDiv = document.createElement('div');
    buttonsDiv.innerHTML = `${prevButton} ${nextButton}`;
    buttonsDiv.style.marginTop = '20px';  // Add space between the nav bar and the buttons
    div.appendChild(buttonsDiv);

    document.body.prepend(div);
};
