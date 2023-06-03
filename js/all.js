$(document).ready(function () {
  refresh()
  createMenuButton()

  getData(data);
  searchData(data);
  filterData(data);
  sortData();
  paginationProcess()

  multiSort()
  organizeCollectedData()

  // console.log($('.pagination li'))
  $('.selection-bar a').click(function () {
    $('.selection-bar a').removeClass('selected font-700')
    $('.selection-bar a').addClass('unselected')
    $(this).addClass('selected font-700')
  })

  //切換分頁(預寫)
  var index = 0;
  // console.log($('.pagination a'))
  // $('.pagination li:not(:last-child)').click(function () {
  //   $('.pagination a').removeClass('selected-pagination');
  //   $('.pagination a').addClass('unselected-pagination');
  //   $(this).find('a').toggleClass('selected-pagination');
  //   index = $(this).index();
  // });

  // //按下一頁切換分頁
  // $('.pagination li:last-child').click(function () {
  //   if(index < 4){
  //     $(`.pagination li:nth-child(${index+1})`).find('a').removeClass('selected-pagination');
  //     $(`.pagination li:nth-child(${index+2})`).find('a').addClass('selected-pagination');
  //     index += 1;
  //   }
  // });

  $('.backToTop').on('click', function () {
    $('html').animate({ scrollTop: 0 }, 1000)
  })

  $('.date-sort-drop').hide()
  $('.all-sort-drop').hide()
  $('.arrow-left').hide()

  $('#button-date').click(function () {
    $('.date-sort-drop').slideToggle()
    $("#button-date").toggleClass('active')
  })

  $('#button-all-sort').click(function () {
    $('.all-sort-drop').slideToggle()
    $("#button-all-sort").toggleClass('active')
  })

  $('.sort-button').click(function() {
    $(this).find('span').toggleClass('d-flex')
  })

  $('.date-sort-drop').hide()

  //過渡分頁特效
  var btns = ['.submenu a', '.map-list a', '.submenu-mobile a']
  for (e of btns) {
    gradLoad(e)
  }

  $('.q-a li').click(function(e) {
    $(this).find('.ans').slideToggle(function (){
      $(this).find('.ans').toggleClass('active');
    })
    $(this).find('.icon-remove').toggleClass('d-block');
    $(this).find('.icon-add').toggleClass('d-none');
  });
})

function createMenuButton () {
  $('.header').after(
    '<ul class="submenu-mobile" style="display:none"><li><a class="font-700 font-white" href="index.html">首頁</a></li><li><a class="font-700 font-white" href="price.html">定價</a></li></ul>')
  $('.menu-top').on('click', function () {
    hideBlock()
    $('.menu-top').hide()
    if ($('.menu-top').is(':hidden')) {
      $('.menu-top-close').show()
    }
    $('.submenu-mobile').slideToggle()
  })
  $('.menu-top-close').on('click', function () {
    closeMenu()
    $('.menu-top-close').hide()
  })
}

function refresh () {
  //調整刷新頁面
  $(window).resize(function () {
    if ($('.submenu').is(':visible')) {
      $('.submenu-mobile').hide()
      $('.menu-top-close').hide()
    }
    if ($('.submenu-mobile').is(':visible')) {
      $('.menu-top-close').show()
    }
    if (
      $('.menu-top').is(':hidden') &&
      $('.menu-top-close').is(':hidden') &&
      $('.submenu').is(':hidden')
    )
      $('.menu-top').show()
    if (document.body.clientWidth > 936) {
      showBlock()
    }
  })
}

function gradLoad (btn) {
  $(btn).click(function (event) {
    event.preventDefault()
    linkLocation = this.href
    function redirectPage () {
      window.location = linkLocation
    }
    $('body').fadeOut(1000, redirectPage).fadeIn(2000)
  })
}

let controlingBlock = [
  '.bg-white',
  '.callToAction',
  '.sitemap',
  '.container-price-mid',
  '.backToTop',
]

function hideBlock () {
  $('.header').nextUntil('.footer').hide()
  controlingBlock.forEach(e => {
    $(e).hide()
  })
}

function showBlock () {
  $('.submenu-mobile').nextUntil('.footer').show()
  controlingBlock.forEach(e => {
    $(e).show()
  })
}

function closeMenu () {
  $('.submenu-mobile').toggle()
  $('.menu-top').show()
  showBlock()
}

const data = {
  type: '',
  sort: 0,
  page: 1,
  search: ''
}

function getWorksData ({ type, sort, page, search }) {
  const path = 'https://2023-engineer-camp.zeabur.app'
  let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
  axios.get(link).then(function (res) {
    // console.log(res)
    worksData = res.data.ai_works.data
    pagesData = res.data.ai_works.page
    console.log(worksData)
    // console.log(pagesData)
    paginationProcess(pagesData)
    renderData()
  })
}

async function paginationProcess () {
  const pagesData = await getPageData(data);
  $('.pagination li:not(:last-child):not(:first-child').click(function () {
    if ($('.pagination li:last-child').index() <= pagesData.total_pages) {
      $('.pagination a').removeClass('selected-pagination');
      $('.pagination a').addClass('unselected-pagination');
      $(this).find('a').toggleClass('selected-pagination');
      index = $(this).index() - 1;
    } else alert('目前頁數未滿足切換條件!')
  })

  index = Number(pagesData.current_page) - 1

  // console.log(index)
  $('.pagination li:last-child').click(function () {
    if (pagesData.has_next) {
      if (!((index + 1) % 5 == 0)) { //[0]->1, [4]->5, [9]->10
        $(`.pagination li:nth-child(${(index + 2) % 5})`).find('a').removeClass(
          'selected-pagination'
        )
        $(`.pagination li:nth-child(${(index + 3) % 5})`).find('a').addClass(
          'selected-pagination'
        )
        if((index + 2) % 5 == 4) {
          $(`.pagination li:nth-child(${(index + 2) % 5})`).find('a').removeClass(
            'selected-pagination'
          )
          $(`.pagination li:nth-child(${5})`).find('a').addClass(
            'selected-pagination'
          )
        }
        if((index + 1) % 5 == 4) {
          $(`.pagination li:nth-child(${5}`).find('a').removeClass(
            'selected-pagination'
          )
          $(`.pagination li:nth-child(${6})`).find('a').addClass(
            'selected-pagination'
          )
        }
        index += 1
        console.log(index)
      } else {
        $(`.pagination li:nth-child(${6})`).find('a').removeClass(
          'selected-pagination'
        )
        $(`.pagination li:nth-child(${(index + 3) % 5})`).find('a').addClass(
          'selected-pagination'
        )
        for(let i = 1; i<=6; i++){
          $(`.pagination li:nth-child(${i})`).find('a').text(`${index+(i)}`);
        }
        data.page = index + 2;
        // console.log(data)
        renderData();
        index += 1;
        if(index > 0) $(".arrow-left").show();
        // console.log(index)
      }
    } else alert('沒有下個分頁!')
  })
  $(`.pagination li:first-child`).click(function(){
    // console.log(index)
    if((index) % 5 == 0) {
      $(`.pagination li:nth-child(${6})`).find('a').text(`${index}`);
      $(`.pagination li:nth-child(${5})`).find('a').text(`${index-1}`);
      $(`.pagination li:nth-child(${4})`).find('a').text(`${index-2}`);
      $(`.pagination li:nth-child(${3})`).find('a').text(`${index-3}`);
      $(`.pagination li:nth-child(${2})`).find('a').text(`${index-4}`);
      $(`.pagination li:nth-child(${2})`).find('a').removeClass(
        'selected-pagination'
      )
      $(`.pagination li:nth-child(${6})`).find('a').addClass(
        'selected-pagination'
      )
    } else {
      $(`.pagination li:nth-child(${(index % 5)+2})`).find('a').removeClass(
        'selected-pagination'
      )
      $(`.pagination li:nth-child(${(index % 5)+1})`).find('a').addClass(
        'selected-pagination'
      )
    }
    index -= 1;
    console.log(index)
    if(index <= 4) $(".arrow-left").hide()
  })
}

// function oldNextPage() { //Since line-187
//   $('.pagination li:last-child').click(function () {
//     if (pagesData.has_next) {
//       if (index < 4) {
//         $(`.pagination li:nth-child(${index + 1})`).find('a').removeClass(
//           'selected-pagination'
//         )
//         $(`.pagination li:nth-child(${index + 2})`).find('a').addClass(
//           'selected-pagination'
//         )
//         index += 1
//         // console.log(index)
//       }
//     } else alert('沒有下個分頁!')
//   })
// }
function searchData(data) {
  const search = document.querySelector('.search');
  search.addEventListener('keypress', async e => {
    if (e.keyCode === 13) {
      data.search = search.value;
      data.page = 1;
      const worksData = await getData(data);
      renderData(worksData);
    }
  });
}

function filterData (data) {
  const filters = document.querySelectorAll('.selection-bar a')
  // console.log(filters)
  filters.forEach(e => {
    // console.log(e)
    $(e).on('click', function () {
      if (e.innerText === '全部') {
        data.type = ''
      } else {
        data.type = e.innerText
      }
      // console.log(data)
      getData(data)
    })
  })
}
const path = 'https://2023-engineer-camp.zeabur.app'
async function getData({ type, sort, page, search }) {
  const link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`;
  const res = await axios.get(link);
  const worksData = res.data.ai_works.data;
  renderData(worksData)
  if (worksData.length === 0) {
    showNoData()
  }
  return worksData;
}

async function getPageData({ type, sort, page, search }) {
  const link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`;
  const res = await axios.get(link);
  const pageData = res.data.ai_works.page;
  return pageData;
}

function renderData (worksData) {
  let works = ''
  const list = document.querySelector('#tools')
  worksData.forEach(item => {
    works += `<li class="tools mb24 d-flex fdc jcsb">
    <div class="img-container">
        <img src="${item.imageUrl}" alt="AI工具一" class="img">    
    </div>  
    <div class="d-flex aic fdc mt20 mb20">
        <h3 class="main-title mb12 font-2 font-900 lh-main-title">${item.title}</h3>
        <p class="main-text font-0 lh font-gray">${item.description}</p>
    </div>
    <div>
      <div class="d-flex jcsb outline">
          <h3 class="padding-2 lh font-700">AI模型</h3>
          <span class="padding-2 lh">${item.model}</span>
      </div>
      <div class="d-flex jcsb">
          <a class="tools-tag-1 d-flex jcsb-left padding-2" href="#">#${item.type}</a>
          <a href="${item.link}" class="material-icons padding-2" href="#">share</a>
      </div>
    </div>
</li>`
  })
  if(worksData.length == 2 || worksData.length == 5) {
    works += `<div style="width:32%; margin-bottom: 24px"></div>`
  }
  list.innerHTML = works
}

function sortData () {
  const dateSort = document.querySelector('#button-date')
  $("#to-old-btn").on("click", e => {
    e.preventDefault()
    data.sort = 0
    // console.log(data)
    getData(data)
    dateSort.innerHTML = 
    '由新到舊<span class="material-icons date-sort-drop-icon">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle();
    $("#button-date").toggleClass('active')
  })
  $("#to-new-btn").on("click", e => {
    e.preventDefault()
    data.sort = 1
    getData(data)
    dateSort.innerHTML =
    '由舊到新<span class="material-icons date-sort-drop-icon">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle();
    $("#button-date").toggleClass('active')
  })
}

// gradLoadEmpty('.pagination a') 分頁切換特效(外連時才用，目前全部改為一頁)
// function gradLoadEmpty (btn) {
//   $(btn).click(function (event) {
//     event.preventDefault()
//     $('body').fadeOut(500).fadeIn(2000)
//   })
// }

var currentPage = location.pathname.replace(/^.*[\\\/]/, '')
if(currentPage!="price.html"){
  const swiper = new Swiper(".swiper", {
    // 分頁
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      936:{
      slidesPerView: 3
    },
      731: {
        slidesPerView: 2
      },
      375: {
        slidesPerView: 1
      }
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      paginationDistance: '100px'
    }
  });  
}

let collectedWorkData = []
function multiSort () {
  let arr = []
  let clickedNum = 0;//已選取多少項目
  $(".sort-button").click(function(){
    if(this.innerText.slice(-1)=="k") {
      //如果已被選取，innerText會有check
      let alreadySelected = this.innerText.substring(0, this.innerText.length-6);
      // console.log(alreadySelected.length)
      let index = arr.indexOf(alreadySelected)
      arr.splice(index, 1)
      for(e of collectedWorkData){
        if(e[0] == alreadySelected) collectedWorkData.splice(collectedWorkData.indexOf(e),1)
      }
      // console.log(`已移除種類篩選，目前已收集陣列資料：`)
      // console.log(collectedWorkData)
      if(clickedNum == 1) {//如果移除所有篩選(移除前所有只剩一個)，回到初始畫面
        data.type = '' 
        data.sort = 0
        data.page = 1
        data.search = ''
        // console.log(data)
        getData(data)
      }
      clickedNum --;
      organizeCollectedData()
      currentNum = 0; //總共選取的作品數量初始化
      collectedWorkData.forEach(e => { //累加所有選取項目的作品數量
        currentNum += e[1].length
      })
      if(currentNum == 0){ //如果都沒有，顯示找不到資料的畫面
        showNoData()
      }
    } else {
      data.type = this.innerText
      clickedNum ++;
      // console.log(clickedNum)
      if(collectedWorkData.length===0) {
        showNoData()
      }
      traverseWorksInfo(data)
    }
  })
}

function traverseWorksInfo ({ type, sort, page, search }) {
  // console.log(type)
  const path = 'https://2023-engineer-camp.zeabur.app'
  let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
  axios.get(link).then(function (res) {
    worksData = res.data.ai_works.data
    pagesData = res.data.ai_works.page
    collectedWorkData.push([type, worksData])
    // console.log(pagesData)
    if(pagesData.has_next) {
      page += 1;
      getWorksInfo(data)
    }
    // console.log("已增加種類篩選，已收集陣列資料：")
    // console.log(collectedWorkData)
    organizeCollectedData();
  })    
}  

function organizeCollectedData(){
  let result = []
  for(e of collectedWorkData){
    if(e[1].length == 0) {/*console.log(`${e[0]}的種類尚未有任何資料！`)*/}
    else result.push(e[1]);
  }
  let groupedResult = []
  for(let i = 0; i < result.flat().length; i += 6){
    let temp = result.flat().slice(i, i + 6);
    groupedResult.push(temp);
  }
  //groupedResult以六個六個為一組，每個分組代表一個頁面所要呈現的資料
  console.log("groupedResult")
  console.log(groupedResult)
  groupedResult.forEach(e => {
    worksData = e;
    renderData(worksData)
  })
}

function showNoData () {
  const list = document.querySelector('#tools');
  list.innerHTML =
      '<li style="font-size: 18px; margin-bottom: 60px"><p>找不到相符的資料</p><li>';
}
/*ToDo*/
//1. 前一頁邏輯(完成，待真實data實測)
//2. 整理出來的陣列資料渲染到頁面上(接收到的Data以六個為一組隔開) (完成可以多種類篩選的部分，順序會依據所篩來顯示)

/* # 分頁區逢五 (完成，待真實data實測)*/ 
//     # 獲取當前頁碼
//     # 獲取下一頁的資料
//     # 如果有下一頁
//         # 如果當前頁碼是 5 的倍數
//             # 更新分頁區的顯示
//         # 更新畫面
//         # 更新當前頁碼

// # 左上方篩選功能(完成，待測試)
//     # 初始化結果陣列
//     # 初始化頁碼
//         # 獲取指定頁面的資料
//         # 遍歷資料
//             # 如果符合篩選條件
//                 # 加入結果陣列
//         # 如果沒有下一頁
//             # 跳出迴圈
//         # 頁碼加一
//     # 更新畫面
