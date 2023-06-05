$(document).ready(function () {
  refresh()
  createMenuButton()

  //下載至本地端運作的方式
  DataProcess(data)

  //網路請求的方式
  // getData(data);
  // searchData(data);
  // filterData(data);
  // sortData();
  // paginationProcess()

  // multiSort()
  // organizeCollectedData()

  // console.log($('.pagination li'))
  $('.selection-bar a').click(function () {
    collectedWorkData = []
    $('.sort-button').find('span').removeClass('d-flex')
    $('.selection-bar a').removeClass('selected font-700')
    $('.selection-bar a').addClass('unselected')
    $('.all-sort-drop').slideUp()
    $(this).addClass('selected font-700')
    // $("#button-date").css("visibility","visible");
  })

  $('.backToTop').on('click', function () {
    $('html').animate({ scrollTop: 0 }, 1000)
  })

  $('.date-sort-drop').hide()
  $('.all-sort-drop').hide()
  // $('.arrow-left').hide()

  $('#button-date').click(function () {
    $('.date-sort-drop').slideToggle()
    $('#button-date').toggleClass('active')
  })

  $('#button-all-sort').click(function () {
    $('.all-sort-drop').slideToggle()
    $('#button-all-sort').toggleClass('active')
  })

  $('.sort-button').click(function () {
    $(this).find('span').toggleClass('d-flex')
  })

  $('.date-sort-drop').hide()

  //過渡分頁特效
  var btns = ['.submenu a', '.map-list a', '.submenu-mobile a']
  for (e of btns) {
    gradLoad(e)
  }

  $('.q-a li').click(function (e) {
    $(this)
      .find('.ans')
      .slideToggle(function () {
        $(this).find('.ans').toggleClass('active')
      })
    $(this).find('.icon-remove').toggleClass('d-block')
    $(this).find('.icon-add').toggleClass('d-none')
  })
})

function createMenuButton () {
  $('.header').after(
    '<ul class="submenu-mobile" style="display:none"><li><a class="font-700 font-white" href="index.html">首頁</a></li><li><a class="font-700 font-white" href="price.html">定價</a></li></ul>'
  )
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
  '.backToTop'
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

// function getWorksData ({ type, sort, page, search }) {
const path = 'https://2023-engineer-camp.zeabur.app'
//   let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
//   axios.get(link).then(function (res) {
//     // console.log(res)
//     worksData = res.data.ai_works.data
//     pagesData = res.data.ai_works.page
//     console.log(worksData)
//     // console.log(pagesData)
//     paginationProcess(pagesData)
//     renderData()
//   })
// }

// async function paginationProcess () {
//   const pagesData = await getPageData(data)

//   for (let i = 2; i <= 6; i++) {
//     // console.log($(`.pagination li:nth-child(${i})`).text())
//     if (
//       Number($(`.pagination li:nth-child(${i})`).text()) > pagesData.total_pages
//     ) {
//       $(`.pagination li:nth-child(${i})`).hide()
//     } else {
//       $(`.pagination li:nth-child(${i})`).show()
//     }
//   }
//   $('.pagination li:not(:last-child):not(:first-child').click(function () {
//     // if ($('.pagination li:last-child').index() <= pagesData.total_pages) {
//     $('.pagination a').removeClass('selected-pagination')
//     $('.pagination a').addClass('unselected-pagination')
//     $(this).find('a').toggleClass('selected-pagination')
//     index = $(this).index() - 1
//     // } else alert('目前頁數未滿足切換條件!')
//   })

//   index = Number(pagesData.current_page) - 1

//   // if(index <= 4) {
//   //   $(".arrow-left").hide();
//   // }
//   // if(Number(pagesData.total_pages <= 4)){
//   //   $('.pagination li:last-child').hide()
//   // }

//   // console.log(index)
//   $('.pagination li:last-child').click(function () {
//     if (pagesData.has_next) {
//       if (!((index + 1) % 5 == 0)) {
//         //[0]->1, [4]->5, [9]->10
//         $(`.pagination li:nth-child(${(index + 2) % 5})`)
//           .find('a')
//           .removeClass('selected-pagination')
//         $(`.pagination li:nth-child(${(index + 3) % 5})`)
//           .find('a')
//           .addClass('selected-pagination')
//         if ((index + 2) % 5 == 4) {
//           $(`.pagination li:nth-child(${(index + 2) % 5})`)
//             .find('a')
//             .removeClass('selected-pagination')
//           $(`.pagination li:nth-child(${5})`)
//             .find('a')
//             .addClass('selected-pagination')
//         }
//         if ((index + 1) % 5 == 4) {
//           $(`.pagination li:nth-child(${5}`)
//             .find('a')
//             .removeClass('selected-pagination')
//           $(`.pagination li:nth-child(${6})`)
//             .find('a')
//             .addClass('selected-pagination')
//         }
//         index += 1
//         console.log(index)
//       } else {
//         $(`.pagination li:nth-child(${6})`)
//           .find('a')
//           .removeClass('selected-pagination')
//         $(`.pagination li:nth-child(${(index + 3) % 5})`)
//           .find('a')
//           .addClass('selected-pagination')
//         for (let i = 1; i <= 6; i++) {
//           $(`.pagination li:nth-child(${i})`)
//             .find('a')
//             .text(`${index + i}`)
//         }
//         data.page = index + 2
//         // console.log(data)
//         renderData(data)
//         index += 1
//         if (index > 0) $('.arrow-left').show()
//         for (let i = 2; i <= 6; i++) {
//           console.log($(`.pagination li:nth-child(${i})`).text())
//           if (
//             Number($(`.pagination li:nth-child(${i})`).text()) >
//             pagesData.total_pages
//           ) {
//             $(`.pagination li:nth-child(${i})`).hide()
//           } else {
//             $(`.pagination li:nth-child(${i})`).show()
//           }
//         }
//         // console.log(index)
//       }
//     } else alert('沒有下個分頁!')
//   })
//   $(`.pagination li:first-child`).click(function () {
//     // console.log(index)
//     if (index % 5 == 0) {
//       $(`.pagination li:nth-child(${6})`).find('a').text(`${index}`)
//       $(`.pagination li:nth-child(${5})`)
//         .find('a')
//         .text(`${index - 1}`)
//       $(`.pagination li:nth-child(${4})`)
//         .find('a')
//         .text(`${index - 2}`)
//       $(`.pagination li:nth-child(${3})`)
//         .find('a')
//         .text(`${index - 3}`)
//       $(`.pagination li:nth-child(${2})`)
//         .find('a')
//         .text(`${index - 4}`)
//       $(`.pagination li:nth-child(${2})`)
//         .find('a')
//         .removeClass('selected-pagination')
//       $(`.pagination li:nth-child(${6})`)
//         .find('a')
//         .addClass('selected-pagination')
//     } else {
//       $(`.pagination li:nth-child(${(index % 5) + 2})`)
//         .find('a')
//         .removeClass('selected-pagination')
//       $(`.pagination li:nth-child(${(index % 5) + 1})`)
//         .find('a')
//         .addClass('selected-pagination')
//     }
//     index -= 1
//     console.log(index)
//     for (let i = 2; i <= 6; i++) {
//       console.log($(`.pagination li:nth-child(${i})`).text())
//       if (
//         Number($(`.pagination li:nth-child(${i})`).text()) <=
//         pagesData.total_pages
//       ) {
//         $(`.pagination li:nth-child(${i})`).show()
//       }
//     }
//   })
// }

function oldNextPage () {
  //Since line-187
  $('.pagination li:last-child').click(function () {
    if (pagesData.has_next) {
      if (index < 4) {
        $(`.pagination li:nth-child(${index + 1})`)
          .find('a')
          .removeClass('selected-pagination')
        $(`.pagination li:nth-child(${index + 2})`)
          .find('a')
          .addClass('selected-pagination')
        index += 1
        // console.log(index)
      }
    } else alert('沒有下個分頁!')
  })
}
function searchData (data) {
  const search = document.querySelector('.search')
  search.addEventListener('keypress', async e => {
    if (e.keyCode === 13) {
      data.search = search.value
      data.page = 1
      let worksData = await getData(data)
      let isFirstLetterLowerCase = new RegExp('[a-z]')
      if (
        search.value.length > 0 &&
        isFirstLetterLowerCase.test(search.value[0])
      ) {
        let newStr =
          search.value[0].toUpperCase() +
          search.value.slice(1, search.value.length)
        if (worksData.length === 0) {
          data.search = newStr
          worksData = await getData(data)
        }
      }
      renderData(worksData)
      if (worksData.length === 0) {
        showNoData()
      }
    }
  })
}

// function filterData (data) {
//   const filters = document.querySelectorAll('.selection-bar a')
//   // console.log(filters)
//   filters.forEach(e => {
//     // console.log(e)
//     $(e).on('click', function () {
//       if (e.innerText === '全部') {
//         data.type = ''
//       } else {
//         data.type = e.innerText
//       }
//       // console.log(data)
//       getData(data)
//     })
//   })
// }
// const path = 'https://2023-engineer-camp.zeabur.app'
// async function getData ({ type, sort, page, search }) {
//   const link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
//   const res = await axios.get(link)
//   const worksData = res.data.ai_works.data
//   renderData(worksData)
//   if (worksData.length === 0) {
//     showNoData()
//   }
//   return worksData
// }

// async function getPageData ({ type, sort, page, search }) {
//   const link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
//   const res = await axios.get(link)
//   const pageData = res.data.ai_works.page
//   return pageData
// }

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
  if (worksData.length == 2 || worksData.length == 5) {
    works += `<div style="width:32%; margin-bottom: 24px"></div>`
  }
  list.innerHTML = works
}

function sortData () {
  const dateSort = document.querySelector('#button-date')
  $('#to-old-btn').on('click', e => {
    e.preventDefault()
    data.sort = 0
    // console.log(data)
    getData(data)
    dateSort.innerHTML =
      '由新到舊<span class="material-icons date-sort-drop-icon">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle()
    $('#button-date').toggleClass('active')
  })
  $('#to-new-btn').on('click', e => {
    e.preventDefault()
    data.sort = 1
    getData(data)
    dateSort.innerHTML =
      '由舊到新<span class="material-icons date-sort-drop-icon">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle()
    $('#button-date').toggleClass('active')
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
if (currentPage != 'price.html') {
  const swiper = new Swiper('.swiper', {
    // 分頁
    pagination: {
      el: '.swiper-pagination'
    },
    breakpoints: {
      936: {
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
      el: '.swiper-pagination',
      clickable: true,
      paginationDistance: '100px'
    }
  })
}

let collectedWorkData = []
// function multiSort () {
//   let arr = []
//   let clickedNum = 0 //已選取多少項目
//   $('.sort-button').click(function () {
//     $('.selection-bar a').removeClass('selected font-700')
//     $('.selection-bar a').addClass('unselected')
//     $('.selection-bar a:first').addClass('selected font-700')
//     if (this.innerText.slice(-1) == 'k') {
//       //如果已被選取，innerText會有check
//       let alreadySelected = this.innerText.substring(
//         0,
//         this.innerText.length - 6
//       )
//       // console.log(alreadySelected.length)
//       let index = arr.indexOf(alreadySelected)
//       arr.splice(index, 1)
//       for (e of collectedWorkData) {
//         if (e[0] == alreadySelected)
//           collectedWorkData.splice(collectedWorkData.indexOf(e), 1)
//       }
//       // console.log(`已移除種類篩選，目前已收集陣列資料：`)
//       // console.log(collectedWorkData)
//       if (clickedNum == 1) {
//         //如果移除所有篩選(移除前所有只剩一個)，回到初始畫面
//         data.type = ''
//         data.sort = 0
//         data.page = 1
//         data.search = ''
//         // console.log(data)
//         getData(data)
//       }
//       clickedNum--
//       organizeCollectedData()
//       currentNum = 0 //總共選取的作品數量初始化
//       collectedWorkData.forEach(e => {
//         //累加所有選取項目的作品數量
//         currentNum += e[1].length
//       })
//       if (currentNum == 0) {
//         //如果都沒有，顯示找不到資料的畫面
//         showNoData()
//       }
//     } else {
//       data.type = this.innerText
//       clickedNum++
//       // console.log(clickedNum)
//       if (collectedWorkData.length === 0) {
//         showNoData()
//       }
//       traverseWorksInfo(data)
//     }
//   })
// }

// function traverseWorksInfo ({ type, sort, page, search }) {
//   // console.log(type)
//   const path = 'https://2023-engineer-camp.zeabur.app'
//   let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
//   axios.get(link).then(function (res) {
//     worksData = res.data.ai_works.data
//     pagesData = res.data.ai_works.page
//     collectedWorkData.push([type, worksData])
//     // console.log(pagesData)
//     if (pagesData.has_next) {
//       page += 1
//       getWorksInfo(data)
//     }
//     // console.log("已增加種類篩選，已收集陣列資料：")
//     // console.log(collectedWorkData)
//     organizeCollectedData()
//   })
// }

// function organizeCollectedData () {
//   let result = []
//   for (e of collectedWorkData) {
//     if (e[1].length == 0) {
//       /*console.log(`${e[0]}的種類尚未有任何資料！`)*/
//     } else result.push(e[1])
//   }
//   let groupedResult = []
//   for (let i = 0; i < result.flat().length; i += 6) {
//     let temp = result.flat().slice(i, i + 6)
//     groupedResult.push(temp)
//   }
//   //groupedResult以六個六個為一組，每個分組代表一個頁面所要呈現的資料
//   // console.log("groupedResult")
//   // console.log(groupedResult)
//   let pageTotalFilter = 1
//   worksData = groupedResult[pageTotalFilter - 1]
//   console.log(worksData)
//   if (worksData != undefined) renderData(worksData)
// }

function showNoData () {
  const list = document.querySelector('#tools')
  list.innerHTML =
    '<li style="font-size: 18px; margin-bottom: 60px"><p>找不到相符的資料</p><li>'
}

async function DataProcess ({ type, sort, page, search }) {
  let arr = []
  let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
  let res = await axios.get(link)
  let worksData = res.data.ai_works.data
  let pagesData = res.data.ai_works.page
  arr.push(worksData)

  while (pagesData.has_next) {
    page++
    link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
    console.log(link)
    res = await axios.get(link)
    let worksData = res.data.ai_works.data
    pagesData = res.data.ai_works.page
    arr.push(worksData)
  }

  console.log(arr)
  // let psuedo = {
  //   create_time: 1684220568543,
  //   description: 'Pseudo1',
  //   discordId: 'None',
  //   imageUrl: 'https://fakeimg.pl/416x217/?text=OldQA',
  //   model: 'gpt3.5',
  //   title: 'OldNewQA',
  //   type: '問答服務'
  // }
  // let psuedo2 = {
  //   create_time: 1685631555920,
  //   description: 'Psuedo2',
  //   discordId: 'None',
  //   imageUrl: 'https://fakeimg.pl/416x217/?text=NewQA',
  //   model: 'gpt3.5',
  //   title: 'NewQA',
  //   type: '問答服務'
  // }
  // let psuedo3 = {
  //   create_time: 1685631555920,
  //   description: 'Psuedo3',
  //   discordId: 'None',
  //   imageUrl: 'https://fakeimg.pl/416x217/?text=NewTrans',
  //   model: 'gpt3.5',
  //   title: 'NewTrans',
  //   type: '翻譯助手'
  // }
  // let psuedo4 = {
  //   create_time: 1685631555918,
  //   description: 'Psuedo4',
  //   discordId: 'None',
  //   imageUrl: 'https://fakeimg.pl/416x217/?text=OldTrans',
  //   model: 'gpt3.5',
  //   title: 'OldTrans',
  //   type: '翻譯助手'
  // }
  // for (let i = 0; i < 5; i++) {
  //   arr.push(psuedo)
  //   arr.push(psuedo2)
  //   arr.push(psuedo2)
  //   arr.push(psuedo3)
  //   arr.push(psuedo3)
  //   arr.push(psuedo4)
  //   arr.push(psuedo4)
  //   arr.push(psuedo4)
  // }

  let groupedResult = []
  arr = arr.flat()

  arr.sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
  for (let i = 0; i < arr.length; i += 6) {
    let temp = arr.slice(i, i + 6)
    groupedResult.push(temp)
  }
  // console.log(groupedResult)
  if (arr.length === 0) showNoData()
  // renderData(arr)
  currentPage = 1
  index = currentPage - 1

  renderData(groupedResult[index])

  const filtersNew = document.querySelectorAll('.selection-bar a')
  // console.log(filtersNew)
  // filterPagination(groupedResult)

  //排序功能
  sortData(arr)

  //篩選功能
  console.log(arr)
  qa = arr.filter(e => e.type == '問答服務')
  qaGrouped = createGroup(qa)

  virtualSC = arr.filter(e => e.type == '虛擬客服')
  virtualGrouped = createGroup(virtualSC)

  lifeUse = arr.filter(e => e.type == '生活應用')
  lifeUseGrouped = createGroup(lifeUse)

  programming = arr.filter(e => e.type == '程式知識')
  programmingGrouped = createGroup(programming)

  translation = arr.filter(e => e.type == '翻譯助手')
  translationGrouped = createGroup(translation)

  saling = arr.filter(e => e.type == '行銷文案')
  salingGrouped = createGroup(saling)

  const filters = document.querySelectorAll('.selection-bar a')
  totalPage = groupedResult.length
  switchPagination(filters[0], groupedResult)
  $('.selection-bar a').click(function () {
    switchPagination(filters[0], groupedResult)
    switchPagination(filters[1], qaGrouped)
    switchPagination(filters[2], virtualGrouped)
    switchPagination(filters[3], lifeUseGrouped)
    switchPagination(filters[4], programmingGrouped)
    switchPagination(filters[5], translationGrouped)
    switchPagination(filters[6], salingGrouped)
  })

  // console.log(filters)
  filtersNew.forEach(e => {
    // console.log(e)
    $(e).on('click', function () {
      result = []
      if (e.innerText === '全部') {
        $(`.pagination li:nth-child(2)`)
          .find('a')
          .addClass('selected-pagination')
        // renderData(groupedResult[0])
      } else {
        arr.forEach(items => {
          if (items.type === e.innerText) result.push(items)
        })
        console.log(result)

        // let groupedFilterResult = createGroup(result)
        $(`.pagination a`).removeClass('selected-pagination')
        $(`.pagination li:nth-child(2)`)
          .find('a')
          .addClass('selected-pagination')
        // let totalFilterPage = groupedFilterResult.length
        // currentFilterPage = 1;
        // console.log(currentFilterPage)
        // let hasData = totalFilterPage > 0
        // if(hasData) {
        //   $('.pagination li:last-child').click(function () {
        //     if(currentFilterPage < totalFilterPage) currentFilterPage ++;
        //     console.log(currentFilterPage)
        //   })
        //   $('.pagination li:first-child').click(function () {
        //     if(currentFilterPage > 1) currentFilterPage --;
        //     console.log(currentFilterPage)
        //   })
        // }
        if (result.length === 0) showNoData()
        // else renderData(groupedFilterResult[0])
      }
      // console.log(data)
    })
  })

  //多篩選功能
  let arr2 = []
  let clickedNum = 0 //已選取多少項目
  $('.sort-button').click(function () {
    $('.selection-bar a').removeClass('selected font-700')
    $('.selection-bar a').addClass('unselected')
    $('.selection-bar a:first').addClass('selected font-700')
    if (this.innerText.slice(-1) == 'k') {
      clickedNum += 1
      arr.forEach(e => {
        selectedItem = this.innerText.substring(0, this.innerText.length - 6)
        if (e.type === selectedItem) {
          arr2.push(e)
        }
      })
      console.log(arr2)
      //如果已被選取，innerText會有check
      // console.log(alreadySelected.length)
      // let index = arr2.indexOf(selectedItem)
      // arr2.splice(index, 1)
    } else {
      selectedItem = this.innerText
      arr2 = arr2.filter(e => e.type !== selectedItem)
      clickedNum -= 1
      console.log(arr2)
      console.log(clickedNum)
    }
    let groupedFilterResult = createGroup(arr2)
    // console.log(groupedFilterResult)

    paginationProcess(groupedFilterResult.length, groupedFilterResult)
    let oneKind = true
    for (let i = 1; i < arr2.length; i++) {
      oneKind = oneKind && arr2[i].type === arr2[i - 1].type
    }
    if (clickedNum == 0 && arr2.length === 0) {
      renderData(groupedResult[0])
      paginationProcess(groupedResult.length, groupedResult)
    } else if (arr2.length === 0) showNoData()
    else renderData(groupedFilterResult[0])
  })

  //搜尋功能
  //

  const searchInput = document.querySelector('.search')
  searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      searched = []
      arr.forEach(e => {
        let searchString = new RegExp(searchInput.value)
        title = e.title
        if (searchString.test(title)) searched.push(e)
        let isFirstLetterLowerCase = new RegExp('[a-z]')
        if (
          searchInput.value.length > 0 &&
          isFirstLetterLowerCase.test(searchInput.value[0])
        ) {
          let newStr =
            searchInput.value[0].toUpperCase() +
            searchInput.value.slice(1, searchInput.value.length)
            console.log(newStr)
            searchString = new RegExp(newStr)
            if (searchString.test(title)) 
            if(!searched.includes(e)) searched.push(e)
        }
        console.log(searched)
      })
      searchGroup = createGroup(searched)
      // filterPagination(searchGroup)
      if (searchGroup.length > 0) {
        if(searchGroup.length == 1) {
            $(`.pagination li:nth-child(1)`).hide()
            $(`.pagination li:nth-child(7)`).hide()
        }
        renderData(searchGroup[0])
      }
      else {
        showNoData(); 
      }  
      totalPage = searchGroup.length
      paginationProcess(totalPage, searchGroup)
      // renderData(groupedResult[0])
    }
    if (e.keyCode === 8 && searchInput.value.length === 1) {
      Group = createGroup(arr)
      // filterPagination(Group)
      renderData(Group[0])
      paginationProcess(Group.length, Group)
      $(`.pagination li:nth-child(1)`).show()
      $(`.pagination li:nth-child(7)`).show()
    }
  })
}

currentFilterPage = 0

function switchPagination (item, arr) {
  if (item.classList.contains('selected')) {
    totalPage = arr.length
    if (totalPage > 0) {
      renderData(arr[0])
      for (let i = 1; i <= 7; i++) {
        $(`.pagination li:nth-child(${i})`).show()
      }
      if (totalPage == 1) {
        for (let i = 1; i <= 7; i++) {
          $(`.pagination li:nth-child(${i})`).hide()
        }
      }
      paginationProcess(totalPage, arr)
    } else {
      showNoData()
      if (totalPage == 0) {
        for (let i = 1; i <= 7; i++) {
          $(`.pagination li:nth-child(${i})`).hide()
        }
      }
    }
    console.log(totalPage)
  }
}
function createGroup (arr) {
  let groupedFilterResult = []
  arr = arr.flat()
  for (let i = 0; i < arr.length; i += 6) {
    let temp = arr.slice(i, i + 6)
    groupedFilterResult.push(temp)
  }
  return groupedFilterResult
}
function sortData (arr) {
  //排序功能
  const dateSort = document.querySelector('#button-date')
  $('#to-old-btn').on('click', e => {
    arr.sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
    // console.log(arr)
    e.preventDefault()
    dateSort.innerHTML =
      '由新到舊<span class="material-icons date-sort-drop-icon">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle()
    $('#button-date').toggleClass('active')
    // renderData(arr)
    let groupedFilterResult = createGroup(arr)
    // console.log(groupedFilterResult)
    renderData(groupedFilterResult[0])
    paginationProcess(groupedFilterResult.length, groupedFilterResult)
  })
  $('#to-new-btn').on('click', e => {
    arr.sort((a, b) => new Date(a.create_time) - new Date(b.create_time))
    // console.log(arr)
    e.preventDefault()
    dateSort.innerHTML =
      '由舊到新<span class="material-icons date-sort-drop-icon">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle()
    $('#button-date').toggleClass('active')
    let groupedFilterResult = createGroup(arr)
    // console.log(groupedFilterResult)

    renderData(groupedFilterResult[0])
    paginationProcess(groupedFilterResult.length, groupedFilterResult)
  })
}

function paginationReset (totalPage) {
  $('.pagination a').removeClass('selected-pagination')
  $('.pagination li:nth-child(2)').find('a').addClass('selected-pagination')
  for (let i = 1; i <= 6; i++) {
    $(`.pagination li:nth-child(${i})`)
      .find('a')
      .text(`${i - 1}`)
  }
}

function paginationProcess (totalPage, group) {
  paginationReset()
  const dateSort = document.querySelector('#button-date')
  console.log(dateSort.innerText)
  if (dateSort.innerText === '由舊到新\nkeyboard_arrow_down') {
    group.sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
  } else {
    group.sort((a, b) => new Date(a.create_time) - new Date(b.create_time))
  }
  console.log(group)
  const filters = document.querySelectorAll('.selection-bar a')
  for (let i = 2; i <= 6; i++) {
    if (Number($(`.pagination li:nth-child(${i})`).text()) > totalPage) {
      $(`.pagination li:nth-child(${i})`).hide()
    } else {
      $(`.pagination li:nth-child(${i})`).show()
    }
  }
  $('.pagination li:not(:last-child):not(:first-child').click(function () {
    $('.pagination a').removeClass('selected-pagination')
    $('.pagination a').addClass('unselected-pagination')
    $(this).find('a').toggleClass('selected-pagination')
    currentPage = $(this).index()
    console.log(currentPage)
    try {renderData(group[currentPage - 1])} catch{}
  })

  let currentPage = 1
  console.log(currentPage)
  if (totalPage != 0) {
    $('.pagination li:last-child').click(function () {
      if (currentPage < totalPage) {
        currentPage++
        if (currentPage == totalPage) {
        }
        console.log(currentPage)
        if (!(currentPage % 5 == 0)) {
          $(`.pagination a`).removeClass('selected-pagination')
          $(`.pagination li:nth-child(${(currentPage % 5) + 1})`)
            .find('a')
            .addClass('selected-pagination')
          if (currentPage % 5 == 1) {
            for (let i = 1; i <= 6; i++) {
              $(`.pagination li:nth-child(${i})`)
                .find('a')
                .text(`${currentPage - 2 + i}`)
            }
          }
          for (let i = 2; i <= 6; i++) {
            if (
              Number($(`.pagination li:nth-child(${i})`).text()) > totalPage
            ) {
              $(`.pagination li:nth-child(${i})`).hide()
            } else {
              $(`.pagination li:nth-child(${i})`).show()
            }
          }
        } else {
          $(`.pagination li:nth-child(${5})`)
            .find('a')
            .removeClass('selected-pagination')
          $(`.pagination li:nth-child(${6})`)
            .find('a')
            .addClass('selected-pagination')

          console.log(totalPage)
          // console.log(index)
        }
        for (let i = 2; i <= 6; i++) {
          if (Number($(`.pagination li:nth-child(${i})`).text()) > totalPage) {
            $(`.pagination li:nth-child(${i})`).hide()
          } else {
            $(`.pagination li:nth-child(${i})`).show()
          }
        }
        renderData(group[currentPage - 1])
      } else {
      }
    })
    $(`.pagination li:first-child`).click(function () {
      for (let i = 2; i <= 6; i++) {
        if (Number($(`.pagination li:nth-child(${i})`).text()) > totalPage) {
          $(`.pagination li:nth-child(${i})`).hide()
        } else {
          $(`.pagination li:nth-child(${i})`).show()
        }
      }
      // console.log(index)
      if (currentPage > 1) {
        currentPage -= 1
        console.log(currentPage)
        if (currentPage % 5 == 0) {
          $(`.pagination li:nth-child(${6})`).find('a').text(`${currentPage}`)
          $(`.pagination li:nth-child(${5})`)
            .find('a')
            .text(`${currentPage - 1}`)
          $(`.pagination li:nth-child(${4})`)
            .find('a')
            .text(`${currentPage - 2}`)
          $(`.pagination li:nth-child(${3})`)
            .find('a')
            .text(`${currentPage - 3}`)
          $(`.pagination li:nth-child(${2})`)
            .find('a')
            .text(`${currentPage - 4}`)
          $(`.pagination li:nth-child(${2})`)
            .find('a')
            .removeClass('selected-pagination')
          $(`.pagination li:nth-child(${6})`)
            .find('a')
            .addClass('selected-pagination')
        } else {
          $(`.pagination li:nth-child(${(currentPage % 5) + 2})`)
            .find('a')
            .removeClass('selected-pagination')
          $(`.pagination li:nth-child(${(currentPage % 5) + 1})`)
            .find('a')
            .addClass('selected-pagination')
        }
        renderData(group[currentPage - 1])
      }

      for (let i = 2; i <= 6; i++) {
        if (Number($(`.pagination li:nth-child(${i})`).text()) <= totalPage) {
          $(`.pagination li:nth-child(${i})`).show()
        }
      }
    })
  } else {
  }
}

/*ToDo*/

/*ToCheck*/
//1. 前一頁邏輯(完成，待真實data實測)
//2. 整理出來的陣列資料渲染到頁面上(接收到的Data以六個為一組隔開) (完成可以多種類篩選的部分，順序會依據所篩來顯示)
//3. 改為本地端資料渲染畫面

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

//out-date:
//1. 在按鍵功能的地方，判斷點擊是單篩區還是多篩區。如果是來自單篩區，切換分頁則依循串接資料去渲染即可。如果是自己整理出來的陣列，則撰寫另外一種邏輯。新舊排序則改為若選取多篩區，則不顯示新舊排序的按鈕(否則陣列跟頁數的邏輯會更複雜)。
