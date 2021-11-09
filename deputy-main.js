(async function () {
  const pageParams = new URLSearchParams(window.location.search);
  const pageN = +pageParams.get('page');
  const postN = +pageParams.get('id');
  // console.log(`Номер страницы ${pageN}`);
  // console.log(`Номер статьи ${postN}`);

  const response = await fetch(`https://gorest.co.in/public-api/posts?id=${postN}`);
  const responseComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postN}`);

  const dataObject = await response.json();
  const dataObjectCommenst = await responseComments.json();

  // const commentsList = dataObjectCommenst.meta.pagination.total;
  // console.log(`Количество комментариев ${commentsList}`);
  // console.log(dataObject);
  // console.log(dataObjectCommenst);

  //! Создание ссылки назад
  function createBackPage() {
    const backA = document.createElement('a');
    backA.classList.add('btn', 'btn-outline-secondary', 'ml-3', 'mt-3', 'mb-5');
    backA.setAttribute('href', `index.html?page=${pageN}`)
    backA.setAttribute('role', 'button')
    backA.textContent = '<- Назад';
    return backA;
  }

  //! Создание заголовка статьи
  function createPostTitle() {
    const createPostTitle = document.createElement('h1');
    createPostTitle.classList.add('ml-5', 'mr-5');
    createPostTitle.textContent = dataObject.data[0].title;
    return createPostTitle;
  }

  //! Создание тела статьи
  function createPostContent() {
    const createPostContent = document.createElement('p');
    createPostContent.classList.add('ml-3', 'mr-3');
    createPostContent.textContent = dataObject.data[0].body;
    return createPostContent;
  }

  //! Cоздание списка комментариев
  function createComments() {
    const createCommentsList = document.createElement('ul');
    createCommentsList.classList.add('list-group');

    dataObjectCommenst.data.forEach(element => {
      const createCommentsItem = document.createElement('li');
      createCommentsItem.classList.add('list-group-item', 'ml-3', 'mr-3');
      // console.log(element);
      createCommentsItem.innerHTML = `<u>${element.name}</u>: ${element.body}`;
      createCommentsList.append(createCommentsItem);
    });

    return createCommentsList;
  }

  const container = document.getElementById('second-page');

  //! Добавление на страницу Назад
  const appendBackPage = createBackPage();
  container.append(appendBackPage);

  //! Добавление заголовка статьи
  const appendPostTitle = createPostTitle();
  container.append(appendPostTitle);

  //! Добавление тела статьи
  const appendPostContent = createPostContent();
  container.append(appendPostContent);

  //! Добавление комментариев
  const appendComments = createComments();
  container.append(appendComments);

})();
