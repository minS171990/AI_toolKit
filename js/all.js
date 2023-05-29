$(document).ready(function () {
  refresh()
  menuButton()
  req(data)
  find(data)
  filter(data)
  sort()

  console.log($('.pagination li'))
  $('.selection-bar a').click(function () {
    $('.selection-bar a').removeClass('selected font-700')
    $('.selection-bar a').addClass('unselected')
    $(this).addClass('selected font-700')
  })

  //切換分頁(預寫)
  // var index = 0;
  // console.log($('.pagination a'))
  // $('.pagination li:not(:last-child)').click(function () {
  //   $('.pagination a').removeClass('font-900 selected-pagination font-white');
  //   $('.pagination a').addClass('unselected-pagination');
  //   $(this).find('a').addClass('font-900 selected-pagination font-white');
  //   index = $(this).index();
  // });

  // $('.pagination li:last-child').click(function () {
  //   if(index < 4){
  //     $(`.pagination li:nth-child(${index+1})`).find('a').removeClass('font-900 selected-pagination font-white');
  //     $(`.pagination li:nth-child(${index+1})`);
  //     $(`.pagination li:nth-child(${index+2})`).find('a').addClass('font-900 selected-pagination');
  //     index += 1;
  //   }
  // });

  $('.backToTop').on('click', function () {
    $('html').animate({ scrollTop: 0 }, 1000)
  })

  $('.date-sort-drop').hide()

  $('#button-date').click(function () {
    $('.date-sort-drop').slideToggle()
  })

  dotAction()

  //過渡分頁特效
  var btns = ['.submenu a', '.map-list a', '.submenu2 a']
  for (e of btns) {
    gradLoad(e)
  }

  //下拉式問答
  for (let i = 0; i <= 5; i++) {
    clickButtonFunc(`.q${i}`, `.ans${i}`, `.icon-q-${i}`)
  }
})

function clickButtonFunc (q, a, icon) {
  $(q).click(function () {
    console.log($(a).css('display'))
    if ($(a).css('display') == 'none') $(icon).text('remove')
    if ($(a).css('display') !== 'none') $(icon).text('add')
    $(a).slideToggle()
  })
}

function menuButton () {
  var main = [
    'index.html',
    'page2.html',
    'page3.html',
    'page4.html',
    'page5.html'
  ]

  var pricepages = [
    'price.html',
    'p-page2.html',
    'p-page3.html',
    'p-page4.html',
    'p-page5.html'
  ]
  try {
    var path = document.location.pathname.match(/[^\/]+$/)[0]
    // console.log(path)
    if (main.includes(path))
      $('.header').after(
        '<ul class="submenu2" style="display:none"><li class="font-700 font-white">首頁</li><li><a class="font-700 font-white" href="price.html">定價</a></li></ul>'
      )
    else if (pricepages.includes(path))
      $('.header').after(
        '<ul class="submenu2" style="display:none"><li><a class="font-700 font-white" href="index.html">首頁</a></li><li class="font-700 font-white">定價</li></ul>'
      )
  } catch {
    $('.header').after(
      '<ul class="submenu2" style="display:none"><li class="font-700 font-white">首頁</li><li><a class="font-700 font-white" href="price.html">定價</a></li></ul>'
    )
  }
  $('.menu-top').on('click', function () {
    hideBlock()
    $('.menu-top').hide()
    if ($('.menu-top').is(':hidden')) {
      $('.menu-top-close').show()
    }
    $('.submenu2').slideToggle()
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
      $('.submenu2').hide()
      $('.menu-top-close').hide()
    }
    if ($('.submenu2').is(':visible')) {
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
  '.container-3',
  '.backToTop'
]

function hideBlock () {
  $('.header').nextUntil('.footer').hide()
  controlingBlock.forEach(e => {
    $(e).hide()
  })
}

function showBlock () {
  $('.submenu2').nextUntil('.footer').show()
  controlingBlock.forEach(e => {
    $(e).show()
  })
}

function closeMenu () {
  $('.submenu2').toggle()
  $('.menu-top').show()
  showBlock()
}

const data = {
  type: '',
  sort: 0,
  page: 1,
  search: ''
}

function req ({ type, sort, page, search }) {
  const path = 'https://2023-engineer-camp.zeabur.app'
  let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
  axios.get(link).then(function (res) {
    // console.log(res)
    worksData = res.data.ai_works.data
    pagesData = res.data.ai_works.page
    console.log(worksData)
    console.log(pagesData)
    paginationProcess(pagesData)
    renderData()
  })
}

function paginationProcess (pagesData) {
  $('.pagination li:not(:last-child)').click(function () {
    if ($('.pagination li:last-child').index() <= pagesData.total_pages) {
      $('.pagination a').removeClass('font-900 selected-pagination font-white')
      $('.pagination a').addClass('unselected-pagination')
      $(this).find('a').addClass('font-900 selected-pagination')
      index = $(this).index()
    } else alert('目前頁數未滿足切換條件!')
  })

  index = Number(pagesData.current_page) - 1

  console.log(index)
  $('.pagination li:last-child').click(function () {
    if (pagesData.has_next) {
      if (index < 4) {
        $(`.pagination li:nth-child(${index + 1})`).find('a').removeClass(
          'font-900 selected-pagination font-white'
        )
        $(`.pagination li:nth-child(${index + 1})`)
        $(`.pagination li:nth-child(${index + 2})`).find('a').addClass(
          'font-900 selected-pagination'
        )
        index += 1
        console.log(index)
      }
    } else alert('沒有下個分頁!')
  })
}
function find (data) {
  const search = document.querySelector('.search')
  $('.search').keypress(e => {
    if (e.keyCode === 13) {
      data.search = search.value
      data.page = 1
      getData(data)
    }
  })
}

function filter (data) {
  const filters = document.querySelectorAll('.selection-bar a')
  console.log(filters)
  filters.forEach(e => {
    console.log(e)
    $(e).on('click', function () {
      if (e.innerText === '全部') {
        data.type = ''
      } else {
        data.type = e.innerText
      }
      console.log(data)
      getData(data)
    })
  })
}

function getData ({ type, sort, page, search }) {
  const path = 'https://2023-engineer-camp.zeabur.app'
  let link = `${path}/api/v1/works/?type=${type}&sort=${sort}&page=${page}&search=${search}`
  axios.get(link).then(function (res) {
    console.log(res)
    worksData = res.data.ai_works.data
    const list = document.querySelector('#tools')
    if (worksData.length === 0) {
      list.innerHTML =
        '<li style="font-size: 18px; margin-bottom: 60px"><p>找不到相符的資料</p><li>'
    } else {
      renderData()
    }
    console.log({ type, sort, page, search })
    console.log(worksData)
  })
}

function dotAction () {
  var dots = {
    '.dot-1': [0, $('.container').width() * 0.5],
    '.dot-2': [$('.container').width() * 0.5, $('.container').width() * 1.5],
    '.dot-3': [$('.container').width() * 1.5, $('.container').width() * 2]
  }

  $('.container-4').on('scroll', function () {
    var scrollLeft = $('.container-4').scrollLeft()
    for (var dot in dots) {
      if (scrollLeft >= dots[dot][0] && scrollLeft < dots[dot][1]) {
        dotSelect(dot)
        for (var otherDot in dots) {
          if (otherDot !== dot) {
            dotReset(otherDot)
          }
        }
      }
    }
  })

  $('.dot-1').click(function () {
    $('.container-4').animate({ scrollLeft: dots['.dot-1'] }, 1000)
    dotSelect('.dot-1')
    for (var otherDot in dots) {
      if (otherDot !== '.dot-1') {
        dotReset(otherDot)
      }
    }
  })

  $('.dot-2').click(function () {
    $('.container-4').animate({ scrollLeft: dots['.dot-2'] }, 1000)
    dotSelect('.dot-2')
    for (var otherDot in dots) {
      if (otherDot !== '.dot-2') {
        dotReset(otherDot)
      }
    }
  })

  $('.dot-3').click(function () {
    $('.container-4').animate({ scrollLeft: dots['.dot-3'] }, 1000)
    dotSelect('.dot-3')
    for (var otherDot in dots) {
      if (otherDot !== '.dot-3') {
        dotReset(otherDot)
      }
    }
  })

  function dotSelect (dot) {
    $(dot).css({
      width: '12px',
      height: '12px',
      'background-color': 'white'
    })
  }
  function dotReset (dot) {
    $(dot).css({
      width: '8px',
      height: '8px',
      'background-color': 'gray'
    })
  }
}

function renderData () {
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
  list.innerHTML = works
}

function sort () {
  const dateSort = document.querySelector('#button-date')
  $("#to-old-btn").on("click", e => {
    e.preventDefault()
    data.sort = 0
    console.log(data)
    getData(data)
    dateSort.innerHTML = 
    '由新到舊<span class="material-icons">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle();
  })
  $("#to-new-btn").on("click", e => {
    e.preventDefault()
    data.sort = 1
    getData(data)
    dateSort.innerHTML =
    '由舊到新<span class="material-icons">keyboard_arrow_down</span>'
    $('.date-sort-drop').slideToggle();
  })
}

// gradLoadEmpty('.pagination a') 分頁切換特效(外連時才用，目前全部改為一頁)
// function gradLoadEmpty (btn) {
//   $(btn).click(function (event) {
//     event.preventDefault()
//     $('body').fadeOut(500).fadeIn(2000)
//   })
// }