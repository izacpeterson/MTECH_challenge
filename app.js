//MTECH challenge app

//Classes. Probably don't need a post class, as there will only be one post. But I'm going to make one anyway.
class Post {
  constructor(body, author) {
    this.body = body;
    this.author = author;
    this.comments = [];
  }
  addComment() {
    let author = document.getElementById("new-comment-user").value;
    let comment = document.getElementById("new-comment-text").value;

    this.comments.push(new Comment(comment, author, this.comments.length));

    render();
  }
}

class Comment {
  constructor(body, author, index) {
    this.body = body;
    this.author = author;
    this.id = index;
  }

  edit(postIndex, commentIndex) {
    render();
    let commentHTML = document.getElementById(`comment-${this.id}`);
    let comment = posts[0].comments[this.id];
    commentHTML.innerHTML += `
      <div class="edit-comment">
          <input type="text" class="edit-comment-text" id="edit-comment-text" value="${comment.body}">
          <button class="edit-comment-submit" onClick="posts[${postIndex}].comments[${commentIndex}].save()">Save</button>
      </div>
      `;

    let commentActionsHTML = document.getElementById(`comment-${this.id}`).getElementsByClassName("comment-actions")[0];
    commentActionsHTML.innerHTML = `
          <div class="comment-action" onClick="render()">Cancel</div>
      `;
  }
  save() {
    let newComment = document.getElementById("edit-comment-text").value;
    this.body = newComment;
    render();
  }
  delete() {
    posts[0].comments.splice(this.id, 1);
    render();
  }
}

// The render function. Used to render out every post and comment. Also used to 'cancel' editing by re-rendering the page.
function render() {
  localStorage.setItem("posts", JSON.stringify(posts));
  let feed = document.getElementById("feed");
  feed.innerHTML = "";

  // Manipulating the DOM twice might not be best, might rework later.
  posts.forEach((post, postIndex) => {
    feed.innerHTML += `
        <div class="post">
            <div class="post-header">
                <div class="post-author">${post.author}</div>
            </div>
            <div class="post-body">
                ${post.body}
            </div>
        </div>
        <div class="post-comments" id="comments">
        </div>
        <div class="add-comment">
            <input type="text" class="new-comment-user" id="new-comment-user" placeholder="Display Name">
            <input type="text" class="new-comment-text" id="new-comment-text" placeholder="Add a comment...">
            <button class="new-comment-submit" onClick="posts[${postIndex}].addComment()">Submit</button>
        </div>
    `;
    let comments = document.getElementById("comments");
    post.comments.forEach((comment, commentIndex) => {
      comments.innerHTML += `
        <div class="comment" id="comment-${commentIndex}">   
            <div class="comment-content">
                <div class="user-image">
                    <img src="./images/user.png" alt="user image">
                </div>
                <div class="comment-details">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-body">${comment.body}</div>
                </div>
                <div class="comment-actions">
                    <div class="comment-action" onClick="posts[${postIndex}].comments[${commentIndex}].edit(${postIndex},${commentIndex})">Edit</div>
                    <div class="comment-action" onClick="posts[${postIndex}].comments[${commentIndex}].delete()">Delete</div>
                </div>
            </div>
        </div>
                `;
    });
  });
}

// If there are posts in local storage, load them. Otherwise, render the page.
// if (localStorage.getItem("posts")) {
//   posts = JSON.parse(localStorage.getItem("posts"));
// }
let posts = [];

posts.push(new Post("Trying to decide a career path? Programming is the move. Change my mind", "WhySoSerious45"));
posts[0].comments = [new Comment("I agree", "John", 0), new Comment("I disagree", "Jane", 1), new Comment("I'm not sure", "Joe", 2)];

render();
