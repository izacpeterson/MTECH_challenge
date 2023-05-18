class Post {
  constructor(id, body, author) {
    this.id = id;
    this.body = body;
    this.author = author;
    this.comments = [];
  }
}

class Comment {
  constructor(id, body, author) {
    this.id = id;
    this.body = body;
    this.author = author;
  }
}

let posts = [];

posts.push(new Post(1, "Trying to decide a career path? Programming is the move. Change my mind", "WhySoSerious45"));
posts[0].comments.push(new Comment(1, "I agree", "John Doe"));

function addComment(postId, comment, author) {
  posts[postId].comments.push(new Comment(1, comment, author));
}

function render() {
  let feed = document.getElementById("feed");
  feed.innerHTML = "";
  posts.forEach((post) => {
    feed.innerHTML += `
        <div class="post">
            <div class="post-header">
                <div class="post-author">${post.author}</div>
            </div>
            <div class="post-body">
                ${post.body}
            </div>
            <div class="post-comments" id="comments">
            </div>
        </div>
    `;
    let comments = document.getElementById("comments");
    post.comments.forEach((comment) => {
      comments.innerHTML += `
                    <div class="comment">
                        <div class="comment-author">${comment.author}</div>
                        <div class="comment-body">${comment.body}</div>
                    </div>
                `;
    });
  });
}

render();
