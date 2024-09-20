// Capturar o formulário e a lista de posts
const form = document.getElementById('formPost');
const postsList = document.getElementById('posts');
const textarea = document.getElementById('textarea');
const imageUpload = document.getElementById('imageUpload');

// Função para salvar os posts no localStorage
function savePostsToLocalStorage(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Função para carregar os posts do localStorage
function loadPostsFromLocalStorage() {
  const storedPosts = localStorage.getItem('posts');
  return storedPosts ? JSON.parse(storedPosts) : [];
}

// Função para renderizar os posts na tela
function renderPosts() {
  postsList.innerHTML = ''; // Limpar a lista antes de renderizar os posts
  const posts = loadPostsFromLocalStorage();

  posts.forEach((post, index) => {
    const newPost = document.createElement('li');
    newPost.classList.add('post');
    
    newPost.innerHTML = `
      <div class="infoUserPost">
        <div class="imgUserPost"></div>
        <div class="nameAndHour">
          <strong>Eduardo Roberto Schulle</strong>
          <p>${new Date(post.date).toLocaleString()}</p>
        </div>
      </div>
      <p class="postContent">${post.content}</p>
      ${post.image ? `<img src="${post.image}" alt="Imagem do post">` : ''}
      <div class="actionBtnPost">
        <button class="editPost" data-index="${index}">Editar</button>
        <button class="deletePost" data-index="${index}">Excluir</button>
      </div>
    `;

    postsList.prepend(newPost);
  });
}

// Função para converter a imagem em Base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

// Carregar e renderizar posts ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  renderPosts();
});

// Adicionar um evento ao formulário para quando ele for enviado
form.addEventListener('submit', async function(event) {
  event.preventDefault(); // Impedir o comportamento padrão de recarregar a página

  // Capturar o valor do textarea
  const postContent = textarea.value;

  // Verificar se o textarea não está vazio
  if (postContent.trim() !== '') {
    const posts = loadPostsFromLocalStorage();
    
    // Verificar se uma imagem foi carregada
    let imageBase64 = null;
    if (imageUpload.files.length > 0) {
      imageBase64 = await convertImageToBase64(imageUpload.files[0]);
    }

    // Adicionar o novo post ao array de posts
    posts.push({
      content: postContent,
      image: imageBase64, // Armazenar a imagem em base64
      date: new Date().toISOString(),
    });

    // Salvar os posts no localStorage
    savePostsToLocalStorage(posts);

    // Renderizar os posts novamente
    renderPosts();

    // Limpar o textarea e o campo de upload após a publicação
    textarea.value = '';
    imageUpload.value = '';
  } else {
    alert('Por favor, escreva algo antes de publicar!');
  }
});

// Adicionar funcionalidade de edição e exclusão usando event delegation
postsList.addEventListener('click', function(event) {
  const target = event.target;
  const posts = loadPostsFromLocalStorage();

  // Editar post
  if (target.classList.contains('editPost')) {
    const index = target.getAttribute('data-index');
    const post = posts[index];
    const newContent = prompt('Edite seu comentário:', post.content);

    if (newContent !== null && newContent.trim() !== '') {
      posts[index].content = newContent;
      savePostsToLocalStorage(posts);
      renderPosts();
    } else if (newContent === '') {
      alert('O comentário não pode ficar vazio!');
    }
  }

  // Excluir post
  if (target.classList.contains('deletePost')) {
    const index = target.getAttribute('data-index');
    if (confirm('Você tem certeza que deseja excluir este comentário?')) {
      posts.splice(index, 1);
      savePostsToLocalStorage(posts);
      renderPosts();
    }
  }
});
