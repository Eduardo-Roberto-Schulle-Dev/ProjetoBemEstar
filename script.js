// Capturar o formulário e a lista de posts
const form = document.getElementById('formPost');
const postsList = document.getElementById('posts');
const textarea = document.getElementById('textarea');

// Adicionar um evento ao formulário para quando ele for enviado
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impedir o comportamento padrão de recarregar a página

  // Capturar o valor do textarea
  const postContent = textarea.value;

  // Verificar se o textarea não está vazio
  if (postContent.trim() !== '') {
    // Criar um novo elemento de post
    const newPost = document.createElement('li');
    newPost.classList.add('post');
    
    // Adicionar conteúdo ao novo post
    newPost.innerHTML = `
      <div class="infoUserPost">
        <div class="imgUserPost"></div>
        <div class="nameAndHour">
          <strong>Eduardo Roberto Schulle</strong>
          <p>${new Date().toLocaleString()}</p>
        </div>
      </div>
      <p class="postContent">${postContent}</p>
      <div class="actionBtnPost">
        <button class="editPost">Editar</button>
        <button class="deletePost">Excluir</button>
      </div>
    `;

    // Adicionar o novo post à lista de posts
    postsList.prepend(newPost);

    // Limpar o textarea após a publicação
    textarea.value = '';

    // Adicionar funcionalidade de edição e exclusão
    const editButton = newPost.querySelector('.editPost');
    const deleteButton = newPost.querySelector('.deletePost');
    const postParagraph = newPost.querySelector('.postContent');

    // Função para editar o post
    editButton.addEventListener('click', function() {
      const newContent = prompt('Edite seu comentário:', postParagraph.textContent);
      if (newContent !== null && newContent.trim() !== '') {
        postParagraph.textContent = newContent;
      } else if (newContent === '') {
        alert('O comentário não pode ficar vazio!');
      }
    });

    // Função para excluir o post
    deleteButton.addEventListener('click', function() {
      if (confirm('Você tem certeza que deseja excluir este comentário?')) {
        newPost.remove();
      }
    });

  } else {
    alert('Por favor, escreva algo antes de publicar!');
  }
});
