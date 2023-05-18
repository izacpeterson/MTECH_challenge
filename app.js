class Post {
  constructor(body, author) {
    this.body = body;
    this.author = author;
    this.comments = [];
  }
}

class Comment {
  constructor(body, author) {
    this.body = body;
    this.author = author;
  }
}

let posts = [];

posts.push(new Post("Trying to decide a career path? Programming is the move. Change my mind", "WhySoSerious45"));
posts[0].comments.push(new Comment("I agree", "TheJoker"));
posts[0].comments.push(new Comment("I disagree", "Batman"));

function addComment(postIndex) {
  let author = document.getElementById("new-comment-user").value;
  let comment = document.getElementById("new-comment-text").value;
  posts[postIndex].comments.push(new Comment(comment, author));
  render();
}
function editComment(commentIndex) {
  render();
  let commentHTML = document.getElementById(`comment-${commentIndex}`);
  let comment = posts[0].comments[commentIndex];
  commentHTML.innerHTML += `
    <div class="edit-comment">
        <input type="text" class="edit-comment-text" id="edit-comment-text" value="${comment.body}">
        <button class="edit-comment-submit" onClick="saveComment(${commentIndex})">Save</button>
    </div>
    `;

  let commentActionsHTML = document.getElementById(`comment-${commentIndex}`).getElementsByClassName("comment-actions")[0];
  commentActionsHTML.innerHTML = `
        <div class="comment-action" onClick="render()">Cancel</div>
    `;
}

function saveComment(commentIndex) {
  let newComment = document.getElementById("edit-comment-text").value;
  posts[0].comments[commentIndex].body = newComment;
  render();
}

function deleteComment(commentIndex) {
  posts[0].comments.splice(commentIndex, 1);
  render();
}

function render() {
  let feed = document.getElementById("feed");
  feed.innerHTML = "";
  posts.forEach((post, index) => {
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
            <button class="new-comment-submit" onClick="addComment(${index})">Submit</button>
        </div>
    `;
    let comments = document.getElementById("comments");
    post.comments.forEach((comment, index) => {
      comments.innerHTML += `
                <div class="comment" id="comment-${index}">   
                    <div class="comment-content">
                        <div class="user-image">
                            <img src="./images/user.png" alt="user image">
                        </div>
                        <div class="comment-details">
                            <div class="comment-author">${comment.author}</div>
                            <div class="comment-body">${comment.body}</div>
                        </div>
                        <div class="comment-actions">
                            <div class="comment-action" onClick="editComment(${index})">Edit</div>
                            <div class="comment-action" onClick="deleteComment(${index})">Delete</div>
                        </div>
                    </div>

                </div>
                `;
    });
  });
}

render();
