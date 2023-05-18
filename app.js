//MTECH challenge app. Probably overworked it quite a bit, but I like how it turned out.

//Classes for Post and Comment. Post has an array of comments. Comment has a postID to keep track of which post it belongs to.
class Post {
  constructor(body, author, id) {
    this.body = body;
    this.author = author;
    this.comments = [];
    this.id = id;
  }
  addComment() {
    let author = document.getElementById(`new-comment-user-${this.id}`).value;
    let comment = document.getElementById(`new-comment-text-${this.id}`).value;

    // this.comments.push(new Comment(comment, author, this.comments.length, this.id));
    this.comments.unshift(new Comment(comment, author, this.comments.length, this.id));
    this.fixCommentIndex();
    render();
  }
  fixCommentIndex() {
    //fixes the id of the comments array due to unshift and splice
    this.comments.forEach((comment, index) => {
      comment.id = index;
    });
  }
}

class Comment {
  constructor(body, author, index, postID) {
    this.body = body;
    this.author = author;
    this.id = index;
    this.postID = postID;
  }

  edit() {
    render();
    console.log(this.id);
    let commentHTML = document.getElementById(`comment-${this.postID}-${this.id}`);
    commentHTML.innerHTML += `
      <div class="edit-comment">
          <input type="text" class="edit-comment-text" id="edit-comment-text" value="${this.body}">
          <button class="edit-comment-submit" onClick="posts[${this.postID}].comments[${this.id}].save()">Save</button>
      </div>
      `;

    let commentActionsHTML = document.getElementById(`comment-${this.postID}-${this.id}`).getElementsByClassName("comment-actions")[0];
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
    let index = posts[this.postID].comments.indexOf(this);
    posts[this.postID].comments.splice(index, 1);
    posts[this.postID].fixCommentIndex();
    render();
  }
}

// The render function. Used to render out every post and comment. Also used to 'cancel' editing by re-rendering the page.
function render() {
  let feed = document.getElementById("feed");
  feed.innerHTML = "";

  localStorage.setItem("posts", JSON.stringify(posts));

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
        <div class="post-comments" id="comments-${postIndex}">
        </div>
        <div class="add-comment">
            <input type="text" class="new-comment-user" id="new-comment-user-${postIndex}" placeholder="Display Name">
            <input type="text" class="new-comment-text" id="new-comment-text-${postIndex}" placeholder="Add a comment...">
            <button class="new-comment-submit" onClick="posts[${postIndex}].addComment()">Submit</button>
        </div>
    `;
    let comments = document.getElementById(`comments-${postIndex}`);
    post.comments.forEach((comment, commentIndex) => {
      comments.innerHTML += `
        <div class="comment" id="comment-${postIndex}-${commentIndex}">   
            <div class="comment-content">
                <div class="user-image">
                    <img src="./images/user.png" alt="user image">
                </div>
                <div class="comment-details">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-body">${comment.body}</div>
                </div>
                <div class="comment-actions">
                    <div class="comment-action" onClick="posts[${postIndex}].comments[${commentIndex}].edit()">Edit</div>
                    <div class="comment-action" onClick="posts[${postIndex}].comments[${commentIndex}].delete()">Delete</div>
                </div>
            </div>
        </div>
                `;
    });
  });
}

let posts = [];

posts.push(new Post("Trying to decide a career path? Programming is the move. Change my mind", "WhySoSerious45", 0));
posts[0].comments = [new Comment("I agree", "John", 0, 0), new Comment("I disagree", "Jane", 1, 0), new Comment("I'm not sure", "Joe", 2, 0)];

if (localStorage.getItem("posts")) {
  posts = [];
  localPosts = JSON.parse(localStorage.getItem("posts"));
  localPosts.forEach((post, postIndex) => {
    posts.push(new Post(post.body, post.author, post.id));
    post.comments.forEach((comment, commentIndex) => {
      posts[postIndex].comments.push(new Comment(comment.body, comment.author, comment.id, comment.postID));
    });
  });
}

document.getElementById("reset").addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
// posts.push(new Post("I'm not sure what to do with my life", "John", 1));
// posts[1].comments = [new Comment("I agree", "John", 0, 1), new Comment("I disagree", "Jane", 1, 1), new Comment("I'm not sure", "Joe", 2, 1)];

render();
