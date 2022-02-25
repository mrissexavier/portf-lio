/*------------------ menu de navegação ---------------------*/

(() => {
  const btnMenu = document.querySelector(".btnMenu"),
    navMenu = document.querySelector(".navMenu"),
    closeNavBtn = navMenu.querySelector(".closeNavMenu");

  btnMenu.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyStopScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyStopScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fadeOutEffect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fadeOutEffect").classList.remove("active");
    }, 300)
  }

  //anexar e manipular eventos ao documento

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains('linkItem')) {
      //certificar-se de ter um valor event.target.hash antes de substituir
      if (event.target.hash !== "") {
        // evitar o comportamento de clique de âncora padrão
        event.preventDefault();
        const hash = event.target.hash;
        //desativando 'section' ativa
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        //ativando a nova 'section' ativa
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        //desativando navegação no menu 'link-item' ativa
        navMenu.querySelector(".active").classList.add("outerShadow", "hoverInShadow");
        navMenu.querySelector(".active").classList.remove("active", "innerShadow");
        //if 'linkItem' está contido no menu de navegação
        if(navMenu.classList.contains("open")){
          //ativando nova nevegação ativa
          event.target.classList.add("active", "innerShadow");
          event.target.classList.remove("outerShadow", "hoverInShadow");
          //escondendo menu de navegação
          hideNavMenu();
        }
        else{
          let navItems = navMenu.querySelectorAll(".linkItem");
          navItems.forEach((item) => {
            if(hash === item.hash){
              //ativando novo menu de navegação 'linkItem'
              item.classList.add("active", "innerShadow");
              item.classList.remove("outerShadow", "hoverInShadow");
            }
          })
          fadeOutEffect();
        }
        // adicionando hash (#) na url
        window.location.hash = hash;
      }
    }
  })

})();


/*------------------ sobre mim section tabs ---------------------*/

(() => {
  const aboutSection = document.querySelector(".aboutSection"),
    tabsContainer = document.querySelector(".aboutTabs");

  tabsContainer.addEventListener('click', (event) => {
    /* If event.target contem a class 'tabItem' e não contém a class 'active' */
    if (event.target.classList.contains("tabItem") && !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      // desativando 'tabItem'
      tabsContainer.querySelector(".active").classList.remove("outerShadow", "active");
      // ativando novo 'tabItem'
      event.target.classList.add("active", "outerShadow");
      // desativando ativo existente em 'tabContent'
      aboutSection.querySelector(".tabContent", ".active").classList.remove("active");
      // ativando novo 'tabContent'
      aboutSection.querySelector(target).classList.add("active");
    }
  })
})();

function bodyStopScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

/*------------------ portfolio filtros e popup --------------------*/

(() => {
  const filterContainer = document.querySelector(".portfolioFilter"),
    portfolioItemsContainer = document.querySelector(".portfolioItems"),
    portfolioItems = document.querySelectorAll(".portfolioItem"),
    popup = document.querySelector(".portfolioPopup"),
    prevBtn = document.querySelector(".ppPrev"),
    nextBtn = document.querySelector(".ppNext"),
    closeBtn = document.querySelector(".ppClose");

  let itemIndex, slideIndex, screenshots;

  // filtro itens portfolio

  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filterItem") && !event.target.classList.contains(".active")) {
      // desativando 'filterItem'
      filterContainer.querySelector(".active").classList.remove("outerShadow", "active");
      // ativando novo 'filterItem'
      event.target.classList.add("active", "outerShadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute('data-category') || target === 'all') {
          item.classList.remove("hide");
          item.classList.add("show");
        }
        else {
          item.classList.remove("show");
          item.classList.add("hide")
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event => {
    if (event.target.closest(".portifolioItemInner")) {
      const portfolioItem = event.target.closest(".portfolioItemInner").parentElement;
      //pegando o index portfolioItem
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
      screenshots = portfolioItems[itemIndex].querySelector(".portfolioItemImg img").getAttribute("data-screenshots");
      //convertendo screenshots em array
      screenshots = screenshots.split(",");
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
    }
  }))

  closeBtn.addEventListener("click", () => {
    popupToggle();
  })

  function popupToggle() {
    popup.classList.toggle('open');
    bodyStopScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".ppImg");
    popup.querySelector(".ppLoader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      //desativar loader depois do popupImg loaded
      popup.querySelector(".ppLoader").classList.remove("active");
    }
    popup.querySelector(".ppCounter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
  }

})();


/*------------------ escondendo todas seções exeto as ativas -------*/


(() => {

  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  })


})();
