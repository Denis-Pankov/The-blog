(async function () {

  const pageParams = new URLSearchParams(window.location.search);
  let pageN;
  pageN = +pageParams.get('page');
  if (pageN === 0) {
    pageN = 1;
  }
  pageId = `page=${pageN}`;
  if (pageId == 'page=null') {
    pageId = 'page=1';
  }
  // console.log(pageId);

  // const response = await fetch('https://gorest.co.in/public-api/posts?id=189'); // статья
  // const response = await fetch('https://gorest.co.in/public-api/posts?page=1');
  // const response = await fetch(`https://gorest.co.in/public-api/posts`);
  const response = await fetch(`https://gorest.co.in/public-api/posts?${pageId}`); // список постов страницы
  // const response = await fetch('https://gorest.co.in/public-api/comments?post_id=70'); // комментарии к статье (имя автора + содержимое)

  const dataObject = await response.json();
  // console.log(dataObject);
  // console.log(dataObject.meta.pagination.pages); // количество страниц
  // console.log(dataObject.data[0].title); // заголовок статьи
  // console.log(dataObject.data[0].body); // тело статьи

  // dataObject.forEach(dataItem => {
  //   console.log(dataItem);
  // });

  //! Получение количества страниц
  const pageMax = dataObject.meta.pagination.pages;
  const dataList = dataObject.data;
  // console.log(pageMax); // всего страниц
  // console.log(dataList); // текущая страница

  //! Построение списка статей
  function createPostList(object) {
    const postUl = document.createElement('div');
    postUl.classList.add('list-group');
    object.forEach(element => {
      const postLi = document.createElement('a');
      postLi.classList.add('list-group-item', 'list-group-item-action');
      postLi.setAttribute('href', `detail.html?page=${pageN}&id=${element.id}`);
      postLi.setAttribute('id', `${element.id}`)
      postLi.textContent = element.title;
      postUl.append(postLi);
      // console.log(element);
    });
    return postUl;
  }

  //! Построение навигации страниц
  function createPagesNavigation(page) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Навигация по страницам');

    const navUl = document.createElement('ul');
    navUl.classList.add('pagination', 'pagination-sm');

    for (let i = 0; i <= (page + 1); i++) {
      const navLi = document.createElement('li');
      navLi.classList.add('page-item');
      const navA = document.createElement('a');
      navA.classList.add('page-link');
      navA.setAttribute('href', `index.html?page=${i}`);
      if (pageId === `page=${i}`) {
        navLi.classList.add('active');
      }
      if (i === 0) {
        // console.log('Код для кнопки назад');
        navA.setAttribute('aria-label', 'Предыдущая');
        const navSpan = document.createElement('span');
        navSpan.setAttribute('aria-hidden', 'true');
        navSpan.innerHTML = '&laquo;';
        // console.log(pageN);
        if (pageN === 1) {
          // console.log('Деактивация кнопки назад');
          navLi.classList.add('disabled');
          navA.setAttribute('tabindex', '-1');
          navA.setAttribute('aria-disables', true);
          navA.setAttribute('href', `index.html?page=1`);
        } else {
          navA.setAttribute('href', `index.html?page=${pageN - 1}`);
        }
        navA.append(navSpan);
      }
      else if (i === (page + 1)) {
        // console.log('Код для кнопки вперед');
        navA.setAttribute('aria-label', 'Следующая');
        const navSpan = document.createElement('span');
        navSpan.setAttribute('aria-hidden', 'true');
        navSpan.innerHTML = '&raquo;';
        if (pageN === page) {
          console.log(page);
          console.log(pageN);
          navLi.classList.add('disabled');
          navA.setAttribute('tabindex', '-1');
          navA.setAttribute('aria-disables', true);
          navA.setAttribute('href', `index.html?page=${page}`);
        } else {
          navA.setAttribute('href', `index.html?page=${pageN + 1}`);
        }
        navA.append(navSpan);
      }
      else {
        // console.log('Код для цифр');
        navA.textContent = `${i}`;
      }
      navLi.append(navA);
      navUl.append(navLi);
    }

    nav.append(navUl);

    return {
      nav,
      navUl
    }
  }
  const container = document.getElementById('first-page');

  //!Отрисовка списка статей
  const appendPostList = createPostList(dataList);
  container.append(appendPostList);

  //! Отрисовка навигации
  const appendPagesNavigation = createPagesNavigation(pageMax);
  container.append(appendPagesNavigation.nav);
  // console.log(pageMax);
  // console.log(appendPagesNavigation.navUl);
  // console.log(container);

  //! NodeList элементов навигации
  const navList = document.querySelectorAll('.page-item');
  // console.log(navList);
  // console.log(+navList[7].innerText);
  // document.querySelector('.page-item').addEventListener('click', newPage);
  // function newPage() {

  // }

  //! NodeList списка постов
  const postList = document.querySelectorAll('.list-group-item');
  // console.log(postList);
})();
